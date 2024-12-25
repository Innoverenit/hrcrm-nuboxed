import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const CustomerOpportunityForm = lazy(() => import("./CustomerOpportunityForm"));

const AddOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
       title="quotation"
      //  {`${props.translatedMenuItems[0]}`}
   
        width="50%"
        visible={props.addCustomerOpportunityModal}
        onClose={() => props.handleCustomerOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerOpportunityForm {...formProps} 
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
            translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOpportunityModal;
