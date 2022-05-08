module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
            },
        },
    },
    daisyui: {
        themes: [
            {
                dark: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=dark]"
                    ],
                    primary: "#DA0037",
                    neutral: "#171717",
                    "base-100": "#292524",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
