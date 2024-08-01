import React, { Suspense } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import AddPurchaseOrder from "./AddPurchaseOrder";
// const AddSuppliersForm = lazy(() => import("./AddSuppliersForm"));

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
                    <AddPurchaseOrder supplier={props.supplier} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default AddPoModal;
