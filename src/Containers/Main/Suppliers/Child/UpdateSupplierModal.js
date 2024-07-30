import React, {  Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import UpdateSupplierForm from "./UpdateSupplierForm";

const UpdateSupplierModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.translatedMenuItems[13]}
        width="60%"
        visible={props.updateSupplierModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleUpdateSupplierModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateSupplierForm
            rowdata={props.rowdata}
            translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateSupplierModal;
