
import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import ScanInventoryForm from "./ScanInventoryForm"
//import OpportunityUpdateStepper from "./OpportunityUpdateStepper";

const AddScanModal = (props) => {
  //console.log(props.opportunityData)
  return (
    <>
      <StyledDrawer
        title="Scan"
        destroyOnClose
        width="60%"
        visible={props.addScanModal}
        onClose={() => props.handleScanModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <ScanInventoryForm
        orderId={props.orderId}
         newOrderNo={props.newOrderNo}
        dispatchPackingId={props.dispatchPackingId}
        scandata={props.scandata}
        />
          {/* <OpportunityUpdateStepper 
          opportunityId={props.opportunityData.opportunityId}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
          />{" "} */}
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddScanModal;
