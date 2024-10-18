import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UploadMaterialModalForm from "./UploadMaterialModalForm"
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
//const UploadCatalogueForm =lazy(()=>import("./UploadCatalogueForm"));

class UploadMaterialModal extends Component {
    render() {
       const { uploadMaterialModal, handleUploadMaterialModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload Material"
                    width="60%"
                    visible={uploadMaterialModal}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleUploadMaterialModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadMaterialModalForm 
                         translateText={this.props.translateText}
                         selectedLanguage={this.props.selectedLanguage}/>
                    </Suspense>
                    
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadMaterialModal);
