import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
// const OrderPickUpForm = lazy(() => import("./OrderPickUpForm"));

const AddPickupModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Pickup Location - ${props.particularRowData.newOrderNo}`}
                width="40vw"
                visible={props.addpickupLocation}
                onClose={() => props.handleOrderPickupModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <CardContainer /> */}
                    {/* <OrderPickUpForm particularRowData={props.particularRowData} /> */}
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddPickupModal;
