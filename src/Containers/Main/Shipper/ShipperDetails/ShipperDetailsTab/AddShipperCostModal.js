import React, {  Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import ShipperCostForm from "../ShipperDetailsTab/ShipperCostForm"


const AddShipperCostModal = (props) => {
  //const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
       title="Shipper Cost"
        width="60%"
        visible={props.addLinkShipperCostModal}
        destroyOnClose
        onClose={() => props.handleShipperCostModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
     {/* <SuppliesLocationItem
      currentLocationId={props.currentLocationId}
     /> */}
  <ShipperCostForm
  shipperId={props.shipperId}
  translateText={props.translateText}
  selectedLanguage={props.selectedLanguage}
  />
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddShipperCostModal;

