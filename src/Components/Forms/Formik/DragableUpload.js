import React from "react";
import { message, Upload } from "antd";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import { CheckCircleOutlined } from '@ant-design/icons';
import { FormattedMessage } from "react-intl";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const token = sessionStorage.getItem("token");

class DragableUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    uploadSuccess: false,
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
    console.log(file)
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData)
    axios
      .post(`${base_url}/document/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        onSuccess();
        this.props.form.setFieldValue(this.props.field.name, res.data);
        this.setState({ previewVisible: false, previewImage: "" ,uploadSuccess: true});
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
    const { fileList,uploadSuccess } = this.state;
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
          {<FormattedMessage id="app.clickordragfiletothisareatoupload" defaultMessage="Click or drag file to this area to upload"/>}
            {/* Click or drag file to this area to upload. */}
          </p>
        </Dragger>
        {uploadSuccess && (
          <div className="mt-2 flex">
            <CheckCircleOutlined style={{ fontSize: '24px', color: 'green' }} />
            <span style={{ marginLeft: '8px', color: 'green', fontWeight: 600 }}>Document uploaded successfully!</span>
          </div>
        )}
      </div>
    );
  }
}

export default DragableUpload;
