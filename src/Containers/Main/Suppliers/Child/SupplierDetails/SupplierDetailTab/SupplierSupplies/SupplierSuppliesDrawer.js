import React,{ lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
const SupplierSuppliesCardTable=lazy(()=>import("./SupplierSuppliesCardTable"));


const SupplierSuppliesDrawer = (props) => {
  const { supplierSuppliesdrwr, handleSuppleirSuppliesDrawer,  particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`Supplies list`}
        width={drawerWidth}
        visible={supplierSuppliesdrwr}
        destroyOnClose
        closable
        placement="right"
        onClose={() => handleSuppleirSuppliesDrawer(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <SupplierSuppliesCardTable   particularDiscountData={particularDiscountData}
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SupplierSuppliesDrawer;

