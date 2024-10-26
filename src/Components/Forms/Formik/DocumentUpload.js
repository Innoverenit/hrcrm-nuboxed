import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { StyledUpload, StyledModal } from '../../UI/Antd';
import { base_url } from '../../../Config/Auth';
import axios from 'axios';
const token = sessionStorage.getItem('token');

class DocumentUpload extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleDocumentUpload = ({ onSuccess, onError, file }) => {
    console.log(this.props)
    let formData = new FormData();
    formData.append('file', file);
    axios.post(`${base_url}/upload/document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res)
        onSuccess()
        this.props.form.setFieldValue(this.props.field.name, res.data)
        this.setState({ previewVisible: false, previewImage: '', })
      })
      .catch(err => {
        console.log(err)
        onError()
      })
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
      <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <StyledUpload
          customRequest={this.handleDocumentUpload}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </StyledUpload>
        <StyledModal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </StyledModal>
      </div>
    );
  }
}

export default DocumentUpload;