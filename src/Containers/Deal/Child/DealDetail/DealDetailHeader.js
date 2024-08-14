import React, { Component,lazy, Suspense} from "react";
import { ActionHeader } from "../../../../Components/Utils";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const DealDetailActionLeft = lazy(() => import("./DealDetailActionLeft"));
class DealDetailHeader extends Component {
  render() {
    const { opportunity, fetchingOpportunityById } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <>
            <Suspense fallback={<BundleLoader />}>
              <DealDetailActionLeft/>
              </Suspense>
           
            </>
          }
       
        />
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, account }) => ({
  opportunity: opportunity.opportunity,
  // fetchingAccountById: account.fetchingAccountById,
  // account: account.account,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealDetailHeader);
