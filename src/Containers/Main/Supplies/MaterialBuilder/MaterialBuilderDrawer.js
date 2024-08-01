import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const MaterialBuilder = lazy(() => import("./MaterialBuilder"));


const MaterialBuilderDrawer = (props) => {
  const { materialBuildrawer, handleMaterialBuilderDrawer, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Material Builder - ${particularDiscountData.suppliesName} ${particularDiscountData.hsn}`}
        width={drawerWidth}
        visible={materialBuildrawer}
        maskClosable={false}
        destroyOnClose
        placement="right"
        onClose={() => handleMaterialBuilderDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <MaterialBuilder 
          particularDiscountData={particularDiscountData} 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MaterialBuilderDrawer;
