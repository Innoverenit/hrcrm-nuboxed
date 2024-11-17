import React, { lazy, Suspense } from "react";

import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationUpdateForm=lazy(()=>import("./LocationUpdateForm"));


const LocationUpdateDrawer = (props) => {
  const { locationUpdatedrawr, handleUpdateLocationDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updateLocation"
          defaultMessage="Update Location"
        />}
        destroyOnClose
          closable
        width={drawerWidth}
        visible={locationUpdatedrawr}
        onClose={() => handleUpdateLocationDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationUpdateForm   storedLoc={storedLoc}
            translateText={props.translateText}
            selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationUpdateDrawer;
