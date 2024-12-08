import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateCandidateTrainingForm = lazy(() =>
  import("../Training/UpdateCandidateTrainingForm")
);

class UpdateCandidateTrainingModal extends Component {
  render() {
    const {
      updateCandidateTrainingModal,
      handleUpdateCandidateTrainingModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
        title="Training"
        
          width="60%"
          // height="20vh"
          visible={updateCandidateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdateCandidateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateTrainingForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateCandidateTrainingModal;
