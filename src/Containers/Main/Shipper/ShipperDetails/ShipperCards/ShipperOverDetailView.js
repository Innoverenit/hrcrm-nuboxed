import React, { Component } from "react";
import { FormattedMessage } from 'react-intl';

class ShipperOverDetailView extends Component {
  render() {
    console.log(this.props.shipper);
    const {
      shipper: { addresses },
      toggleViewType,
    } = this.props;
    const { shipper } = this.props;

    return (
      <>
        <ShipperItemRow
         label="street"
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow 
        label="City"
        // label={<FormattedMessage id="app.city" defaultMessage="City"/>} 
        value={addresses && addresses[0].city} />
        <ShipperItemRow 
        label="State"
        // label={<FormattedMessage id="app.state" defaultMessage="State"/>} 
        value={addresses && addresses[0].state} />
        <ShipperItemRow
        label="Pincode"
          // label={<FormattedMessage id="app.pincode" defaultMessage="Pincode"/>}
          value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
        label="Country"
          // label={<FormattedMessage id="app.country" defaultMessage="Country"/>}
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default ShipperOverDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem] font-[13px] ">
  
      <div
        style={{
          color: "#444",
          fontWeight: 600,
          width: "40%",
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
        }}
      >
        {value}
      </div>
    </div>
  );
};
