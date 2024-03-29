import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer, } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const LocationCustomerList = lazy(() => import("./LocationCustomerList"));


const LocationCustomerDrawer = (props) => {
  const { locationCustomerdrawr, handleLocationCustomerDrawer,storedLoc, ...formProps } = props;
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
        visible={locationCustomerdrawr}
        destroyOnClose
          closable
        onClose={() => handleLocationCustomerDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <LocationCustomerList   storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default LocationCustomerDrawer;
