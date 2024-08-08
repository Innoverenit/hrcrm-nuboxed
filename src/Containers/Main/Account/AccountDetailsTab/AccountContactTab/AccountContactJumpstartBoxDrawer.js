import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const AccountContactJumpstartBox = lazy(() => import("./AccountContactJumpstartBox"));


const AccountContactJumpstartBoxDrawer = (props) => {
  
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Jumpstart"
        width={drawerWidth}
        visible={props.visible}
        maskClosable={false}
        destroyOnClose
        placement="right"
        onClose={() => props.handleCancel(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <AccountContactJumpstartBox 
         
          /> 
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AccountContactJumpstartBoxDrawer;
