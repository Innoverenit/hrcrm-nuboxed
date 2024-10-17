import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
//const SuppliesForm =lazy(()=>import("./SuppliesForm"));
import SuppliesRowImageForm from "./SuppliesRowImageForm"
class SuppliesRowImageModal extends Component {
    render() {
        // const { addSuppliesModal, handleSuppliesModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Image"
                    width="60%"                   
                    visible={this.props.uploadSuppliesList}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => this.props.handleUploadSuppliesModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    {/* <SuppliesForm
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                     /> */}
                    <SuppliesRowImageForm
                    particularDiscountData={this.props.particularDiscountData}
                    />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default SuppliesRowImageModal;
