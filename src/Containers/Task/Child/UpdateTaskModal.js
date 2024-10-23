import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateTaskForm = lazy(() => import("./UpdateTaskForm"));

const UpdateTaskModal = (props) => {
    const { updateTaskModal, handleUpdateTaskModal, ...formProps } = props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          // title="Update Task"
          title={<FormattedMessage
            id="app.updatetask"
            defaultMessage="Update Task"
          />}
          width={drawerWidth}
          visible={updateTaskModal}
          maskClosable={false}
          destroyOnClose
          onClose={() => handleUpdateTaskModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateTaskForm
             selectedLanguage={props.selectedLanguage}
             translateText={props.translateText}
            />
          </Suspense>
        </StyledDrawer>
      </>
    );
  };
  
  export default UpdateTaskModal;
