import React, { lazy, Suspense } from "react";

import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import InvoiceStepper from "../InvoiceStepper";
import InvoiceListTable from "./InvoiceListTable";



const AddInvoiceModal = (props) => {
  return (
    <>
      <StyledDrawer
        title="Invoice"
      
        width="60%"
        visible={props.addInvoiceModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleInvoiceModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <InvoiceStepper/>{" "}
       
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddInvoiceModal;
