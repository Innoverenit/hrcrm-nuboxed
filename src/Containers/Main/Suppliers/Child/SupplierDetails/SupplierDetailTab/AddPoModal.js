import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";

const AddPurchaseOrder  = lazy(() => import("./AddPurchaseOrder"));
const AddPoModal = (props) => {
    const { addLinkSuppliersOrderConfigureModal, handleLinkSuppliersOrderConfigureModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Purchase Order"
               

                width="50%"
                visible={addLinkSuppliersOrderConfigureModal}
                closable
                destroyOnClose
                onClose={() => handleLinkSuppliersOrderConfigureModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddPurchaseOrder supplier={props.supplier}                    
                      translateText={props.translateText}
                      selectedLanguage={props.selectedLanguage}/>
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddPoModal;
