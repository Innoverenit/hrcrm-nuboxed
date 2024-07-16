import React, { Component, lazy } from "react";
import { ActionHeader } from "../../../../../Components/Utils";
import InventoryDetailsActionRight from "./InventoryDetailsActionRight";
const InventoryDetailActionLeft = lazy(() => import("./InventoryDetailActionLeft"));

class InventoryDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={
            <InventoryDetailActionLeft
              viewType1={this.props.viewType1}
              setInventoryDetailViewType={this.props.setInventoryDetailViewType}
              inventory={this.props.inventory}
              handleResetTab={this.props.handleResetTab}
              translateText={this.props.translateText}
        translatedMenuItems={this.props.translatedMenuItems}
        selectedLanguage={this.props.selectedLanguage}
            />
          }
          rightComponent={<InventoryDetailsActionRight
            viewType1={this.props.viewType1}
            setInventoryDetailViewType={this.props.setInventoryDetailViewType}
            inventory={this.props.inventory}
            handleResetTab={this.props.handleResetTab} 
            translateText={this.props.translateText}
        translatedMenuItems={this.props.translatedMenuItems}
        selectedLanguage={this.props.selectedLanguage}
            />
          }
        />
      </div>
    );
  }
}

export default InventoryDetailHeader;
