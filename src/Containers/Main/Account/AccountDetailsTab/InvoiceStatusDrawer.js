import React, { Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvoiceStatusCardView from "./InvoiceStatusCardView";
function InvoiceStatusDrawer (props) {
  return (
    <>
      <StyledDrawer
        title={`${props.particularRowData.invoiceId}`}
        width="60%"
        visible={props.openStatus}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.setopenStatus(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
        <InvoiceStatusCardView particularRowData={props.particularRowData}
                translatedMenuItems={props.translatedMenuItems}
        /> 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default InvoiceStatusDrawer;
