import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import SuppliersListForm from "./SuppliersListForm";
// import SuppliersPriceCardList from "./SuppliersPriceCardList";

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
          // shipperId={props.shipperId} 
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SupplierAddListModal;
