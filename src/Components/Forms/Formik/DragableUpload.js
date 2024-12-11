// import React from "react";
// import { message, Upload } from "antd";
// import { base_url } from "../../../Config/Auth";
// import axios from "axios";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// import InboxIcon from '@mui/icons-material/Inbox';

// const { Dragger } = Upload;
// const token = sessionStorage.getItem("token");

// class DragableUpload extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: "",
//     fileList: [],
//     uploadSuccess: false,
//   };
//   beforeUpload = (file) => {
//     const isLt3M = file.size / 2000 / 2000 < 25;

//     if (!isLt3M) {
//       message.error("Image size must be smaller than 25MB!");
//       file.flag = true;
//       return false;
//     }
//   };
//   handleDocumentUpload = ({ onSuccess, onError, file }) => {
//     console.log(this.props);
//     console.log(file)
//     let formData = new FormData();
//     formData.append("file", file);
//     console.log(formData)
//     axios
//       .post(`${base_url}/document/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         onSuccess();
//         this.props.form.setFieldValue(this.props.field.name, res.data);
//         this.setState({ previewVisible: false, previewImage: "" ,uploadSuccess: true});
//       })
//       .catch((err) => {
//         console.log(err);
//         onError();
//       });
//   };
//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = (file) => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   };

//   handleChange = ({ fileList, file }) => {
//     console.log(fileList);
//     console.log(file);
//     if (file.flag === true) {
//       return this.setState({ fileList: [] });
//     }

//     this.setState({ fileList });
//   };
//   render() {
//     const { fileList,uploadSuccess } = this.state;
//     return (
//       <div className="clearfix">
//         <Dragger
//           customRequest={this.handleDocumentUpload}
//           beforeUpload={this.beforeUpload}
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           <p className="ant-upload-drag-icon">
//               < InboxIcon  className="!text-icon" type="inbox" />
//           </p>
//           <p className="ant-upload-text">
       
//             Click or drag file to this area to upload.
//           </p>
//         </Dragger>
//         {uploadSuccess && (
//           <div className="mt-2 flex">
//             <CheckCircleOutlineIcon style={{ fontSize: '24px', color: 'green' }} />
//             <span style={{ marginLeft: '8px', color: 'green', fontWeight: 600 }}>Document uploaded successfully!</span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default DragableUpload;

// import React from "react";
// import { message, Upload } from "antd";
// import { base_url } from "../../../Config/Auth";
// import axios from "axios";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import InboxIcon from '@mui/icons-material/Inbox';
// import pako from "pako"; // Install pako: npm install pako

// const { Dragger } = Upload;
// const token = sessionStorage.getItem("token");

// class DragableUpload extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: "",
//     fileList: [],
//     uploadSuccess: false,
//   };

//   beforeUpload = (file) => {
//     const isLt25MB = file.size / 1024 / 1024 < 25; // Ensure file size is below 25MB

//     if (!isLt25MB) {
//       message.error("File size must be smaller than 25MB!");
//       file.flag = true;
//       return false;
//     }
//   };

//   handleDocumentUpload = ({ onSuccess, onError, file }) => {
//     console.log("Original File:", file);

//     const reader = new FileReader();
//     reader.readAsArrayBuffer(file); // Read file as ArrayBuffer for GZIP
//     reader.onload = async (event) => {
//       try {
//         const fileData = event.target.result;

//         console.log("Original File Size:", file.size, "bytes"); // Log original file size

//         // Compress the file data to GZIP
//         const compressedData = pako.gzip(new Uint8Array(fileData));

//         console.log("Compressed File Size:", compressedData.byteLength, "bytes"); // Log compressed file size

//         // Prepare form data
//         const formData = new FormData();
//         formData.append("file", new Blob([compressedData], { type: "application/gzip" }), `${file.name}.gz`);

//         console.log("Form Data Prepared:", formData);

//         // Send compressed data to the server
//         const response = await axios.post(`${base_url}/document/upload`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Server Response:", response);
//         onSuccess();
//         this.props.form.setFieldValue(this.props.field.name, response.data);
//         this.setState({ previewVisible: false, previewImage: "", uploadSuccess: true });
//       } catch (error) {
//         console.error("Error during compression/upload:", error);
//         onError();
//       }
//     };

