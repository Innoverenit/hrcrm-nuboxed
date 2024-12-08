import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import UploadOrganizationForm from "./UploadOrganizationForm"
// const CustomerForm = lazy(() => import("./CustomerForm"));

const AddUploadOrganizationModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="Upload"
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.updateOrganizationModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleUpdateOrganizationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <CustomerForm />{" "} */}
          <UploadOrganizationForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddUploadOrganizationModal;
