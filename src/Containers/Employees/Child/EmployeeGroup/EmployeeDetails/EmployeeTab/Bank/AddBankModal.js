import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const BankDocumentForm = lazy(() =>
    import("../Bank/BankDocumentForm")
);

class AddBankModal extends Component {
    render() {
        const { addBankModal, handleBankModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Bank"
                    width="25%"

                    visible={addBankModal}
                    onClose={() => handleBankModal(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <BankDocumentForm 
                          
                           uniqueId={this.props.employeeId}
                           type={"employee"}
                                 translateText={this.props.translateText}
                                 selectedLanguage={this.props.selectedLanguage} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddBankModal;
