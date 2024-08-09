import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import AddingQCSpareList from "./AddingQCSpareList";
import { Modal } from "antd";


const QCSpareListModal = (props) => {
  const { RowData,phoneId,handleSpareList,qcSpareList, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
      title={props.RowData.imei}
    
        width={drawerWidth}
        visible={qcSpareList}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleSpareList(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <AddingQCSpareList
                        phoneId={phoneId}
                        RowData={RowData}
                    />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default QCSpareListModal;
