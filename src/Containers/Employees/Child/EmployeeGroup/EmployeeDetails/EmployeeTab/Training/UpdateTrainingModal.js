import React, { lazy, Suspense, Component } from "react";
import { FormattedMessage } from "react-intl";
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
          // height="20vh"
          visible={updateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
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
