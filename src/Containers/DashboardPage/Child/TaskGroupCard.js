import React from "react";
import { Tooltip, Button} from "antd";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
import { MainWrapper } from "../../../Components/UI/Layout";
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
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem] ">
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </div>

        <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto overflow-hidden ">
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
            //   onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            
                   
            <div>
       
             
 

              &nbsp;    
            {secondaryTitle || ""} 
 
           
   
            </div>      
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">

          </div>
        </div>

        <div style={{ color: "#337df4", fontSize: "0.75em" }}>
        </div>
      {/* </div> */}
      <div class="flex items-center">
     
      <ButtonGroup >
      <StatusIcon
  type="To Start"
  iconType="fa-hourglass-start"
  tooltip="To Start"
  status={task.taskStatus}
/>


<StatusIcon
              type="In Progress"
              iconType="fa-hourglass-half"
              tooltip="In Progress"
              status={task.taskStatus}
          
            />


<StatusIcon
              type="Completed"
              iconType="fa-hourglass"
              tooltip="Completed"
              status={task.taskStatus}
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

       
        </Button>
      </Tooltip>
    );
  }