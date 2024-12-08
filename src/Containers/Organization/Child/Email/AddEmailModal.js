import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const EmailForm = lazy(() => import("../Email/EmailForm"));

class AddEmailModal extends Component {
  render() {
    const { addEmailModal, handleEmailModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Configure"
          width="60%"
          visible={addEmailModal}
          onClose={() => handleEmailModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmailForm 
             selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmailModal;
