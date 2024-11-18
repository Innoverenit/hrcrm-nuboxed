import React, { lazy, Suspense, Component } from "react";

import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";

const UpdateSalaryForm = lazy(() => import("../Salary/UpdateSalaryForm"));

class UpdateSalaryModal extends Component {
  render() {
    const {
      updateSalaryModal,
      handleUpdateSalaryModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Salary"
          width="30%"
          visible={updateSalaryModal}
          onClose={() => handleUpdateSalaryModal(false)}
        >
          <Suspense fallback={<BundleLoader />}>
            <UpdateSalaryForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default UpdateSalaryModal;
