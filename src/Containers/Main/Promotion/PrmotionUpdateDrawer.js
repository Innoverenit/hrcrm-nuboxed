import React, { lazy, Suspense } from "react";

import { StyledDrawer, } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import PrmotionUpdateForm from "./PrmotionUpdateForm";




const PrmotionUpdateDrawer = (props) => {
  const { prmotionUpdatedrawr, handleUpdatePromotionDrawer,storedLoc, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title="Update Prmotion"
        destroyOnClose
          closable
        width={drawerWidth}
        visible={prmotionUpdatedrawr}
        onClose={() => handleUpdatePromotionDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <PrmotionUpdateForm  storedLoc={storedLoc}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default PrmotionUpdateDrawer;