//     reader.onerror = (error) => {
//       console.error("File reading error:", error);
//       onError();
//     };
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = (file) => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   };

//   handleChange = ({ fileList, file }) => {
//     console.log("File List Updated:", fileList);
//     if (file.flag === true) {
//       return this.setState({ fileList: [] });
//     }

//     this.setState({ fileList });
//   };

//   render() {
//     const { fileList, uploadSuccess } = this.state;
//     return (
//       <div className="clearfix">
//         <Dragger
//           customRequest={this.handleDocumentUpload}
//           beforeUpload={this.beforeUpload}
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           <p className="ant-upload-drag-icon">
//             <InboxIcon className="!text-icon" type="inbox" />
//           </p>
//           <p className="ant-upload-text">Click or drag file to this area to upload.</p>
//         </Dragger>
//         {uploadSuccess && (
//           <div className="mt-2 flex">
//             <CheckCircleOutlineIcon style={{ fontSize: '24px', color: 'green' }} />
//             <span style={{ marginLeft: '8px', color: 'green', fontWeight: 600 }}>
//               Document uploaded successfully!
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default DragableUpload;

import React from "react";
import { message, Upload } from "antd";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InboxIcon from '@mui/icons-material/Inbox';
import pako from "pako"; // For GZIP compression
import imageCompression from "browser-image-compression"; // For image compression and WebP conversion

const { Dragger } = Upload;
const token = sessionStorage.getItem("token");

class DragableUpload extends React.Component {
  state = {
    fileList: [],
    uploadSuccess: false,
  };

  beforeUpload = (file) => {
    const isLt25MB = file.size / 1024 / 1024 < 25; // Ensure file size is below 25MB

    if (!isLt25MB) {
      message.error("File size must be smaller than 25MB!");
      file.flag = true;
      return false;
    }
  };

  handleDocumentUpload = async ({ onSuccess, onError, file }) => {
    try {
      console.log("Original File:", file);

      let compressedFile;

      if (file.type.startsWith("image/")) {
        // Compress and convert images to WebP
        console.log("Compressing image to WebP...");
        compressedFile = await imageCompression(file, {
          maxSizeMB: 2, // Target maximum size in MB
          maxWidthOrHeight: 1920, // Resize if larger than this
          fileType: "image/webp", // Convert to WebP
        });
        console.log("Compressed Image Size:", compressedFile.size, "bytes");
      } else {
        // Compress other files to GZIP
        console.log("Compressing file to GZIP...");
        const fileData = await file.arrayBuffer();
        const compressedData = pako.gzip(new Uint8Array(fileData));
        compressedFile = new Blob([compressedData], { type: "application/gzip" });
        compressedFile.name = `${file.name}.gz`;
        console.log("Compressed GZIP Size:", compressedData.byteLength, "bytes");
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("file", compressedFile, compressedFile.name);

      console.log("Form Data Prepared:", formData);

      // Send to server
      const response = await axios.post(`${base_url}/document/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Server Response:", response);
      onSuccess();
      this.props.form.setFieldValue(this.props.field.name, response.data);
      this.setState({ uploadSuccess: true });
    } catch (error) {
      console.error("Error during compression/upload:", error);
      onError();
    }
  };

  handleChange = ({ fileList, file }) => {
    console.log("File List Updated:", fileList);
    if (file.flag === true) {
      return this.setState({ fileList: [] });
    }
    this.setState({ fileList });
  };

  render() {
    const { fileList, uploadSuccess } = this.state;
    return (
      <div className="clearfix">
        <Dragger
          customRequest={this.handleDocumentUpload}
          beforeUpload={this.beforeUpload}
          fileList={fileList}
          onChange={this.handleChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxIcon className="!text-icon" type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload.</p>
        </Dragger>
        {uploadSuccess && (
          <div className="mt-2 flex">
            <CheckCircleOutlineIcon style={{ fontSize: '24px', color: 'green' }} />
            <span style={{ marginLeft: '8px', color: 'green', fontWeight: 600 }}>
              Document uploaded successfully!
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default DragableUpload;


