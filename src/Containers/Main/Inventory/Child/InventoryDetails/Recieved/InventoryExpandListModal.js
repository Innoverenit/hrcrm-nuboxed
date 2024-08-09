import React, { lazy, Suspense } from "react";
import { Modal } from "antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import AccountPhoneTaskTable from "../../../../Account/AccountDetailsTab/AccountOrderTab/AccountPhoneTaskTable";


const InventoryExpandListModal = (props) => {
  const { handleInventoryexpand,inventoryExpandList, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      
        <Modal
        //  title="Task"
          title={props.particularRowData.imei}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          footer={null}
          visible={inventoryExpandList}
          onCancel={() => handleInventoryexpand(false)}
        >
        <Suspense fallback={<BundleLoader />}>
        <AccountPhoneTaskTable
              phoneId={props.particularRowData.phoneId}          
              particularRowData={props.particularRowData} />
        </Suspense>
      </Modal>
    </>
  );
};

export default InventoryExpandListModal;
