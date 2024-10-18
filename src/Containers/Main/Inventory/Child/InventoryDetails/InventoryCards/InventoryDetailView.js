import React, { Component } from "react";

class InventoryDetailView extends Component {
  render() {
    const {
      inventory: { managementDetails, productionManagerDetails },
    } = this.props;
    return (
      <>
        <InventoryItemRow
          label="Management"
          value={`${managementDetails && managementDetails.firstName}`}
        />
        <InventoryItemRow
          label="Production Manager"
          value={`${productionManagerDetails &&
            productionManagerDetails.firstName} ${productionManagerDetails &&productionManagerDetails.lastName}`}
        />
      
      </>
    );
  }
}
export default InventoryDetailView;

const InventoryItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem]"></div>
  
      <div style={{ color: "#444", fontWeight: 600 }}>{label}</div>
      <div style={{ textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
};
