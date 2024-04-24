import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import AddOrgDocumentForm from "./AddOrgDocumentForm";


const AddOrgDocumentModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="Document"
        width="70%"
        visible={props.organizationDocumentDrawer}
        onClose={() => props.handleOrganizationDocumentDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>

         <AddOrgDocumentForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOrgDocumentModal;
