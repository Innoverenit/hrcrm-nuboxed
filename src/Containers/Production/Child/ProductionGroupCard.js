import React from "react";
import { MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
} from "../../../Components/UI/Elements";
import { CurrencySymbol } from "../../../Components/Common";


const ProductionGroupCard = (props) => {
  const {
    handleClick,
    imageURL,
    primaryTitle,
    secondaryTitle,
    currencyType,
    handleDelete,
    invOpportunityId,
    investorName,
    user
  } = props;
  return (
    <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  ">
      <MainWrapper>
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-12 mr-auto ">
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-12 mr-auto m-1  ">
        
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.8rem"}
              imgWidth={"1.8rem"}
            />
          </div>
          <div class=" flex flex-col flex-wrap items-center self-start justify-start grow shrink h-12 mr-auto overflow-hidden ">
            <div
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
              onClick={handleClick}
            >
              {primaryTitle || ""}
            </div>
            <div class="text-xs">
              {investorName}
            </div>
            <div>
              &nbsp;&nbsp;
              {currencyType && <CurrencySymbol currencyType={currencyType} />}
              &nbsp;
              {secondaryTitle || ""}              
              &nbsp;                     
            </div>
          </div>
          <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-12 mr-auto ">

          </div>
        </div>

        <div style={{ color: "#337df4", fontSize: "0.75em" }}>
          {/* {elipsize(subtitle1 || "", 23)} */}
        </div>
      </MainWrapper>
    </div>
  );
};
export default ProductionGroupCard;
