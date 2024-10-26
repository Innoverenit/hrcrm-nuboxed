import React from "react";
import { message } from "antd";
import { StyledUpload, StyledModal } from "../../UI/Antd";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { base_url } from "../../../Config/Auth";
import axios from "axios";
const token = sessionStorage.getItem("token");

class Upload2 extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can upload only JPG or PNG file!");
      file.flag = true;
      return false;
    }
    const isLt2M = file.size / 1024 < 150;
    // file.size/1024/1024 <25
    if (!isLt2M) {
      message.error("Image size must be smaller than 150KB!");
      file.flag = true;
      return false;
    }
  };
  handleImageUpload = ({ onSuccess, onError, file }) => {

    let formData = new FormData();
    formData.append("file", file);
  
    axios
      .post(`${base_url}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
     
        onSuccess();
        this.props.handleSetImage(res.data.imageId);
        // this.props.form.setFieldValue(this.props.field.name, res.data.imageId);
        this.setState({ previewVisible: false, previewImage: "" });
      })
      .catch((err) => {
   
        onError();
      });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, file }) => {
   
    if (file.flag === true) {
      return this.setState({ fileList: [] });
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon /> */}
         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <StyledUpload
          accept=".jpeg,.png,.jpg"
          beforeUpload={this.beforeUpload}
          customRequest={this.handleImageUpload}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </StyledUpload>
        <StyledModal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </StyledModal>
      </div>
    );
  }
}

export default Upload2;
