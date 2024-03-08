import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
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
        title={<FormattedMessage
          id="app.contactImport"
          defaultMessage="Contact Import"
        />}
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
