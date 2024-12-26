import React, {  lazy, Suspense }  from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";

import { Tooltip } from "antd";
import {
  handleUploadProductModal,
  handleImageProductModal

} from "../ProductAction";
import UploadImageModal from "../Child/UploadImageModal"
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import UploadIcon from '@mui/icons-material/Upload';
const UploadCatalogue=lazy(()=>import("./UploadCatalogue"));

class ProductActionRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  render() {
    const {
      handleConfigureModal,
      organizationId,
    } = this.props;
    return (
      <>

        <div class=" flex items-center">
 
         

          <Tooltip title= {this.props.translatedMenuItems[2]}>
            <Button
              className="export"
              default
              href={`${base_url}/export/product?orgId=${organizationId}`}
            ><FileCopyIcon className="!text-icon" />
            </Button>
          </Tooltip>



          <Tooltip title= {this.props.translatedMenuItems[4]}>
            <Button
              className="export"
              onClick={() => this.props.handleImageProductModal(true)}
              //default
             // href={`${base_url}/export/product?orgId=${organizationId}`}
            >
             {this.props.translatedMenuItems[4]} {/* Upload Image */}
            </Button>
          </Tooltip>
          

         
          <Tooltip placement="left" title= {this.props.translatedMenuItems[1]}>
            <Button
              type="primary"
              ghost
              onClick={() => this.props.handleUploadProductModal(true)}
            >
             <UploadIcon className=" !text-icon"/>
              {/* Upload */}
              {this.props.translatedMenuItems[1]}
            </Button>
          </Tooltip>
          <Tooltip placement="left" title= {this.props.translatedMenuItems[0]}>
            <Button
              type="primary"
              onClick={() => handleConfigureModal(true)}
            ><DataSaverOnIcon className="!text-icon"/>
            {/* Add */}
            {this.props.translatedMenuItems[0]}
            </Button>
          </Tooltip>
         
        </div>
        <Suspense fallback={"Loading..."}>
        <UploadCatalogue
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          handleUploadProductModal={this.props.handleUploadProductModal}
          uploadProductList={this.props.uploadProductList}
        />
        <UploadImageModal
        uploadImageList={this.props.uploadImageList}
        handleImageProductModal={this.props.handleImageProductModal}
        />
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = ({ product, auth, }) => ({
  uploadProductList: product.uploadProductList,
  uploadImageList:product.uploadImageList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUploadProductModal,
      handleImageProductModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionRight)

