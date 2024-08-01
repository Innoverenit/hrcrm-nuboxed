
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import QualityProductForm from "../ProductTable/QualityProductForm"
import { BundleLoader } from "../../../../Components/Placeholder";
//const ProductCellCard = lazy(() => import("./ProductCellCard"));

class ProductQualityDrawer extends Component {
  render() {
    const { clickProdclDrwr, handleProdCellDrawer, particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={this.props.particularDiscountData.productFullName}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={this.props.productQualityDrawer}
          onClose={() => this.props.handleProductQuality(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
        <QualityProductForm
         particularDiscountData={this.props.particularDiscountData}
        />
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default ProductQualityDrawer;

