import React,{useState} from "react";
// import { StyledSelect } from "../../../../../../Components/UI/Antd";

function PartnerSkillsLoadMore(props) {
    const [isViewAll, setIsViewAll] = useState(false);
    const [particularRowData, setParticularRowData] = useState({});

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
              {/* {item.skillList && item.skillList.map((option, i) => {
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
          {props.skill.slice(0, 2).map((option,i) => {
            return (
              <>
                <div key={i} style={{
                    border: "2px solid rgb(125 241 193)",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                    {option}
                    </div>
              </>
            );
          })}
        </>
      ) : (
        <>
         
            {props.skill && props.skill.map((option, i) => {
            return (
              <>
                  <div key={i} style={{
                    border: "2px solid rgb(125 241 193)",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}>
                    {option}
                    </div>
              </>
            );
          })}
        </>
      )} 
     {props.skillList.length ?
   <div
   className="cursor-pointer text-xs mt-2 font-bold ml-1" 
        onClick={() => (!isViewAll ? setIsViewAll(true) : setIsViewAll(false))}
      >
        {!isViewAll ? "Load More" : "Less More"}
      </div>
      :null}


      
    </div>
  
             
          
          </>
        );
      }

export default PartnerSkillsLoadMore;
