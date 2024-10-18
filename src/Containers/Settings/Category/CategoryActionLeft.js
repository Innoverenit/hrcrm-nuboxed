import React,{lazy} from "react";
const CategoryProfileCard = lazy(() =>
  import("./CategoryProfileCard")
);

function CategoryActionLeft(props) {
  console.log(props.rules);
  return (
    <div>
      <div class=" flex flex-col flex-block"
      // flexDirection="column" style={{ display: "block" }}
       >
        <CategoryProfileCard
          
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
export default CategoryActionLeft;