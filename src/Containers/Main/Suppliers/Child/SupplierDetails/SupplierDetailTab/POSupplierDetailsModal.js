import React, { Suspense} from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import POSupplierDetailsTable from "./POSupplierDetailsTable";

const POSupplierDetailsModal = (props) => {
    const { addPoListmModal, handlePoListModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={`PO Details - ${props.rowData.newPoNumber}`}
                width="70%"
                visible={addPoListmModal}
                closable
                destroyOnClose
                onClose={() => handlePoListModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <POSupplierDetailsTable
                        supplierId={props.supplierId}
                        poSupplierDetailsId={props.rowData.poSupplierDetailsId} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default POSupplierDetailsModal;
