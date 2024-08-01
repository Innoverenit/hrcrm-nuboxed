import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CustomerForm = lazy(() => import("./CustomerForm"));

const AddCustomerModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    const handleClose = () => {
      window.location.reload(true);
    };

    
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.prospect"
          defaultMessage="Prospect"
        />}
        width={drawerWidth}
        visible={props.addCustomerModal}
        destroyOnClose
        onClose={() => {
          // handleClose();
        
          props.handleCustomerModal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerModal;
