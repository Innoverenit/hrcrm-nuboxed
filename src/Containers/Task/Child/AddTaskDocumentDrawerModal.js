import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
const  TaskDocumentList = lazy(() => import("../Child/TaskDocumentList"));
class AddTaskDocumentDrawerModal extends Component {
  render() {
    

    return (
      <div>
        <StyledDrawer
          title="Document"
          width="60em"
          style={{ marginTop: "5rem" }}
          visible={this.props.addDocumentTaskDrawerModal}
          //   maskClosable={false}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          //   onCancel={() => this.props.handleCandidateEmailModal(false)}
          onClose={() => this.props.handleTaskDocumentDrawerModal(false)}
          //style={{ top: 40 }}
          //   footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
        <TaskDocumentList
        currentNameId={this.props.currentNameId}
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
)(AddTaskDocumentDrawerModal);
