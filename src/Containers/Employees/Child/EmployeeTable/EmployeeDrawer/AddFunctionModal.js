import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";
// const AccountForm = lazy(() => import("./AccountForm"));

const AddFunctionModal = (props) => {
  return (
    <>
      <StyledModal
        title="Customer"
        width="60%"
        visible={props.addInnoventoryModal}
        maskClosable={false}
        destroyOnClose
        // maskStyle={{transition: '0.5s filter linear', filter: 'blur(1.25em)', width: '100%', height: '100%', padding: '3.125em', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleInnoventoryModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>{/* <AccountForm /> */}</Suspense>
      </StyledModal>
    </>
  );
};

export default AddFunctionModal;
