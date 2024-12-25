import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ProjectsForm =lazy(()=> import('./ProjectsForm'));

const AddProjectsModal = (props) => {
  return (
    <>
      <StyledDrawer
        title="Project"
        width="50%"
        visible={props.addProjectsModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleProjectsModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProjectsForm />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddProjectsModal;
