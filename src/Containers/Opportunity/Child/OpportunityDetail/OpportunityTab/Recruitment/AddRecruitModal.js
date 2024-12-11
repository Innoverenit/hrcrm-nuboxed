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
        style={{marginTop:"5rem"}}
        visible={props.addRecruitModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
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
