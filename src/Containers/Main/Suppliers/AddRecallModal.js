import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import NewRecallStepper from "./NewRecallStepper";



class AddRecallModal extends Component {
    render() {
        const { addRecallModal, handleRecall } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Recall"
                    // {this.props.translatedMenuItems[3]}
                    width="60%"                   
                    visible={addRecallModal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleRecall(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    <NewRecallStepper
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                    />
                   
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default AddRecallModal;