import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
      <div className="rounded-md border-2 bg-[#ffffff]  shadow-[#aaa] h-[7.5rem] 
                  text-[#444444] m-1 w-[15.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
      {/* <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem] ">       
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.56em"}
              imgWidth={"1.56em"}
            />
          </div> */}
          <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto  overflow-hidden">
            <div
              fontSize="0.875em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer",display:"flex",justifyContent:"flex-start" }}
              //onClick={handleClick}
            >
                {/* {item.newOppId}  */}
                {primaryTitle || ""}
            </div>
            <div>
          
            </div>
           
            <div>
              &nbsp;&nbsp;
             
             
              &nbsp;             
            
              &nbsp;    
            
            </div>      
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            
          </div>
        
        </div>

       
        </div>
        
      {/* </div> */}
      </div>
    
  );
};
export default BussinessCard;
