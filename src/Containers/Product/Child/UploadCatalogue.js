import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UploadCatalogueForm =lazy(()=>import("./UploadCatalogueForm"));

class UploadCatalogue extends Component {
    render() {
        const { uploadProductList, handleUploadProductModal } = this.props;
        return (
            <div>
                <StyledDrawer
                    title="Upload Catalogue"
                    width="60%"
                    visible={uploadProductList}
                    destroyOnClose
                    maskClosable={false}
                    maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                    style={{ marginTop: "3rem" }}
                    onClose={() => handleUploadProductModal(false)}
                    footer={null}
                >
                    <Suspense fallback={<BundleLoader />}>
                        <UploadCatalogueForm
                           translateText={this.props.translateText}
                           selectedLanguage={this.props.selectedLanguage}
                        />
                    </Suspense>
                </StyledDrawer>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadCatalogue);
