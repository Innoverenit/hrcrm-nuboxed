import React from "react";
import {  Popconfirm,Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { StopTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { FlexContainer } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
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
    contactName
  } = props;
  
  return (
    <div class="flex-col rounded-[3px]">
      <div className="h-24 m-1 p- shadow-[0 0.5em 0.375em -0.375em rgb(46, 44, 44)] border-2 border-gray-400 bg-white ">
      
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
              onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            <div class="text-xs">
              {customerName || ""} 
              </div>
              <div class="text-xs">          
              {contactName || ""} 
              </div>
            <SubTitle>
              &nbsp;&nbsp;
              {currencyType && <CurrencySymbol currencyType={currencyType} />}
             
              &nbsp;             
              {/* {secondaryTitle || ""}  */}
             
              <Popconfirm
  title="Change status to Won?"
  onConfirm={() => handleWon(opportunityId)}
  okText="Yes"
  cancelText="No"
>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Won"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      size={140}
      className=" !text-icon"
   
    />
  </Tooltip>
  </Popconfirm>

              &nbsp;    
              <Popconfirm
  title="Change status to Lost?"
  onConfirm={() => handleConfirm(opportunityId)}
  okText="Yes"
  cancelText="No"
>
 <Tooltip
        title={
          <FormattedMessage id="app.drop" defaultMessage="Lost" />
        }
      >
 
  <StopTwoTone
          type="stop"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          className=" !text-icon"
        />
        </Tooltip>
    </Popconfirm>
    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => handleDelete(opportunityId)}
          >
           
             {user.opportunityDeleteInd ===true && user.crmInd === true && (
            <DeleteOutlined
            type="delete" className=" !text-icon cursor-pointer text-red-600 "  />
             )}
          </StyledPopconfirm>
            </SubTitle>      
          </FlexContainer>
          <FlexContainer
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></FlexContainer>
          <SubTitle >
          <EditOutlined  className=" !text-icon text-[#337df4bf]"
          onClick={props.handleEdit}
          />
        </SubTitle>
        </FlexContainer>

       
        </div>
        
      {/* </div> */}
      </div>
    
  );
};
export default BussinessCard;
