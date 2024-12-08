import React, { lazy, Suspense, } from "react";

 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const LeadQualifiedTable =lazy(()=>import("./LeadQualifiedTable"));

const LeadQualifiedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
          title="Leads Qualified"
       
        width="60%"
        visible={props.openLeadQualified}
        onClose={()  => props.handleLeadQualifiedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <LeadQualifiedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default LeadQualifiedDrawer;




  
