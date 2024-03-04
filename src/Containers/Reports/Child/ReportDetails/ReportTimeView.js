import { Button } from "antd";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import ReportActionLeft from "../ReportActionLeft";
import ReportActionRight from "../ReportActionRight";

class ReportTimeView extends Component {
  render() {
    // const {
    //   customer: { url, phoneNumber,address },
    // } = this.props;

    // const addressdata=address&&address.length&&address[0].address1;
    // const addressdata1=address&&address.length&&address[0].street;
    // const addressdata2=address&&address.length&&address[0].city;
    // const addressdata3=address&&address.length&&address[0].state;
    // const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
        

        <div class=" flex items-center w-[90%] justify-between flex-no-wrap m-2">
      <ReportActionRight/>

        </div>
    
      </>
    );
  }
}
export default ReportTimeView;

const ReportItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       {value}
   </div>
    </div>
  );
};