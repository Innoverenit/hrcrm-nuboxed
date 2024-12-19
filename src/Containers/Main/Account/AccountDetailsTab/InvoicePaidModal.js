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

        console.log("Tyyy",this.props.activeTab);
        
        return (
            <>
                <StyledDrawer
                    title={`Invoice - ${this.props.particularRowData.invoiceId}`}
                    width="65%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handlePaidModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                    <div class="flex  justify-around">
                        <div class="w-[28%] flex  ">
                    <DistributorPaidForm
                                 particularRowData={this.props.particularRowData}  
                                distributorId={this.props.distributorId}
                                selectedLanguage={this.props.selectedLanguage}
                                translateText={this.props.translateText}  
                                activeTab={this.props.activeTab}
                                />
</div>
<div class="w-[75%] flex ml-2">
                                <OrderPaymentTable 
                                particularRowData={this.props.particularRowData}
                                   selectedLanguage={this.props.selectedLanguage}
                                   translateText={this.props.translateText}  
                                   activeTab={this.props.activeTab}
                                   />
</div>
                    </div>
                                
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default InvoicePaidModal;
