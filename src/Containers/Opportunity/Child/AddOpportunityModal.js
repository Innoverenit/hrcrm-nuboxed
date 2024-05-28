import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import OpportunityStepper from "./OpportunityStepper";

const AddOpportunityModal = (props) => {
  const { addOpportunityModal, handleOpportunityModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.quotation"
          defaultMessage="Quotation"
        />}
        width="60%"
        visible={addOpportunityModal}
        onClose={() => handleOpportunityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <OpportunityForm {...formProps}/> */}
          <OpportunityStepper/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;
