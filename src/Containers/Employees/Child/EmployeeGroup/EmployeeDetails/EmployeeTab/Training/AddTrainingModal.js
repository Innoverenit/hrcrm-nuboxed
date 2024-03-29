import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
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
          //title="Training"
          title={
            <FormattedMessage id="app.training" defaultMessage="Training" />
          }
          width="55%"
          visible={addTrainingModal}
          onClose={() => handleTrainingModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <TrainingDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddTrainingModal;
