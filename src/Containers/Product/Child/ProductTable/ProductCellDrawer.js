
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
const ProductCellCard = lazy(() => import("./ProductCellCard"));

class ProductCellDrawer extends Component {
  render() {
    const { clickProdclDrwr, handleProdCellDrawer, particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={`Cell`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={clickProdclDrwr}
          onClose={() => handleProdCellDrawer(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
          <ProductCellCard/>
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default ProductCellDrawer;

