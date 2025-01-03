import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const ProductbuilderTable2 = lazy(() => import("./ProductbuilderTable2"));
const ProductbuilderTable = lazy(() => import("./ProductbuilderTable"));

const ProductBuilderDrawer = (props) => {
  const { proBuilderDrawer, handleProductBuilderDrawer, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "75%";
  const generateTitle = () => {
    const {
      name,
      categoryName,
      subCategoryName,
      attributeName,
      subAttributeName,
      brand,
      model
    } = particularDiscountData;

    
    const titleParts = [
      name || "",
      categoryName || "",
      subCategoryName || "",
      attributeName || "",
      subAttributeName || "",
      brand || "",
      model || ""
    ];
    return titleParts.filter(part => part !== "").join(" ").trim();
  };

  return (
    <>
      <StyledDrawer
          // title={`Product Builder for ${particularDiscountData.name ? `${particularDiscountData.name}`:""} 
        // ${particularDiscountData.articleNo ? `${particularDiscountData.articleNo}` : ""}`}
        // title={`${particularDiscountData.name}  ${particularDiscountData.categoryName} ${particularDiscountData.subCategoryName} ${particularDiscountData.attributeName} ${particularDiscountData.subAttributeName} ${particularDiscountData.brand} ${particularDiscountData.model}`}
        title={generateTitle()}
         width={drawerWidth}
     
        visible={proBuilderDrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleProductBuilderDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProductbuilderTable particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
          <ProductbuilderTable2 particularDiscountData={particularDiscountData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default ProductBuilderDrawer;
