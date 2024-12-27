import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AddEventModal = props => {
  const { addEventModal, handleEventModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Schedule Event"
        width="50%"
        visible={addEventModal}
        maskClosable={false}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <EventForm {...formProps}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
           translatedMenuItems={props.translatedMenuItems} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddEventModal;
