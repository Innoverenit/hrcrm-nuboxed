import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
//const SuppliesForm =lazy(()=>import("./SuppliesForm"));
//import SuppliesRowImageForm from "./SuppliesRowImageForm"
import LocationSuppliesList from "./LocationSuppliesList"
class AddLocationSuppliesModal extends Component {
    render() {
        // const { addSuppliesModal, handleSuppliesModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Location"
                    width="60%"                   
                    visible={this.props.locationSuppliesModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => this.props.handleLocationuppliesModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    {/* <SuppliesForm
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                     /> */}
                <LocationSuppliesList
                particularDiscountData={this.props.particularDiscountData}
                />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default AddLocationSuppliesModal;
