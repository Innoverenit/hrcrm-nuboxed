
import React, { lazy, Suspense } from "react";
import SuppliesQualityCheckList from "./SuppliesQualityCheckList"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import SuppliesQualityCheckData from "./SuppliesQualityCheckData"

//const  SuppliesCategoryForm  =lazy(()=>import("./SuppliesCategoryForm"));


const SuppliesQualityCheckModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<div className="truncate w-40"title={props.currentCategory.categoryName}>{props.currentCategory.categoryName}</div>}
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
<SuppliesQualityCheckData
currentCategory={props.currentCategory}
/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliesQualityCheckModal;
