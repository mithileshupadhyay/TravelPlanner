/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'body': ['var(--bolt-type-font-family-body)'],
        'headline': ['var(--bolt-type-font-family-headline)'],
        'accent': ['var(--bolt-type-font-family-accent)'],
        'code': ['var(--bolt-type-font-family-code)'],
      },
      fontSize: {
        'largedisplay': ['var(--bolt-type-font-size-largedisplay)', 'var(--bolt-type-line-height-tight)'],
        'display': ['var(--bolt-type-font-size-display)', 'var(--bolt-type-line-height-tight)'],
        'xxxlarge': ['var(--bolt-type-font-size-xxxlarge)', 'var(--bolt-type-line-height-tight)'],
        'xxlarge': ['var(--bolt-type-font-size-xxlarge)', 'var(--bolt-type-line-height-tight)'],
        'xlarge': ['var(--bolt-type-font-size-xlarge)', 'var(--bolt-type-line-height-tight)'],
        'large': ['var(--bolt-type-font-size-large)', 'var(--bolt-type-line-height-regular)'],
        'medium': ['var(--bolt-type-font-size-medium)', 'var(--bolt-type-line-height-regular)'],
        'small': ['var(--bolt-type-font-size-small)', 'var(--bolt-type-line-height-regular)'],
        'xsmall': ['var(--bolt-type-font-size-xsmall)', 'var(--bolt-type-line-height-regular)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
      },
      animation: {
        'bounce': 'bounce 1.5s infinite',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};