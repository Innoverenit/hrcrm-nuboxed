import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const InveProductsDetails = lazy(() => import("./InveProductsDetails"));

function ProductDetailsDrawer(props) {

    const { modalVisible,closeModal,particularDiscountData, ...formProps } = props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={`${particularDiscountData.name}`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={modalVisible}
          onClose={closeModal}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
          <InveProductsDetails  particularDiscountData={particularDiscountData}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}/>
          </Suspense>


        </StyledDrawer>
      </>
    );
}

export default ProductDetailsDrawer;

