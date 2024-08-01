import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ContactInvestForm = lazy(() => import("./ContactInvestForm"));

function AddContactInvestModal (props) {
  const { addContactInvestModal, handleContactInvestModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.contactinvest "
          defaultMessage="Contact - Investor"
        />}
        width={drawerWidth}
        visible={addContactInvestModal}
        closable
        destroyOnClose
        onClose={() => handleContactInvestModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactInvestForm {...formProps} 
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
             translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactInvestModal;
