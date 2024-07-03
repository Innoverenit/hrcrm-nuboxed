import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import UploadInvestorForm from "./UploadInvestorForm";



class UploadInvestor extends Component {
    render() {
        const { uploadInvestorList, handleUploadInvestorModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload Investor"
                    width="60%"
                    visible={uploadInvestorList}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleUploadInvestorModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadInvestorForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadInvestor);
