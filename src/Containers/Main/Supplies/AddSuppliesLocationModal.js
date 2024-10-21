import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import SuppliesLocationItem from "../Supplies/SuppliesLocationItem"
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from 'react-intl';


const AddSuppliesLocationModal = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
       title={props.currentLocationId.locationName}
        width="60%"
        visible={props.addSuppliesLocationModal}
        destroyOnClose
        onClose={() => props.handleSuppliesLocationModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
     <SuppliesLocationItem
      currentLocationId={props.currentLocationId}
     />
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddSuppliesLocationModal;

