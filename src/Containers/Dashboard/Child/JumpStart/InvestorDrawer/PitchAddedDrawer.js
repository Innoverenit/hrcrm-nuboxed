import React, { lazy, Suspense, } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer} from "../../../../../Components/UI/Antd";
const PitchAddedTable =lazy(()=>import("./PitchAddedTable.js"));

const PitchAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
      title={<FormattedMessage
        id="app.pitchAdded"
        defaultMessage="Pitch Added"
      />}
        width="60%"
        visible={props.openPitchAdded}
        onClose={()  => props.handlePitchAddedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <PitchAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};
export default PitchAddedDrawer;




  
