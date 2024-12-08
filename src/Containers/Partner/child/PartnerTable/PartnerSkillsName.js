import Item from "antd/lib/list/Item";
import React,{useState} from "react";
// import { StyledSelect } from "../../../../../../Components/UI/Antd";

function PartnerSkillsName(props) {
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

 const newSkill=props.skill && props.skill.map((item)=> {
   return { skillName:item, color: generateRandomColor() };
     });

    console.log(newSkill)

        return (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >

 {!isViewAll ? (
        <>
          {newSkill.map((option,i) => {
            return (
              <>
                <div key={i} style={{
                    border: `1px solid ${option.color}`,
                    padding: "0px 0.4em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.4em",
                  }}>
                    {option.skillName}
                    </div>
              </>
            );
          })}
        </>
      ) : (
        <>
         
            {newSkill && newSkill.map((option, i) => {
            return (
              <>
                  <div key={i} style={{
                    border: `2px solid ${option.color}`,
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                 {option.skillName}
                    </div>
              </>
            );
          })}
        </>
      )} 
     {props.skill.length ?
    <div
    className="cursor-pointer text-xs mt-2 font-bold ml-1" 
        onClick={() => (!isViewAll ? setIsViewAll(true) : setIsViewAll(false))}
      >
        {!isViewAll ? " Load More" : " View Less"}
      </div>
      :null}


      
    </div>
  
             
          
          </>
        );
      }
    
  

export default PartnerSkillsName;
