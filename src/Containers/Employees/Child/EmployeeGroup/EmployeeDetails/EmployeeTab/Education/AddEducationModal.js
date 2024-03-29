import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const EducationDocumentForm = lazy(() =>
  import("../Education/EducationDocumentForm")
);

class AddEducationModal extends Component {
  render() {
    const {
      addEducationModal,
      handleEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.education"
            defaultMessage="Education"
          />}
          width="60%"
          visible={addEducationModal}
          onClose={() => handleEducationModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
            <EducationDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEducationModal;
