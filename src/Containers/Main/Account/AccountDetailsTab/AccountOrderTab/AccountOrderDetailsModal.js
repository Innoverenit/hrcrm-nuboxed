import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const AccountOrderDetails = lazy(() => import("./AccountOrderDetails"));
const OrderCatalogueDetails = lazy(() => import("./OrderCatalogueDetails"));


class AccountOrderDetailsModal extends Component {
    render() {
        const {
            addOrderDetailsModal,
            handleOrderDetailsModal,
            ...formProps
        } = this.props;
        return (
            <>
                {/* - ${this.props.particularRowData.orderId} */}
                <StyledDrawer
                    title={`Order : ${this.props.particularRowData.newOrderNo}`}
                    width="87%"
                    visible={addOrderDetailsModal}
                    onClose={() => handleOrderDetailsModal(false)}
                    maskClosable={false}
                    destroyOnClose
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountOrderDetails particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountOrderDetailsModal;
