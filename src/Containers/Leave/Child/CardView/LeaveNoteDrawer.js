import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const LeaveNote =lazy(()=>import("./LeaveNote"))

const LeaveNoteDrawer = (props) => {
  const { noteLeaveDrawer, handleLeaveNoteDrawer,leavesItems, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Note - ${leavesItems.leaveId}`}
        width="60%"
        visible={noteLeaveDrawer}
        onClose={() => handleLeaveNoteDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeaveNote leavesItems={leavesItems} />{" "} 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LeaveNoteDrawer;
