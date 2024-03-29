import React, { lazy, Suspense } from "react";
import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationShiftDrawerTab=lazy(()=>import("./LocationShiftDrawerTab"));


const LocationShiftDrawer = (props) => {
  const { locShiftDrawer, handleLocationShiftDrawer,  storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`${storedLoc.locationName}`}
        width={drawerWidth}
        visible={locShiftDrawer}
        destroyOnClose
          closable
        onClose={() => handleLocationShiftDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationShiftDrawerTab   storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationShiftDrawer;
