import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import AccountOpportunityStepper from "./AccountOpportunityStepper";

const AddAccountOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Quotation" 
        width="60%"
        visible={props.addAccountOpportunityModal}
        onClose={() => props.handleAccountOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountOpportunityStepper handleAccountOpportunityModal={props.handleAccountOpportunityModal}{...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddAccountOpportunityModal;
