/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '600' }],
                xl: ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.03em', fontWeight: '700' }],
                '2xl': ['2rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '700' }],
                '3xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '800' }],
                '4xl': ['4rem', { lineHeight: '1.1', letterSpacing: '0.04em', fontWeight: '800' }],
                '5xl': ['5rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '900' }],
                '6xl': ['6rem', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '900' }],
                '7xl': ['7rem', { lineHeight: '1.0', letterSpacing: '0.06em', fontWeight: '900' }],
                '8xl': ['8rem', { lineHeight: '1.0', letterSpacing: '0.06em', fontWeight: '900' }],
                '9xl': ['9rem', { lineHeight: '1.0', letterSpacing: '0.07em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "league spartan",
                paragraph: "open sans"
            },
            colors: {
                foreground: '#9B7FFF',
                destructive: '#DF3131',
                destructiveforeground: '#FFFFFF',
                background: '#000000',
                secondary: '#9B7FFF',
                'secondary-foreground': '#000000',
                'primary-foreground': '#000000',
                primary: '#8AFF00'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
