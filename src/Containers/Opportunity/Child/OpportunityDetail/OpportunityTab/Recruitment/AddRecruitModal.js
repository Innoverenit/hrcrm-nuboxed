import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const RecruitForm = lazy(() => import("./RecruitForm"));

const AddRecruitModal = (props) => {
  return (
    <>
      <StyledDrawer
        title="Requirement"
        width="50%"
        visible={props.addRecruitModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleRecruitModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitForm opportunity={props.opportunity}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddRecruitModal;
