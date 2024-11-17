import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../Components/Placeholder";
import { StyledModal } from "../../Components/UI/Antd";
import ReactChat from "../Main/ReactChat";
const LiveMesssageModal = (props) => {
  return (
    <>
      <StyledModal
         title="Customer"
        width="60%"
        visible={props.addMessageModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => props.handleMessageModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <ReactChat />{" "} */}
        </Suspense>
      </StyledModal>
    </>
  );
};

export default LiveMesssageModal;
