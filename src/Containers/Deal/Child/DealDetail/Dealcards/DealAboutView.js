import { Menu } from "antd";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { CurrencySymbol } from "../../../../../Components/Common";
class DealAboutView extends Component {
  render() {
    const {
        dealDetailsbyID: {
        proposalAmount,
        currency,
        exchangePrice,
      },
      tradeCurrency,
      toggleViewType,
    } = this.props;
    const data=currency
    console.log(data);
    const menu = (
      <Menu>
        <div class=" pl-2 pr-2 font-bold" >
          <FormattedMessage
                id="app.proposalvalueis"
                defaultMessage=" Deals Value is"
              />
         
       </div>
        <div class=" text-right pr-2" >{` ${parseFloat(exchangePrice && exchangePrice.EUR).toFixed(
          0
        )} EUR`}</div>
        <div class=" text-right pr-2" >{`  ${parseFloat(exchangePrice && exchangePrice.GBP).toFixed(
          0
        )} GBP`}</div>
        <div class=" text-right pr-2">{`  ${parseFloat(exchangePrice && exchangePrice.USD).toFixed(
          0
        )} USD`}</div>
        <div class=" text-right pr-2">
          {` ${parseFloat(exchangePrice && exchangePrice.INR).toFixed(
          0
        )} INR`}</div>
        <div class=" text-right pr-2" >
          {` ${parseFloat(exchangePrice && exchangePrice.BDT).toFixed(
          0
        )} BDT`}</div>
        <div class=" text-right pr-2" >
          {` ${parseFloat(exchangePrice && exchangePrice.AUD).toFixed(
          0
        )} AUD`}</div>
        <div class=" text-right pr-2">
          {` ${parseFloat(exchangePrice && exchangePrice.CAD).toFixed(
          0
        )}  CAD`}</div>
        <div class=" text-right pr-2" >
          {" "}
          {` ${parseFloat(exchangePrice && exchangePrice.SGD).toFixed(0)}  SGD`}
       </div>
      </Menu>
    );

    return (
      <>
 <divrofileItemRow
          //label="Proposal value"
          label={<FormattedMessage
            id="app.proposalvalue"
            defaultMessage="Deals Value"
          />}
          // value={proposalAmount} 
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {proposalAmount}
          </span>
          }
        />
 

     
    
      </>
    );
  }
}

export default DealAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-fit justify-between flex-no-wrap m-2 h-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">{value}</div>
    </div>
  );
};