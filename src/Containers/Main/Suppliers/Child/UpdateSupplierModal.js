import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../Components/UI/Antd";
//  const UpdateShipperForm = lazy(() => import("./UpdateShipperForm"));

const UpdateSupplierModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage id="app.shipper" defaultMessage="Shipper"/>}
        width="60%"
        visible={props.updateSupplierModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleUpdateSupplierModal(false)}
        footer={null}
      >
        {/* <Suspense fallback={<BundleLoader />}>
          <UpdateShipperForm 
            rowdata={props.rowdata}
          shipperId={props.shipperId} />
        </Suspense> */}
      </StyledDrawer>
    </>
  );
};

export default UpdateSupplierModal;
