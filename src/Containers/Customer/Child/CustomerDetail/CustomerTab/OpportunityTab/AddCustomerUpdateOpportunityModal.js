import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const UpdateCustomerOpportunityForm = lazy(() => import("./UpdateCustomerOpportunityForm"));

const AddCustomerUpdateOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Update Quotation" 
        width="60%"
        visible={props.addUpdateCustomerOpportunityModal}
        onClose={() => props.handleUpdateCustomerOpportunityModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerOpportunityForm opportunityId={props.opportunityId} {...formProps}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
          /> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerUpdateOpportunityModal;
