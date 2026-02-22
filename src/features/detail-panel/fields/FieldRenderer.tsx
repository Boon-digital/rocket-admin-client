import type { FieldRendererProps } from '../types'
import { TextField } from './TextField'
import { TextareaField } from './TextareaField'
import { SelectField } from './SelectField'
import { CheckboxField } from './CheckboxField'
import { DateField } from './DateField'
import { ArrayField } from './ArrayField'
import { ReferenceTableField } from './ReferenceTableField'
import { SearchReferenceField } from './SearchReferenceField'
import { CurrencyField } from './CurrencyField'
import { InverseReferenceField } from './InverseReferenceField'
import { TagInputField } from './TagInputField'
import { FileUploadField } from './FileUploadField'
import { DependentSelectField } from './DependentSelectField'
import { MultiSearchReferenceField } from './MultiSearchReferenceField'
import { PasswordField } from './PasswordField'

export function FieldRenderer(props: FieldRendererProps) {
  const { field } = props

  // Use custom component if provided
  if (field.component) {
    const CustomComponent = field.component
    return <CustomComponent {...props} />
  }

  // Route to appropriate field component based on type
  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
      return <TextField {...props} />

    case 'textarea':
      return <TextareaField {...props} />

    case 'select':
      return <SelectField {...props} />

    case 'checkbox':
      return <CheckboxField {...props} />

    case 'date':
    case 'datetime':
      return <DateField {...props} />

    case 'array':
      return <ArrayField {...props} />

    case 'reference-table':
      return <ReferenceTableField {...props} />

    case 'search-reference':
      return <SearchReferenceField {...props} />

    case 'multi-search-reference':
      return <MultiSearchReferenceField {...props} />

    case 'inverse-reference':
      return <InverseReferenceField {...props} />

    case 'currency':
      return <CurrencyField {...props} />

    case 'tag-input':
      return <TagInputField {...props} />

    case 'file-upload':
      return <FileUploadField {...props} />

    case 'dependent-select':
      return <DependentSelectField {...props} />

    case 'password':
      return <PasswordField {...props} />

    case 'nested':
      // TODO: Implement nested object rendering
      return <div>Nested fields not yet implemented</div>

    case 'custom':
      return <div>Custom component not provided</div>

    default:
      return <TextField {...props} />
  }
}
