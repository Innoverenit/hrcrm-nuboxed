import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import UploadContactInvestorForm from "./UploadContactInvestorForm";



class UploadContactInvest extends Component {
    render() {
        const { uploadContactInvestList, handleUploadContactInvestModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload ContactInvestor"
                    width="60%"
                    visible={uploadContactInvestList}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleUploadContactInvestModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadContactInvestorForm />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadContactInvest);
