import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
const RejectedReasonForm = lazy(() => import("./RejectedReasonForm"))

function RejectedReasonModal(props) {
    return (
        <>
            <StyledDrawer
                title="Reason"
                width="60%"
                visible={props.rejectedReasonModal}
                destroyOnClose
                maskClosable={false}
                onClose={() => props.handleRejectReasonModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <RejectedReasonForm rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
}

export default RejectedReasonModal;
