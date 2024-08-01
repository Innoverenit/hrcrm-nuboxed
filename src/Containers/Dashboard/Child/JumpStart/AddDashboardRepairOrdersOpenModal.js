import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import RepairDashboardOrderOpenList from "./InvestorDrawer/RepairDashboardOrderOpenList"


class RepairDashboardOpenModal extends Component {
  render() {
   

    return (
      <div>
        <StyledDrawer
          title="Orders Opened"
          width="55em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDashboardRepairOrderOpenModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleDasboardRepairOrderOpenDrawer(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <RepairDashboardOrderOpenList/>
          
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
  // opportunityId: opportunity.opportunity.opportunityId,
  // candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepairDashboardOpenModal);
