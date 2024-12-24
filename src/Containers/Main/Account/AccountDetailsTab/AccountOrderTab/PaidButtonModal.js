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
        console.log("modll",this.props.particularRowData);

        console.log("TbS", this.props.activeTab);

        return (
            <>
                <StyledDrawer
                    title={`${this.props.translatedMenuItems[55]} - ${this.props.particularRowData.newOrderNo}`}
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
                                <DistributorPaidForm
                                 particularRowData={this.props.particularRowData} 
                                  distributorId={this.props.distributorId} 
                                type={this.props.type}
                                selectedLanguage={this.props.selectedLanguage}
                                translateText={this.props.translateText} 
                                activeTab={this.props.activeTab}
                                translatedMenuItems={this.props.translatedMenuItems}
                                />
                                <OrderPaymentTable
                                 particularRowData={this.props.particularRowData} 
                                  type={this.props.type}
                                  selectedLanguage={this.props.selectedLanguage}
                                  translateText={this.props.translateText} 
                                  activeTab={this.props.activeTab}
                                  translatedMenuItems={this.props.translatedMenuItems}
                                />
                            </> :
                            <OrderPaymentTable 
                            particularRowData={this.props.particularRowData} 
                            selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText}
                            activeTab={this.props.activeTab}
                            translatedMenuItems={this.props.translatedMenuItems}
                            />}
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default PaidButtonModal;
