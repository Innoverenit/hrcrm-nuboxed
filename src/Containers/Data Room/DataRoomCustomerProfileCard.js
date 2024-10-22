import React,{lazy} from "react";
import { ViewEditCard } from "../../Components/UI/Elements";
// import { ViewEditCard } from "../../../";
const DataRoomCustomerProfileView = lazy(() =>
  import("./DataRoomCustomerProfileView")
);

function DataRoomCustomerProfileCard(props) {
  console.log(props.rules);
  return (
    <div>
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <DataRoomCustomerProfileView
             rules={props.rules}
              handleRuleClick={props.handleRuleClick}
              toggleViewType={toggleViewType}
              currentRulesOpen={props.currentRulesOpen}
              recruitProAdvance={props.recruitProAdvance}
              handleRecruitProAdvance={props.handleRecruitProAdvance}
            />
          ) : null
        }
      </ViewEditCard>
    </div>
  );
}

export default DataRoomCustomerProfileCard;
