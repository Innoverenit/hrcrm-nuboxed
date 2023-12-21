import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import CallForm from "./CallForm";
import { FormattedMessage } from "react-intl";
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
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => handleCallModal(false)}
        style={{marginTop:"3rem"}}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CallForm {...formProps} selectedCall={props.selectedCall} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCallModal;
