import React, { lazy, Suspense, Component } from "react";
import { Button } from "antd";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import SupplierContactForm from "./SupplierContactForm";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";

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
                            type={this.props.type}
                            id={this.props.id}
                        />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddSupplierContactModal;
