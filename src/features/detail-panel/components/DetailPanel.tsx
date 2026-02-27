import { useEffect, useImperativeHandle, useState, forwardRef } from 'react'
import type { Ref } from 'react'
import { X, PencilSimple, FloppyDisk, Plus, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { DetailPanelHandle, DetailPanelProps, PanelMode } from '../types'
import { isFieldGroup } from '../types'
import { generateDefaultData, getValue, isFieldVisible, setValue, validateData } from '../utils'
import { FieldRenderer } from '../fields'

export const DetailPanel = forwardRef(function DetailPanel<T>({
  isOpen,
  onClose,
  data,
  mode: initialMode,
  config,
  onSave,
  onDelete,
  defaultMode = 'view',
  allowModeSwitch = true,
  cancelClosesPanel = false,
}: DetailPanelProps<T>, ref: Ref<DetailPanelHandle>) {
  // Determine initial mode
  const getInitialMode = (): PanelMode => {
    if (initialMode) return initialMode
    if (!data) return 'create'
    return defaultMode
  }

  const [mode, setMode] = useState<PanelMode>(getInitialMode())
  const [formData, setFormData] = useState<any>(data || generateDefaultData<T>(config))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form data when data prop changes
  useEffect(() => {
    if (data) {
      setFormData(data)
      setMode(initialMode || defaultMode)
      setIsDirty(false)
    } else {
      setFormData(generateDefaultData<T>(config))
      setMode('create')
      setIsDirty(false)
    }
    setErrors({})
  }, [data, isOpen, config, initialMode, defaultMode])

  // Get title based on mode
  const getTitle = () => {
    if (config.titles) {
      if (mode === 'create' && config.titles.create) return config.titles.create
      if (mode === 'edit' && config.titles.edit) return config.titles.edit
      if (mode === 'view' && config.titles.view) return config.titles.view
    }

    if (mode === 'create') return `New ${config.title}`
    if (mode === 'edit') return `Edit ${config.title}`
    return config.title
  }

  // Handle field change
  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => setValue(prev, key, value))
    setIsDirty(true)

    // Clear error for this field
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }

  // Handle save
  const handleSave = async () => {
    // Validate
    const validationErrors = validateData(formData, config)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix validation errors')
      return
    }

    setIsSubmitting(true)
    try {
      const isNew = mode === 'create'

      if (config.onSave) {
        await config.onSave(formData, mode as 'create' | 'edit')
      } else if (onSave) {
        await onSave(formData, isNew)
      }

      toast.success(isNew ? 'Created successfully' : 'Saved successfully')
      setIsDirty(false)
      setMode('view')
    } catch (error) {
      toast.error('Failed to save: ' + (error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle request save (returns true if save succeeded)
  const handleRequestSave = async (): Promise<boolean> => {
    const validationErrors = validateData(formData, config)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix validation errors')
      return false
    }

    setIsSubmitting(true)
    try {
      const isNew = mode === 'create'
      if (config.onSave) {
        await config.onSave(formData, mode as 'create' | 'edit')
      } else if (onSave) {
        await onSave(formData, isNew)
      }
      toast.success('Saved successfully')
      setIsDirty(false)
      return true
    } catch (error) {
      toast.error('Failed to save: ' + (error as Error).message)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit mode
  const handleEdit = () => {
    if (config.canEdit === false) {
      toast.error('Editing is not allowed')
      return
    }
    setMode('edit')
  }

  // Handle cancel
  const handleCancel = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        if (mode === 'create' || cancelClosesPanel) {
          onClose()
        } else {
          setFormData(data)
          setMode('view')
          setIsDirty(false)
          setErrors({})
        }
      }
    } else {
      if (mode === 'create' || cancelClosesPanel) {
        onClose()
      } else {
        setMode('view')
      }
    }
  }

  // Handle close
  const handleClose = () => {
    if (isDirty) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  // Expose requestClose via ref so parent (e.g., EntityModal backdrop) can trigger the dirty-check close
  useImperativeHandle(ref, () => ({
    requestClose: handleClose,
  }), [handleClose])

  // Grid configuration for content
  const gridColumns = config.gridColumns || 8 // Default to 8 columns
  const columnWidth = 90 // Each grid column is 90px

  return (
    <div
      className={`
        h-dvh bg-background overflow-y-auto border-l shrink-0
        transition-[max-width] duration-[400ms] ease-[cubic-bezier(0.4,0,0.6,1)]
        ${isOpen ? '' : 'border-0 overflow-hidden'}
      `}
      style={{
        maxWidth: isOpen ? `${gridColumns * columnWidth + (gridColumns - 1) * 12 + 48}px` : '0px',
        width: 'fit-content',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background ">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-semibold">{getTitle()}</h2>
          <div className="flex items-center gap-2">
            {mode === 'view' && allowModeSwitch && config.canEdit !== false && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <PencilSimple className="h-4 w-4 mr-2" weight="light" />
                Edit
              </Button>
            )}
            {mode === 'view' && onDelete && config.canDelete !== false && data && (
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => onDelete(formData)}>
                <Trash className="h-4 w-4" weight="light" />
              </Button>
            )}
            {(mode === 'edit' || mode === 'create') && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      {mode === 'create' ? (
                        <>
                          <Plus className="h-4 w-4 mr-2" weight="light" />
                          Create
                        </>
                      ) : (
                        <>
                          <FloppyDisk className="h-4 w-4 mr-2" weight="light" />
                          Save
                        </>
                      )}
                    </>
                  )}
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" weight="light" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content - Simple Grid System */}
      <div className="p-6">
        {config.sections.map((section, sectionIdx) =>
          section.rows ? (
            // Row-based layout
            <div key={sectionIdx} className="flex flex-col gap-6">
              {section.label && (
                <h3 className="text-sm font-medium text-muted-foreground">{section.label}</h3>
              )}
              {section.rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="grid gap-y-6 gap-x-3"
                  style={{
                    gridTemplateColumns: `repeat(${gridColumns}, ${columnWidth}px)`,
                  }}
                >
                  {row.items.map((item) => {
                    if (isFieldGroup(item)) {
                      const visibleFields = item.fields.filter((f) =>
                        isFieldVisible(f, mode, formData),
                      )
                      if (visibleFields.length === 0) return null
                      const innerColumns = item.columns || visibleFields.length
                      return (
                        <div
                          key={`group-${visibleFields.map((f) => f.key).join('-')}`}
                          style={{
                            gridColumn: item.gridColumn || 'span 1',
                            gridRow: item.gridRow,
                            minWidth: 0,
                          }}
                        >
                          {item.label && (
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              {item.label}
                            </p>
                          )}
                          <div className="rounded-md border p-3">
                            <div
                              className="grid gap-4"
                              style={{
                                gridTemplateColumns: `repeat(${innerColumns}, 1fr)`,
                              }}
                            >
                              {visibleFields.map((field) => (
                                <div key={field.key} style={{ gridColumn: field.gridColumn, gridRow: field.gridRow, minWidth: 0 }}>
                                  <FieldRenderer
                                    field={field}
                                    value={getValue(formData, field.key)}
                                    onChange={(value) => handleFieldChange(field.key, value)}
                                    mode={mode}
                                    error={errors[field.key]}
                                    allData={formData}
                                    onRequestSave={handleRequestSave}
                                    isDirty={isDirty}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    }

                    // Regular field in a row
                    if (!isFieldVisible(item, mode, formData)) return null
                    return (
                      <div
                        key={item.key}
                        style={{
                          gridColumn: item.gridColumn || 'span 1',
                          gridRow: item.gridRow,
                          minWidth: 0,
                        }}
                      >
                        <FieldRenderer
                          field={item}
                          value={getValue(formData, item.key)}
                          onChange={(value) => handleFieldChange(item.key, value)}
                          mode={mode}
                          error={errors[item.key]}
                          allData={formData}
                          onRequestSave={handleRequestSave}
                          isDirty={isDirty}
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          ) : section.fields ? (
            // Legacy flat fields layout (backwards compat)
            <div
              key={sectionIdx}
              className="grid gap-y-6 gap-x-3"
              style={{
                gridTemplateColumns: `repeat(${gridColumns}, ${columnWidth}px)`,
              }}
            >
              {section.label && (
                <h3
                  className="text-sm font-medium text-muted-foreground"
                  style={{ gridColumn: `1 / -1` }}
                >
                  {section.label}
                </h3>
              )}
              {section.fields
                .filter((field) => isFieldVisible(field, mode, formData))
                .map((field) => (
                  <div
                    key={field.key}
                    style={{
                      gridColumn: field.gridColumn || 'span 1',
                      gridRow: field.gridRow,
                      minWidth: 0,
                    }}
                  >
                    <FieldRenderer
                      field={field}
                      value={getValue(formData, field.key)}
                      onChange={(value) => handleFieldChange(field.key, value)}
                      mode={mode}
                      error={errors[field.key]}
                      allData={formData}
                      onRequestSave={handleRequestSave}
                      isDirty={isDirty}
                    />
                  </div>
                ))}
            </div>
          ) : null,
        )}
      </div>


    </div>
  )
}) as <T>(props: DetailPanelProps<T> & { ref?: Ref<DetailPanelHandle> }) => React.ReactElement | null
