import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import { getDealDetailById } from "../../DealAction";
const DealDetailHeader = lazy(() => import("./DealDetailHeader"));
const DealDetailLeft = lazy(() => import("./DealDetailLeft"));
const DealDetailRight = lazy(() => import("./DealDetailRight"));

class DealDetail extends Component {
  componentDidMount() {
    this.props.getDealDetailById(this.props.match.params.invOpportunityId);
  }
  render() {
    const { dealDetailsbyID, fetchDealdetails } = this.props;

    return (
      <>
       <Suspense fallback={<BundleLoader />}>
        <DealDetailHeader
          dealDetailsbyID={dealDetailsbyID}
          fetchDealdetails={fetchDealdetails}
        /></Suspense>
        {fetchDealdetails ? (
          <MainWrapper>
            <BundleLoader />
          </MainWrapper>
        ) : (
          <div class=" flex">
            <Suspense fallback={""}>
            <div class=" flex flex-no-wrap w-full">
                <div class=" w-[20%]" >
                  <DealDetailLeft dealDetailsbyID={dealDetailsbyID} />
                </div>
                <div class=" w-[80%]" >
                  <DealDetailRight 
                  dealDetailsbyID={dealDetailsbyID}
                  />
                </div>
              </div>
            </Suspense>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ deal, auth }) => ({
  fetchDealdetails: deal.fetchDealdetails,
  fetchDealdetailsfailure: deal.fetchDealdetailsfailure,
  dealDetailsbyID: deal.dealDetailsbyID,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
     getDealDetailById
     }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DealDetail);
