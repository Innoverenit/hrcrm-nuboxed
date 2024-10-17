import React, { Component, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { StyledDrawer } from "../../../Components/UI/Antd";


class AddTaskFeedbackDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={this.props.currentNameId.taskName}
          width="64%"
          visible={this.props.addDrawerTaskFeedbackModal}
          closable
          placement="right"
          destroyOnClose
          onClose={() => this.props.handleTaskFeedbackDrawerModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            {/* <NotesForm currentNameId={this.props.currentNameId} 
            taskId={this.props.currentNameId.taskId} 
            /> */}
          </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ opportunity, candidate }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskFeedbackDrawerModal);
