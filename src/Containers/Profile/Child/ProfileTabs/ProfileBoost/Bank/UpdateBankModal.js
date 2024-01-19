import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const UpdateBankForm = lazy(() => import("../Bank/UpdateBankForm"));

class UpdateBankModal extends Component {
  render() {
    const { updateBankModal, handleUpdateBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Bank"
          title={<FormattedMessage id="app.bank" defaultMessage="Bank" />}
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
            <UpdateBankForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateBankModal;
