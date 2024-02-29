import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const SuppliesForm =lazy(()=>import("./SuppliesForm"));

class SuppliesAddModal extends Component {
    render() {
        const { addSuppliesModal, handleSuppliesModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Material"
                    width="60%"                   
                    visible={addSuppliesModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleSuppliesModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    <SuppliesForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default SuppliesAddModal;
