import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import UpdateSupplierContactForm from "./UpdateSupplierContactForm";

const UpdateSupplierContactModal = (props) => {
  //   console.log(props.productId);
  const { ...formProps } = props;
  return (
    <>
      <StyledModal
        title="Update Supplier Contact"
        width="65vw"
        visible={props.updateSupplierContactModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleUpdateSupplierContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateSupplierContactForm supplierId={props.supplierId} />
        </Suspense>
      </StyledModal>
    </>
  );
};

export default UpdateSupplierContactModal;
