import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const GrnListOfPO = lazy(() => import("./GrnListOfPO"));


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
                    title={`GRN ${this.props.translatedMenuItems[43]}  PO ID - ${this.props.row.newPoNumber}`}
                    width="90%"
                    destroyOnClose
                    closable
                    visible={showGrnListOfPo}
                    onClose={() => handlegrnlistmodal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <GrnListOfPO row={this.props.row}    translatedMenuItems={this.props.translatedMenuItems}/>
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default GrnListOfPOModal;
