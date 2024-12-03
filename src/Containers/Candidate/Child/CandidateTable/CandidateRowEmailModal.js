import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";


const CandidateRowEmailModal = props => {
  return (
    <>
      <StyledDrawer
        title="Email"    
        width="35%"
        visible={props.addemaildrawermodal}
        onClose={() => props.handleemaildrawermodal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <NotificationTab/> */}
          hello
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CandidateRowEmailModal;
