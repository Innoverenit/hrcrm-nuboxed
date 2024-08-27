import React, { Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import StatusCardView from "./StatusCardView";

const StatusDrawer = (props) => {
  
  return (
    <>
      <StyledDrawer
        title="Status"
        width="60%"
        visible={props.openStatus}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.setopenStatus(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <StatusCardView/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default StatusDrawer;
