import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const TaskWorkFlowList = lazy(() => import("./TaskWorkFlowList"));

const OpenTaskModal = (props) => {
  const { ...formProps } = props;

  

  return (
    <>
      <StyledDrawer
         title={props.item.taskName}
        width="82%"
        destroyOnClose
        closable
        placement="right"
        visible={props.addTaskDetailModal}
        onClose={() => props.handleTaskopenModal(false)}
        footer={null}
      >
        
        <Suspense fallback={<BundleLoader />}>
          <TaskWorkFlowList
           candidateRequirement={props.candidateRequirement}
          item={props.item}
           />{" "}
          
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default OpenTaskModal;
