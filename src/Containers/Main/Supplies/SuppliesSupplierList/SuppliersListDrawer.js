import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const SuppliersCardTable = lazy(() => import("./SuppliersCardTable"));


const SuppliersListDrawer = (props) => {
  const { suppliersListDrwr, handleSuppliersListDrawer, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`${particularDiscountData.suppliesName}`}
        width={drawerWidth}
        visible={suppliersListDrwr}
        maskClosable={false}
        destroyOnClose
        onClose={() => handleSuppliersListDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <SuppliersCardTable 
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
          particularDiscountData={particularDiscountData} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default SuppliersListDrawer;
