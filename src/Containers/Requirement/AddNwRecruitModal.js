import React, { lazy, Suspense } from "react";
import RecruitNwForm from "./RecruitNwForm";
import { StyledDrawer } from "../../Components/UI/Antd";
import { BundleLoader } from "../../Components/Placeholder";


const AddNwRecruitModal = (props) => {
  return (
    <>
      <StyledDrawer
        title="Requirement"
        width="58%"
        visible={props.addNwRecruitModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleNwRecruitModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitNwForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddNwRecruitModal;
