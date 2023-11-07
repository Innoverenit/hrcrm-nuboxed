import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const ShipperDocumentForm = lazy(() => import("./ShipperDocumentForm"));
const ButtonGroup = Button.Group;

class AddShipperDocumentModal extends Component {
  render() {
    const {
      shipperDocumentUploadModal,
      handleShipperDocumentUploadModal,
    } = this.props;
    return (
      <>
        <StyledModal
          title="Document"
          //   title={
          //     <FormattedMessage id="app.document" defaultMessage="Document" />
          //   }
          width="65vw"
          visible={shipperDocumentUploadModal}
          destroyOnClose
          maskClosable={false}
          style={{ top: 40 }}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onCancel={() => handleShipperDocumentUploadModal(false)}
          footer={null}
        >
          <Suspense fallback={<BundleLoader />}>
            <ShipperDocumentForm />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddShipperDocumentModal;
