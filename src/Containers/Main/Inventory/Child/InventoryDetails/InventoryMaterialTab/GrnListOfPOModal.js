import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import GrnListOfPO from "./GrnListOfPO";
// import ReceivedDetailCard from "./ReceivedDetailCard";
// const OpenReceivedOrderIdForm = lazy(() => import("./OpenReceivedOrderIdForm.js"));


class GrnListOfPOModal extends Component {
    render() {
        const {
            showGrnListOfPo,
            handlegrnlistmodal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`GRN list for PO# - ${this.props.row.newPoNumber}`}
                    width="80%"
                    visible={showGrnListOfPo}
                    onClose={() => handlegrnlistmodal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <GrnListOfPO row={this.props.row} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default GrnListOfPOModal;
