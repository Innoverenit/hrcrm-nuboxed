import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const AddCandidateEmploymentForm = lazy(() =>
  import("./AddCandidateEmploymentForm")
);

class AddCandidateEmploymentModal extends Component {
  render() {
    const {
      addCandidateEmploymentModal,
      handleCandidateEmploymentModal,
      ...formProps
    } = this.props;
    return (
      <>
        <StyledDrawer
          // title="Employment"
          title={
            <FormattedMessage id="app.employment" defaultMessage="Employment" />
          }
          width="55%"
          visible={addCandidateEmploymentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleCandidateEmploymentModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddCandidateEmploymentForm />
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddCandidateEmploymentModal;
