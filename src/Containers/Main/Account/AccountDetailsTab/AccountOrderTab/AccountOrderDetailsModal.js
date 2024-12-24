import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const AccountOrderDetails = lazy(() => import("./AccountOrderDetails"));

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
                    width="90%"
                    visible={addOrderDetailsModal}
                    onClose={() => handleOrderDetailsModal(false)}
                    maskClosable={false}
                    destroyOnClose
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountOrderDetails particularRowData={this.props.particularRowData} 
                         selectedLanguage={this.props.selectedLanguage}
                         translateText={this.props.translateText}
                         translatedMenuItems={this.props.translatedMenuItems}
                         />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountOrderDetailsModal;
