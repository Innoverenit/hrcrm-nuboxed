import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const EmploymentDocumentForm = lazy(() =>
  import("../Employment/EmploymentDocumentForm")
);

class AddEmploymentModal extends Component {
  render() {
    const {
      addEmploymentModal,
      handleEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Employment"
          title={
            <FormattedMessage id="app.employment" defaultMessage="Employment" />
          }
          width="60%"
          visible={addEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EmploymentDocumentForm employeeId={this.props.employeeId}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmploymentModal;
