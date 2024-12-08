import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../Components/UI/Antd";

import LevelData from "./LevelData"
class RefurbishLevelModal extends Component {
  render() {
   

    return (
      <div>
        <StyledDrawer
          title="Level"
          width="60%"
          visible={this.props.addRefurbishLevelModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handleRefurbishLevelModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <LevelData
            currentLevel={this.props.currentLevel.level}
            phoneId={this.props.currentLevel.phoneId}
          />
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({
//   opportunityId: opportunity.opportunity.opportunityId,
//   candidate: candidate.candidate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishLevelModal);
