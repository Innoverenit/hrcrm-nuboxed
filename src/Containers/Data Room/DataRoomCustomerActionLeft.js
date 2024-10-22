import React,{lazy} from "react";
const DataRoomCustomerProfileCard= lazy(() =>
  import("./DataRoomCustomerProfileCard")
);

function DataRoomCustomerActionLeft(props) {
  console.log(props.rules);
  return (
    <div>
      <div class=" flex flex-col flex-block"
      // flexDirection="column" style={{ display: "block" }}
       >
        <DataRoomCustomerProfileCard
          
          handleRuleClick={props.handleRuleClick}
          rules={props.rules}
          currentRulesOpen={props.currentRulesOpen}
        //   recruitProAdvance={props.recruitProAdvance}
        //   handleRecruitProAdvance={props.handleRecruitProAdvance}
        />
      </div>
    </div>
  );
}
export default DataRoomCustomerActionLeft;