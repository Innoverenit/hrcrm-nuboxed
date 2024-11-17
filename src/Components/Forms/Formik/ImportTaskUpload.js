import React from "react";
import { message, Upload } from "antd";
import { base_url } from "../../../Config/Auth";
import axios from "axios";

import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const token = sessionStorage.getItem("token");

class ImportTaskUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };
  beforeUpload = (file) => {
    const isLt3M = file.size / 2000 / 2000 < 25;

    if (!isLt3M) {
      message.error("Image size must be smaller than 25MB!");
      file.flag = true;
      return false;
    }
  };
  handleDocumentUpload = ({ onSuccess, onError, file }) => {
    console.log(this.props);
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${base_url}/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        onSuccess();
        this.props.form.setFieldValue(this.props.field.name, res.data);
        this.setState({ previewVisible: false, previewImage: "" });
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
      <div className="clearfix">
        <Dragger
          customRequest={this.handleDocumentUpload}
          beforeUpload={this.beforeUpload}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined type="inbox" />
          </p>
          <p className="ant-upload-text">
          
            Click or drag file to this area to upload.
          </p>
        </Dragger>
      </div>
    );
  }
}

export default ImportTaskUpload;
