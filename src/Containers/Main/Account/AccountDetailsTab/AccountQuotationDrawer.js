import React, { lazy, Suspense,useState } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AddAccountOpportunityModal = (props) => {
  const { ...formProps } = props;

  const [resetStepperKey, setResetStepperKey] = useState(Date.now());

  const resetStepper = () => {
    setResetStepperKey(Date.now()); // Update the key to force reset
};

  return (
    <>
      <StyledDrawer
        title="" 
        width="70%"
        destroyOnClose
        visible={props.addAccountOpportunityModal}
        onClose={() => props.handleAccountOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOpportunityStepper 
          {...formProps}     
          RowData={props.RowData}    
          distributorId={props.distributorId}
          resetStepperKey={resetStepperKey}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddAccountOpportunityModal;
