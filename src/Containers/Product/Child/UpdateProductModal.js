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
        onClose={() => props.handleUpdateProductModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateProductForm
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateProductModal;
