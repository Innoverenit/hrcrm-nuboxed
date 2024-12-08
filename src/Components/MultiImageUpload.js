import React from "react";
import { Icon, message, Upload } from "antd";
import { base_url } from "../Config/Auth";
import axios from "axios";
import InboxIcon from '@mui/icons-material/Inbox';
const { Dragger } = Upload;
const token = sessionStorage.getItem("token");

class MultiImageUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };

  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 25;

    if (!isLt2M) {
      message.error("File size must be smaller than 25MB!");
      file.flag = true;
      return false;
    }

    // Check file type
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      file.flag = true;
      return false;
    }

    return true;
  };

  handleDocumentUpload = ({ onSuccess, onError, file }, info) => {
    console.log(info);
    let formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${base_url}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        onSuccess();
        this.setState({ previewVisible: false, previewImage: "" });
        this.props.handleSetImage(res.data);
      })
      .catch((err) => {
        console.log(err);
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
    console.log(fileList);
    console.log(file);
    if (file.flag === true) {
      return this.setState({ fileList: [] });
    }

    this.setState({ fileList });
  };

  render() {
    const { fileList } = this.state;
    return (
      <div className="clearfix max-sm:w-wk">
        <Dragger
          customRequest={this.handleDocumentUpload}
          beforeUpload={this.beforeUpload}
          fileList={fileList}
          // onPreview={this.handlePreview}
          onChange={this.handleChange}
          accept=".jpg, .png"
        >
          <p className="ant-upload-drag-icon">
             < InboxIcon  className="!text-icon"  type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload 

          </p>
        </Dragger>
      </div>
    );
  }
}

export default MultiImageUpload;
