import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import SupplierContactForm from "./SupplierContactForm";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

const ButtonGroup = Button.Group;

class AddSupplierContactModal extends Component {
    render() {
        const {
            addSupplierContactModal,
            handleSupplierContactModal,
        } = this.props;
        return (
            <>
                <StyledDrawer
                      title={
                        <FormattedMessage id="app.Contact" defaultMessage="Contact" />
                      }
                    width="60%"
                    visible={addSupplierContactModal}
                    destroyOnClose
                    closable
                    onClose={() => handleSupplierContactModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <SupplierContactForm
                        distributorId={this.props.distributorId}
                        shipperId= {this.props.shipperId}
                        />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddSupplierContactModal;
