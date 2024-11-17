import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const TaskForm=lazy(()=>import("./TaskForm"));

const AddTaskModal = (props) => {
  const { addTaskModal, handleTaskModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        //title="Schedule Task"
        title={<FormattedMessage
          id="app.scheduletask"
          defaultMessage="Schedule Task"
        />}
        width={drawerWidth}
        visible={addTaskModal}
        onClose={() => handleTaskModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <TaskForm {...formProps} selectedTask={props.selectedTask} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddTaskModal;
