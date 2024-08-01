import React, { Suspense } from "react";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import TermsAndConditionForm from "./TermsAndConditionForm";

const TermsnConditionModal = (props) => {
    const { addTermsnCondition, handleTermsnConditionModal, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="Terms and Condition"
                width="60%"
                visible={addTermsnCondition}
                closable
                destroyOnClose
                onClose={() => handleTermsnConditionModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <TermsAndConditionForm poSupplierDetailsId={props.rowData.poSupplierDetailsId} />
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default TermsnConditionModal;
