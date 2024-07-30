import React, { Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import SuppliersCallUpdateForm from "./SuppliersCallUpdateForm";

const SuppliersCallUpdateModal = (props) => {
  // console.log(props.ActivitysId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Call"
        width="55vw"
        visible={props.updateCallModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateCallModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersCallUpdateForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default SuppliersCallUpdateModal;
