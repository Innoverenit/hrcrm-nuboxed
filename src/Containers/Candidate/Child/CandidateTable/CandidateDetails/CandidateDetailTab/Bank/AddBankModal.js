import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const BankDocumentForm = lazy(() => import("./BankDocumentForm"));

class AddBankModal extends Component {
  render() {
    const { addCandidateBankModal, handleCandidateBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Bank"
          title="Bank"
          width="60%"
          visible={addCandidateBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onClose={() => handleCandidateBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <BankDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddBankModal;
