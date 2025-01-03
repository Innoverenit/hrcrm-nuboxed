import React, { Component } from "react";

class CustomerExtraDetailView extends Component {
  render() {
    console.log(this.props.customer);
    const {
      customer: {
        url,
        phoneNumber,
        vatNo,
        countryDialCode,
        sector,
        businessRegistration,
        address,
      },
    } = this.props;

    return (
      <>
        <CustomerItemRow // label="URL"
          label={this.props.translatedMenuItems[4]}
          value={url}
        />
        <CustomerItemRow
          label={this.props.translatedMenuItems[3]}
          value={`${countryDialCode || ""} ${phoneNumber || ""}`}
        />

        <CustomerItemRow //label="Phone Number"
         label={this.props.translatedMenuItems[2]}
          value={vatNo}
        />

        <CustomerItemRow //label="Phone Number"
          label={this.props.translatedMenuItems[0]}
          value={businessRegistration}
        />

        <CustomerItemRow //label="Phone Number"
         label={this.props.translatedMenuItems[1]}
          value={sector}
        />
      </>
    );
  }
}
export default CustomerExtraDetailView;

const CustomerItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold text-sm" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       
       {/* {elipsize(value, 27)} */}
       {value}
    
   </div>
    </div>
  );
};
