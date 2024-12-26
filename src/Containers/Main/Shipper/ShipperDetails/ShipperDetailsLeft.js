import React, { Component, lazy, Suspense } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
const ShipperOverViewCard =lazy(()=>import("./ShipperCards/ShipperOverViewCard"));
const ShipperDetailCard =lazy(()=>import("./ShipperCards/ShipperDetailCard"));
const ShipperOverViewDetailCard =lazy(()=>import("./ShipperCards/ShipperOverViewDetailCard"));

class ShipperDetailLeft extends Component {
  render() {
    const { shipper } = this.props;
    return (
      <>
        <FlexContainer flexDirection="column" style={{ display: "block" }}>
        <Suspense fallback={"Loading..."}>
          <ShipperOverViewCard  shipper={shipper}
 translateText={this.props.translateText}
 selectedLanguage={this.props.selectedLanguage}
 translatedMenuItems={this.props.translatedMenuItems}
          />
          <ShipperDetailCard shipper={shipper} 
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  translatedMenuItems={this.props.translatedMenuItems}
          />
          <ShipperOverViewDetailCard shipper={shipper}
  translateText={this.props.translateText}
  selectedLanguage={this.props.selectedLanguage}
  translatedMenuItems={this.props.translatedMenuItems}
           /></Suspense>
        </FlexContainer>
      </>
    );
  }
}
export default ShipperDetailLeft;
