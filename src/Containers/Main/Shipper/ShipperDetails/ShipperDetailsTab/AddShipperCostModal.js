import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
//import SuppliesLocationItem from "../Supplies/SuppliesLocationItem"
import { BundleLoader } from "../../../../../Components/Placeholder";
import { FormattedMessage } from 'react-intl';
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
  />
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddShipperCostModal;

