import React, { Suspense } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
 import SkillBarChartForm from "../../../OpportunityTab/Recruitment/Child/SkillBarChartForm";

const SkillBarChartModal = (props) => {
  const { ...formProps } = props;
  console.log("Post",props.candidatePostData)
  return (
    <>
      <StyledDrawer
        title="Description"
        width="70vw"
        visible={props.showBarChartModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleBarChartOrderModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {/* <OrderJumpStart particularRowData={props.particularRowData} />
          <div class=" mt-3" /> */}
          <SkillBarChartForm 
          skillsCount={props.skillsCount}
           candidatePostData={props.candidatePostData}
          //particularRowData={props.particularRowData} 
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SkillBarChartModal;
