import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer, } from "../../../../../../Components/UI/Antd";
const RequirementForm = lazy(() => import("./RequirementForm"));

const AddRequirementModal = (props) => {
  const [visible, setVisible] = useState(true)
  // setTimeout(() => {
  //   return (
  //     setVisible(true)
  //   )
  // }, 3000)
  return (
    <>
      <StyledDrawer
        title="Requirement"
        width="58%"
        visible={props.addRequirementModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleAddRequirementModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          {visible && < RequirementForm />
          }
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddRequirementModal;
