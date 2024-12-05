import Item from "antd/lib/list/Item";
import React, { useState } from "react";
// import { StyledSelect } from "../../../../../../Components/UI/Antd";

function SkillsLoadMore(props) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [particularRowData, setParticularRowData] = useState({});
  // const color=["red","blue","green"]
  // const newSkill=props.skill.map((item)=> {
  //   return item
  // }
  // )
  //        const color = ["red"];
  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  // console.log(generateRandomColor());

  // // let mapskill = skill.map((item) => {
  // //   return { ...item, color: generateRandomColor() };
  // // });

  const newSkill =
    props.skill === null
      ? []
      : props.skill.map((item) => {
          return { keySkillsName: item, color: generateRandomColor() };
        });

  console.log("keySkillsName", newSkill);

  //  console.log(generateRandomColor());
  // const skill = [
  //   { skillName: "html" },
  //   { skillName: "css" },
  //   { skillName: "java" }
  // ];
  // let mapskill = props.skill.map((item) => {
  //   return { ...item, color: generateRandomColor() };
  // });

  // console.log(newSkill)

  // function handleSetParticularRowData(item) {
  //   console.log(item);
  //   setParticularRowData(item);
  // }
  return (
    // <span>{item.skill && item.skill[0].skillName}</span>
    //   <>
    //   <SkillsForm topics={item.skill} />
    // </>
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* {item.skill && item.skill.map((option, i) => {
                return (

                  <div key={i} style={{
                    border: "2px solid rgb(125 241 193)",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                    {option}
                  </div>

                );
              })} */}

        {!isViewAll ? (
          <>
            {newSkill.slice(0, 2).map((option, i) => {
              return (
                <>
                  {/* {newSkill !==null?"": */}
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${option.color}`,
                      padding: "0px 0.4em",
                      textAlign: "center",
                      margin: "2px",
                      borderRadius: "0.4em",
                    }}
                  >
                    {option.keySkillsName}
                  </div>
                  {/* } */}
                </>
              );
            })}
          </>
        ) : (
          <>
            {newSkill &&
              newSkill.map((option, i) => {
                return (
                  <>
                    {/* {newSkill && newSkill!==null?"": */}
                    <div
                      key={i}
                      style={{
                        border: `2px solid ${option.color}`,
                        padding: "0px 0.62em",
                        textAlign: "center",
                        margin: "2px",
                        borderRadius: "0.62em",
                      }}
                    >
                      {option.keySkillsName}
                    </div>
                    {/* } */}
                  </>
                );
              })}
          </>
        )}
        {props.skill.length ? (
         <div
         className="cursor-pointer text-xs mt-2 font-bold ml-1" 
           
            onClick={() =>
              !isViewAll ? setIsViewAll(true) : setIsViewAll(false)
            }
          >
            {!isViewAll ? " Load More" : " View Less"}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SkillsLoadMore;
