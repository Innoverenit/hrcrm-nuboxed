import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const AddLocationInPo = lazy(() => import("./AddLocationInPo"));


const PoLocationModal = (props) => {
    const { addlocationInPo, handlePoLocationModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`Select location for PO - ${props.rowData.poSupplierDetailsId} `}
                width="40vw"
                visible={addlocationInPo}
                closable
                destroyOnClose
                onClose={() => handlePoLocationModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddLocationInPo
                        supplierId={props.supplierId}
                        rowData={props.rowData} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default PoLocationModal;
