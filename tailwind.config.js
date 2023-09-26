/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    screens:{
      'sm' : {min:'390px',max:'768px'},
      'md' : {min:'769px',max:'1024px'},
      'lg' : {min:'1025px'}
    },
    extend:{
      fontFamily:{
        'Pretendard':['Pretendard']
      }
    }
  },
  plugins: [],
}

