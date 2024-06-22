import React, { useEffect, useState, } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getLangWords} from "../../SettingsAction";
import AddWords from "./AddWords";
import { MainWrapper } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";


function WordsCard(props) {

  const [words, setwords] = useState([{ english: "", dutch:"",value: "", wordsId: 1 }]);
  const [wordsId, setwordsId] = useState(1);

  function handleChangeWords(e) {
    e.persist();
    setwords((v) => {
      return v.map((d) => {
        if (`${d.wordsId}_name` === e.target.name) {
          return { ...d, english: e.target.value };
        } 
        if (`${d.wordsId}_name` === e.target.name) {
          return { ...d, dutch: e.target.value };
        }
        else {
          return d;
        }
      });
    });
  }

  function handleDeleteWords(item) {
    setwords((v) => v.filter((d) => d.wordsId !== item.wordsId));
  }

  function handleAddWordsClick() {
    setwordsId((v) => v + 1);
    setwords((v) => [...v, { english: "", dutch:"",value: "", wordsId: wordsId + 1 }]);
  }
  useEffect(() => {
     props.getLangWords();
  },[]);

  const languages = Object.keys(props.langWords[0] || {});
  const newLanguages = languages.slice(1);

  if(props.fetchingLangWords) {
    return <BundleLoader/>
  };

    return (
        <>
            <MainWrapper>
            <AddWords 
handleChangeWords={handleChangeWords}
handleAddWordsClick={handleAddWordsClick}
handleDeleteWords={handleDeleteWords}
words={words}
/>
            </MainWrapper>

            <div className="cwrapper" style={{ height: "80vh", overflowY: "auto" }}>
        {props.langWords.map((translations, index) => {
        
          return (
            
            <div key={index} className="w-full my-2 h-16 scale-98 hover:scale-100 ease-in duration-100 scroll-overflow ">
              <div className={`bg-white rounded-md shadow border-solid w-w95 h-16 p-1 max-sm:h-28 m-0 md:m-auto`}>
                <div className="flex max-sm:flex-col md:flex flex-row justify-around ">
                  <div className="w-full md:flex flex-col justify-center mb-auto">
                    <div className="flex justify-evenly">
                      {newLanguages.map((language) => (
                         language !== 'id' && (
                        <div className="Ccard__title w-40 grid" key={language}>
                          
                            <label className="text-black-700 text-xs">
                              {language}
                            </label>
                          
                          {/* {editingIndex === index ? (
                            <div>
                              {translations.baseLanguage === language ? (
                                <input
                                  type="text"
                                  style={{border:"2px solid black"}}
                                  value={inputValues[index][language]}
                                  onChange={(e) => handleInputChange(index, language, e.target.value)}
                                  disabled
                                />
                              ) : (
                                <input
                                  type="text"
                                  style={{border:"2px solid black"}}
                                  value={inputValues[index][language]}
                                  onChange={(e) => handleInputChange(index, language, e.target.value)}
                                />
                              )}
                            </div>
                          ) : (
                            <label className={`text-gray-600 text-xs ${translations.baseLanguage === language ? 'green-text' : ''}`}>
                              {translations[language]}
                            </label>
                          )} */}
                           <label className={`text-gray-600 text-xs ${translations.baseLanguage === language ? 'green-text' : ''}`}>
                              {translations[language]}
                            </label>
                        </div>
                         )
                      ))}
                      {/* <div class=" flex justify-between">
                        {editingIndex === index ? (
                          <>
                            <button onClick={() => handleSaveEdit(index)}>Save</button>
                            &nbsp;&nbsp;
                            <button onClick={handleCancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handleEdit(index)}>
                            <BorderColorIcon style={{fontSize:"1rem"}} />
                          </button>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

        </>
    );
}

const mapStateToProps = ({ settings}) => ({
  langWords:settings.langWords,
  fetchingLangWords:settings.fetchingLangWords,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getLangWords
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordsCard);