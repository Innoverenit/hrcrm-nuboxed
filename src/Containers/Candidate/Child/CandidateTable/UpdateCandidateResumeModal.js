import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateCandidateResumeForm = lazy(() => import("./UpdateCandidateResumeForm"));

const UpdateCandidateResumeModal = (props) => {
  const {updateCandidateResumeModal,handleupdateCandidateResumeModal, ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updateResume"
          defaultMessage="Update Resume"
        />}
        width="60%"
        visible={updateCandidateResumeModal}
        onClose={() => handleupdateCandidateResumeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCandidateResumeForm 
          candidateId={props.currentCandidateId}
          handleResponseData={props.handleResponseData}
          responseData={props.responseData}
           handleSetCurrentCandidateId={props.handleSetCurrentCandidateId}
          handleUpdateCandidateModal={props.handleUpdateCandidateModal}
          updateCandidateResumeModal={props.updateCandidateResumeModal}
          {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateCandidateResumeModal;
