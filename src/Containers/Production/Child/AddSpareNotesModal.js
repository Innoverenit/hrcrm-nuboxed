import React, { lazy, Suspense } from "react";

import SpareNotesList from "../Child/SpareNotesList"
//import SpareStepsForm from "../Child/SpareStepsForm"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
//const OpportunityForm = lazy(() => import("./OpportunityForm"));

const AddSpareNotesModal = (props) => {
  //const { addOpportunityModal, handleOpportunityModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
    //    title={`${props.step.categoryName} ${props.step.subCategoryName}-${props.step.attributeName} ${props.step.
    //     subAttributeName}`}
    title="Description"
        width="60%"
        destroyOnClose
        visible={props.addSpareNotesDrawerModal}
        onClose={() => props.addSpareNotesModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
           <SpareNotesList
            step={props.step}
           />
      {/* <SpareStepsForm 
      step={props.step}
      productionTableData={props.productionTableData}
      /> */}
          {/* <OpportunityForm {...formProps}/> */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddSpareNotesModal;
