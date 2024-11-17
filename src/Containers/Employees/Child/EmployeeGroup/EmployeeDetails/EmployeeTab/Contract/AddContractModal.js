import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const ContractDocumentForm = lazy(() =>
  import("./ContractDocumentForm")
);

class AddContractModal extends Component {
  render() {
    const {
      addContractModal,
      handleContractModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Contract"
          title={<FormattedMessage
            id="app.contract"
            defaultMessage="Contract"
          />}
          width="25%"
          visible={addContractModal}
          onClose={() => handleContractModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <ContractDocumentForm 
                  translateText={this.props.translateText}
                  selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddContractModal;
