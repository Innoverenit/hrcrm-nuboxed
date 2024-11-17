import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../Components/UI/Antd";
const RecruitForm = lazy(() => import("./RecruitForm"));

const AddRecruiterModal = (props) => {
  return (
    <>
      <StyledModal

        title="Requirement" 
        width="29%"
        visible={props.addRecruitModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop: "5rem" }}
        onCancel={() => props.handleRecruitModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitForm />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default AddRecruiterModal;
