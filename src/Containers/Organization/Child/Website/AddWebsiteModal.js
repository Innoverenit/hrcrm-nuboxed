import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledModal } from "../../../../Components/UI/Antd";

const WebsiteForm = lazy(() => import("../Website/WebsiteForm"));

class AddWebsiteModal extends Component {
  render() {
    const { addWebsiteModal, handleWebsiteModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Configure"
          width="35%"
          visible={addWebsiteModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onCancel={() => handleWebsiteModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <WebsiteForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddWebsiteModal;
