import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
// import CardContainer from "./CardContainer";
const LocationOrderForm = lazy(() => import("./LocationOrderForm"));

const AddLocationInOrder = (props) => {
    const { ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Assigned To Supervisor - ${props.particularRowData.newOrderNo}`}
                width="40vw"
                visible={props.addInventoryInOrder}
                onClose={() => props.handleInventoryLocationInOrder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <CardContainer /> */}
                    <LocationOrderForm particularRowData={props.particularRowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddLocationInOrder;
