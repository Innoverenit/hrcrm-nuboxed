import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import RepairDashboardOrderCloseList from "../../Child/JumpStart/RepairDashboardOrderCloseList"

import { StyledDrawer } from "../../../../Components/UI/Antd";
//import RepairDashboardOrderAddedList from "./InvestorDrawer/RepairDashboardOrderAddedList"


class RepairDashboardCloseModal extends Component {
  render() {
   

    return (
      <div>
        <StyledDrawer
          title="Orders Added"
          width="55em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDashboardRepairOrderCloseModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleDasboardRepairOrderCloseDrawer(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <RepairDashboardOrderCloseList/>
          
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
)(RepairDashboardCloseModal);
