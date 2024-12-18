import React , {useEffect, useState, lazy} from "react";

const DataRoomCustomerActionLeft= lazy(() =>import("./DataRoomCustomerActionLeft"));

 const DataRoomCustomerActionRight=lazy(() =>import("./DataRoomCustomerActionRight"));


function DataRoomCustomerCard (props) {

    // const [rules, setRules] = useState(name);
    // const [currentRulesOpen, setCurrentRulesOpen] = useState(name[0]); 
    
    
    // const handleRuleClick = (item) => {
    //   setCurrentRulesOpen(item);  
    // };
    return(
        <>
       <div class=" flex flex-no-wrap w-full" >
                <div class=" w-[22%]" >
                  <DataRoomCustomerActionLeft
                  selectedCustomer={props.selectedCustomer}
                  setSelectedCustomer={props.setSelectedCustomer}
                  handleCardClickCustomer={props.handleCardClickCustomer}
                    // handleRuleClick={handleRuleClick}
                    // rules={rules}
                    // currentRulesOpen={currentRulesOpen}
                    />
                </div>
                {props.selectedCustomer && (
                <div class=" w-[78%]" >
                  <DataRoomCustomerActionRight         />
                  {/* current={currentRulesOpen} */}
            
                </div>
                )}
              </div>
        </>
    );
}

export default DataRoomCustomerCard;