import React, {Suspense,lazy } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const LeadAddedTable =lazy(()=>import("./LeadAddedTable"));

const LeadAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
   title={<FormattedMessage
    id="app.leadsAdded"
    defaultMessage="Leads Added"
  />}
        width="60%"
        visible={props.openLeadAdded}
        onClose={()  => props.handleLeadAddedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <LeadAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default LeadAddedDrawer;




  
