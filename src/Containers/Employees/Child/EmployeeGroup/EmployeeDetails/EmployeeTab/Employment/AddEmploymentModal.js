import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const EmploymentDocumentForm = lazy(() =>
    import("../Employment/EmploymentDocumentForm")
);

class AddEmploymentModal extends Component {
    render() {
        const { addEmploymentModal, handleEmploymentModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    // title="Employment"
                    title={<FormattedMessage
                        id="app.employment"
                        defaultMessage="Employment"
                    />}
                    width="55%"
                    visible={addEmploymentModal}
                    onClose={() => handleEmploymentModal(false)}
          
                >
                    <Suspense fallback={<BundleLoader />}>
                        <EmploymentDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddEmploymentModal;
