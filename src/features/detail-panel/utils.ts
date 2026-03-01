import type { EntityConfig, FieldConfig, PanelMode, SectionConfig } from './types'
import { isFieldGroup } from './types'

/**
 * Get nested value from object using dot notation
 * e.g., getValue(data, 'general.firstName')
 */
export function getValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((current: any, key: string) => current?.[key], obj)
}

/**
 * Set nested value in object using dot notation
 * Returns a new object with the value set
 */
export function setValue<T>(obj: T, path: string, value: any): T {
  const keys = path.split('.')
  const lastKey = keys.pop()!

  const result = { ...obj }
  let current: any = result

  for (const key of keys) {
    current[key] = { ...current[key] }
    current = current[key]
  }

  current[lastKey] = value
  return result
}

/**
 * Check if field should be visible in current mode
 */
export function isFieldVisible<T>(field: FieldConfig<T>, mode: PanelMode, data?: T): boolean {
  // Check explicit mode visibility
  if (field.showInMode && !field.showInMode.includes(mode)) {
    return false
  }

  // Check hide flags
  if (mode === 'create' && field.hideInCreate) return false
  if (mode === 'edit' && field.hideInEdit) return false
  if (mode === 'view' && field.hideInView) return false

  // Check conditional render
  if (field.conditionalRender && data) {
    return field.conditionalRender(data)
  }

  return true
}

/**
 * Check if field should be read-only in current mode
 */
export function isFieldReadOnly<T>(field: FieldConfig<T>, mode: PanelMode): boolean {
  if (mode === 'view') return true
  if (mode === 'edit' && field.readOnlyInEdit) return true
  if (field.autoGenerate) return true
  return false
}

/**
 * Format value for display in read-only mode
 */
export function formatValue(value: any, field: FieldConfig): string {
  if (value === null || value === undefined) return '-'

  // Handle objects (including empty objects) - show dash for empty, stringify non-empty
  if (typeof value === 'object' && !Array.isArray(value)) {
    if (Object.keys(value).length === 0) return '-'
    // For non-empty objects, try to stringify them
    try {
      return JSON.stringify(value)
    } catch {
      return '-'
    }
  }

  // Use custom format function if provided
  if (field.format) {
    return field.format(value)
  }

  // Default formatting based on type
  switch (field.type) {
    case 'date': {
      const date = new Date(value)
      return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/')
    }

    case 'datetime': {
      const date = new Date(value)
      return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '/') + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    }

    case 'checkbox':
      return value ? 'Yes' : 'No'

    case 'array':
      return Array.isArray(value) ? value.join(', ') : String(value)

    case 'select':
      const option = field.options?.find(opt => opt.value === value)
      return option?.label || String(value)

    default:
      return String(value)
  }
}

/**
 * Extract all FieldConfig items from a section, traversing rows and groups
 */
export function getAllFields<T>(section: SectionConfig<T>): FieldConfig<T>[] {
  if (section.rows) {
    const fields: FieldConfig<T>[] = []
    for (const row of section.rows) {
      for (const item of row.items) {
        if (isFieldGroup(item)) {
          fields.push(...item.fields)
        } else {
          fields.push(item)
        }
      }
    }
    return fields
  }
  return section.fields || []
}

/**
 * Generate default values for a new entity
 */
export function generateDefaultData<T>(config: any): Partial<T> {
  const data: any = { ...config.defaultValues }

  // Process all fields to find auto-generated or default values
  config.sections.forEach((section: SectionConfig) => {
    getAllFields(section).forEach((field: FieldConfig) => {
      // Auto-generate if needed
      if (field.autoGenerate && field.generateFn) {
        setValue(data, field.key, field.generateFn())
      }
      // Auto-generate via autoGenerateConfig
      else if (field.autoGenerateConfig?.generate && !getValue(data, field.key)) {
        setValue(data, field.key, field.autoGenerateConfig.generate())
      }
      // Use default value if provided
      else if (field.defaultValue !== undefined && getValue(data, field.key) === undefined) {
        setValue(data, field.key, field.defaultValue)
      }
    })
  })

  return data
}

/**
 * Prepare entity data for duplication.
 * Strips system fields and fields marked hideInCreate in the config.
 * Additional field keys to clear can be passed via `extraFieldsToClear`.
 */
export function prepareForCopy<T>(
  data: T,
  config: EntityConfig<T>,
  extraFieldsToClear?: string[],
): Partial<T> {
  const copy = structuredClone(data) as any

  // Always strip system/identity fields
  delete copy._id
  delete copy.old_id
  delete copy.createdBy
  delete copy.updatedBy
  delete copy.updatedAt

  // Reset version
  copy.version = 1

  // Clear documents (file references shouldn't be shared)
  delete copy.documents

  // Auto-detect fields to clear from config (hideInCreate fields)
  // Also track reference-table fields that are hidden in create mode for the duplicate message
  const duplicateReferenceKeys: string[] = []
  for (const section of config.sections) {
    for (const field of getAllFields(section)) {
      if (field.hideInCreate) {
        const keys = field.key.split('.')
        let obj = copy
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj?.[keys[i]]
        }
        if (obj) {
          delete obj[keys[keys.length - 1]]
        }
      }
      if (
        field.type === 'reference-table' &&
        !field.showInMode?.includes('create')
      ) {
        duplicateReferenceKeys.push(field.key)
      }
    }
  }
  if (duplicateReferenceKeys.length > 0) {
    copy._duplicateReferenceKeys = duplicateReferenceKeys
  }

  // Apply copyFields whitelist — only keep the listed top-level keys
  if (config.copyFields) {
    for (const key of Object.keys(copy)) {
      if (key !== '_duplicateReferenceKeys' && !config.copyFields.includes(key)) {
        delete copy[key]
      }
    }
  }

  // Clear any extra fields
  if (extraFieldsToClear) {
    for (const key of extraFieldsToClear) {
      delete copy[key]
    }
  }

  return copy as Partial<T>
}

/**
 * Validate all fields and return errors
 */
export function validateData<T>(data: T, config: any): Record<string, string> {
  const errors: Record<string, string> = {}

  config.sections.forEach((section: SectionConfig<T>) => {
    getAllFields(section).forEach((field: FieldConfig<T>) => {
      const value = getValue(data, field.key)

      // Required validation
      if (field.required && (value === null || value === undefined || value === '')) {
        errors[field.key] = `${field.label} is required`
        return
      }

      // Custom validation
      if (field.validation) {
        const error = field.validation(value, data)
        if (error) {
          errors[field.key] = error
        }
      }
    })
  })

  // Use custom validation if provided
  if (config.onValidate) {
    const customErrors = config.onValidate(data)
    Object.assign(errors, customErrors)
  }

  return errors
}
