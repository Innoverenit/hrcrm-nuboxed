import React, {useEffect } from 'react';


function LanguageSelector({ onLanguageChange,supportedLanguages,selectedLanguage,setSelectedLanguage,getSupportLanguages }) {

  console.log(supportedLanguages)

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const languages = await getSupportLanguages();
        console.log(languages)
      } catch (error) {
        console.error('Error fetching supported languages:', error);
      }
    }

    fetchLanguages();
  }, []);

  console.log("selectedLanguage",selectedLanguage)

  return (
    <div>
      <select class=" rounded notranslate w-18 box-border bg-white p-2 border-2 border-gray-200 " value={selectedLanguage} onChange={onLanguageChange}>
    
        <option value="English">English</option>
        <option value="Dutch">Nederlands</option>
        <option value="German">Deutsch</option>
        <option value="French">Français</option>
        <option value="Spanish">Español</option>
        <option value="Italian">Italiano</option>
        <option value="Polish">Polski</option>
        <option value="Arabic">عربي</option>
        <option value="Hindi">हिंदी</option>
        <option value="Chinese">中国人</option>
        <option value="Turkish">Türkçe</option>
        <option value="Bangla">বাংলা</option>
        <option value="Bangla"> গুরুমুখী</option>
        <option value="Odia">ଓଡିଆ</option>
       
        
      </select>
    </div>
  );
}

export default LanguageSelector;
