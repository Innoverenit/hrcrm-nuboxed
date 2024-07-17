import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
 const UpdateShipperForm = lazy(() => import("./UpdateShipperForm"));

const UpdateShipperModal = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.translatedMenuItems[11]}
        width="60%"
        visible={props.updateShipperModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleUpdateShipperModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateShipperForm 
            rowdata={props.rowdata}
          shipperId={props.shipperId}
          translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateShipperModal;
