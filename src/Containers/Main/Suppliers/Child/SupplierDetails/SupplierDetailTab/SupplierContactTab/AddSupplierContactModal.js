import React, { lazy, Suspense, Component } from "react";
import { StyledDrawer } from "../../../../../../../Components/UI/Antd";
import SupplierContactForm from "./SupplierContactForm";
import { BundleLoader } from "../../../../../../../Components/Placeholder";


class AddSupplierContactModal extends Component {
    render() {
        const {
            addSupplierContactModal,
            handleSupplierContactModal,
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Contact" 
                    width="50%"
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
                            translateText={this.props.translateText}
                            selectedLanguage={this.props.selectedLanguage}
                        />
                    </Suspense>
                </StyledDrawer>
            </>
        );
    }
}

export default AddSupplierContactModal;
