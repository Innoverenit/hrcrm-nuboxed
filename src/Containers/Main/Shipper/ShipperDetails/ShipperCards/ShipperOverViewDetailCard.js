import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import ShipperOverDetailView from "./ShipperOverDetailView";

class ShipperOverViewDetailCard extends Component {
  render() {
    const { shipper } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ShipperOverDetailView
                shipper={shipper}
                toggleViewType={toggleViewType}
                translatedMenuItems={this.props.translatedMenuItems}
                selectedLanguage={this.props.selectedLanguage}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ShipperOverViewDetailCard;
