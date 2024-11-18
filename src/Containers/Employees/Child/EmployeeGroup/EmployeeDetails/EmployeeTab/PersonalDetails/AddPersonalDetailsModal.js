import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const PersonalDetailDocumentForm =lazy(()=>import("./PersonalDetailsDocumentForm"));

class AddPersonalDetailsModal extends Component {
    render() {
        const { addPersonalDetailsModal, handlePersonalDetailsModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Personal Details"
                    width="60%"

                    visible={addPersonalDetailsModal}
                    onClose={() => handlePersonalDetailsModal(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <PersonalDetailDocumentForm 
                        translateText={this.props.translateText}
                        selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddPersonalDetailsModal;
