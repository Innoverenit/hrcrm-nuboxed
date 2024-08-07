// import React, { useState, useEffect } from 'react';
// import translateText from './TranslateService';



// // function TranslationPage(onChange) {
//     function LanguageSelector({ onLanguageChange }) {


//   const [content, setContent] = useState('Hello World'); // Replace with your actual content
//   const [translatedContent, setTranslatedContent] = useState('');
//   const [sourceLanguage, setSourceLanguage] = useState('');
//   const [targetLanguage, setTargetLanguage] = useState('');
//   const [languages, setLanguages] = useState([]);
// //   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [languageOptions, setLanguageOptions] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState('');

//   const [menuItems, setMenuItems] = useState([]); // Updated menu items


//   useEffect(() => {
//     fetchLanguages();
//   }, []);

//   console.log(languages)


//   useEffect(() => {
//     if (sourceLanguage && targetLanguage) {
//       translateContent();
//     }
//   }, [sourceLanguage, targetLanguage]);

//   const fetchLanguages = async () => {
//     const API_KEY = 'AIzaSyAQdQZU6zRL9w32DH2_9al-kkXnK38fnJY';
//     const response = await fetch(
//       `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}`
//     );
//     const data = await response.json();
//     if (data && data.data && data.data.languages && data.data.languages.length > 0) {
//       setLanguages(data.data.languages);
//       setSourceLanguage(data.data.languages[0].language);
//       setTargetLanguage(data.data.languages[1].language);
//       setSelectedLanguage(data.data.languages);

//     }

//   };



//   const translateContent = async () => {
//     try {
//       const translatedText = await translateText(content, sourceLanguage, targetLanguage);
//       setTranslatedContent(translatedText);
//     } catch (error) {
//       console.error('Translation error:', error);
//     }
//   };

//   const handleSourceLanguageChange = (e) => {
//     setSourceLanguage(e.target.value);
//   };

//   const handleLanguageChange = (event) => {
//     const language = event.target.value;
//     setSelectedLanguage(language);
//     onLanguageChange(language);
//   };



//   const handleTargetLanguageChange = (e) => {
//     setTargetLanguage(e.target.value);
//   };
//   console.log(languages)

//   const translateMenuItems = async () => {
//     try {
//       const translatedItems = await Promise.all(
//         menuItems.map(async (item) => {
//           const translatedItem = await translateText(item.label, 'en', selectedLanguage);
//           return {
//             ...item,
//             label: translatedItem,
//           };
//         })
//       );

//       setMenuItems(translatedItems);
//     } catch (error) {
//       console.error('Menu translation error:', error);
//     }
//   };

//   useEffect(() => {
//     translateMenuItems(); // Initial translation of menu items
//   }, [selectedLanguage]);


//   return (
//     <div>
//       {/* <div>
//         <label htmlFor="sourceLanguage">Source Language: </label>
//         <select id="sourceLanguage" value={sourceLanguage} onChange={handleSourceLanguageChange}>
//           {languages.map((lang) => (

//             <option key={lang.language} value={lang.language}>
//               {lang.language}
//             </option>
//           ))}
//         </select>
//       </div> */}
//       <div>
//         {/* <label htmlFor="targetLanguage">Target Language: </label>
//         <select id="targetLanguage" value={targetLanguage} onChange={handleTargetLanguageChange}>
//           {languages.map((lang) => (
//             <option key={lang.language} value={lang.language}>
//               {lang.language}
//             </option>
//           ))}
//         </select> */}
//           <select value={selectedLanguage} onChange={handleLanguageChange}>
//         {languages.map((lang) => (
//           <option key={lang.language} value={lang.language}>
//             {lang.language}
//           </option>
//         ))}
//       </select>
//       </div>



//     </div>
//   );
// }

// export default LanguageSelector;

import React, { useState, useEffect } from 'react';
import { getSupportedLanguages } from './TranslateService';
// import { getName } from 'iso-639-1';

function LanguageSelector({ onLanguageChange,supportedLanguages,selectedLanguage,setSelectedLanguage }) {
//   const [supportedLanguages, setSupportedLanguages] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState('');
  console.log(supportedLanguages)

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const languages = await getSupportedLanguages();
        console.log(languages)
        // setSupportedLanguages(languages);
        // setSelectedLanguage(languages[0]?.code);
      } catch (error) {
        console.error('Error fetching supported languages:', error);
      }
    }

    fetchLanguages();
  }, []);

  // const handleLanguageChange = (event) => {
  //   const language = event.target.value;
  //   setSelectedLanguage(language);
  //   onLanguageChange(language);
  // };
  console.log("selectedLanguage",selectedLanguage)

  return (
    <div>
      <select class="notranslate w-14" value={selectedLanguage} onChange={onLanguageChange}>
      
        <option value="English">EN</option>
        <option value="Dutch">NL</option>
        <option value="German">DE</option>
        <option value="French">FR</option>
        <option value="Spanish">ES</option>
        <option value="Italian">IT</option>
        <option value="Polish">PL</option>
        <option value="Arabic">عربي</option>
        <option value="Hindi">हिंदी</option>
        
      </select>
    </div>
  );
}

export default LanguageSelector;
