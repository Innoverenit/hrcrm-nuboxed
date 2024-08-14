import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
const DealReportCard = lazy(() => import("./Dealcards/DealReportCard"));
const DealAboutViewCard = lazy(() => import("./Dealcards/DealAboutViewCard"));
const DealAboutCard = lazy(() => import("./Dealcards/DealAboutCard"));

class DealDetailRight extends Component {
  render() {
    const {
        dealDetailsbyID,
    } = this.props;
    return (
      <>
      <div class="flex">    
            <div class=" w-[30%]" >
            <Suspense fallback={<BundleLoader />}>
            <DealAboutViewCard
          dealDetailsbyID={dealDetailsbyID}
        /></Suspense>
        </div>
        <div class=" w-[20%]" >
        <Suspense fallback={<BundleLoader />}>
          <DealAboutCard
          dealDetailsbyID={dealDetailsbyID}
          department={this.props.department}
          partnerLogin={this.props.partnerLogin}
          tradeCurrency={this.props.tradeCurrency}
        /></Suspense>
        </div>
        <div class=" w-[26%]" >
        <Suspense fallback={<BundleLoader />}>
         <DealReportCard
          dealDetailsbyID={dealDetailsbyID}
        /></Suspense>
        </div>
        </div>
        
        
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  // department: auth.userDetails && auth.userDetails.department,
  // partnerLogin: auth.user && auth.userDetails.partnerLogin,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailRight);
