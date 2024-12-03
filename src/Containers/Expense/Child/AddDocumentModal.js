import React, { lazy, Suspense,Component } from "react";
import { StyledModal } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button } from "antd";
const AddDocumentForm =lazy(()=> import("../Child/AddDocumentForm"));

const ButtonGroup = Button.Group;

class AddDocumentModal extends Component {
  render() {
    const { documentUploadModal, handleDocumentUploadModal } = this.props;
    return (
      <>
        <StyledModal
          title="Document"
          width="65vw"
          visible={documentUploadModal}
          onCancel={() => handleDocumentUploadModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddDocumentForm />
           
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddDocumentModal;