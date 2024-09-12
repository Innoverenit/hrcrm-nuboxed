import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import InvestorLinkedContact from "../InvestorDetail/InvestorDetailTab/InvestorContact/InvestorLinkedContact";
// const UpdateInvestorForm = lazy(() => import("./UpdateInvestorForm.js"));

const ContactsInvestorModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "65%";
  const { addDrawerInvestorContactModal, handleInvestorContModal,RowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={RowData.name}
        width={drawerWidth}
        visible={addDrawerInvestorContactModal}
        onClose={() => handleInvestorContModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <ContactsInvestorCardList RowData={RowData}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
          /> */}
           <InvestorLinkedContact investorDetails={RowData}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}/>
          {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};


export default ContactsInvestorModal;

