import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const CandidateBillableStepper = lazy(()=>import("./CandidateBillableStepper"));




const AddCandidateBillableModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.billable"
          defaultMessage="Billable"
        />}
        width="60%"
        style={{marginTop:"3rem"}}
        visible={props.billableCandidateModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleBillableCandidateModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
<CandidateBillableStepper/>{" "}
       
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateBillableModal;
