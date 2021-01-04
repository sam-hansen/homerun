module.exports = {
	purge: ["./src/pages/**/*.ts", "./src/pages/**/*.tsx", "./src/components/**/*.ts", "./src/components/**/*.tsx"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		colors: {
			transparent: "transparent",
			white: "#FFF",
			black: "#000",
			background: "var(--hr-background, #FFF)",
			accent: {
				1: "var(--hr-accent-1, #F7FAFC)",
				2: "var(--hr-accent-2, #EDF2F7)",
				3: "var(--hr-accent-3, #E2E8F0)",
				4: "var(--hr-accent-4, #CBD5E0)",
				5: "var(--hr-accent-5, #A0AEC0)",
				6: "var(--hr-accent-6, #718096)",
				7: "var(--hr-accent-7, #4A5568)",
				8: "var(--hr-accent-8, #2D3748)",
				9: "var(--hr-accent-9, #1A202C)",
			},
			foreground: "var(--hr-foreground, #000)",

			primary: {
				DEFAULT: "#EB1741",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
