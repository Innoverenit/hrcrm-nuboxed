import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import BestBeforeStepper from "./BestBeforeStepper";



class BestbeforeModal extends Component {
    render() {
        const { bestBeforemodal, handleBestbefore } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Best Before"
                    // {this.props.translatedMenuItems[3]}
                    width="60%"                   
                    visible={bestBeforemodal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleBestbefore(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                    <BestBeforeStepper
                     translateText={this.props.translateText}
                     selectedLanguage={this.props.selectedLanguage}
                    />
                   
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default BestbeforeModal;
