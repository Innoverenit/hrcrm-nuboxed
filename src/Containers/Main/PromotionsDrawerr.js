import React, { lazy, Component,Suspense } from "react";
import { StyledDrawer } from "../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import Prmotion from "./Promotion/Prmotion";
import { BundleLoader } from "../../Components/Placeholder";


class PromotionsDrawerr extends Component {
  render() {
    const { addPromotionnModal, handlePromotion,rowData, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "90%";
    return (
      <>
        <StyledDrawer
          title="Promotions"

          width={drawerWidth}

          visible={addPromotionnModal}
          onClose={() => handlePromotion(false)}
          footer={null}
        >

              
                <Suspense fallback={<BundleLoader/>}>
               <Prmotion rowData={rowData}  />
                </Suspense>
      

        </StyledDrawer>
      </>
    );
  }
}

export default PromotionsDrawerr;
