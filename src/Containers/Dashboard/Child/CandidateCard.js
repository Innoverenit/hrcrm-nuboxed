import React, { } from "react";
import {  MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
} from "../../../Components/UI/Elements";


const BussinessCard = (props) => {
  const {
    handleClick,
    handlePreview,
    imageId,
    imageURL,
    primaryTitle,
    secondaryTitle,
    subtitle1,
    subtitle2,
    currencyType,
    currency,
  } = props;
  console.log("...>>>>>>>>>>>.......<<<<<<<<<<<<<<", imageURL);
  return (
    <div class=" flex flex-col"  style={{ borderRadius: 3 }}>
      <MainWrapper>
        <div class="flex flex-no-wrap h-[2.5em] items-center"
        >
          <div class=" flex" style={{ flexBasis: "20%", margin: "0.3rem" }}>
            <MultiAvatar
              primaryTitle={primaryTitle}
            //   imageId={imageId}
            //   imageURL={imageURL}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </div>
          <div class=" flex flex-col overflow-hidden"
          
            style={{ flexBasis: "70%", }}
          >
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer" }}
              //onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            <div>
           
              {/* <i class="far fa-address-book"></i> */}
              &nbsp;&nbsp;
              {/* {currencyType && <CurrencySymbol currencyType={currencyType} />}
              &nbsp;
              {secondaryTitle || ""} */}
            </div>
          </div>
          <div class=" flex flex-start"
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></div>
        </div>

        <div style={{ color: "#337df4", fontSize: "0.75em" }}>
          {/* {elipsize(subtitle1 || "", 23)} */}
        </div>
      </MainWrapper>
    </div>
  );
};
export default BussinessCard;
