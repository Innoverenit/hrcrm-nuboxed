import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateProjectsForm =lazy(()=> import('./UpdateProjectsForm'));

const UpdateProjectsModal = (props) => {
  return (
    <>
      <StyledDrawer

         title={props.projectData.projectName}
        width="60%"
        style={{marginTop:"3rem"}}
        visible={props.updateProjectsModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleUpdateProjectsModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateProjectsForm projectId={props.projectData.projectId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateProjectsModal;
