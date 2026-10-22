/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                blush: {
                    50: '#fff5f7',
                    100: '#ffe4e9',
                    200: '#fecdd6',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                },
                cream: {
                    50: '#fffdfa',
                    100: '#fff8f0',
                    200: '#ffeedd',
                    300: '#ffe0c2',
                },
                rosewood: {
                    800: '#58212c',
                    900: '#3d141d',
                }
            },
            fontFamily: {
                sans: ['Comfortaa', 'Inter', 'system-ui', 'sans-serif'],
            }
        }
    }
}
