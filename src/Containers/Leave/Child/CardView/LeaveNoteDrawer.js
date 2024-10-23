import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";



const LeaveNoteDrawer = (props) => {
  const { noteLeaveDrawer, handleLeaveNoteDrawer,leavesItems, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Notes - ${leavesItems.leaveId}`}
        width="60%"
        visible={noteLeaveDrawer}
        onClose={() => handleLeaveNoteDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
   
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LeaveNoteDrawer;
