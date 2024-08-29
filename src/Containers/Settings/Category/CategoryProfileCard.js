import React,{lazy} from "react";
import { ViewEditCard } from "../../../Components/UI/Elements";
const CategoryProfileView = lazy(() =>
  import("./CategoryProfileView")
);

function CategoryProfileCard(props) {
  console.log(props.rules);
  return (
    <div>
      <ViewEditCard>
        {({ viewType }, toggleViewType) =>
          viewType === "view" ? (
            <CategoryProfileView
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

export default CategoryProfileCard;
