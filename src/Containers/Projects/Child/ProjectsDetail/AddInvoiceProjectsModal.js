import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const InvoiceProjectStepper =lazy(()=> import('./InvoiceProjectStepper'));

function AddInvoiceProjectsModal(props){
  
console.log(props.rowDataPass)
    return (
        <>
        <StyledDrawer
        //   title={`${props.rowDataPass.taskName}`}
        title="Invoice"
          width="50%"
          visible={props.invoiceProjectModal}
          maskClosable={false}
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => props.handleInvoiceProjectModal(false)}
          footer={null}
        >
<Suspense fallback={<BundleLoader />}> 
<InvoiceProjectStepper/>{" "}
</Suspense>
        </StyledDrawer>
        </>
    )
}

export default AddInvoiceProjectsModal