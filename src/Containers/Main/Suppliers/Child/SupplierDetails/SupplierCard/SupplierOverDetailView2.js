import React, { Component } from "react";

class SupplierOverDetailView2 extends Component {
 
  render() {
    console.log(this.props.supplier);
    const {
        supplier: { addresses },
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
     
        <ShipperItemRow
            label=
            {this.props.translatedMenuItems[5]}
           
            value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
             label={this.props.translatedMenuItems[6]}
           
     
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default SupplierOverDetailView2;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class="flex items-center flex-nowrap m-1 text-sm max-xl:text-[0.65rem]">
      <div class="text-[#444] font-semibold w-[40%]">
        {label}
      </div>
      <div
      class=" whitespace-nowrap overflow-hidden text-ellipsis w-[61%] max-xl:text-[0.65rem]">
        {value}
      </div>
    </div>
  );
};
