import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

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
          title={<FormattedMessage
            id="app.education"
            defaultMessage="Education"
          />}
          width="30%"
          visible={updateEducationModal}
          onClose={() => handleUpdateEducationModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateEducationForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateEducationModal;
