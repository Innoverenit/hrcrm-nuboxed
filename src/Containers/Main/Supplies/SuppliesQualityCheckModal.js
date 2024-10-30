
import React, { lazy, Suspense } from "react";
import SuppliesQualityCheckList from "./SuppliesQualityCheckList"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";

//const  SuppliesCategoryForm  =lazy(()=>import("./SuppliesCategoryForm"));


const SuppliesQualityCheckModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Quality Spec"
        width="60%"
        visible={props.modalVisible1}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.closeModal1()}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
  {/* <SuppliesQualityCheckList
   currentCategory={props.currentCategory}
  /> */}
  Hello
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliesQualityCheckModal;
