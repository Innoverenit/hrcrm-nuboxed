import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const UserVisaForm =lazy(()=>import("./UserVisaForm"));

class AddVisaModal extends Component {
  render() {
    const {
        addVisaModal,
        handleVisaModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.visa"
            defaultMessage="Visa"
          />}
          width="60%"
          visible={addVisaModal}
          onClose={() => handleVisaModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UserVisaForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddVisaModal;
