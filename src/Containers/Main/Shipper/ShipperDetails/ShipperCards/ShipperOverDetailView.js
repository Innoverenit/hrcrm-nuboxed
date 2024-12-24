import React, { Component } from "react";

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
         label={this.props.translatedMenuItems[7]}
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow 
        label={this.props.translatedMenuItems[8]}
        value={addresses && addresses[0].city} />
        <ShipperItemRow 
        label={this.props.translatedMenuItems[9]}
        value={addresses && addresses[0].state} />
        <ShipperItemRow
        label={this.props.translatedMenuItems[10]}
          value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
        label={this.props.translatedMenuItems[11]}
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
