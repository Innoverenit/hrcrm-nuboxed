import React from "react";
import {  Popconfirm,Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { StopTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  MultiAvatar,
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
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem] ">       
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  overflow-hidden">
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
              {customerName || ""} 
              </div>
              <div class="text-xs">          
              {contactName || ""} 
              </div>
            <div>
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
            </div>      
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            
          </div>
          <div >
          <EditOutlined  className=" !text-icon text-[#337df4bf]"
          onClick={props.handleEdit}
          />
        </div>
        </div>

       
        </div>
        
      {/* </div> */}
      </div>
    
  );
};
export default BussinessCard;
