import React, {  Suspense, lazy } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const SuppliersPriceCardList =lazy(()=>import("./SuppliersPriceCardList"));

const SupplierPriceModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.rowdata.name}
        width="65%"
        visible={props.suppliersPriceOpenDrawer}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleSuppliersPriceDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersPriceCardList
            rowdata={props.rowdata}
            translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SupplierPriceModal;
