import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const AddLocationInPo = lazy(() => import("./AddLocationInPo"));

const PoLocationModal = (props) => {
    const { addlocationInPo, handlePoLocationModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Delivery details for PO# - ${props.rowData.poSupplierDetailsId} `}
                width="40vw"
                visible={addlocationInPo}
                destroyOnClose
                onClose={() => handlePoLocationModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddLocationInPo
                        supplierId={props.supplierId}
                        rowData={props.rowData} 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default PoLocationModal;
