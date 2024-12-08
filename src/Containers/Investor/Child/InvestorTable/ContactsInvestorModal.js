import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LinkedContact = lazy(() => import("../../../Customer/Child/CustomerDetail/CustomerTab/ContactTab/LinkedContact"));

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
            <LinkedContact 
          uniqueId={RowData.investorId}
          type={"investor"}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
          {" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};


export default ContactsInvestorModal;

