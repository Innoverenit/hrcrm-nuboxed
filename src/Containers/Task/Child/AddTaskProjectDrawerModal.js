import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
const ProjectTaskTable = lazy(() => import("./ProjectTaskTable"));

class AddTaskProjectDrawerModal extends Component {
  render() {
    console.log("data5", this.props.data);

    return (
      <div>
        <StyledDrawer
          title={this.props.data.taskName}
          width="60em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDrawerTaskProjectModal}
          //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          //   onCancel={() => this.props.handleCandidateEmailModal(false)}
          onClose={() => this.props.handleTaskProjectDrawerModal(false)}
          //style={{ top: 40 }}
          //   footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ProjectTaskTable data={this.props.data} />
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCandidateById
      //getCandidateDocument
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskProjectDrawerModal);
