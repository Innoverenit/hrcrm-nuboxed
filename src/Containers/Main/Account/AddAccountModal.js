import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const AddAccountForm = lazy(() => import("./AddAccountForm"));

const AddAccountModal = (props) => {
    const { addDistributorModal, handleDistributorModal, ...formProps } = props;

    return (
        <>
            <StyledDrawer
                title="Customer"
                width="50%"
                visible={addDistributorModal}
                onClose={() => { handleDistributorModal(false)}}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddAccountForm 
                  selectedLanguage={props.selectedLanguage}
                  translateText={props.translateText}
                  translatedMenuItems={props.translatedMenuItems}
                  />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddAccountModal;
