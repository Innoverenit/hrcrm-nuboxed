import React, { Component } from "react";

class InventoryAddressView extends Component {
  render() {
    const {
      inventory: { address },
    } = this.props;
    return (
      <>
        <InventoryItemRow
          label="Street"
          value={address && address[0].street}
        />
        <InventoryItemRow label="City" value={address && address[0].city} />
        <InventoryItemRow
          label="State"
          value={address && address[0].state}
        />
        <InventoryItemRow
          label="Pincode"
          value={address && address[0].postalCode}
        />
        <InventoryItemRow
          label="Country"
          value={address && address[0].country}
        />
      </>
    );
  }
}
export default InventoryAddressView;

const InventoryItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem] ">
  
      <div style={{ color: "#444", fontWeight: 600 }}>{label}</div>
      <div style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
        {value}
      </div>
    </div>
  );
};
