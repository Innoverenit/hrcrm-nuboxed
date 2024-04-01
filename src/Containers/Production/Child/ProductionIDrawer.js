import React, { lazy, Component,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductionIDCard = lazy(() => import("./ProductionIDCard"));

class ProductionIDrawer extends Component {
  render() {
    const { clickedProductionIdrwr, handleProductionIDrawer,particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.production"
            defaultMessage="Production Id"
          />}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={clickedProductionIdrwr}
          onClose={() => handleProductionIDrawer(false)}
          footer={null}
        >

              
                <Suspense fallback={<BundleLoader/>}>
                <ProductionIDCard particularDiscountData={particularDiscountData}/>
                </Suspense>
      

        </StyledDrawer>
      </>
    );
  }
}

export default ProductionIDrawer;

