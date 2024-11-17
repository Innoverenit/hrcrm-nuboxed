import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateTrainingForm = lazy(() => import("../Training/UpdateTrainingForm"));

class UpdateTrainingModal extends Component {
  render() {
    const {
      updateTrainingModal,
      handleUpdateTrainingModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Training"
          title={<FormattedMessage
            id="app.training"
            defaultMessage="Training"
          />}
          width="30%"
          visible={updateTrainingModal}
          onClose={() => handleUpdateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateTrainingForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateTrainingModal;
