import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const TrainingDocumentForm = lazy(() =>
  import("../Training/TrainingDocumentForm")
);

class AddTrainingModal extends Component {
  render() {
    const { addTrainingModal, handleTrainingModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Training"
          width="50%"
          visible={addTrainingModal}
          onClose={() => handleTrainingModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <TrainingDocumentForm
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddTrainingModal;
