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
                    title={`Collection - ${this.props.particularRowData.invoiceId}`}
                    width="90%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handlePaidModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                    <div class="flex">
                        <div class="w-[20%]">
                    <DistributorPaidForm
                                 particularRowData={this.props.particularRowData}  
                                distributorId={this.props.distributorId}
                                selectedLanguage={this.props.selectedLanguage}
                                translateText={this.props.translateText}  />
</div>
<div class="w-[75%]">
                                <OrderPaymentTable 
                                particularRowData={this.props.particularRowData}
                                   selectedLanguage={this.props.selectedLanguage}
                                   translateText={this.props.translateText}  />
</div>
                    </div>
                                
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default InvoicePaidModal;
