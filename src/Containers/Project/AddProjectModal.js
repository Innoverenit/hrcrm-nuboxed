import React, { lazy, Suspense } from "react";

import { StyledModal } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";
const ProjectForm = lazy(() => import("./ProjectForm"));

const AddProjectModal = (props) => {
  const { addProjectModal, handleProjectModal, ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Schedule Project"
        width="55vw"
        visible={addProjectModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => handleProjectModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProjectForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddProjectModal;
