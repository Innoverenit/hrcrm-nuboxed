import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";

const WebsiteForm = lazy(() => import("../Website/WebsiteForm"));

class AddWebsiteModal extends Component {
  render() {
    const { addWebsiteModal, handleWebsiteModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Configure"
          width="60%"
          visible={addWebsiteModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleWebsiteModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <WebsiteForm
            selectedLanguage={this.props.selectedLanguage}
            translateText={this.props.translateText} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddWebsiteModal;
