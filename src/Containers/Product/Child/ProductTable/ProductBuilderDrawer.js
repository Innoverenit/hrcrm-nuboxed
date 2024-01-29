import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const ProductbuilderTable=lazy(()=>import("./ProductbuilderTable"));
const ProductbuilderTable2=lazy(()=>import("./ProductbuilderTable2"));

const ProductBuilderDrawer = (props) => {
  const { proBuilderDrawer, handleProductBuilderDrawer,  particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Product Builder for -${particularDiscountData.name}- ${particularDiscountData.articleNo}`}
        width={drawerWidth}
        visible={proBuilderDrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleProductBuilderDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProductbuilderTable   particularDiscountData={particularDiscountData}/>
          <ProductbuilderTable2 particularDiscountData={particularDiscountData}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ProductBuilderDrawer;
