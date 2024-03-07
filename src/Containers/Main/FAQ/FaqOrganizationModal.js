import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const FaqForm = lazy(() =>
  import("./FaqForm")
);



const FaqOrganizationModal = (props) => {
  return (
    <>
      <StyledDrawer
       title="FAQ"
        width="60%"
        visible={props.faqModal}
        onClose={() => props.handleFAQModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>

          <FaqForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default FaqOrganizationModal;
