import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LeaveForm = lazy(() => import("./LeaveForm"));
const AddLeavesModal = (props) => {
  const { addLeaveModal, handleLeavesModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
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
        onClose={() => handleLeavesModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeaveForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddLeavesModal;
