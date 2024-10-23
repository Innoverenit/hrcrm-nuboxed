import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactInvestForm = lazy(() => import("./UpdateContactInvestForm"));

const UpdateContactInvestModal = props => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateContactInvestModal, handleUpdateContactInvestModal,contactiData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={contactiData.fullName}
        width={drawerWidth}
        visible={updateContactInvestModal}
        closable
        destroyOnClose
        onClose={() => handleUpdateContactInvestModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateContactInvestForm contactiData={contactiData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateContactInvestModal;
