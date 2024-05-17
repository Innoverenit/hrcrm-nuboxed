import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const StatusLeavesForm = lazy(()=>import("./StatusLeavesForm"));


const StatusLeavesModal = (props) => {
  const { updateStatusLeaveModal, handleStatusLeaveModal,leaveId, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={`Status - ${leaveId}`}
        width="60%"
        destroyOnClose
        closable
        visible={updateStatusLeaveModal}
        onClose={() => handleStatusLeaveModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <StatusLeavesForm leaveId={props.leaveId} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default StatusLeavesModal;
