import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
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
          <InveProductsDetails  particularDiscountData={particularDiscountData}/> 
          </Suspense>


        </StyledDrawer>
      </>
    );
}

export default ProductDetailsDrawer;

