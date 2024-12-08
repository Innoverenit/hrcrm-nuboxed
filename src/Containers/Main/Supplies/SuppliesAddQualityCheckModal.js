
import React, { lazy, Suspense } from "react";
import SuppliesQualityCheckList from "./SuppliesQualityCheckList"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import SuppliesAddQualitySpecs from "./SuppliesAddQualitySpecs"
//import SuppliesQualityCheckData from "./SuppliesQualityCheckData"

//const  SuppliesCategoryForm  =lazy(()=>import("./SuppliesCategoryForm"));


const SuppliesAddQualityCheckModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Quality Spec"
        width="60%"
        visible={props.modalVisible2}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.closeModal2()}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
  {/* <SuppliesQualityCheckList
   currentCategory={props.currentCategory}
  /> */}
<SuppliesAddQualitySpecs
 currentCategory={props.currentCategory}
 closeModal2={props.closeModal2}
/>

        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliesAddQualityCheckModal;
