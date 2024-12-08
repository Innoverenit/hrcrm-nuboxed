import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

import { StyledDrawer, StyledModal } from "../../../../../../../Components/UI/Antd";
const CustomerForm = lazy(() => import("./CustomerForm"));

const AddCustomerModal = (props) => {
  return (
    <>
      <StyledDrawer
        title="Requirement"

        width="58%"
        visible={props.addCustomerModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onClose={() => props.handleCustomerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CustomerForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddCustomerModal;
