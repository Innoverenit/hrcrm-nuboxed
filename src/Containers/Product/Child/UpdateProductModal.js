import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const UpdateProductForm =lazy(()=>import("./UpdateProductForm"));

const UpdateProductModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Update Product"
        width="60%"
        visible={props.updateProductModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"3rem" }}
        onClose={() => props.handleUpdateProductModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateProductForm />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateProductModal;
