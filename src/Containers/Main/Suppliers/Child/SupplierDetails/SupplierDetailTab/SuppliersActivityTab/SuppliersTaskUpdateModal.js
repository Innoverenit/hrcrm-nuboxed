import React, {  Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import SuppliersTaskUpdateForm from "../SuppliersActivityTab/SuppliersTaskUpdateForm";

const SuppliersTaskUpdateModal = (props) => {
  // console.log(props.ActivitysId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Task"
        width="55vw"
        visible={props.updateTaskModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateTaskModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersTaskUpdateForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default SuppliersTaskUpdateModal;
