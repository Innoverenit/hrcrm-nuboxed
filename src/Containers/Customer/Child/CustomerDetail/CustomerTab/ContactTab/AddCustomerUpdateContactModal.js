import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
 const UpdateCustomerContactForm = lazy(() => import("./UpdateCustomerContactForm"));

const AddCustomerUpdateContactModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
      title="Prospect"
        //  title={`${props.translatedMenuItems[13]}`}
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
