import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const EmailForm = lazy(() => import("../ProfileTabs/EmailForm"));

class AddEmailModal extends Component {
  render() {
    const { addEmailProfileModal, handleEmailProfileModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Configure"
          width="30%"
          visible={addEmailProfileModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleEmailProfileModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmailForm 
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmailModal;
