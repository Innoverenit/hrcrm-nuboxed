import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateCandidateEducationForm = lazy(() =>
  import("../Education/UpdateCandidateEducationForm")
);

class UpdateEducationModal extends Component {
  render() {
    const {
      updateCandidateEducationModal,
      handleUpdateCandidateEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Education"
          title={
            <FormattedMessage id="app.education" defaultMessage="Education" />
          }
          width="60%"
          visible={updateCandidateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdateCandidateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateEducationForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateEducationModal;
