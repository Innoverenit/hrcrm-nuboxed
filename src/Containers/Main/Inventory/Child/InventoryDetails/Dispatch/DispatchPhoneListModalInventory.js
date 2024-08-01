import React, { Component, Suspense, lazy } from "react";
import DispatchInventoryDetailsTable from "../../InventoryDetails/Dispatch/DispatchInventoryDetailsTable"
import { StyledDrawer, } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
//const DispatchDetailsTable = lazy(() => import("./DispatchDetailsTable"));
class DispatchPhoneListModalInventory extends Component {
    render() {
        const {
            openPickupDateModal,
            handlePickupDateModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Phone"
                    width="65%"
                    height="45%"
                    visible={this.props.inventoryDispatchModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => this.props.handleInventoryDispatchModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <PickUpForm /> */}
                        
                        <DispatchInventoryDetailsTable rowData={this.props.rowData} />
                    </Suspense>

                </StyledDrawer>
            </>
        );
    }
}

export default DispatchPhoneListModalInventory;
