import React, { Suspense, lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const SuppliersListForm =lazy(()=>import("./SuppliersListForm"));
const SupplierAddListModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.rowdata.name}
        width="60%"
        visible={props.suppliersListOpenDrawer}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleSuppliersListDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersListForm
            rowdata={props.rowdata}
            translatedMenuItems={props.translatedMenuItems}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SupplierAddListModal;
