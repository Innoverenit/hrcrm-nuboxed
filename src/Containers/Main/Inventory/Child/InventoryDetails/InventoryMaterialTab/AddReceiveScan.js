
import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import ReceiveScanForm from "./ReceiveScanForm"
//import OpportunityUpdateStepper from "./OpportunityUpdateStepper";

const AddScanModal = (props) => {
  //console.log(props.opportunityData)
  return (
    <>
      <StyledDrawer
        title="Scan"
        destroyOnClose
        width="60%"
        visible={props.addReceivedScanModal}
        onClose={() => props.handleReceiveScanModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <ReceiveScanForm
        poSupplierDetailsId={props.poSupplierDetailsId}
        // orderId={props.orderId}
        //  newOrderNo={props.newOrderNo}
        // dispatchPackingId={props.dispatchPackingId}
        // scandata={props.scandata}
        />
         
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddScanModal;
