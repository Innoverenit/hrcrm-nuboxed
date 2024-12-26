import React, { Component,Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getShipperByShipperId } from "./ShipperAction";
import {  MainWrapper } from "../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../Components/Placeholder";

const ShipperDetailsHeader =lazy(()=>import("./ShipperDetailsHeader"));
const ShipperDetailsRight =lazy(()=>import("./ShipperDetails/ShipperDetailsTab/ShipperDetailsRight"));
const ShipperDetailsLeft =lazy(()=>import("./ShipperDetails/ShipperDetailsLeft"));

class ShipperDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
   this.props.getShipperByShipperId(this.props.match.params.shipperId);
   this.fetchMenuTranslations();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       
       "1165",//Activity 0
       "1377",// "ship id" 1
       "316",// "Notes" 2
       "138",  // Document 3
       "73",  // Contact 4
       "1219",// Cost 5
       "104",//Create 6
      "186",//  street7
      "188",//  City8
      "1261",//  State9
      "1236",//  Pincode10
      "1109",//  Country11
      "102",//  Phone12
      "140",//  Email13
      "891",//  "Ship By14
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
  render() {
    const { shipper, fetchingShipperDetailsByShipperId } = this.props;
    return (
      <>
        <>
        <Suspense fallback={"Loading..."}>
          <ShipperDetailsHeader
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.state.translatedMenuItems}
          />
          </Suspense>
          {fetchingShipperDetailsByShipperId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap" flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div class="w-[22%]">
                    <ShipperDetailsLeft shipper={shipper}
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                     translatedMenuItems={this.state.translatedMenuItems}
                    />
                  </div>
                  <div class="w-[78%]">
                    <ShipperDetailsRight shipper={shipper}
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                     translatedMenuItems={this.state.translatedMenuItems}
                    />
                  </div>
                </div>
              </Suspense>
            </div>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ shipper }) => ({
  fetchingShipperDetailsByShipperId: shipper.fetchingShipperDetailsByShipperId,
  shipper: shipper.shipperDetailsByShipperId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getShipperByShipperId,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShipperDetails)
);
