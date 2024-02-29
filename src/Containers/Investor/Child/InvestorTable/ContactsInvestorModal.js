import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import ContactsInvestorCardList from "./ContactsInvestorCardList";
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
          <ContactsInvestorCardList RowData={RowData} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};


export default ContactsInvestorModal;

