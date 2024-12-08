import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledModal } from "../../../../../../Components/UI/Antd";
const ProfileForm = lazy(() => import("./ProfileForm"));

const AddTagProfileModal = (props) => {
  return (
    <>
      <StyledModal
        title="Tag Position"
      
        width="24%"
        visible={props.addTagProfileModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onCancel={() => props.handleTagProfileModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProfileForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddTagProfileModal;
