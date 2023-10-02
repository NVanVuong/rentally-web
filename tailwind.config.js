export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors:{
                primary: 'rgba(29, 88, 104, 1)',
                secondary1: '#E36414',
                secondaryBlack: '#1D2433',
                bgColor: 'rgba(29, 88, 104, 0.7)'

            },
            boxShadow: {
                '3xl': '0px 0px 40px 40px rgba(29, 88, 104, 0.4)',
              }

        }
    },
    plugins: []
}
