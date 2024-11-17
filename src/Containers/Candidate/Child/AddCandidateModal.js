import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CandidateForm = lazy(() => import("./CandidateForm"));

const AddCandidateModal = props => {
  const { addCandidateModal, handleCandidateModal,responseData, } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.candidate"
          defaultMessage="Candidate"
        />}
        width="60%"
        visible={addCandidateModal}
        onClose={() => handleCandidateModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CandidateForm
          initialValues={props.initialValues}
           responseData={responseData} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCandidateModal;
