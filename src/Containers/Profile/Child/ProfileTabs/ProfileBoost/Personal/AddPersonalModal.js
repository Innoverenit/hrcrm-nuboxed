import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const PersonalDocumentForm = lazy(() =>
  import("./PersonalDocumentForm")
);
class AddPersonalModal extends Component {
  render() {
    const { addPersonalModal, handlePersonalModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Emergency Contact"
          title={
            <FormattedMessage
              id="app.emergencycontact"
              defaultMessage="Emergency Contact"
            />
          }
          width="55%"
          visible={addPersonalModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{ top: 40 }}
          onClose={() => handlePersonalModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDocumentForm employeeId={this.props.employeeId}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddPersonalModal;
