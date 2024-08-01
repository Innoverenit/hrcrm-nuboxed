import React, { lazy, Suspense } from "react";
import { StyledDrawer, StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AddShipperForm = lazy(() => import("./AddShipperForm"));

const AddShipperModal = (props) => {
    const { addShipperModal, handleShipperModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={props.translatedMenuItems[11]}
                width="60%"
                visible={addShipperModal}
                closable
                destroyOnClose
                onClose={() => handleShipperModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddShipperForm {...formProps}     translatedMenuItems={props.translatedMenuItems} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddShipperModal;
