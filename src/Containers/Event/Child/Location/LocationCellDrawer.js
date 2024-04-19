import React, { lazy, Suspense } from "react";
import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationCellForm=lazy(()=>import("./LocationCellForm"));


const LocationCellDrawer = (props) => {
  const { clickLocDrwr, handleLocnCellDrawer,  storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Location Cell`}
        width={drawerWidth}
        visible={clickLocDrwr}
        destroyOnClose
        closable
        onClose={() => handleLocnCellDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
         <LocationCellForm   storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationCellDrawer;
