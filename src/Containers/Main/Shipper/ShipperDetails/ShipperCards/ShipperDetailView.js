import React, { Component } from "react";

import { FlexContainer } from "../../../../../Components/UI/Layout";


class ShipperDetailView extends Component {
  render() {
    const {
      shipper: { phoneNo, emailId, shipByName },
      toggleViewType,
    } = this.props;

    return (
      <>
        <ShipperItemRow 
        label="Phone"
        value={phoneNo} />
        <ShipperItemRow 
        label="Email"
        value={emailId} />
        <ShipperItemRow 
        label="Ship By"
        value={shipByName} />
      </>
    );
  }
}
export default ShipperDetailView;

const ShipperItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem", fontSize: "13px" }}
    >
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
    </FlexContainer>
  );
};
