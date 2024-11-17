import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
const UpdatePersonalForm = lazy(() => import("../Personal/UpdatePersonalForm"));


class UpdatePersonalModal extends Component {
  render() {
    const {
      updatePersonalModal,
      handleUpdatePersonalModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          //title="Emergency Contact "
          title={<FormattedMessage
            id="app.emergencycontact"
            defaultMessage="Emergency Contact"
          />}
          width="35%"
          visible={updatePersonalModal}
          onClose={() => handleUpdatePersonalModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdatePersonalForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdatePersonalModal;
