import React from "react";
import {  Popconfirm,Tooltip, Button} from "antd";
import { FormattedMessage } from "react-intl";
import { StopTwoTone, DeleteOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { CurrencySymbol } from "../../../Components/Common";
const ButtonGroup = Button.Group;
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
    contactName,
    task,
    contact,
    opportunityName
  } = props;
  console.log(primaryTitle)
  
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
            //   onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            
                   
            <SubTitle>
       
             
 

              &nbsp;    
            {secondaryTitle || ""} 
 
           
   
            </SubTitle>      
          </FlexContainer>
          <FlexContainer
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></FlexContainer>
        </FlexContainer>

        <SubTitle style={{ color: "#337df4", fontSize: "0.75em" }}>
        </SubTitle>
      {/* </div> */}
      <div class="flex items-center">
     
      <ButtonGroup >
      <StatusIcon
  type="To Start"
  iconType="fa-hourglass-start"
  tooltip="To Start"
  status={task.taskStatus}
//   difference={difference} 
//   onClick={() =>
//     linkTaskStatus(item.taskId, {
//       taskStatus: "To Start",
//     })
//   }
/>


<StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
              status={task.taskStatus}
            //   difference={difference}
            //   onClick={() =>
            //     linkTaskStatus(item.taskId, {
            //       //  ...item,
            //        taskStatus: "In Progress",
            //     })
            //   }
            />


<StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
              status={task.taskStatus}
            //   difference={difference}
            //   onClick={() =>
            //     linkTaskStatus(item.taskId, {
            //       //  ...item,
            //        taskStatus: "Completed",
            //     })
            //   }
            />
            </ButtonGroup>
            <div class="text-xs  font-poppins"> 
                        {`${customerName} ${contactName} ${opportunityName} `}</div>
            </div>
      </MainWrapper>
    </div>
  );
};
export default BussinessCard;
function StatusIcon(props) {
    const { type, iconType, tooltip, status, onClick, difference } = props;
  
    let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
    let size = status === type ? "1.875em" : "1em";
  
    // Display the difference as a label next to the icon
    const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;
  
    return (
      <Tooltip title={`${tooltip} (${daysLabel})`}>
        <Button
          ghost={status !== type}
          style={{
            padding: "0.375em",
            borderColor: "transparent",
            color: iconColor,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={onClick}
        >
          <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} />
{/* 
          {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>} */}
       
        </Button>
      </Tooltip>
    );
  }