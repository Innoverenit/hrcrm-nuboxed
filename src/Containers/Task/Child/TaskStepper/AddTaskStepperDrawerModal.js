import React, { Component, Suspense,lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const  StepperTaskForm = lazy(() => import("./StepperTaskForm"));
class AddTaskStepperDrawerModal extends Component {
  render() {
    //  console.log("data5", this.props.currentNameId.taskName);

    return (
      <div>
        <StyledDrawer
        // title="Notes"
          title={`${this.props.currentNameId.taskName}`}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={this.props.addDrawerTaskStepperModal}
          onClose={() => this.props.handleTaskStepperDrawerModal(false)}
        >
           <Suspense fallback={<BundleLoader />}>
            <StepperTaskForm currentNameId={this.props.currentNameId} 
            taskId={this.props.currentNameId.taskId} 
            />
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
)(AddTaskStepperDrawerModal);
