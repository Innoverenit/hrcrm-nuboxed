
import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductionBldrCrd = lazy(() => import("./ProductionBldrCrd"));

class BuilderProductionDrawer extends Component {
  render() {
    const { openbUILDERProductiondrawer, handleBuilderProduction, particularDiscountData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title={`Product Builder for ${particularDiscountData.manufactureId}`}
          destroyOnClose
          closable
          width={drawerWidth}
          visible={openbUILDERProductiondrawer}
          onClose={() => handleBuilderProduction(false)}
          footer={null}
        >


          <Suspense fallback={<BundleLoader />}>
            <ProductionBldrCrd particularDiscountData={particularDiscountData} />
          </Suspense>


        </StyledDrawer>
      </>
    );
  }
}

export default BuilderProductionDrawer;

