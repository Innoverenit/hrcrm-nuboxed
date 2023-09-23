import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Divider, Tooltip, Button, Menu, Dropdown, Icon } from "antd";
// import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import {
  Title,
  SubTitle,
  MultiAvatar,
  StyledLabel,
} from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../Components/Utils";
import CurrencyCompressor from "../../../../../Components/Common/CurrencyCompressor";
import { EditOutlined } from "@ant-design/icons";
import { CurrencySymbol } from "../../../../../Components/Common";
class ProfileAboutView extends Component {
  render() {
    const {
      opportunity: {
        sourceName,
        proposalAmount,
        currency,
        customer,
        endDate,
        description,
        processName,
        userCurrencyAmount,
        exchangePrice,
        oppType,
      },
      tradeCurrency,
      toggleViewType,
    } = this.props;
    const data=currency
    console.log(data);
    // const value = exchangePrice.EUR;
    // console.log(value);
    const menu = (
      <Menu>
        <p
          style={{
            paddingRight: "0.625em",
            paddingLeft: "0.625em",
            fontSize: "bold",
          }}
        >
          Proposal Value is
        </p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.EUR).toFixed(
          0
        )} EUR`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{`  ${parseFloat(exchangePrice && exchangePrice.GBP).toFixed(
          0
        )} GBP`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{`  ${parseFloat(exchangePrice && exchangePrice.USD).toFixed(
          0
        )} USD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.INR).toFixed(
          0
        )} INR`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.BDT).toFixed(
          0
        )} BDT`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.AUD).toFixed(
          0
        )} AUD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.CAD).toFixed(
          0
        )}  CAD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >
          {" "}
          {` ${parseFloat(exchangePrice && exchangePrice.SGD).toFixed(0)}  SGD`}
        </p>
      </Menu>
    );

    return (
      <>
        {/* <FlexContainer justifyContent="flex-end">
          {this.props.partnerLogin === "Yes" &&
            this.props.department === "Partner" ? null : (
              <Tooltip title="Edit">
                <EditOutlined
                  tooltipTitle="Edit"
                  iconType="edit"
                  onClick={toggleViewType}
                  size="1em"
                />
              </Tooltip>
            )}
        </FlexContainer> */}
        {/* <ProfileItemRow
          label="Customer"
          // label={<FormattedMessage
          //   id="app.proposalvalue"
          //   defaultMessage="Proposal Value"
          // />}
          value={customer}
        /> */}
        <ProfileItemRow
          //label="Proposal value"
          label={<FormattedMessage
            id="app.proposalvalue"
            defaultMessage="Proposal Value"
          />}
          // value={proposalAmount} 
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {proposalAmount}
          </span>
          }
        // value={`${
        //   proposalAmount === 0
        //     ? proposalAmount
        //     : CurrencyCompressor(proposalAmount)
        // } ${currency}`}
        />
        {/* <div style={{ display: "", marginBottom: "-16px" }}>
          <ProfileItemRow
            style={{ fontSize: "0.8125em", width: "36%" }}
            label="Currency"
            ex
            value={currency}
         
          />

         
        </div> */}

        <ProfileItemRow
          label=""
        // value={`${dayjs(exchangePrice.date).format("ll")}`}
        />
        {/* <ProfileItemRow label="Sales Process" value={processName} /> */}
        {/* <ProfileItemRow
          label="Closure date"
          value={dayjs(endDate).format("ll")}
        /> */}
        {/* <ProfileItemRow label="Win probability" value={oppType} /> */}
        {/* <ProfileItemRow label="Description" value={description} /> */}
         {/* <ProfileItemRow label="Recruiter Teams" value={sourceName} />  */}
      </>
    );
  }
}

export default ProfileAboutView;

const ProfileItemRow = ({ label, value, ex }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      // style={{ margin: "5px" }}
      // style={{ margin: "0.4rem" ,marginTop:"-5px"}}
    >
      {/* {ex ? (
        <>
          <div
            style={{
              color: "#444",
              fontWeight: 600,
              width: "40%",
              fontSize: "0.8125em",
            }}
          >
            {label}
          </div>
          <div
            overflow="hidden"
            textOverflow="ellipsis"
            style={{ marginLeft: "0.4rem", fontSize: "0.8125em" }}
          >
            <Tooltip title={value} placement="topLeft">
              {value}
            </Tooltip>
          </div>
        </>
      ) : (
          <>
            <div
              style={{
                color: "#444",
                fontWeight: 600,
                width: "40%",
                fontSize: "0.8125em",
              }}
            >
              {label}
            </div>
            <div
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "61%",
                fontSize: "0.8125em",
              }}
            >
              <Tooltip title={value} placement="topLeft">
                {value}
              </Tooltip>
            </div>
          </>
        )} */}

<SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ textAlign:"end" }}>{value}</SubTitle>
      
    </FlexContainer>
  );
};
