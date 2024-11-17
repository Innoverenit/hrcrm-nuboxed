import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import LinkedTaskDocument from "./LinkedTaskDocument";
import TaskWorkFlowList from "./TaskWorkFlowList";


const DownloadTaskModal = (props) => {
  const { ...formProps } = props;

  

  return (
    <>
      <StyledDrawer
         title={props.item.taskName}
        width="60%"
        visible={props.downloadTaskModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleDownloadTaskModal(false)}
        footer={null}
      >
       <Suspense fallback={<BundleLoader />}>
          <LinkedTaskDocument
        
          item={props.item}
           />{" "}
          
        </Suspense> 
       
      </StyledDrawer>
    </>
  );
};

export default DownloadTaskModal;
