import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import BarCodeInput from "./BarCodeInput";
import BarCodeViewer from "./BarCodeViewer";




const MaterialBarCodeInput = (props) => {
  const { setbarCodeOpen, barCodeOpen, particularDiscountData, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={`${particularDiscountData.suppliesName}`}
        width={drawerWidth}
        visible={barCodeOpen}
        maskClosable={false}
        destroyOnClose
        placement="right"
        onClose={() => setbarCodeOpen(false)}
      >
        <Suspense fallback={<BundleLoader />}>
         <BarCodeInput
         particularDiscountData={particularDiscountData}
         />
         <BarCodeViewer
            particularDiscountData={particularDiscountData}
         />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default MaterialBarCodeInput;
