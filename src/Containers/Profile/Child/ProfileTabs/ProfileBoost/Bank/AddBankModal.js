import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";

const BankDocumentForm = lazy(() => import("../Bank/BankDocumentForm"));

class AddBankModal extends Component {
  render() {
    const { addBankModal, handleBankModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Bank"
          title={<FormattedMessage id="app.bank" defaultMessage="Bank" />}
          width="25%"
          visible={addBankModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleBankModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <BankDocumentForm employeeId={this.props.employeeId}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddBankModal;
