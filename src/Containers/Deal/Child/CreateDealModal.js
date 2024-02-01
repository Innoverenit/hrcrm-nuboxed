import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const DealForm = lazy(() => import("./DealForm"));

const CreateDealModal = (props) => {
  const {opencreateDealModal,handleDealModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.deal"
          defaultMessage="Deal"
        />}
        width={drawerWidth}
        visible={opencreateDealModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleDealModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <DealForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CreateDealModal;
