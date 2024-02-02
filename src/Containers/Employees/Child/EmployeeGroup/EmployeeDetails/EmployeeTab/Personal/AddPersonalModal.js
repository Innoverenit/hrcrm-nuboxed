import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const PersonalDocumentForm =lazy(()=>import("./PersonalDocumentForm"));

class AddPersonalModal extends Component {
  render() {
    const { addPersonalModal, handlePersonalModal, ...formProps } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Emergency Contact"
          title={<FormattedMessage
            id="app.emergencycontact"
            defaultMessage="Emergency Contact"
          />}
          width="55%"
          visible={addPersonalModal}
          onClose={() => handlePersonalModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <PersonalDocumentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddPersonalModal;
