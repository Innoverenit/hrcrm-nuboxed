
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
const QualityProductForm= lazy(() => import("../ProductTable/QualityProductForm"));

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
         translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
        />
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default ProductQualityDrawer;

