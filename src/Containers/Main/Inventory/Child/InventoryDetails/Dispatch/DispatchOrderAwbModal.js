import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const DispatchOrderAwb = lazy(() => import("./DispatchOrderAwb"));

class DispatchOrderAwbModal extends Component {
    render() {
        const {
            addCreateAwb,
            handleCreateAWB,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledDrawer
                    title="Create AWB"
                    width="60%"
                    height="45%"
                    visible={addCreateAwb}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onClose={() => handleCreateAWB(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <PickUpForm /> */}
                        <DispatchOrderAwb rowData={this.props.rowData} 
                        translateText={this.props.translateText}
                     
                        selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>

                </StyledDrawer>
            </>
        );
    }
}

export default DispatchOrderAwbModal;
