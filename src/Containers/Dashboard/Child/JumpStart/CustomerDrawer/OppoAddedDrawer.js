import React, {Suspense,lazy } from "react";

import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const OppoAddedTable =lazy(()=>import("./OppoAddedTable"));

const OppoAddedDrawer = (props) => {

  return (
    <>
      <StyledDrawer
     title={<FormattedMessage
      id="app.opportunitiesAdded"
      defaultMessage="Opportunities Added"
    />}
        width="60%"
        visible={props.openOppoAdded}
        onClose={()  => props.handleOppoAddedDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
        <OppoAddedTable/>
        </Suspense>
      </StyledDrawer>
    </>
  );

};

export default OppoAddedDrawer;




  
