
import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ProductAddQulitySpec from "./ProductAddQulitySpec";


const ProductAddQualityCheckModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Quality Spec"
        width="60%"
        visible={props.open}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.setOpen()}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
<ProductAddQulitySpec
particularDiscountData={props.particularDiscountData}
/>

        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ProductAddQualityCheckModal;
