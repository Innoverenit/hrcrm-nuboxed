import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AddAccountForm = lazy(() => import("./AddAccountForm"));


const AddAccountModal = (props) => {
    const { addDistributorModal, handleDistributorModal, ...formProps } = props;
    const handleClose = () => {
        window.location.reload(true);
    };
    return (
        <>
            <StyledDrawer
                title="Customer"
                width="60%"
                visible={addDistributorModal}
                onClose={() => {
                 
                    handleDistributorModal(false)
                }}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddAccountForm {...formProps} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAccountModal;
