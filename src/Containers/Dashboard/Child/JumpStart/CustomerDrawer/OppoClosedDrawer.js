import React, { lazy, Suspense, } from "react";

 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const OppoClosedTable =lazy(()=>import("./OppoClosedTable"));

const OppoClosedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
    title={<FormattedMessage
      id="app.opportunitiesClosed"
      defaultMessage="Opportunities Closed"
    />}
        width="60%"
        visible={props.clickOppoClosed}
        onClose={()  => props.handleOppoClosedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <OppoClosedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default OppoClosedDrawer;




  
