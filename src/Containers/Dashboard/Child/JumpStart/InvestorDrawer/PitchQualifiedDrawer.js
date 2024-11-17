import React, { lazy, Suspense, } from "react";

 import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const PitchQualifiedTable =lazy(()=>import("./PitchQualifiedTable"));

const PitchQualifiedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
  title={<FormattedMessage
    id="app.pitchQualified"
    defaultMessage="Pitch Qualified"
  />}
        width="60%"
        visible={props.openPitchQualified}
        onClose={()  => props.handlePitchQualifiedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <PitchQualifiedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default PitchQualifiedDrawer;




  
