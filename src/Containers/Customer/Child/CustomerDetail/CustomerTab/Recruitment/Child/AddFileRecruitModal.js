import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";
import RecruitmentFileTable from "./RecruitmentFileTable";


const AddFileRecruitModal = (props) => {
  return (
    <>
      <StyledModal
        title={<FormattedMessage
          id="app.requirement"
          defaultMessage="File Requirement"
        />}
        width="40%"
        visible={props.addFileRecruitModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }} 
        style={{ top: 40 }}
        onCancel={() => props.handlefileRecruitModal(false)}
        footer={null}
      >
         <Suspense fallback={<BundleLoader />}>
          <RecruitmentFileTable />
        </Suspense> 
      </StyledModal>
    </>
  );
};

export default AddFileRecruitModal;