import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const CatalogueListForOrder = lazy(() => import("./CatalogueListForOrder"));
const PhoneListForRepair = lazy(() => import("./PhoneListForRepair"));

const OrderPhoneRepairModal = (props) => {
    const { showRepairPhoneList, handleRepairPhone, rowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={(`Order ID - ${rowData.newOrderNo}`)}
                width="90%"
                visible={showRepairPhoneList}
                maskClosable={false}
                destroyOnClose
                onClose={() => handleRepairPhone(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.inspectionRequiredInd ?
                        <CatalogueListForOrder rowData={rowData} 
                        translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}/> :
                        <PhoneListForRepair rowData={rowData}
                        translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage} />}
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default OrderPhoneRepairModal;
