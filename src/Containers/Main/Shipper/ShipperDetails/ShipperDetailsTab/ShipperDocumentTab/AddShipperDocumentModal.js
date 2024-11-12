import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

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
          title={<FormattedMessage id="app.document" defaultMessage="Document" />}
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
            <ShipperDocumentForm
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
            />
          </Suspense>
        </StyledModal>
      </>
    );
  }
}

export default AddShipperDocumentModal;
