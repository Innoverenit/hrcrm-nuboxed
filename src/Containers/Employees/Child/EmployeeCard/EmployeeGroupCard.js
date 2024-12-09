import React from "react";
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
} from "../../../../Components/UI/Elements";

const BussinessCard = (props) => {
  const {
    handleClick,
    imageURL,
    primaryTitle,
    secondaryTitle,
    currencyType,
    opportunityId,
    handleWon,
    handleConfirm,
    handleDelete,
    user,
    customerName,
    contactName
  } = props;
  
  return (
    <div class="flex-col rounded-[3px]">
      <MainWrapper style={{height:"6rem"}}>
      {/* <div class="rounded bg-white m-1 p-1 overflow-auto h-24 border-[0.0625rem] border-[#eee]-600 w-full"> */}
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem]">
        
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.8rem"}
              imgWidth={"1.8rem"}
            />
          </div>
          <div class=" flex flex-col flex-wrap items-start self-start justify-start overflow-hidden grow shrink h-auto mr-auto ">
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
              //onClick={handleClick}
            >
            {primaryTitle===null?"":  primaryTitle }
            </Title>
           
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">

          </div>
        </div>

        <div style={{ color: "#337df4", fontSize: "0.75em" }}>
        </div>
      {/* </div> */}
      </MainWrapper>
    </div>
  );
};
export default BussinessCard;
