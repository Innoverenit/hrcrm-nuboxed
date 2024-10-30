import React , {useEffect, useState, lazy} from "react";

const DataRoomProspectActionLeft= lazy(() =>import("./DataRoomProspectActionLeft"));

 const DataRoomProspectActionRight=lazy(() =>import("./DataRoomProspectActionRight"));


function DataRoomProspectCard (props) {

    // const [rules, setRules] = useState(name);
    // const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]); 
    
    
    // const handleRuleClick = (item) => {
    //   setCurrentRulesOpen(item);  
    // };
    return(
        <>
       <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[22%]" >
                  <DataRoomProspectActionLeft
                   selectedPropsectSource={props.selectedPropsectSource}
                      selectedPersonData={props.selectedPersonData}
                  handleCardProspectSourceClick={props.handleCardProspectSourceClick}
                          handleCardProspectSectorClick={props.handleCardProspectSectorClick}
                          selectedPropsectSector={props.selectedPropsectSector}
                          setSelectedProspectSector={props.setSelectedProspectSector}
                  setSelectedButtonTab={props.setSelectedButtonTab}
                  selectedButtonTab={props.selectedButtonTab}
                   selectedPerson={props.selectedPerson}
                   handleCardClick={props.handleCardClick}
                   setSelectedPerson={props.setSelectedPerson}
                    // handleRuleClick={handleRuleClick}
                    // rules={rules}
                    // currentRulesOpen={currentRulesOpen}
                    />
                </div>
                {/* {props.selectedPerson && ( */}
                <div class=" w-[78%]" >
                  <DataRoomProspectActionRight 
                  selectedPropsectSource={props.selectedPropsectSource}
                          handleCardProspectSectorClick={props.handleCardProspectSectorClick}
                          selectedPropsectSector={props.selectedPropsectSector}
                          setSelectedProspectSector={props.setSelectedProspectSector}
                   selectedPersonData={props.selectedPersonData}
                   translateText={props.translateText}
                   selectedLanguage={props.selectedLanguage} 
                  selectedPerson={props.selectedPerson} 
                  selectedButtonTab={props.selectedButtonTab}
                        />
                  {/* current={currentRulesOpen} */}
            
                </div>
                {/* )} */}
              </div>
        </>
    );
}

export default DataRoomProspectCard;