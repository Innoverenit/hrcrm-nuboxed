import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const CandidateEducationForm = lazy(() =>
  import("../Education/CandidateEducationForm")
);

class AddCandidateEducationModal extends Component {
  render() {
    const {
      addCandidateEducationModal,
      handleCandidateEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
        title="Education"
         
          width="60%"
          visible={addCandidateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onClose={() => handleCandidateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <CandidateEducationForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddCandidateEducationModal;
