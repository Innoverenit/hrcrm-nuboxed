import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import TimeZoneForm from "./TimeZoneForm";
const AddTimeZoneModal = props => {
  const { addTimeZoneModal, handleTimeZoneModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        // title="Set TimeZone"
        title="Set TimeZone"
    
        width="40vw"
        visible={addTimeZoneModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleTimeZoneModal(false)}
        style={{ top: 40 }}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <TimeZoneForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddTimeZoneModal;
