import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class SupplierOverDetailView extends Component {
  render() {
    console.log(this.props.supplier);
    const {
        supplier: { addresses },
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
        <ShipperItemRow
            label={
              <FormattedMessage id="app.street" defaultMessage="Street" />
            }
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow 
           label={
            <FormattedMessage id="app.city" defaultMessage="City" />
          }
        value={addresses && addresses[0].city} />
        <ShipperItemRow
   
         label={
          <FormattedMessage id="app.state" defaultMessage="State" />
        }
          value={addresses && addresses[0].state} />
        <ShipperItemRow
            label={
              <FormattedMessage id="app.pincode" defaultMessage="Pincode" />
            }
            value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
             label={
              <FormattedMessage id="app.country" defaultMessage="Country" />
            }
     
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default SupplierOverDetailView;

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
