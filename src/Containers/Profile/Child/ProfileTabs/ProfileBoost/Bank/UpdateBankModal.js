import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const UpdateBankForm = lazy(() => import("../Bank/UpdateBankForm"));

class UpdateBankModal extends Component {
  render() {
    const { updateBankModal, handleUpdateBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          title="Bank"
          width="25%"
          visible={updateBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdateBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateBankForm
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateBankModal;
