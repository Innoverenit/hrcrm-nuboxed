import React, { Component,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getShipperByShipperId } from "./ShipperAction";
import {  MainWrapper } from "../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../Components/Placeholder";
import ShipperDetailsHeader from "./ShipperDetailsHeader";
import ShipperDetailsRight from "./ShipperDetails/ShipperDetailsTab/ShipperDetailsRight";
import ShipperDetailsLeft from "./ShipperDetails/ShipperDetailsLeft";

class ShipperDetails extends Component {
  componentDidMount() {
   this.props.getShipperByShipperId(this.props.match.params.shipperId);
  }
  render() {
    const { shipper, fetchingShipperDetailsByShipperId } = this.props;
    return (
      <>
        <>
          <ShipperDetailsHeader
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
          />
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
                    />
                  </div>
                  <div class="w-[78%]">
                    <ShipperDetailsRight shipper={shipper}
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
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
