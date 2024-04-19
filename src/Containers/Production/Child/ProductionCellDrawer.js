
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductionBldrCrd = lazy(() => import("./ProductionBldrCrd"));

class ProductionCellDrawer extends Component {
  render() {
    const { clickProdnDrwr, handleProdnCellDrawer, particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={`Cell`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={clickProdnDrwr}
          onClose={() => handleProdnCellDrawer(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
         Cell
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default ProductionCellDrawer;

