import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer, } from "../../../../../../Components/UI/Antd";
const PickUpForm = lazy(() => import("./PickUpForm"));

class PickUpDateModal extends Component {
  render() {
    // console.log(this.props.leadsId)
    const {
      pickUpModal,
      handlePickupModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Dispatch"
          width="40%"
          // height="40%"
          visible={pickUpModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onClose={() => handlePickupModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PickUpForm
              contactPersonId={this.props.contactPersonId}
              orderPhoneId={this.props.orderPhoneId}
              completeOrderInd={this.props.completeOrderInd}
              locationDetailsId={this.props.locationDetailsId} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default PickUpDateModal;
