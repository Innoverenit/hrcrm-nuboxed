import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const PriceAddTable = lazy(() => import("./PriceAddTable"));

const PriceDrawer = (props) => {
  const { priceOpenDrawer, handlePriceDrawer, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Price for ${props.particularDiscountData.articleNo ? `${props.particularDiscountData.articleNo}`: "" }
         ${props.particularDiscountData.name ? `${props.particularDiscountData.name}`:""}`}
        width={drawerWidth}
        visible={priceOpenDrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handlePriceDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <PriceAddTable particularDiscountData={particularDiscountData} 
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default PriceDrawer;
