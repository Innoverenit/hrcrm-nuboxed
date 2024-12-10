import React from "react";
import {
  MultiAvatar,
  Title,
} from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import { MainWrapper } from "../../../Components/UI/Layout";

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
    orderCurrencyName,
    offerValue,
    deliveryDate,
    contactName
  } = props;
  const today = new Date();

  const getColor = (deliveryDate) => {
    const delivery = new Date(deliveryDate);
    const differenceInDays = Math.abs(Math.floor((delivery - today) / (1000 * 60 * 60 * 24))); // Calculate absolute difference in days
    console.log('Delivery Date:', delivery);
    console.log('Today:', today);
    console.log('Difference in Days:', differenceInDays);

    if (differenceInDays === 4) {
     
      if (delivery < today) {
       
        return { borderColor: 'red', dateColor: 'red' };
      } else {
        
        return { borderColor: 'orange', dateColor: 'black' };
      }
    } else {
      
      return { borderColor: '#ccc', dateColor: 'black' }; 
    }
  };
  const { borderColor, dateColor } = getColor(deliveryDate);
  return (
    <div class="flex-col rounded-[3px]">
      <MainWrapper style={{height:"6rem",border: `2px solid ${borderColor}`}}>
      {/* <div class="rounded bg-white m-1 p-1 overflow-auto h-24 border-[0.0625rem] border-[#eee]-600 w-full"> */}
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem] ">      
            <MultiAvatar
              primaryTitle={secondaryTitle}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </div>
          <div class=" flex flex-col flex-wrap overflow-hidden items-start self-start justify-start grow shrink h-auto mr-auto ">
            <Title
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
              //onClick={handleClick}
            >
              {primaryTitle || ""}
            </Title>
            {/* <div class="text-xs">
              {secondaryTitle || ""} 
              </div> */}
              <div class="text-xs">          
              {newOrderNo || ""} 
              </div>
              <div class="text-xs">          
              {offerValue || ""} {orderCurrencyName}
              </div>
              <div class="text-xs" style={{color: dateColor}}>          
              {`  ${dayjs.utc(deliveryDate).format("DD-MM-YYYY")}`} 
              </div>
            <div>
             
              {/* {secondaryTitle || ""}  */}
             
   

              &nbsp;    
 
            </div>      
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
