import React, { lazy, Suspense, Component } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal, StyledTabs } from "../../../Components/UI/Antd";

const AccessmentForm = lazy(() => import("../Child/AccessmentForm"));


class AddAccessmentModal extends Component {
  render() {
    const { addAccessmentModal, handleAccessmentModal, ...formProps } = this.props;
    return (
      <>
        <StyledModal
          title="Assessment"
          width="60%"
          visible={addAccessmentModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"3rem"}}
          onCancel={() => handleAccessmentModal(false)}
          footer={null}
        >
        <Suspense fallback={<BundleLoader />}>
          <AccessmentForm />{" "}
        </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddAccessmentModal;
