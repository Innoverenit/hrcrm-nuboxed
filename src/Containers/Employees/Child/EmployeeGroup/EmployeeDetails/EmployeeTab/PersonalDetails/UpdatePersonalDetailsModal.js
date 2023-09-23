import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
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
                    //title="Personal Details"
                    title={<FormattedMessage
                        id="app.personaldetails"
                        defaultMessage="Personal Details"
                      />}
                    width="60%"

                    visible={updatePersonalDetailsModal}
                    destroyOnClose

                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleUpdatePersonalDetailsModal(false)}
                    footer={null}
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
