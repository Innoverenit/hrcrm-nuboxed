// import React, { Component,lazy} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Timeline } from "antd";
// import { BorderBox } from "../../../../Components/UI/Layout";
// import { BundleLoader } from "../../../../Components/Placeholder";
// import { getNotesofPRoduct } from "../../ProductAction";
// import SingleNoteProductNoteForm from "./SingleNoteProductNoteForm";

// const LinkedProductNoteForm =lazy(()=> import("./LinkedProductNoteForm"));

// class LinkedProductNotes extends Component {
//   componentDidMount() {
//     // const data={productionBuilderId:this.props.rowdata.productionBuilderId}
//    this.props.getNotesofPRoduct("productBuilder",this.props.rowdata.productionBuilderId);
//   }

//   render() {
//     const { fetchingNotesofProducts, notesofPRoducts } = this.props;

//     return (
//       <>
//         <div style={{ backgroundColor: "#dcdcdc" }}>
//           <LinkedProductNoteForm
//           rowdata={this.props.rowdata}
//             type={"product"}
//             productionBuilderId={this.props.rowdata.productionBuilderId}
//             callback={() =>
//               this.props.getNotesofPRoduct("productBuilder",this.props.rowdata.productionBuilderId)
//             }
//           />
//         </div>
//         <br />

//         <BorderBox>
//           <div class="h-80 overflow-auto p-[0.3rem]">
//             {fetchingNotesofProducts ? (
//               <BundleLoader />
//             ) : (
//                 <Timeline>
//                   {notesofPRoducts &&
//                     notesofPRoducts.map((item, index) => (
//                       <Timeline.Item
//                         key={index}
//                         style={{ paddingBottom: "0.625em" }}
//                       >
//                         <SingleNoteProductNoteForm  rowdata={this.props.rowdata} {...item} userId={this.props.userId}/>
//                       </Timeline.Item>
//                     ))}
//                 </Timeline>
//               )}
//           </div>
//         </BorderBox>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth, product }) => ({
//   userId: auth.userDetails.userId,
//   notesofPRoducts: product.notesofPRoducts,
//   fetchingNotesofProducts: product.fetchingNotesofProducts,

// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getNotesofPRoduct,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(LinkedProductNotes);
import React, { useState } from 'react';
import { base_url } from "../../../../Config/Auth";
import { Button, Form, Upload, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
// import './styles.css'; // Import the CSS file

// Replace with your actual token



const DynamicFields = () => {
  const [fields, setFields] = useState([{ key: 0, description: '', file: null, imageUrl: '', imageId: '' }]);

  const addField = () => {
    setFields([...fields, { key: fields.length, description: '', file: null, imageUrl: '', imageId: '' }]);
  };

  const token = sessionStorage.getItem("token");

  const beforeUpload = async (file, index, fields, setFields) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;
    }
  
    // Handle the file upload manually
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${base_url}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      const imageId = response.data.imageId;
  
      // Update the field with the new imageId and imageUrl
      const newFields = fields.slice();
      newFields[index].imageId = imageId;
      newFields[index].imageUrl = URL.createObjectURL(file);
      newFields[index].file = file;
      setFields(newFields);
  
      message.success('Upload successful!');
      return false; // Return false since we've handled the upload manually
    } catch (error) {
      message.error('Upload failed.');
      return false;
    }
  };

  const handleDescriptionChange = (index, event) => {
    const newFields = fields.slice();
    newFields[index].description = event.target.value;
    setFields(newFields);
  };

  const handleSubmit = (index) => {
    const field = fields[index];
    console.log('Submitted field:', field);
    // Perform submit action here, e.g., send data to API
    message.success(`Field submitted successfully with Image ID: ${field.imageId}`);
  };

  return (
    <div>
      <Button type="primary" onClick={addField} style={{ marginBottom: 16 }}>
        Add More
      </Button>
      {fields.map((field, index) => (
        <div key={field.key} className="field-container" style={{ display: 'flex', marginBottom: 16 }}>
          <Form.Item label={`Description ${index + 1}`} style={{ flex: 1 }}>
            <Input.TextArea
              value={field.description}
              onChange={(e) => handleDescriptionChange(index, e)}
              placeholder="Enter description"
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="description-textarea"
            />
          </Form.Item>
          <Form.Item label={`Upload ${index + 1}`} className="upload-container" style={{ marginRight: 16 }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={(file) => beforeUpload(file, index, fields, setFields)}
            >
              {field.imageUrl ? (
                <img src={field.imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Button type="primary" onClick={() => handleSubmit(index)} style={{ alignSelf: 'flex-end' }}>
            Submit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DynamicFields;
