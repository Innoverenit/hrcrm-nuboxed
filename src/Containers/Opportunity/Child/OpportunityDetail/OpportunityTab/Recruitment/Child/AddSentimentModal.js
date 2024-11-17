import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../../../Components/UI/Antd";


const SentimentForm = lazy(() => import("./SentimentForm"));

class AddSentimentModal extends Component {
  render() {
    const { addSentimentModal, handleSentimentModal, ...formProps } = this.props;
   // console.log(this.props.stageList);
    return (
      <>
        <StyledModal
           title="Sentiment"
          //title={<FormattedMessage id="app.remarks" defaultMessage="Remarks" />}
          width="25%"
          visible={addSentimentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleSentimentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <SentimentForm
             handleRemarksModal={this.props.handleRemarksModal}
            //   stageList={this.props.stageList}
            //   profileId={this.props.profileId}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddSentimentModal;
