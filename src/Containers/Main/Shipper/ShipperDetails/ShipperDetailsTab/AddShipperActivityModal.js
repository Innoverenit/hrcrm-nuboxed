import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
const ShipperActivityTable = lazy(() =>
  import("./ShipperActivitytab/ShipperActivityTable")
);

const TabPane = StyledTabs.TabPane;

const AddShipperActivityModal = (props) => {
  return (
    <div>
      <StyledModal
        title="Activity"
        width="68vw"
        visible={props.addShipperActivityTableModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ top: 40 }}
        onCancel={() => props.handleShipperActivityTableModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}></Suspense>
        <ShipperActivityTable shipperId={props.shipperId} />
      </StyledModal>
    </div>
  );
};
export default AddShipperActivityModal;
