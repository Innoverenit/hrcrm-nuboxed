import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const ResumeForm = lazy(() => import("./ResumeForm"));

const AddCandidateResumeModal = (props) => {
  const { addCandidateResumeModal, handleCandidateResumeModal,
    //  ...formProps 
    } =
    props;

  return (
    <>
      <StyledDrawer
        title="Resume"
        width="60%"
        visible={addCandidateResumeModal}
        onClose={() => handleCandidateResumeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ResumeForm
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
            addCandidateResumeModal={props.addCandidateResumeModal}
            handleResponseData={props.handleResponseData}
            responseData={props.responseData}
            // {...formProps}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateResumeModal;
