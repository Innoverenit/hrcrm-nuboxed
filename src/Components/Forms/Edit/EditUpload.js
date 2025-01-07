// import React from "react";
// import { message } from "antd";
// import { StyledUpload, StyledModal } from "../../UI/Antd";
// import { base_url } from "../../../Config/Auth";
// import axios from "axios";
// import { ProgressiveImage } from "../../Utils";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import AddBoxIcon from '@mui/icons-material/AddBox';
// const token = sessionStorage.getItem("token");

// class EditUpload extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       previewVisible: false,
//       previewImage: "",
//       fileList: []
//     };
//   }
//   beforeUpload = file => {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//       message.error("You can upload only JPG or PNG file!");
//       file.flag = true;
//       return false;
//     }
//     const isLt2M = file.size / 1024 < 150;
//     // file.size/1024/1024 <25
//     if (!isLt2M) {
//       message.error("Image size must be smaller than 150KB!");
//       file.flag = true;
//       return false;
//     }
//   };
//   handleImageUpload = ({ onSuccess, onError, file }) => {
//     console.log(this.props);
//     let formData = new FormData();
//     formData.append("image", file);
//     axios
//       .post(`${base_url}/image`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(res => {
//         console.log(res);
//         onSuccess();
//         this.props.getImage(res.data);
//         // this.props.form.setFieldValue(this.props.field.name, res.data)
//       })
//       .catch(err => {
//         console.log(err);
//         onError();
//       });
//   };
//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = file => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true
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
//     const { previewVisible, previewImage, fileList } = this.state;
//     const { imgWidth, imgHeight, imageId, imageURL } = this.props;
//     console.log(this.props);
//     const uploadButton =
//       imageId || imageURL ? (
//         imageId ? (
//           <div style={{ borderRadius: 24, textAlign: "right" }}>
//             <span>
//               <BorderColorIcon type="form" />
//             </span>
//             <ProgressiveImage
//               // preview={ProfilePreview}
//               image={`${base_url}/image/${imageId}`}
//               width={imgWidth || "2.8125em"}
//               height={imgHeight || "2.8125em"}
//               borderRadius={"50%"}
//             />
//           </div>
//         ) : (
//             <ProgressiveImage
//               // preview={ProfilePreview}
//               image={imageURL}
//               width={imgWidth || "2.8125em"}
//               height={imgHeight || "2.8125em"}
//               borderRadius={"50%"}
//             />
//           )
//       ) : (
//           <div>
//             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
//             <div className="ant-upload-text">Upload</div>
//           </div>
//         );
//     return (
//       <div className="clearfix">
//         <StyledUpload
//           accept=".jpeg,.png,.jpg"
//           beforeUpload={this.beforeUpload}
//           customRequest={this.handleImageUpload}
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 1 ? null : uploadButton}
//         </StyledUpload>
//         <StyledModal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: "100%" }} src={previewImage} />
//         </StyledModal>
//       </div>
//     );
//   }
// }

// export default EditUpload;


import React from "react";
import { message } from "antd";
import { StyledUpload, StyledModal } from "../../UI/Antd";
import { base_url } from "../../../Config/Auth";
import axios from "axios";
import { ProgressiveImage } from "../../Utils";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddBoxIcon from '@mui/icons-material/AddBox';

const token = sessionStorage.getItem("token");

class EditUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can upload only JPG or PNG file!");
      file.flag = true;
      return false;
    }
    const isLt2M = file.size / 1024 < 15000; // Image size must be < 150KB
    if (!isLt2M) {
      message.error("Image size must be smaller than 15MB!");
      file.flag = true;
      return false;
    }
  };

  compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the desired dimensions for the compressed image
          canvas.width = img.width / 2; // Adjust scale if needed
          canvas.height = img.height / 2;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                console.log(`Original Size: ${(file.size / 1024).toFixed(2)} KB`);
                console.log(`Compressed Size: ${(blob.size / 1024).toFixed(2)} KB`);
                resolve(blob);
              } else {
                reject(new Error("Image compression failed"));
              }
            },
            "image/webp",
            0.5 // Quality: Adjust as needed (0.0 to 1.0)
          );
        };

        img.onerror = () => {
          reject(new Error("Image loading failed"));
        };
      };

      reader.onerror = () => {
        reject(new Error("File reading failed"));
      };
    });
  };

  handleImageUpload = async ({ onSuccess, onError, file }) => {
    try {
      const compressedFile = await this.compressImage(file);
      const formData = new FormData();
      formData.append("image", compressedFile);

      const response = await axios.post(`${base_url}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      onSuccess();
      this.props.getImage(response.data);
    } catch (error) {
      console.error(error);
      message.error("Upload failed.");
      onError();
    }
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
    const { imgWidth, imgHeight, imageId, imageURL } = this.props;

    const uploadButton =
      imageId || imageURL ? (
        imageId ? (
          <div style={{ borderRadius: 24, textAlign: "right" }}>
            <span>
              <BorderColorIcon type="form" />
            </span>
            <ProgressiveImage
              image={`${base_url}/image/${imageId}`}
              width={imgWidth || "2.8125em"}
              height={imgHeight || "2.8125em"}
              borderRadius={"50%"}
            />
          </div>
        ) : (
          <ProgressiveImage
            image={imageURL}
            width={imgWidth || "2.8125em"}
            height={imgHeight || "2.8125em"}
            borderRadius={"50%"}
          />
        )
      ) : (
        <div>
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

export default EditUpload;

