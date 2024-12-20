import React, { lazy, Suspense } from "react";

import SpareNotesList from "../Child/SpareNotesList"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";

const AddSpareNotesModal = (props) => {

  return (
    <>
      <StyledDrawer
    title="Description"
        width="60%"
        destroyOnClose
        visible={props.addSpareNotesDrawerModal}
        onClose={() => props.addSpareNotesModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
           <SpareNotesList
            step={props.step}
            translatedMenuItems={props.translatedMenuItems}
           />
     
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddSpareNotesModal;
