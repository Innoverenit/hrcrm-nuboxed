import React from "react";
import { Tooltip, Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";
import { StopTwoTone} from "@ant-design/icons";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { FlexContainer, MainWrapper } from "../../../Components/UI/Layout";
import {
  MultiAvatar,
  Title,
  SubTitle,
} from "../../../Components/UI/Elements";
import { CheckCircleTwoTone,DeleteOutlined } from "@ant-design/icons";
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
    <FlexContainer flexDirection="column" style={{ borderRadius: 3 }}>
      <MainWrapper>
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
              {investorName}
            </div>
            <SubTitle>
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
    title={<FormattedMessage
      id="app.won"
      defaultMessage="Won"
    />}

  >
    <CheckCircleTwoTone
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
        title={
          <FormattedMessage id="app.lost" defaultMessage="lost" />
        }
      >
 
  <StopTwoTone
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
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                        )}
                      </StyledPopconfirm>
            </SubTitle>
          </FlexContainer>
          <FlexContainer
            style={{ flexBasis: "10%", alignSelf: "flex-start" }}
          ></FlexContainer>
        </FlexContainer>

        <SubTitle style={{ color: "#337df4", fontSize: "0.75em" }}>
          {/* {elipsize(subtitle1 || "", 23)} */}
        </SubTitle>
      </MainWrapper>
    </FlexContainer>
  );
};
export default DealGroupCard;
