import React from "react";
import { Tooltip} from "antd";
import {MultiAvatar} from "../../../../../../Components/UI/Elements";
// import { StyledSelect } from "../../../../../../Components/UI/Antd";

function CandidateLoadMore(props) {
   
    // const color=["red","blue","green"]
    // const newSkill=props.skillList.map((item)=> {
    //   return item
    // }
    // )
//        const color = ["red"];
// function generateRandomColor() {
//   let maxVal = 0xffffff;
//   let randomNumber = Math.random() * maxVal;
//   randomNumber = Math.floor(randomNumber);
//   randomNumber = randomNumber.toString(16);
//   let randColor = randomNumber.padStart(6, 0);
//   return `#${randColor.toUpperCase()}`;
// }
// console.log(generateRandomColor());

// // let mapskill = skill.map((item) => {
// //   return { ...item, color: generateRandomColor() };
// // });

 const newCandidate=props.candidatetList===null?[]:props.candidatetList.map((item)=> {
   return  {fullName:item}
     }
 );

    console.log("rag",newCandidate)


//  console.log(generateRandomColor());
  // const skill = [
  //   { skillName: "html" },
  //   { skillName: "css" },
  //   { skillName: "java" }
  // ];
  // let mapskill = props.skillList.map((item) => {
  //   return { ...item, color: generateRandomColor() };
  // });
 
    // console.log(newSkill)

    // function handleSetParticularRowData(item) {
    //   console.log(item);
    //   setParticularRowData(item);   
    // }
    const totalNumber = newCandidate.reduce((acc, item, i) => {
        acc = i++;
        return acc
      }, 0)
        return (
          // <span>{item.skill && item.skill[0].skillName}</span>
          //   <>
          //   <SkillsForm topics={item.skill} />
          // </>
         
          
          <>
        <div style={{ display: "flex" }} 
            onClick={props.handleClickCandidateName}>
              {/* <Link
                toUrl={`/candidate/${item.candidateId}`}
                title={`${item.candidateName || ""} `}
              /> */}
              {newCandidate.slice(0, 3).map((item,i) => {
                return (
                  
                       <Tooltip
                    title={item.fullName}
                >
                      <MultiAvatar
                          primaryTitle={item.fullName||""}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"30"}
                          imgHeight={"30"}
                        />
                        </Tooltip>
                    
                  
                )

              })}
               ...{props.candidateNo} 

            </div>
  
             
          
          </>
        );
      }
    
  

export default CandidateLoadMore;
