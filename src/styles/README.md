# SCSS 7-1 Architecture

This project follows the **7-1 pattern** for organizing SCSS files, a popular architecture pattern that helps keep stylesheets organized and maintainable.

## Folder Structure

```
styles/
│
├── abstracts/
│   ├── _functions.scss    # SCSS functions
│   ├── _mixins.scss        # SCSS mixins
│   └── _variables.scss     # Variables and CSS custom properties
│
├── base/
│   ├── _reset.scss         # Reset/normalize styles
│   └── _typography.scss    # Typography rules
│
├── components/
│   └── _buttons.scss       # Button components (shadcn and custom)
│
├── layout/
│   ├── _header.scss        # Header styles
│   ├── _footer.scss        # Footer styles
│   └── _sidebar.scss       # Sidebar styles
│
├── pages/
│   └── _home.scss          # Home page specific styles
│
├── themes/
│   └── _dark.scss          # Dark theme overrides
│
├── vendors/
│   └── _index.scss         # Third-party imports (Tailwind CSS)
│
└── main.scss               # Main entry point (imports all partials)
```

## The 7 Folders

### 1. `abstracts/`
**Purpose**: SCSS tools and helpers
**Contents**: Variables, functions, mixins, placeholders
**Note**: No CSS output - these are just helpers

**Example usage**:
```scss
// In your component file
@use '../abstracts/variables' as *;
@use '../abstracts/mixins' as *;

.my-component {
  @include flex-center;
  font-family: $font-family-sans;
}
```

### 2. `base/`
**Purpose**: Boilerplate code and base styles
**Contents**: Resets, typography, base element styles

**What goes here**: Styles for bare HTML elements (no classes)

### 3. `components/`
**Purpose**: Reusable component styles
**Contents**: Buttons, cards, forms, modals, etc.

**shadcn components** will add their styles here automatically when installed.

### 4. `layout/`
**Purpose**: Macro-level layout styles
**Contents**: Header, footer, navigation, sidebar, grid system

**What goes here**: Styles for major structural elements

### 5. `pages/`
**Purpose**: Page-specific styles
**Contents**: Styles that are used only on specific pages

**Example**: Homepage hero, about page layout, etc.

### 6. `themes/`
**Purpose**: Theme variations
**Contents**: Different color schemes, dark mode overrides

**Note**: Basic theming is handled via CSS variables in `abstracts/_variables.scss`

### 7. `vendors/`
**Purpose**: Third-party library styles
**Contents**: Tailwind CSS import, other CSS libraries

**Important**: Keep vendor code separate for easy updates

## The `main.scss` File

The main entry point that imports all partials in the correct order:

```scss
// 1. Vendors (Tailwind, etc.)
@import 'vendors/index';

// 2. Abstracts (no CSS output)
@import 'abstracts/functions';
@import 'abstracts/variables';
@import 'abstracts/mixins';

// 3. Base styles
@import 'base/reset';
@import 'base/typography';

// 4. Layout
@import 'layout/...';

// 5. Components
@import 'components/...';

// 6. Pages
@import 'pages/...';

// 7. Themes
@import 'themes/...';
```

## Best Practices

### Naming Convention
- Use **partial files** (prefix with `_`) for all SCSS files except `main.scss`
- Use **kebab-case** for file names: `_my-component.scss`
- One component per file when possible

### Import Order
The order in `main.scss` matters:
1. **Vendors first** - Load external dependencies
2. **Abstracts** - Define tools (no CSS output)
3. **Base** - Set global defaults
4. **Layout** - Define structure
5. **Components** - Style individual components
6. **Pages** - Add page-specific styles
7. **Themes** - Apply theme variations last

### When to Create New Files

**Create a new file when**:
- A component is used in multiple places
- Styles exceed ~50-100 lines
- Logic can be isolated

**Keep in existing file when**:
- Styles are unique to one location
- Very small snippets (<20 lines)
- Tightly coupled to parent component

### Working with Tailwind

Since we're using Tailwind CSS with SCSS:
- Use `@apply` for Tailwind utilities in SCSS
- Keep Tailwind in `vendors/_index.scss`
- Use SCSS for complex custom styles
- Prefer Tailwind utilities in JSX when possible

### Example Component Style

```scss
// components/_card.scss
.custom-card {
  @apply rounded-lg shadow-md;

  // Custom styles beyond Tailwind
  background: linear-gradient(to bottom, hsl(var(--card)), hsl(var(--muted)));

  &__title {
    @apply text-2xl font-bold;
    margin-bottom: 1rem;
  }

  &__content {
    padding: 1.5rem;
  }

  // Responsive with SCSS mixin
  @include respond-to('md') {
    &__content {
      padding: 2rem;
    }
  }
}
```

## Tips

1. **Use variables** from `abstracts/_variables.scss` for consistency
2. **Create mixins** for repeated patterns
3. **Keep specificity low** - avoid deep nesting (max 3-4 levels)
4. **Comment your code** - Especially complex calculations or hacks
5. **Stay organized** - When a file gets too large, split it up

## Adding shadcn Components

When you add shadcn components, they may add CSS. Place any custom overrides in:
- `components/_buttons.scss` - For button variants
- `components/_[component-name].scss` - For specific components

## Resources

- [Sass Guidelines - 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
