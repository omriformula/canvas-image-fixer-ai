
// Design System Tokens
export const designTokens = {
  colors: {
    background: {
      primary: '#f3f2ed', // Main background color
      card: '#ffffff',     // Card/form backgrounds
      border: '#e2e2e2',   // Input borders
    },
    text: {
      primary: '#1a1a1a',   // Main headings
      secondary: '#2d2d2d', // Labels and secondary text
    },
    button: {
      border: '#2d2d2d',
      text: '#2d2d2d',
      hover: {
        bg: '#2d2d2d',
        text: '#ffffff',
      }
    }
  },
  typography: {
    heading: {
      size: '1.25rem', // 20px
      weight: '500',
      family: "'Work_Sans', sans-serif"
    },
    label: {
      size: '0.875rem', // 14px
      weight: '500'
    },
    input: {
      size: '1rem', // 16px
      weight: '400'
    }
  },
  spacing: {
    container: {
      maxWidth: '460px',
      padding: '1.5rem' // 24px
    },
    form: {
      gap: '1rem', // 16px between form fields
    }
  },
  container: {
    maxWidth: '460px'
  },
  borderRadius: {
    card: '1.5rem', // 24px for cards
    input: '0.75rem', // 12px for inputs
    button: '2rem', // 32px for buttons
  },
  shadows: {
    card: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  }
};
