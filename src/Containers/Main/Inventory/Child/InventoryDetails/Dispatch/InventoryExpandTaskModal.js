import React, { lazy, Suspense } from "react";
import { Modal } from "antd";
import DispatchTaskTable from "./DispatchTaskTable";
import { BundleLoader } from "../../../../../../Components/Placeholder";


const InventoryExpandTaskModal = (props) => {
  const { handleInventoryTask,inventoryExpandTask, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      
        <Modal
        //  title="Task"
         // title={props.rowData.imei}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          footer={null}
          visible={inventoryExpandTask}
          onCancel={() => handleInventoryTask(false)}
        >
        <Suspense fallback={<BundleLoader />}>
        <DispatchTaskTable
              phoneId={props.rowData.phoneId}          
              rowData={props.rowData} />
        </Suspense>
      </Modal>
    </>
  );
};

export default InventoryExpandTaskModal;
