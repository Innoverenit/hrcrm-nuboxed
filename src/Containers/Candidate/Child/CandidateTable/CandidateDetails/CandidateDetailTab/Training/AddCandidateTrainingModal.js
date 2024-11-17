import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";


const CandidateTrainingForm = lazy(() =>
  import("../Training/AddCandidateTrainingForm")
);

class AddCandidateTrainingModal extends Component {
  render() {
    const {
      addCandidateTrainingModal,
      handleCandidateTrainingModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Training"
          title={
            <FormattedMessage id="app.training" defaultMessage="Training" />
          }
          width="60%"
          // height="20vh"
          visible={addCandidateTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onClose={() => handleCandidateTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <CandidateTrainingForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddCandidateTrainingModal;
