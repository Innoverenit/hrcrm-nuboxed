import React from "react";
import RulesProfileCard from "./Child/RulesCard/RulesProfileCard";
function RulesActionLeft(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
     <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <RulesProfileCard
          handleRuleClick={props.handleRuleClick}
          rule={props.rule}
          currentRulesOpen={props.currentRulesOpen}
        />
      </div>
    </div>
  );
}
export default RulesActionLeft;
