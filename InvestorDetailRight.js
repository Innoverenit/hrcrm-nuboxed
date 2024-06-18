import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const InvestorDetailTab = lazy(() => import("./InvestorDetailTab/InvestorDetailTab"));

function InvestorDetailRight (props) {
    return (
      <div class=" w-full">
        <InvestorDetailTab investorDetails={props.investorDetails} />
      </div>
    );
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestorDetailRight);
