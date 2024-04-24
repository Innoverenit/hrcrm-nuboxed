import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const ReceivedMismatchPhoneList = lazy(() => import("./ReceivedMismatchPhoneList"));

class ReceivedMismatchModal extends Component {
    render() {
        const {
            mismatchPhoneModal,
            handleMismatchPhoneModal,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title={`Order No - ${this.props.rowData.newOrderNo}`}
                    width="80%"
                    visible={mismatchPhoneModal}
                    onClose={() => handleMismatchPhoneModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <ReceivedMismatchPhoneList rowData={this.props.rowData} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default ReceivedMismatchModal;
