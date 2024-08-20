import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const UpdateEmailForm = lazy(() => import("../Email/UpdateEmailForm"));

class UpdateEmailModal extends Component {
  render() {
    const {
      addUpdateEmailModal,
      handleUpdateEmailModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Configure"
          width="35%"
          visible={addUpdateEmailModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdateEmailModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>{<UpdateEmailForm 
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}/>}</Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateEmailModal;
