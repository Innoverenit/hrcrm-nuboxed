import React, { } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, } from "../../../../Components/UI/Antd";


const LocationSupplierDrawer = (props) => {
  const { locationSupplierdrawr, handleLocationSupplierDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.createVirtualLocation"
          defaultMessage="Create Virtual Location"
        />}
        width={drawerWidth}
        destroyOnClose
          closable
        visible={locationSupplierdrawr}
        onClose={() => handleLocationSupplierDrawer(false)}
      >
        {/* <Suspense fallback={<BundleLoader />}>
          <LocationSupplerList   storedLoc={storedLoc}/>
        </Suspense> */}
      </StyledDrawer>
    </>
  );
};

export default LocationSupplierDrawer;
