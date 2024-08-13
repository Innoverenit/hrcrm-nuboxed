import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const DistributorPaidForm = lazy(() => import("./DistributorPaidForm"));
const OrderPaymentTable = lazy(() => import("./OrderPaymentTable"));
class PaidButtonModal extends Component {
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

                        {this.props.type === "incomplete" ?
                            <>
                                <DistributorPaidForm particularRowData={this.props.particularRowData}  distributorId={this.props.distributorId} />
                                <OrderPaymentTable particularRowData={this.props.particularRowData} />
                            </> :
                            <OrderPaymentTable particularRowData={this.props.particularRowData} />}
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default PaidButtonModal;
