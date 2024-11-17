import React, { lazy, Suspense } from "react";

import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationCreateShiftForm=lazy(()=>import("./LocationCreateShiftForm"));


const LocationCreateShiftDrawer = (props) => {
  const { createShiftDrawer, handleCreateShiftDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.create"
          defaultMessage="Create"
        />}
        width={drawerWidth}
        visible={createShiftDrawer}
        onClose={() => handleCreateShiftDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationCreateShiftForm storedLoc={storedLoc}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationCreateShiftDrawer;
