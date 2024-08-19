import React, {  lazy, Suspense }  from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import {
  handleUploadProductModal
} from "../ProductAction";
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { FileExcelOutlined } from "@ant-design/icons";
import UploadIcon from '@mui/icons-material/Upload';
const UploadCatalogue=lazy(()=>import("./UploadCatalogue"));

class ProductActionRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          
         
        "Add",
        "Upload",
        
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const {
      handleConfigureModal,
      organizationId,
    } = this.props;
    return (
      <>

        <div class="items-center">
        &nbsp;
          <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              onClick={() => handleConfigureModal(true)}
            ><DataSaverOnIcon className="!text-icon"/>
            {/* Add */}
            {this.state.translatedMenuItems[0]}
            </Button>
          </Tooltip>
 &nbsp;
          <Tooltip title="Export Product">
            <Button
              className="export"
              default
              href={`${base_url}/export/product?orgId=${organizationId}`}
            ><FileExcelOutlined className="!text-icon" />
            </Button>
          </Tooltip>
          

         
          <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              ghost
              onClick={() => this.props.handleUploadProductModal(true)}
            >
             <UploadIcon className=" !text-icon"/>
              {/* Upload */}
              {this.state.translatedMenuItems[1]}
            </Button>
          </Tooltip>
         
        </div>
        <Suspense fallback={<BundleLoader />}>
        <UploadCatalogue
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleUploadProductModal={this.props.handleUploadProductModal}
          uploadProductList={this.props.uploadProductList}
        /></Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ product, auth, }) => ({
  uploadProductList: product.uploadProductList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUploadProductModal
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductActionRight)
);
