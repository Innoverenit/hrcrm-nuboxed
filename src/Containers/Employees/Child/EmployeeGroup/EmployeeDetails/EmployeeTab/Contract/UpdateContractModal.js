import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateContractForm = lazy(() =>
  import("./UpdateContractForm")
);

class UpdateContractModal extends Component {
  render() {
    const {
      updateContractModal,
      handleUpdateContractModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Update Contract"
      
          width="25%"
          visible={updateContractModal}
          onClose={() => handleUpdateContractModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateContractForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateContractModal;
