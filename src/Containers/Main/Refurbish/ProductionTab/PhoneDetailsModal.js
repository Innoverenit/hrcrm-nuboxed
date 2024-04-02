import React, { Suspense, lazy } from "react";
import { StyledModal } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import PhoneDetailsByPhoneId from "./PhoneDetailsByPhoneId";

const PhoneDetailsModal = (props) => {
    const { showPhoneData, handlePhoneDetails, ...formProps } = props;
    return (
        <>
            <StyledModal
                title="Phone Details"
                width="60%"
                visible={showPhoneData}
                maskClosable={false}
                destroyOnClose
                onClose={() => handlePhoneDetails(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <PhoneDetailsByPhoneId RowData={props.RowData} />
                </Suspense>
            </StyledModal>
        </>
    );
};

export default PhoneDetailsModal;
