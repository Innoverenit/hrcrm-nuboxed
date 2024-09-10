import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import ShipperOverViewCard from "./ShipperCards/ShipperOverViewCard"
import ShipperDetailCard from "./ShipperCards/ShipperDetailCard";
import ShipperOverViewDetailCard from "./ShipperCards/ShipperOverViewDetailCard";

class ShipperDetailLeft extends Component {
  render() {
    const { shipper } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
          <ShipperOverViewCard  shipper={shipper}
 translateText={this.props.translateText}
 selectedLanguage={this.props.selectedLanguage}
          />
          <ShipperDetailCard shipper={shipper} 
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
          />
          <ShipperOverViewDetailCard shipper={shipper}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
           />
        </FlexContainer>
      </>
    );
  }
}
export default ShipperDetailLeft;
