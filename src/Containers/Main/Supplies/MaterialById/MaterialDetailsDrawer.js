
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
const MaterialsDetailsbyId = lazy(() => import("./MaterialsDetailsbyId"));

function MaterialDetailsDrawer(props) {

    const { modalVisible,closeModal,particularDiscountData, ...formProps } = props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={`${particularDiscountData.suppliesName}`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={modalVisible}
          onClose={closeModal}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
          <MaterialsDetailsbyId  particularDiscountData={particularDiscountData}/> 
          </Suspense>


        </StyledDrawer>
      </>
    );
}

export default MaterialDetailsDrawer;

