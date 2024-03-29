import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
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
          label={<FormattedMessage id="app.street" defaultMessage="Street"/>}
          value={addresses && addresses[0].street}
        />
        <ShipperItemRow label={<FormattedMessage id="app.city" defaultMessage="City"/>} value={addresses && addresses[0].city} />
        <ShipperItemRow label={<FormattedMessage id="app.state" defaultMessage="State"/>} value={addresses && addresses[0].state} />
        <ShipperItemRow
          label={<FormattedMessage id="app.pincode" defaultMessage="Pincode"/>}
          value={addresses && addresses[0].pinCode}
        />
        <ShipperItemRow
          label={<FormattedMessage id="app.country" defaultMessage="Country"/>}
          value={addresses && addresses[0].country}
        />
      </>
    );
  }
}
export default ShipperOverDetailView;

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
