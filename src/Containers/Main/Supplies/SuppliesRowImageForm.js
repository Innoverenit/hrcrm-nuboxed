import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Upload, Button, message } from 'antd';
import UploadIcon from '@mui/icons-material/Upload';
import { base_url, base_url2, login_url } from '../../../Config/Auth';
//import 'antd/dist/antd.css';
const token = sessionStorage.getItem("token");

const UploadImageRowFormSupplies = (props) => {
    console.log(props.particularDiscountData)
  const [fileList, setFileList] = useState([]);

  // Handle file upload event and update fileList
  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);

    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  };

  // Handle before upload to ensure only images are uploaded
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  // Function to handle the file upload process
  const handleUpload = async () => {
    console.log(fileList)
    if (fileList.length === 0) {
      message.error('No files selected!');
      return;
    }

    const formData = new FormData();

    // Append each file to the FormData object
    fileList.forEach((file) => {
      console.log(file)
      formData.append('files', file.originFileObj);
    });
    // let type="Material"

    // Make an API call to httpbin.org
    message.info('Uploading files...');
    try {
      //  const response = await fetch(`${base_url}/image/multiple/tag/${props.particularDiscountData.suppliesId}/${"Material"}`, {
        const response = await fetch(`${login_url}/image/multiple/${props.particularDiscountData.suppliesId}/${"material"}/${props.userId}/${props.orgId}`, {
        //const response = await fetch(`${base_url}/image/multipleFile`, {
        method: 'POST',
        body: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
            
        //     Authorization: `Bearer ${token}`, // Add your actual token here
            
        //   },
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Images uploaded successfully!');
        console.log('Response:', data); // Log response for debugging
        // setFileList([]); 
      } else {
        message.error('Upload failed.');
        console.error('Error:', data); // Log error response for debugging
      }
    } catch (error) {
      message.error('Error occurred while uploading files.');
      console.error('Error:', error); // Log fetch error for debugging
    }
  };

  return (
    <div>
      <h2>Upload Images (Drag & Drop or Click to Upload)</h2>
      <Upload.Dragger
        accept="image/*" // Accept only image files
        listType="picture-card" // Display as image previews
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple // Allow multiple files
        showUploadList={{ showRemoveIcon: true }} // Show remove icon
      >
        <p className="ant-upload-drag-icon">
          <UploadIcon />
        </p>
        <p className="ant-upload-text">
          Drag & drop images here, or click to select files
        </p>
      </Upload.Dragger>

      <Button
        type="primary"
        icon={<UploadIcon />}
        onClick={handleUpload}
        style={{ marginTop: '16px' }}
      >
        Upload
      </Button>
    </div>
  );
};

const mapStateToProps = ({
  auth,
  theme,
  refurbish,
  call,
  task,
  event,
  candidate,
  partner,
  opportunity,
  contact,
  language,
  message,
  subscription
}) => ({

  userId: auth.userDetails.employeeId,
 
  orgId: auth.userDetails.organizationId,

  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UploadImageRowFormSupplies);







