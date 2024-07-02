import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import UploadPitchForm from "./UploadPitchForm";


class UploadPitch extends Component {
    render() {
        const { uploadPitchList, handleUploadPitchModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload Pitch"
                    width="60%"
                    visible={uploadPitchList}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleUploadPitchModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadPitchForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadPitch);
