import React, { lazy, Component, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CreateProduction = lazy(() => import("../Child/CreateProduction"));
class CreateProductionDrawer extends Component {
  render() {
    const { openProductiondrawer, handleCreateProduction, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
    return (
      <>
        <StyledDrawer
          title="Production"

          width={drawerWidth}
          visible={openProductiondrawer}
          destroyOnClose
          closable
          onClose={() => handleCreateProduction(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <CreateProduction />
          </Suspense>

        </StyledDrawer>
      </>
    );
  }
}

export default CreateProductionDrawer;
