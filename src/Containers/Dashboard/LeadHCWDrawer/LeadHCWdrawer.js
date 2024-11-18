import React, {Suspense,lazy } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const LeadHCWDrawerTab = lazy(()=>import("./LeadHCWDrawerTab"));

const LeadHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title="Leads HCW"
       
       
        width="60%"
        visible={props.openLeadHCWdrawer}
        onClose={()  => props.handleLeadHCWdrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
<LeadHCWDrawerTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default LeadHCWdrawer;




  
