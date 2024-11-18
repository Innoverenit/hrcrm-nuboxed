import React, { lazy, Suspense } from "react";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

 const UpdateRemarkForm = lazy(() => import("./UpdateRemarkForm"));

const UpdateRemarkModal = props => {
  const { updateRemarkModal, handleUpdateRemarkModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Feedback"
        
        width="22%"
        visible={updateRemarkModal}
        closable
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: "1.2em" }}
        onCancel={() => handleUpdateRemarkModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateRemarkForm 
            stageList={props.stageList}
            recruitment_stage_note_id={props.recruitment_stage_note_id}
          
           />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateRemarkModal;
