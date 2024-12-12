import React, {  Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import SuppliersEventUpdateForm from "./SuppliersEventUpdateForm";

const SuppliersEventUpdateModal = (props) => {
  // console.log(props.ActivitysId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Event"
        width="55vw"
        visible={props.updateEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersEventUpdateForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default SuppliersEventUpdateModal;
