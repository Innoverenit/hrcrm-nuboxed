import React, { lazy, Suspense, Component } from "react";

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
          title="Education"
       
          width="50%"
          visible={addEducationModal}
          onClose={() => handleEducationModal(false)}
        
        >
          <Suspense fallback={<BundleLoader />}>
            <EducationDocumentForm
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEducationModal;
