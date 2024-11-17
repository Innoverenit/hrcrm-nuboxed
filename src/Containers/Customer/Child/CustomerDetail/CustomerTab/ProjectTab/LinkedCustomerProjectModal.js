import Item from "antd/lib/list/Item";
import React, { lazy, Suspense } from "react";

import LinkedCustomerProjectTaskTable from "./LinkedCustomerProjectTaskTable"
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
// const UpdateOpportunityForm = lazy(() => import("./UpdateOpportunityForm"));

const LinkedCustomerProjectModal = (props) => {
  return (
    <>
      <StyledDrawer
        // title={<FormattedMessage
        //   id="app.updateopportunity" 
        //   defaultMessage="Update Opportunity"
        // />}
         title="Task"
        width="77%"
        style={{marginTop:"5rem"}}
         visible={props.customerProjectModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
    onClose={() => props.handleCustomerProjectModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <LinkedCustomerProjectTaskTable
         linkedcustomerProjectTask={props.linkedcustomerProjectTask}
       />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LinkedCustomerProjectModal;
