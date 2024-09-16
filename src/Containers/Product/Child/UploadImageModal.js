import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";

import UploadImageForm from "../Child/UploadImageForm"


class UploadImageModal extends Component {
    render() {
        const { uploadImageList, handleImageProductModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload Image"
                    width="60%"
                    visible={uploadImageList}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleImageProductModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadImageForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadImageModal);
