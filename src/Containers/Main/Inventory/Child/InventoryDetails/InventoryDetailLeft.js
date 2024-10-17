import React, { Component } from "react";
import InventoryOverviewCard from "./InventoryCards/InventoryOverViewCard";
import InventoryDetailCard from "./InventoryCards/InventoryDetailCard";
import InventoryAddressViewCard from "./InventoryCards/InventoryAddressViewCard";

class InventoryDetailLeft extends Component {
  render() {
    const { inventory } = this.props;
    return (
      <>
      <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <InventoryOverviewCard inventory={inventory} />
          <InventoryDetailCard inventory={inventory} />
          <InventoryAddressViewCard inventory={inventory} />
        </div>
      </>
    );
  }
}
export default InventoryDetailLeft;
