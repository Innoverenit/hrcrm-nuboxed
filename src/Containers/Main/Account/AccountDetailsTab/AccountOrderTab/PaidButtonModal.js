import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { FormattedMessage } from 'react-intl';
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
                    title={<FormattedMessage
                        id="app.collection"
                        defaultMessage="Collection"
                       />}
                    width="60%"
                    visible={addPaidButtonModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{marginTop:"3rem"}}
                    onClose={() => handlePaidModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <DistributorPaidForm particularRowData={this.props.particularRowData} />
                        <OrderPaymentTable particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default PaidButtonModal;
