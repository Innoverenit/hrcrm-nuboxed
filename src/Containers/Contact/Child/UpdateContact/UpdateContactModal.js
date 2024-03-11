import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateContactForm = lazy(() => import("./UpdateContactForm"));

const UpdateContactModal = props => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateContactModal, handleUpdateContactModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.contactData.fullName}
        width={drawerWidth}
        visible={updateContactModal}
        onClose={() => handleUpdateContactModal(false)}

      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateContactForm contactId={props.contactData.contactId} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateContactModal;
