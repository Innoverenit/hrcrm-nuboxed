import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const OpenReceivedOrderIdForm = lazy(() => import("./OpenReceivedOrderIdForm.js"));

const OpenReceivedOrderIdModal = (props) => {
    const {
        receivedOrdeIdModal,
        handleReceivedOrderIdModal,
        rowData,
        locationDetailsId,
        translateText,
        selectedLanguage,
        ...formProps
    } = props;

    return (
        <StyledDrawer
            title={`Order ID - ${rowData.newOrderNo}`}
            width="90%"
            visible={receivedOrdeIdModal}
            onClose={() => handleReceivedOrderIdModal(false)}
            footer={null}
            maskClosable={false}
            destroyOnClose
        >
            <Suspense fallback={<BundleLoader />}>
                <OpenReceivedOrderIdForm
                    rowData={rowData}
                    locationDetailsId={locationDetailsId}
                    translateText={translateText}
                    selectedLanguage={selectedLanguage}
                />
            </Suspense>
        </StyledDrawer>
    );
};

export default OpenReceivedOrderIdModal;
