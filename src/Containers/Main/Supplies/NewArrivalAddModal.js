import React, { Component,lazy,Suspense } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import NewArrivalList from "./NewArrivalList";


class NewArrivalAddModal extends Component {
    render() {
        const { newArivalmodal, handleNewAriival } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="New Ariivals"
                    // {this.props.translatedMenuItems[3]}
                    width="60%"                   
                    visible={newArivalmodal}
                    destroyOnClose
                    maskClosable={false}
                    onClose={() => handleNewAriival(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader/>}>
                   <NewArrivalList
                    translateText={this.props.translateText}
                    selectedLanguage={this.props.selectedLanguage}
                   />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}



export default NewArrivalAddModal;
