import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";

const UpdateEducationForm = lazy(() =>
  import("../Education/UpdateEducationForm")
);

class UpdateEducationModal extends Component {
  render() {
    const {
      updateEducationModal,
      handleUpdateEducationModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Education"
          title={
            <FormattedMessage id="app.education" defaultMessage="Education" />
          }
          width="30%"
          visible={updateEducationModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ marginTop: "3rem" }}
          onClose={() => handleUpdateEducationModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateEducationForm
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage} />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateEducationModal;
