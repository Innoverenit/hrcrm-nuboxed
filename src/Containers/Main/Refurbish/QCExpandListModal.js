import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DistributorPhoneTaskTable from "./DistributorPhoneTaskTable";
import { Modal } from "antd";



const QCExpandListModal = (props) => {
  const { handleQcexpand,qcExpandList, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      
        <Modal
        //  title="Task"
          title={props.RowData.imei}
          width="64%"
          destroyOnClose
          closable
          placement="right"
          visible={qcExpandList}
          onCancel={() => handleQcexpand(false)}
        >
        <Suspense fallback={<BundleLoader />}>
        <DistributorPhoneTaskTable
                        phoneId={props.phoneId}
                        RowData={props.RowData} />
        </Suspense>
      </Modal>
    </>
  );
};

export default QCExpandListModal;
