import React, { Component,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const ProductForm=lazy(()=>import("../Child/ProductForm"));

const TabPane = StyledTabs.TabPane;
class ConfigureModal extends Component {
  render() {
    const { addConfigureModal, handleConfigureModal } = this.props;
    return (
      <div>
        <StyledDrawer
          title="Add Product"
          width="60%"
          visible={addConfigureModal}
          destroyOnClose
          maskClosable={false}
          onClose={() => handleConfigureModal(false)}
          footer={null}
        >
           <Suspense fallback={<BundleLoader />}>
        <ProductForm
         translateText={this.props.translateText}
         selectedLanguage={this.props.selectedLanguage} />
        </Suspense>
        </StyledDrawer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureModal);
