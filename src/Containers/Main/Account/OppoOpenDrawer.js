import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
import OpportunityCTable from "./OpportunityCTable";


const OppoOpenDrawer = (props) => {
  const { ...formProps } = props;

  return (
    <>
      <StyledDrawer
        title={`Opportunity : ${props.RowData.name}`} 
        width="50%"
        visible={props.openOrder}
        onClose={() => props.setOpenOrder(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
       <OpportunityCTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default OppoOpenDrawer;
