/** @type {import('tailwindcss').Config} */
// Design tokens for the "Modern Editorial + Warm Feminine" look.
// Use these names in components (bg-plum, text-berry, ...) - avoid raw hex values.
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                plum: '#572D43',   // deep plum: headings, dark sections, footer
                berry: '#A64F68',  // muted berry: primary buttons, accents, one colored section
                rose: '#E8B9C3',   // dusty rose: highlights, shapes, accents on plum
                ivory: '#FAF5F2',  // warm ivory: light surfaces / page background
                ink: '#30252B',    // dark text (use /75 opacity for secondary text)
            },
            fontFamily: {
                // Latin first, then an Armenian-capable Noto face, then system fallbacks.
                sans: ['Inter', '"Noto Sans Armenian"', 'system-ui', 'sans-serif'],
                serif: ['"Noto Serif"', '"Noto Serif Armenian"', 'Georgia', 'serif'],
            },
        },
    },
}
