/** @type {import('tailwindcss').Config} */
export default {
	content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			 colors: {
				primary: "#FF006E",        // ✅ SIN punto y coma
				secondary: "#398AFF",
				tertiary:"#7B828C",
				bg_primary:"#EDF4FC",
				bg_secondary:"#C0CFE6"
			},
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
				figtree: ['Figtree', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			borderRadius: {
				'custom-br555': '555px',
			},
			screens: {
				sm: '440px',
				md: '768px',
				lg: '992px',
			},
		},
	},
	plugins: [],
};
