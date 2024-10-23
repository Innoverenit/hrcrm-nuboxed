import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const InvestorDetailTab = lazy(() => import("./InvestorDetailTab/InvestorDetailTab"));

function InvestorDetailRight (props) {
    return (
      <div class=" w-full">
        < Suspense fallback={"Loading..."}>
        <InvestorDetailTab investorDetails={props.investorDetails}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage} />
         </Suspense>
      </div>
    );
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorDetailRight);
