import React, { Component, Suspense, lazy } from "react";
import { StyledDrawer, StyledModal, } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const AddAWBNo = lazy(() => import("./AddAWBNo"));

class APIAwbNoModal extends Component {
    render() {
        const {
            addAwbNo,
            handleAddAWB,
            ...formProps
        } = this.props;
        return (
            <>
                <StyledModal
                    title="Add AWB"
                    width="30%"
                    height="45%"
                    visible={addAwbNo}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ top: 40 }}
                    onCancel={() => handleAddAWB(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        {/* <PickUpForm /> */}
                        <AddAWBNo
                        translateText={this.props.translateText}
                        selectedLanguage={this.props.selectedLanguage}
                            rowData={this.props.rowData}
                            formValue={this.props.formValue} />
                    </Suspense>

                </StyledModal>
            </>
        );
    }
}

export default APIAwbNoModal;
