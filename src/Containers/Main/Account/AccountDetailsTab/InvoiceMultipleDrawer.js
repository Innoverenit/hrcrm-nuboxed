import React, { Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import InvoiceMultipleDrawerCard from "./InvoiceMultipleDrawerCard";
function InvoiceMultipleDrawer(props) {
  return (
    <>
      <StyledDrawer
        title={`${props.particularRowData.invoiceId}`}
        width="60%"
        visible={props.openMultipleDrawer}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.setopenMultipleDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <InvoiceMultipleDrawerCard
            particularRowData={props.particularRowData}
            openMultipleDrawer={props.openMultipleDrawer}
            setopenMultipleDrawer={props.setopenMultipleDrawer}
            distributorId={props.distributorId}
            translatedMenuItems={props.translatedMenuItems}
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );}
export default InvoiceMultipleDrawer;
