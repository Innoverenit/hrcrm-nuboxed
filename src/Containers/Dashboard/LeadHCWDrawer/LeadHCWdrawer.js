import React, {Suspense,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const LeadHCWDrawerTab = lazy(()=>import("./LeadHCWDrawerTab"));

const LeadHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.leadsHCW"
          defaultMessage= "Leads HCW"
        />}
       
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




  
