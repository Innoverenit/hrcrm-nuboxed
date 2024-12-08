import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const UpdatePersonalDetailsDocumentForm = lazy(() =>
    import("./UpdatePersonalDetailsDocumentForm")
);

class UpdatePersonalDetailsModal extends Component {
    render() {
        const { updatePersonalDetailsModal, handleUpdatePersonalDetailsModal, ...formProps } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Personal Details"
                    width="60%"

                    visible={updatePersonalDetailsModal}
                    onClose={() => handleUpdatePersonalDetailsModal(false)}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UpdatePersonalDetailsDocumentForm />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default UpdatePersonalDetailsModal;
