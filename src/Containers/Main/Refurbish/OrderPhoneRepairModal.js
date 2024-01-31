import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CatalogueListForOrder = lazy(() => import("./CatalogueListForOrder"));
const PhoneListForRepair = lazy(() => import("./PhoneListForRepair"));

const OrderPhoneRepairModal = (props) => {
    const { showRepairPhoneList, handleRepairPhone,rowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={(`Order # - ${rowData.newOrderNo}`)} 
                width="80%"
                visible={showRepairPhoneList}
                closable
                destroyOnClose
                onClose={() => handleRepairPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.inspectionRequiredInd ?
                        <CatalogueListForOrder rowData={rowData} /> :
                        <PhoneListForRepair rowData={rowData} />}
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneRepairModal;
