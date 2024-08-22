import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
 const UpdateCustomerContactForm = lazy(() => import("./UpdateCustomerContactForm"));

const AddCustomerUpdateContactModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
         title={
          <FormattedMessage id="app.updateContact" defaultMessage="Update Contact" />
        }
        width="60%"
        visible={props.addUpdateCustomerContactModal}
        onClose={() => props.handleUpdateCustomerContactModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerContactForm 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
            defaultCustomers={props.defaultCustomers}
            customerId={props.customerId}
           contactId={props.contactId} 
          /> {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerUpdateContactModal;
