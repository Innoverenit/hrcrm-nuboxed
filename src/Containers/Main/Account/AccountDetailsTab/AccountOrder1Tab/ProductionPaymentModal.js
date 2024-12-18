import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const ProductionPaymentTable = lazy(() => import("./ProductionPaymentTable"));
const ProductionPaymentForm = lazy(() => import("./ProductionPaymentForm"));

class ProductionPaymentModal extends Component {
    render() {
        const {
            showPaymentListModal,
            handleOrderPaymentModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Collection"
                   
                    width="70%"
                    visible={showPaymentListModal}
                    onClose={() => handleOrderPaymentModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ProductionPaymentForm particularRowData={this.props.particularRowData} />
                        <ProductionPaymentTable particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ProductionPaymentModal;
