import React from "react";
import { Icon, message } from "antd";
import { StyledUpload, StyledModal } from "../../UI/Antd";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
const token = sessionStorage.getItem("token");

class PostImageUpld extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };
  beforeUpload = file => {
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
    ////debugger;
    console.log(file);
    let formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    ////debugger;
    axios
      .post(`${base_url}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        ////debugger;
        console.log(res);
        onSuccess();
        this.props.form.setFieldValue(this.props.field.name, res.data);
        this.setState({ previewVisible: false, previewImage: "" });
      })
      .catch(err => {
        console.log(err);
        onError();
      });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList, file }) => {
    console.log(fileList);
    console.log(file);
    if (file.flag === true) {
      return this.setState({ fileList: [] });
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined type="plus" />
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

export default PostImageUpld;
