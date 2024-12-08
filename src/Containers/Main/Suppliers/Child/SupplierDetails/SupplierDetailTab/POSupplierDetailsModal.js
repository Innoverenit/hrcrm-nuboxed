import React, { Suspense, lazy} from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const  POSupplierDetailsTable  = lazy(() => import("./POSupplierDetailsTable"));
const POSupplierDetailsModal = (props) => {
    const { addPoListmModal, handlePoListModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`PO Details - ${props.rowData.newPoNumber}`}
                width="81%"
                visible={addPoListmModal}
                closable
                destroyOnClose
                onClose={() => handlePoListModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <POSupplierDetailsTable
                        supplierId={props.supplierId}
                        poSupplierDetailsId={props.rowData.poSupplierDetailsId} 
                        translateText={props.translateText}
                        selectedLanguage={props.selectedLanguage}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default POSupplierDetailsModal;
