import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";


const EducationDocumentForm = lazy(() =>
  import("../Education/EducationDocumentForm")
);

class AddEducationModal extends Component {
  render() {
    const {
      addEducationModal,
      handleEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Education"         
          width="60%"
          visible={addEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <EducationDocumentForm employeeId={this.props.employeeId}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddEducationModal;
