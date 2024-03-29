import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ProjectsForm =lazy(()=> import('./ProjectsForm'));

const AddProjectsModal = (props) => {
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.project"
          defaultMessage="Project"
        />}
        width="60%"
        style={{marginTop:"3rem"}}
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
