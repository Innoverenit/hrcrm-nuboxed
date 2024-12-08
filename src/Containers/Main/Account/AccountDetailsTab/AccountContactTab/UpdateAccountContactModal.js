import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const UpdateAccountContactForm = lazy(() => import("./UpdateAccountContactForm"));

const UpdateAccountContactModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Update Contact"
                width="60%"
                visible={props.updateDistributorContactModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{marginTop:"3rem"}}
                onClose={() => props.handleUpdateDistributorContactModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <UpdateAccountContactForm handleUpdateDistributorContactModal={props.handleUpdateDistributorContactModal}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default UpdateAccountContactModal;
