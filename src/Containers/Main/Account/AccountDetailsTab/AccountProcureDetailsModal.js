import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const AccountProcureDetails = lazy(() => import('./AccountProcureDetails'));

class AccountProcureDetailsModal extends Component {
    render() {
        const {
            addProcureDetailsModal,
            handleProcureDetailsModal,
            ...formProps
        } = this.props;
        return (
            <>
                {/* - ${this.props.particularRowData.orderId} */}
                <StyledDrawer
                    title={`Order : ${this.props.particularRowData.newOrderNo}`}
                    width="80%"
                    visible={addProcureDetailsModal}
                    onClose={() => handleProcureDetailsModal(false)}
                    maskClosable={false}
                    destroyOnClose
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <AccountProcureDetails particularRowData={this.props.particularRowData}
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AccountProcureDetailsModal;
