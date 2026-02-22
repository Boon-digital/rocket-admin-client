# Search Reference Field Usage

The `search-reference` field type provides a searchable dropdown for selecting references to other entities (like hotels, contacts, etc.).

## Configuration

Add a field with `type: 'search-reference'` to your entity config:

```typescript
{
  key: 'hotelId',
  label: 'Hotel',
  type: 'search-reference',
  placeholder: 'Search for a hotel...',
  gridColumn: '3 / span 2',
  searchConfig: {
    entityType: 'hotels',
    fetchFunction: searchHotels,
    displayFields: ['name', 'city', 'country'],
    valueKey: '_id.$oid', // Optional, defaults to '_id.$oid'
    searchPlaceholder: 'Search hotels by name, city, or country...',
  },
}
```

## Search Config Options

- **entityType**: String identifier for the entity type (e.g., 'hotels', 'contacts')
- **fetchFunction**: Async function that takes a search query string and returns matching entities
- **displayFields**: Array of field paths to display in the dropdown (e.g., `['name', 'city']` or `['general.firstName', 'general.lastName']`)
- **valueKey**: (Optional) The field path to use as the value. Defaults to `'_id.$oid'`
- **searchPlaceholder**: (Optional) Placeholder text for the search input

## Creating a Search Function

Your search function should:
1. Accept a search query string
2. Return an array of matching entities
3. Limit results to a reasonable number (e.g., 10-20)

Example:

```typescript
export async function searchHotels(searchQuery: string): Promise<Array<Hotel>> {
  await new Promise((resolve) => setTimeout(resolve, 150))

  if (!searchQuery || searchQuery.trim() === '') {
    return []
  }

  const searchLower = searchQuery.toLowerCase()

  return HOTEL_DATABASE.filter((hotel) => {
    const searchableFields = [
      hotel.name?.toLowerCase() || '',
      hotel.city?.toLowerCase() || '',
      hotel.country?.toLowerCase() || '',
    ]

    return searchableFields.some((field) => field.includes(searchLower))
  }).slice(0, 10)
}
```

## Features

- Debounced search (300ms) for better performance
- Loading state while fetching results
- Empty state when no results found
- Keyboard navigation support
- Automatic value clearing
- Respects `mode` ('view', 'edit', 'create') and `readOnlyInEdit` settings
- Works with nested object paths (e.g., `'general.firstName'`)

## Example Usage in Booking Config

```typescript
{
  key: 'contactId',
  label: 'Contact',
  type: 'search-reference',
  placeholder: 'Search for a contact...',
  gridColumn: '3 / span 2',
  searchConfig: {
    entityType: 'contacts',
    fetchFunction: searchContacts,
    displayFields: ['general.firstName', 'general.lastName', 'general.email'],
    searchPlaceholder: 'Search contacts by name or email...',
  },
}
```
