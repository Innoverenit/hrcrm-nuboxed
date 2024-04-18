import React from "react";
import {  Popconfirm,Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { StopTwoTone, DeleteOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
import moment from "moment";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { CurrencySymbol } from "../../../Components/Common";

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
    newOrderNo,
    offerValue,
    deliveryDate,
    contactName
  } = props;
  
  return (
    <div class="flex-col rounded-[3px]">
      <MainWrapper style={{height:"6rem"}}>
      {/* <div class="rounded bg-white m-1 p-1 overflow-auto h-24 border-[0.0625rem] border-[#eee]-600 w-full"> */}
        <FlexContainer
          alignItems="center"
          flexWrap="no-wrap"
          style={{ height: "3rem" }}
        >
          <FlexContainer style={{ flexBasis: "20%", margin: "0.3rem" }}>
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </FlexContainer>
          <FlexContainer
            flexDirection="column"
            style={{ flexBasis: "70%", overflow: "hidden" }}
          >
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
              //onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            <div class="text-xs">
              {secondaryTitle || ""} 
              </div>
              <div class="text-xs">          
              {newOrderNo || ""} 
              </div>
              <div class="text-xs">          
              {offerValue || ""} 
              </div>
              <div class="text-xs">          
              {`  ${moment.utc(deliveryDate).format("DD-MM-YYYY")}`} 
              </div>
            <SubTitle>
             
              {/* {secondaryTitle || ""}  */}
             
   

              &nbsp;    
 
            </SubTitle>      
          </FlexContainer>
          <FlexContainer
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></FlexContainer>
        </FlexContainer>

        <SubTitle style={{ color: "#337df4", fontSize: "0.75em" }}>
        </SubTitle>
      {/* </div> */}
      </MainWrapper>
    </div>
  );
};
export default BussinessCard;
