import React from "react";
import { Tooltip, Popconfirm } from "antd";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { MultiAvatar} from "../../../Components/UI/Elements";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CurrencySymbol } from "../../../Components/Common";


const DealGroupCard = (props) => {
  const {
    handleClick,
    imageURL,
    handleWon,
    primaryTitle,
    secondaryTitle,
    currencyType,
    handleDelete,
    invOpportunityId,
    investorName,
    handleConfirm,
    user
  } = props;
  return (
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto rounded-[3px]">
      <MainWrapper>
      <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-[3rem] mr-auto ">
       
      <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.3rem]">
            <MultiAvatar
              primaryTitle={primaryTitle}
              imgHeight={"1.8rem"}
              imgWidth={"1.8rem"}
            />
          </div>
          <div class=" flex flex-col flex-wrap overflow-hidden items-start self-start justify-start grow shrink h-auto mr-auto ">
            <div class=" text-xs overflow-hidden overflow-ellipsis text-[#337df4] cursor-pointer flex justify-start  "
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
              <Popconfirm
  title="Change status to Won?"
  onConfirm={() => handleWon(invOpportunityId)}
  okText="Yes"
  cancelText="No"
>
  <Tooltip 
    title="Won"
 

  >
    <CheckCircleOutlineIcon
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      size={140}
      style={{ fontSize:"1rem" 
     
     }}
   
    />
  </Tooltip>
  </Popconfirm>

              &nbsp;    
              <Popconfirm
  title="Change status to Lost?"
  onConfirm={() => handleConfirm(invOpportunityId)}
  okText="Yes"
  cancelText="No"
>
 <Tooltip
        title="lost" 
      >
 
  <DoDisturbIcon
          type="stop"
          theme="twoTone"
          twoToneColor="red"
          size={140}
          style={{
            fontSize: "1rem"
          }}
        />
        </Tooltip>
    </Popconfirm>
               <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          handleDelete(invOpportunityId)
                        }
                      >
                        {user.imInd === true && user.dealDeleteInd === true && (
                          <DeleteOutlineIcon
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                        )}
                      </StyledPopconfirm>
            </div>
          </div>
          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">

          </div>
        </div>

        <div className=" text-[#337df4]  text-sm">
        
        </div>
      </MainWrapper>
    </div>
  );
};
export default DealGroupCard;
