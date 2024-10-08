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
       title="Location"
        width="60%"
        visible={props.addSuppliesLocationModal}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
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

