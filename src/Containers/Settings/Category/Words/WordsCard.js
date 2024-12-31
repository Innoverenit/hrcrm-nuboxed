import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  Input} from "antd";
import { getLangWords,updateWords ,searchWordsName} from "../../SettingsAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function WordsCard(props) {
  const [currentData, setCurrentData] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    props.getLangWords(props.orgId);
  }, []);

  // Get languages, excluding only 'creationDate'
  const languages = Object.keys(props.langWords[0] || {}).filter(
    (key) => key !== "creationDate" && key !== "id"
  );

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedValues(props.langWords[index]);
  };

  const handleChange = (language, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [language]: value,
    }));
  };


  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchWordsName(currentData,props.orgId);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleSave = (index) => {
    // Log the respective values including 'id'
    console.log(editedValues);
    props.updateWords(editedValues,editedValues.id,props.orgId)

    // Dispatch an action to save the updated values if needed
    // props.updateLangWords(index, editedValues);

    setEditingIndex(null);
  };


  const handleChangeSearch = (e) => {
    setCurrentData(e.target.value.trim());
  

    if (e.target.value.trim() === "") {
    //   setPage(pageNo + 1);
    props.getLangWords(props.orgId);
    //   props.ClearReducerDataOfLoad()
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedValues({});
  };

  if (props.fetchingLangWords) {
    return <BundleLoader />;
  }

  return (
    <div className="cwrapper" style={{ height: "89vh", overflowY: "auto" }}>
         <div class=" flex  mt-12" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
          onPressEnter={handleSearch}  
            onChange={handleChangeSearch}
            // value={currentData}
          />
            </div>
      {props.langWords.map((translations, index) => {
        const isEditing = editingIndex === index;

        return (
          <div
            key={index}
            className="w-full my-2 h-16 scale-98 hover:scale-100 ease-in duration-100 scroll-overflow "
          >
                <div class=" flex flex-row justify-between">
           

              
           
            </div>
            <div
              className={`bg-white rounded-md w-w95 h-16 p-1 max-sm:h-28 md:m-auto scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]`}
              style={{width:"75em"}}
            >
              <div className="flex max-sm:flex-col md:flex flex-row justify-around">
                <div className="w-full md:flex flex-col justify-center mb-auto">
                  <div className="flex justify-evenly">
                    {/* Display the ID */}
                    <div className="Ccard__title w-40 grid" >
                      <div className="text-black-700 text-xs">ID</div>
                      <div className="text-gray-600 text-xs">
                        {translations.id}
                      </div>
                    </div>

                    {/* Display and edit other language fields */}
                    {languages.map((language) => (
                      <div className="Ccard__title w-40 grid" key={language}>
                        <div className="text-black-700 text-xs">
                          {language}
                        </div>

                        <div className="text-gray-600 text-xs">
                        {isEditing ? (
                            <input
                            style={{border:"2px solid black"}}
                              type="text"
                              value={editedValues[language] || ""}
                              onChange={(e) =>
                                handleChange(language, e.target.value)
                              }
                            />
                          ) : (
                            translations[language]
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center ml-[-57px] ">
                  {isEditing ? (
                    <>
                      <button onClick={() => handleSave(index)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <BorderColorIcon className=" !text-icon cursor-pointer text-[tomato]"
                      onClick={() => handleEdit(index)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = ({ settings,auth }) => ({
  langWords: settings.langWords,
  fetchingLangWords: settings.fetchingLangWords,
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLangWords,
      updateWords,
      searchWordsName
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WordsCard);


