import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const MaterialInventoryCard = lazy(() => import("./MaterialInventoryCard"));


const MaterialInventoryDrawer = (props) => {
  const { materialInveDawer, handleMaterialInventory, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Material Builder - ${particularDiscountData.suppliesName} ${particularDiscountData.hsn}`}
        width={drawerWidth}
        visible={materialInveDawer}
        maskClosable={false}
        destroyOnClose
        placement="right"
        onClose={() => handleMaterialInventory(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <MaterialInventoryCard 
          particularDiscountData={particularDiscountData} 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MaterialInventoryDrawer;
