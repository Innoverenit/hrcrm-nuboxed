import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";

const ShipperActivityTable = lazy(()=> import ("./ShipperActivityTab/ShipperActivityTable")); 

const TabPane = StyledTabs.TabPane;

const AddShipperActivityModal = (props) => {
  return (
    <div>
      <StyledModal
        title={<FormattedMessage id="app.activity" defaultMessage="Activity"/>}
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
        <ShipperActivityTable shipperId={props.shipperId}
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
         />
      </StyledModal>
    </div>
  );
};
export default AddShipperActivityModal;
