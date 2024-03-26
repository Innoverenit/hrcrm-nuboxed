import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledDrawer} from "../../../../../../../Components/UI/Antd";
import AddSupplierDocumentForm from "./AddSupplierDocumentForm";
import { BundleLoader } from "../../../../../../../Components/Placeholder";

const ButtonGroup = Button.Group;

class AddSupplierDocumentModal extends Component {
  render() {
    const {
      supplierDocumentUploadModal,
      handleSupplierDocumentUploadModal,
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Document"
          width="60%"
          visible={supplierDocumentUploadModal}
          destroyOnClose
                    closable
                    onClose={() => handleSupplierDocumentUploadModal(false)}
                    footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <AddSupplierDocumentForm  supplier={this.props.supplier}/>
          </Suspense>
        </StyledDrawer>
      </>
    );
  }
}

export default AddSupplierDocumentModal;
