import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateCandidateEmploymentForm = lazy(() =>
  import("../Employment/UpdateCandidateEmploymentForm")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      updateCandidateEmploymentModal,
      handleCandidateUpdateEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
         title="Employment"
       
          width="60%"
          visible={updateCandidateEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleCandidateUpdateEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateCandidateEmploymentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmploymentModal;
