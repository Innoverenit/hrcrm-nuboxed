/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    

  ],
  theme: {
    extend: {
      width:{
        'w':'28%',
        'w79':'79%',
        'w58':'58%',
        'w45':'45rem',
        'w45':'45%',
        'wid9/10':'90%',
        'wk':'-webkit-fill-available',
        'w47':'47%',
        'w48':'48%',
        'w95':'98%'
            },
            fontSize:{
'xxs':'0.62rem',
'xm':'0.875rem',
'ls':'0.8rem',
'icon':'1.1rem',
'tab':'0.8rem',
'lm':'0.65rem',
            },
            colors: {
              "clr": "tomato",
              "catClr":"#40A9FF"
           
      
            },
            backgroundColor: {
              "mainclr":"#ff7158bf",
              "bgClrHoliday":"#40A9FF"
      
            },
            fontFamily: {
              'poppins': ['Poppins'],
            },
            height:{
  'hp':'382px',
  "h72":"72vh",
  "h86":"86vh",
  "lh1.2":"1.2rem"
            },
            flexGrow: {
              '3': '3'
            },
            margin:{
        'margin5':'5%',
        'gap':'0.2rem',
        'tiny':'0.1rem',
        'margin1':'1%',
        'margin3':'3%',
        'margin10':'10%',
        'margin24':'24%',
        'margin65':'65%',
        'margin8':'8%',
        'margin58':'58%',
            },
            padding:{
              'pd4':'4%',
              'ygap': '0.1rem'
            }

    },
  },
  screens: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
    
  },
  screens: {
    'max-sm': '@media not all and(min-width: 640px){ ... }',
    // => @media (min-width: 640px) { ... }

    'max-md': '@media not all and(min-width: 768px){ ... }',
    // => @media (min-width: 768px) { ... }

    'max-lg': '@media not all and(min-width: 1024px){ ... }',
    // => @media (min-width: 1024px) { ... }

    'max-xl': '@media not all and(min-width: 1280px){ ... }',
    // => @media (min-width: 1280px) { ... }

    'max-2xl': '@media not all and(min-width: 1536px){ ... }',
    // => @media (min-width: 1536px) { ... }
  
  },
  plugins: [],
}