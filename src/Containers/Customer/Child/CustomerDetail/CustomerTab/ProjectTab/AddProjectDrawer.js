import React, { Suspense } from "react";

import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import CustomerProjectForm from "./CustomerProjectForm";

const AddProjectDrawer = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title="Project" 
        width="45%"
        visible={props.addCustomerProjectDrawer}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleCustomerProjectDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerProjectForm {...formProps} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddProjectDrawer;
