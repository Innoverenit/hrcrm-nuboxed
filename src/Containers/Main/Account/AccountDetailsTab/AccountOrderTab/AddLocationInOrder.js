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
                title={`Tag Supervisor - ${props.particularRowData.newOrderNo}`}
                width="40vw"
                visible={props.addInventoryInOrder}
                destroyOnClose
                closable
                onClose={() => props.handleInventoryLocationInOrder(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {/* <CardContainer /> */}
                    <LocationOrderForm
                        type={props.type}
                        particularRowData={props.particularRowData} 
                        selectedLanguage={props.selectedLanguage}
                        translateText={props.translateText} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddLocationInOrder;
