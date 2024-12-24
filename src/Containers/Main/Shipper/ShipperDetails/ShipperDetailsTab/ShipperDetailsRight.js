import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
const ShipperDetailsTab =lazy(()=>import("../ShipperDetailsTab/ShipperDetailsTab"));

class ShipperDetailsRight extends Component {
  render() {
    console.log(this.props.shipper);
    return (
      <div class="w-full">
        <Suspense fallback={<BundleLoader />}>
          <ShipperDetailsTab shipper={this.props.shipper}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
          />
        </Suspense>
      </div>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDetailsRight);
