import React, { Component } from "react";

import {  Menu,  } from "antd";
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
        />
        <ProfileItemRow
          label=""
       
        />      
      </>
    );
  }
}
export default ProfileAboutView;

const ProfileItemRow = ({ label, value, ex }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">   
<div style={{ color: "#444", fontWeight: 600 }}>{label}</div>
      <div style={{ textAlign:"end" }}>{value}</div>
      
    </div>
  );
};
