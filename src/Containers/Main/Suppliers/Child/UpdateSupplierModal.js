import React, {  Suspense, lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const UpdateSupplierForm =lazy(()=>import("./UpdateSupplierForm"));
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
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateSupplierModal;
