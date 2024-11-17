import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const UpdateVisaForm =lazy(()=>import("./UpdateVisaForm"));



class UpdateVisaModal extends Component {
  render() {
    const {
        updateVisaModal,
        handleUpdateVisaModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Education"
          title={<FormattedMessage
            id="app.visa"
            defaultMessage="Visa"
          />}
          width="60%"
          visible={updateVisaModal}
          onClose={() => handleUpdateVisaModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateVisaForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateVisaModal;
