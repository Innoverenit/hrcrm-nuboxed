import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateLeavesForm = lazy(() => import("./UpdateLeavesForm"));

const UpdateLeavesModal = (props) => {
  const { updateLeaveModal, handleUpdateLeaveModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        //title="Apply for Leaves"
        title={<FormattedMessage
          id="app.applyforleaves"
          defaultMessage="Update Leaves"
        />}
        width="60%"
        visible={updateLeaveModal}
        onClose={() => handleUpdateLeaveModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeavesForm leaveId={props.leaveId} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateLeavesModal;
