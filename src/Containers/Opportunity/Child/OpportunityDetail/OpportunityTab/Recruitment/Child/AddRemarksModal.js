import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";

const RemarkForm = lazy(() => import("./RemarkForm"));

class AddRemarksModal extends Component {
  render() {
    const { addRemarksModal, handleRemarksModal, ...formProps } = this.props;
    // console.log(this.props.stageList);
    // console.log("candidate",this.props.candidateId)
    return (
      <>
        <StyledModal
          //title="Remarks"
          title="Feedback"
          width="25%"
          visible={addRemarksModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleRemarksModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <RemarkForm
              stageList={this.props.stageList}
              profileId={this.props.profileId}
              candidateId={this.props.candidateId}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddRemarksModal;
