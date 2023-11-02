import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LeaveForm = lazy(() => import("./LeaveForm"));
const AddLeavesModal = (props) => {
  const { addLeaveModal, handleLeavesModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Apply for Leaves"
        />}
        width={drawerWidth}
        visible={addLeaveModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleLeavesModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeaveForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddLeavesModal;
