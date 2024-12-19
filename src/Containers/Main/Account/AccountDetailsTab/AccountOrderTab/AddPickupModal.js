import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
const OrderPickupForm = lazy(() => import("./OrderPickupForm"));

const AddPickupModal = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Pickup Locations - ${props.particularRowData.newOrderNo}`}
                width="40vw"
                visible={props.addpickupLocation}
                destroyOnClose
                closable
                onClose={() => props.handleOrderPickupModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <CardContainer /> */}
                    <OrderPickupForm particularRowData={props.particularRowData}
                       selectedLanguage={props.selectedLanguage}
                       translateText={props.translateText} 
                     />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddPickupModal;
