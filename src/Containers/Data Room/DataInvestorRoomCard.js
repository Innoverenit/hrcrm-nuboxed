import React , {useEffect, useState, lazy} from "react";

const DataRoomInvestorActionLeft= lazy(() =>import("./DataRoomInvestorActionLeft"));

 const DataRoomInvestorActionRight=lazy(() =>import("./DataRoomInvestorActionRight"));


function DataInvestorRoomCard (props) {

    // const [rules, setRules] = useState(name);
    // const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]); 
    
    
    // const handleRuleClick = (item) => {
    //   setCurrentRulesOpen(item);  
    // };
    return(
        <>
       <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[22%]" >
                  <DataRoomInvestorActionLeft
                  selectedInvestor={props.selectedInvestor}
                  setSelectedInvestor={props.setSelectedInvestor}
                  handleCardClickInvestor={props.handleCardClickInvestor}
                    // handleRuleClick={handleRuleClick}
                    // rules={rules}
                    // currentRulesOpen={currentRulesOpen}
                    />
                </div>
             {props.selectedInvestor && ( 
                <div class=" w-[78%]" >
                  <DataRoomInvestorActionRight         />
                  {/* current={currentRulesOpen} */}
            
                </div>
                )}
              </div>
        </>
    );
}

export default DataInvestorRoomCard;