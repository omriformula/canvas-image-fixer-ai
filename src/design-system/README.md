
# Design System Usage Guide

This design system extracts the exact look and feel from your payment offer form and makes it reusable across your entire platform.

## Quick Start

```tsx
import {
  PageContainer,
  FormCard,
  FormField,
  StyledInput,
  StyledSelect,
  StyledButton,
  StyledForm
} from '@/design-system';

function MyPage() {
  return (
    <PageContainer>
      <FormCard 
        title="My Form Title"
        heroImage="/path/to/image.png"
      >
        <StyledForm onSubmit={handleSubmit}>
          <FormField label="Name" htmlFor="name">
            <StyledInput 
              id="name"
              placeholder="Enter your name"
            />
          </FormField>
          
          <FormField label="Category">
            <StyledSelect
              placeholder="Select category"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' }
              ]}
            />
          </FormField>
          
          <StyledButton type="submit">
            Submit
          </StyledButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
}
```

## Components

### PageContainer
- Provides the cream background (#f3f2ed)
- Centers content with max-width 460px
- Adds consistent padding

### FormCard
- White card with rounded corners
- Optional hero image with 16:9 aspect ratio
- Drop shadow and proper spacing
- Optional title with Work Sans font

### FormField
- Consistent label styling
- Proper spacing between label and input

### StyledInput
- Matches exact input styling from payment form
- Rounded corners, proper padding, border colors

### StyledSelect
- Consistent dropdown styling
- Matches input appearance

### StyledButton
- Transparent background with dark border
- Hover effect (dark background, white text)
- Rounded pill shape

### StyledForm
- Proper spacing between form elements
- Flex layout for consistency

## Design Tokens

All colors, fonts, spacing, and other design decisions are centralized in `tokens.ts`:

- **Colors**: Background (#f3f2ed), Card (#ffffff), Text (#1a1a1a, #2d2d2d)
- **Typography**: Work Sans font, consistent sizing
- **Spacing**: 460px max width, 24px padding, 16px form gaps
- **Border Radius**: 24px cards, 12px inputs, 32px buttons

## For Dev Teams

1. Copy the entire `src/design-system` folder to your project
2. Install dependencies: `@radix-ui/react-select`, `class-variance-authority`, `tailwindcss`
3. Import components as needed
4. All styling is handled automatically - no custom CSS needed

## Customization

To modify the design system:
1. Update `tokens.ts` for global changes
2. Modify individual components for specific adjustments
3. All changes propagate automatically across your app
