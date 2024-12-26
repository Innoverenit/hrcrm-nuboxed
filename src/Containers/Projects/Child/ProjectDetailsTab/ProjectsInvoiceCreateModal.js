import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvoiceProjectStepper from "../ProjectsDetail/InvoiceProjectStepper";


function ProjectsInvoiceCreateModal(props){
  
console.log(props.rowDataPass)
    return (
        <>
        <StyledDrawer
        //   title={`${props.rowDataPass.taskName}`}
        title="Invoice"
          width="50%"
          visible={props.addCreateInvoiceDrawer}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => props.handleCreateInvoiceDrawer(false)}
          footer={null}
        >
<Suspense fallback={<BundleLoader />}> 
<InvoiceProjectStepper/>{" "}
</Suspense>
        </StyledDrawer>
        </>
    )
}

export default ProjectsInvoiceCreateModal;