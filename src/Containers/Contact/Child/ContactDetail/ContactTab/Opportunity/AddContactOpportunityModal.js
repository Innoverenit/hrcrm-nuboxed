import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const ContactOpportunityForm = lazy(() => import("./ContactOpportunityForm"));

const AddContactOpportunityModal = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={`${props.translatedMenuItems[0]}`
        }
        width="63%"
        visible={props.addContactOpportunityModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleContactOpportunityModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ContactOpportunityForm 
           contactId={ props.contactId }
          {...formProps} 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddContactOpportunityModal;
