import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddOrganizationForm = lazy(() =>
  import("./AddOrganizationForm")
);
const AddOrganizationModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.addOrganization"
          defaultMessage="Add Organization"
        />}
        width={drawerWidth}
        visible={props.addOrganizationModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleOrganizationModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <AddOrganizationForm 
           selectedLanguage={props.selectedLanguage}
           translateText={props.translateText}/>{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddOrganizationModal;
