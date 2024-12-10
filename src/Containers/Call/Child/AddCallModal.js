import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";

const CallForm = lazy(() => import("./CallForm"));
const AddCallModal = (props) => {
  const { addCallModal, handleCallModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "50%";
  return (
    <>
      <StyledDrawer
        title="Schedule Call"
        
        width={drawerWidth}
        visible={addCallModal}
        onClose={() => handleCallModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <CallForm {...formProps} selectedCall={props.selectedCall}
           selectedLanguage={props.selectedLanguage}
           translateText={props.translateText}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCallModal;
