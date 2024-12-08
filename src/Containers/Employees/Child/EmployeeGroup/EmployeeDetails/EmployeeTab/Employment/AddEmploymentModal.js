import React, { lazy, Suspense, Component } from "react";

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
                    title="Employment"
                    width="55%"
                    visible={addEmploymentModal}
                    onClose={() => handleEmploymentModal(false)}
          
                >
                    <Suspense fallback={<BundleLoader />}>
                        <EmploymentDocumentForm 
                                 translateText={this.props.translateText}
                                 selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddEmploymentModal;
