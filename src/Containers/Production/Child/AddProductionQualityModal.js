
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";

import ProductionQualityData from "../Child/ProductionQualityData"
import { BundleLoader } from "../../../Components/Placeholder";

class AddProductionQualityModal extends Component {
  render() {
    const { clickProdclDrwr, handleProdCellDrawer, particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title="Quality"
          destroyOnClose
          closable
          width={drawerWidth}
          visible={this.props.productionQualityModal}
          onClose={() => this.props.handleProductionQuality(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
        {/* <QualityProductForm
         particularDiscountData={this.props.particularDiscountData}
        /> */}
        <ProductionQualityData
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

export default AddProductionQualityModal;

