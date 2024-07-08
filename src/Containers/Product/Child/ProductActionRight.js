import React from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { Tooltip } from "antd";
import {
  handleUploadProductModal
} from "../ProductAction";

import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { FileExcelOutlined } from "@ant-design/icons";
import UploadCatalogue from "./UploadCatalogue";
import UploadIcon from '@mui/icons-material/Upload';

class ProductActionRight extends React.Component {
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
            ><DataSaverOnIcon className="!text-icon"/>Add

            </Button>
          </Tooltip>
 &nbsp;
          <Tooltip title="Export Product">
            <Button
              className="export"
              default
              href={`${base_url}/export/product?orgId=${organizationId}`}
            ><FileExcelOutlined />
            </Button>
          </Tooltip>
          &nbsp;

         
          <Tooltip placement="left" title="Create">
            <Button
              type="primary"
              ghost
              onClick={() => this.props.handleUploadProductModal(true)}
            >
             <UploadIcon className=" !text-icon"/> Upload
            </Button>
          </Tooltip>
         
        </div>
        
        <UploadCatalogue
          handleUploadProductModal={this.props.handleUploadProductModal}
          uploadProductList={this.props.uploadProductList}
        />
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
