import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const InventoryActionLeft =lazy(()=>import("./InventoryActionLeft"));
class InventoryHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={
            <InventoryActionLeft
              viewType={this.props.viewType}
              handleViewChange={this.props.handleViewChange}
              setInventoryViewType={this.props.setInventoryViewType}
              translateText={this.props.translateText}
              translatedMenuItems={this.props.translatedMenuItems}
              selectedLanguage={this.props.selectedLanguage}
            />
          }
          // rightComponent={<InventoryActionRight />}
        />
      </div>
    );
  }
}

export default InventoryHeader;
