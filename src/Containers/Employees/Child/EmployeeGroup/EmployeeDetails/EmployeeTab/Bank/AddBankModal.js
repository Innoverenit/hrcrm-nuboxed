import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
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
                    //title="Bank"
                    title={<FormattedMessage
                        id="app.bank"
                        defaultMessage="Bank"
                    />}
                    width="25%"

                    visible={addBankModal}
                    onClose={() => handleBankModal(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <BankDocumentForm 
                                 translateText={this.props.translateText}
                                 selectedLanguage={this.props.selectedLanguage} />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddBankModal;
