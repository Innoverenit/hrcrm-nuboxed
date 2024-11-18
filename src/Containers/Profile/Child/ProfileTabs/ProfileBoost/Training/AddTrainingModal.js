import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from 'react-intl';

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
          width="60%"
          // height="20vh"
          visible={addTrainingModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleTrainingModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <TrainingDocumentForm employeeId={this.props.employeeId}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddTrainingModal;
