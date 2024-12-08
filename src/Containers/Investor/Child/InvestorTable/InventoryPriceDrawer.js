import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";

const InventoryPriceAddTable = lazy(() => import("./InventoryPriceAddTable"));

const InventoryPriceDrawer = (props) => {
  const { priceInvestorDrawer, handleInvestorPriceDrawer, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`${props.RowData.name || ""} - Shares Owned - ${props.RowData.allTotalQuantityOfShare}`}
    
        width={drawerWidth}
        visible={priceInvestorDrawer}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleInvestorPriceDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <InventoryPriceAddTable  RowData={props.RowData} 
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}/>
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default InventoryPriceDrawer;
