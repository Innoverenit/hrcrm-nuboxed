import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const CallForm = lazy(() => import("./CallForm"));
const AddCallModal = (props) => {
  const { addCallModal, handleCallModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.schedulecall"
          defaultMessage="Schedule Call"
        />}
        width={drawerWidth}
        visible={addCallModal}
        onClose={() => handleCallModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <CallForm {...formProps} selectedCall={props.selectedCall} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCallModal;
