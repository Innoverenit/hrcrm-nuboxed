import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const DispatchDetailsTable = lazy(() => import("./DispatchDetailsTable"));
class DispatchPhoneListModal extends Component {
    render() {
        const {
            openPickupDateModal,
            handlePickupDateModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Dispatch - ${props.rowData.newOrderId}`}
                    width="65%"
                    height="45%"
                    visible={openPickupDateModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handlePickupDateModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <PickUpForm /> */}
                        <DispatchDetailsTable rowData={this.props.rowData} />
                    </Suspense>

                </StyledDrawer>
            </>
        );
    }
}

export default DispatchPhoneListModal;
