import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import ProcureOrderDetails from "./ProcureOrderDetails";


class ProcureOrderModal extends Component {
    render() {
        const {
            addProcureOrderModal,
            handleProcureOrderModal,
            ...formProps
        } = this.props;
        return (
            <>
                {/* - ${this.props.particularRowData.orderId} */}
                <StyledDrawer
                    title={`Order : ${this.props.particularRowData.newOrderNo}`}
                    width="70%"
                    visible={addProcureOrderModal}
                    onClose={() => handleProcureOrderModal(false)}
                    maskClosable={false}
                    destroyOnClose
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ProcureOrderDetails particularRowData={this.props.particularRowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ProcureOrderModal;
