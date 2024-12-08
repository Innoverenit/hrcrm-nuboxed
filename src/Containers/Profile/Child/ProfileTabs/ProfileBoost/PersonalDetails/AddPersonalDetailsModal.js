import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";


const PersonalDetailDocumentForm = lazy(() =>
    import("./PersonalDetailsDocumentForm")
);

class AddPersonalDetailsModal extends Component {
  render() {
    const {
      addPersonalDetailsModal,
      handlePersonalDetailsModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Personal Details"
          width="60%"
          visible={addPersonalDetailsModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handlePersonalDetailsModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDetailDocumentForm employeeId={this.props.employeeId}
             translateText={this.props.translateText}
             selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddPersonalDetailsModal;
