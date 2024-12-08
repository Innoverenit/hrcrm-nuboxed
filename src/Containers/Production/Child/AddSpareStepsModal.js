import React, { lazy, Suspense } from "react";

import SpareStepsForm from "../Child/SpareStepsForm"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
//const OpportunityForm = lazy(() => import("./OpportunityForm"));

const AddSpareStepsModal = (props) => {
  //const { addOpportunityModal, handleOpportunityModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
       title={`${props.step.categoryName} ${props.step.subCategoryName}-${props.step.attributeName} ${props.step.
        subAttributeName}`}
        destroyOnClose
        width="60%"
        visible={props.addSparePartsDrawerModal}
        onClose={() => props.addSpareStepsModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
      <SpareStepsForm 
      step={props.step}
      translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
      productionProductId={props.productionProductId}
      // productionTableData={props.productionTableData}
      />
          {/* <OpportunityForm {...formProps}/> */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddSpareStepsModal;
