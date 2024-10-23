
import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";

const  SuppliesCategoryForm  =lazy(()=>import("./SuppliesCategoryForm"));


const SuppliesCategoryModal = (props) => {

  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Material Category"
        width="60%"
        visible={props.modalVisible}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.closeModal()}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliesCategoryForm closeModal={props.closeModal} onSuccess={props.handleNewCategory}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage} /> 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliesCategoryModal;
