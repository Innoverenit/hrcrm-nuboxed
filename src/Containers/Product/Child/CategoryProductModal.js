import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import CategoryProductForm from "./CategoryProductForm";


const CategoryProductModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Category Product"
        width="60%"
        visible={props.categoryProductModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleCategoryModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <CategoryProductForm/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default CategoryProductModal;
