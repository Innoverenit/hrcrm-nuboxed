import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const AddPurchaseOrder  = lazy(() => import("./AddPurchaseOrder"));
const AddPoModal = (props) => {
    const { addLinkSuppliersOrderConfigureModal, handleLinkSuppliersOrderConfigureModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title={<FormattedMessage
                    id="app.purchaseorder"
                    defaultMessage="Purchase Order"
                />}

                width="65%"
                visible={addLinkSuppliersOrderConfigureModal}
                closable
                destroyOnClose
                onClose={() => handleLinkSuppliersOrderConfigureModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <AddPurchaseOrder supplier={props.supplier} 
                    //   translateText={this.props.translateText}
                    //   selectedLanguage={this.props.selectedLanguage}
                      />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddPoModal;
