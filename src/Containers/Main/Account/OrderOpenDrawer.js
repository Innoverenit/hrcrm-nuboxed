import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import COrderTable from "./COrderTable";


const OrderOpenDrawer = (props) => {
  const { ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Order : ${props.RowData.name}`} 
        width="50%"
        visible={props.openOrder}
        onClose={() => props.setOpenOrder(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <COrderTable 
       RowData={props.RowData}
                 selectedLanguage={props.selectedLanguage}
                 translateText={props.translateText}
               translatedMenuItems={props.translatedMenuItems}
       />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default OrderOpenDrawer;
