import React from "react";
import TemplateProfileCard from "./child/TemplateCard/TemplateProfileCard";

function TemplateActionLeft(props) {
  console.log(props.currentRulesOpen);
  return (
    <div>
     <div class=" block flex-col flex-wrap  items-start self-start justify-start grow shrink h-auto mr-auto ">
        <TemplateProfileCard
          handleRuleClick={props.handleRuleClick}
          rule={props.rule}
          currentRulesOpen={props.currentRulesOpen}
        />
      </div>
    </div>
  );
}
export default TemplateActionLeft;
