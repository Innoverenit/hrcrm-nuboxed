import React, {  Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import ReceivedDetailCard from "./ReceivedDetailCard";

class ReceivedDetailModal extends Component {
    render() {
        const {
            addMaterialReceived,
            handleMaterialReceived,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`PO ID - ${this.props.row.newPoNumber}`}
                    width="90%"
                    visible={addMaterialReceived}
                    maskClosable={false}
                    destroyOnClose
                    onClose={() => handleMaterialReceived(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ReceivedDetailCard row={this.props.row} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ReceivedDetailModal;
