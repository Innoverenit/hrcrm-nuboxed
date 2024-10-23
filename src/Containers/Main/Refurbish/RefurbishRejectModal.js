import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
const RejectedPhoneList = lazy(() => import("./RejectedPhoneList"))

function RefurbishRejectModal(props) {
    return (
        <>
            <StyledDrawer
                title="Rejected List"
                width="60%"
                visible={props.refurbhsReject}
                destroyOnClose
                maskClosable={false}
                onClose={() => props.refurbishRejectPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <RejectedPhoneList rowData={props.rowData}
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage} />
                </Suspense>
            </StyledDrawer>
        </>
    );
}

export default RefurbishRejectModal;
