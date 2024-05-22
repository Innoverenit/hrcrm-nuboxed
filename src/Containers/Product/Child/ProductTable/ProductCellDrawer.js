
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
          title={`${this.props.particularDiscountData.name} ${this.props.particularDiscountData.subCategoryName} ${this.props.particularDiscountData.categoryName} ${this.props.particularDiscountData.attributeName}  ${this.props.particularDiscountData.subAttributeName}`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={clickProdclDrwr}
          onClose={() => handleProdCellDrawer(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
          <ProductCellCard  particularDiscountData={particularDiscountData}/>
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default ProductCellDrawer;

