import React, { lazy, Suspense, } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const DealClosedTable =lazy(()=>import("./DealClosedTable"));

const DealsClosedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
         title={<FormattedMessage
          id="app.dealsClosed"
          defaultMessage="Deals Closed"
        />}
        width="60%"
        visible={props.openDealClosed}
        onClose={()  => props.handleDealClosedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <DealClosedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default DealsClosedDrawer;




  
