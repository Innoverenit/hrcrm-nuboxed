import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import SuppliersPriceCardList from "./SuppliersPriceCardList";

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
          // shipperId={props.shipperId} 
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SupplierPriceModal;
