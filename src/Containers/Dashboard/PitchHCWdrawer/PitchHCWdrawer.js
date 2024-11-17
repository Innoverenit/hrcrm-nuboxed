import React, {Suspense,lazy } from "react";

import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const PitchHCWDrawerTab = lazy(()=>import("./PitchHCWDrawerTab"));

const PitchHCWdrawer = (props) => {

  return (
    <>
      <StyledDrawer
        title={      <FormattedMessage
          id="app.pitchHCW"
          defaultMessage="Pitch HCW"
        />}
      
        width="60%"
        visible={props.openPitchHCWdrawer}
        onClose={()  => props.handlePitchHCWdrawer(false)}

      >
        <Suspense fallback={<BundleLoader />}>
<PitchHCWDrawerTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default PitchHCWdrawer;




  
