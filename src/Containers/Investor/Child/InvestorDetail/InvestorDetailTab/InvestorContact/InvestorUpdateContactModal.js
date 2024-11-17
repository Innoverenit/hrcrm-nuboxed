import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
 const UpdateInvestorContactForm = lazy(() => import("./UpdateInvestorContactForm"));

const InvestorUpdateContactModal = (props) => {
  const {currentRowData,invstrContactUpdateModal,handleUpdateInvestorContactModal,...formProps } = props;

  return (
    <>
      <StyledDrawer
         title={
          <FormattedMessage id="app.contact" defaultMessage="Contact" />
        }
        width="60%"
        visible={invstrContactUpdateModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleUpdateInvestorContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateInvestorContactForm 
           currentRowData={currentRowData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
          /> {" "}
  
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default InvestorUpdateContactModal;
