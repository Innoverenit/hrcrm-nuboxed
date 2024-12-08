
import React, { useState } from "react";

function PartnerSkillsLoadMore(props) {
  const [isViewAll, setIsViewAll] = useState(false);
  const [particularRowData, setParticularRowData] = useState({});
  function generateRandomColor() {
    let maxVal = 0xffffff;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }
  return (
    <>
      <div class=" flex flex-wrap w-full"
      >

        {!isViewAll ? (
          <>
            {props.skill&&props.skill.slice(0, 2).map((option, i) => {
              return (
                <>
                  <div
                    key={i}
                    style={{
                      border: "1px solid black",
                      padding: "0px 0.4em",
                      textAlign: "center",
                      placeSelf: "center",
                      margin: "2px",
                      borderRadius: "0.4em",
                    }}
                  >
                    {option.skillName}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            {props.skill &&
            props.skill.map((option, i) => {
                return (
                  <>
                    <div
                      key={i}
                      style={{
                        border: `2px solid black`,
                        padding: "0px 0.62em",
                        textAlign: "center",
                        margin: "2px",
                        borderRadius: "0.62em",
                      }}
                    >
                      {option.skillName}
                    </div>
                  </>
                );
              })}
          </>
        )}
        {props.skill&&props.skill.length ? (
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

export default PartnerSkillsLoadMore;
