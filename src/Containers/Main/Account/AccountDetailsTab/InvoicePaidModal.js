import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const DistributorPaidForm = lazy(() => import("./AccountOrderTab/DistributorPaidForm"));
const OrderPaymentTable = lazy(() => import("./AccountOrderTab/OrderPaymentTable"));

class InvoicePaidModal extends Component {
    render() {
        const {
            addPaidButtonModal,
            handlePaidModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Collection - ${this.props.particularRowData.newOrderNo}`}
                    width="70%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handlePaidModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                                <DistributorPaidForm particularRowData={this.props.particularRowData}  distributorId={this.props.distributorId} />
                                <OrderPaymentTable particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default InvoicePaidModal;
