import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
import ContactImportForm from "./ContactImportForm";

const AddContactImportModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { addContactImportModal, handleContactImportModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Contact Import"
       
        width={drawerWidth}
        visible={addContactImportModal}
        onClose={() => handleContactImportModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactImportForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactImportModal;
