import React, {  Suspense,lazy } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { handleTaskDrawer } from "../../../SettingsAction";
const RecruitTaskForm = lazy(() => import("./RecruitTaskForm"));


const AddTaskModal = (props) => {
  const { addTaskDrawer, handleTaskDrawer, ...formProps } = props;
  console.log(props);
  return (
    <>
      <StyledDrawer
        // title="Workflow"
        title={<FormattedMessage
          id="app.task"
          defaultMessage="Task"
        />}
        width="60%"
        visible={props.addTaskDrawer}
        maskClosable={false}
        destroyOnClose
        style={{ marginTop: "3rem" }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleTaskDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitTaskForm taskTypeId={props.taskTypeId} {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addTaskDrawer: settings.addTaskDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskDrawer,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
