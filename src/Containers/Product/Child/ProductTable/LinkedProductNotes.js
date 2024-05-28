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


// import React, { useState,useEffect } from 'react';
// import { base_url } from "../../../../Config/Auth";
// import { Button, Form, Upload, Input, message } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { addProductDesc ,getProductDesc} from "../../ProductAction";
// // import './styles.css'; // Import the CSS file

// // Replace with your actual token



// const DynamicFields = (props) => {
//   const [fields, setFields] = useState([{ key: 0, 
//     description: '', 
//     // file: null, 
//     // imageUrl: '', 
//     imageId: '' ,
//     orgId:props.orgId,
//     userId:props.userId,
//     productionBuilderId:props.rowdata.productionBuilderId,
//   }]);

//   const addField = () => {
//     setFields([...fields, { 
//       key: fields.length, 
//       description: '', 
//       // file: null, 
//       // imageUrl: '', 
//       imageId: '' ,
//       orgId:props.orgId,
//       userId:props.userId,
//       productionBuilderId:props.rowdata.productionBuilderId,
//     }]);
//   };
//   useEffect(() => {
//     props.getProductDesc(props.rowdata.productionBuilderId);
   
//   }, []);

//   const token = sessionStorage.getItem("token");
 
  
//   const beforeUpload = async (file, index, fields, setFields) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//       return false;
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//       return false;
//     }
  
//     // Handle the file upload manually
//     const formData = new FormData();
//     formData.append('image', file);
  
//     try {
//       const response = await axios
//       .post(`${base_url}/image`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const imageId = response.data;
  
//       // Update the field with the new imageId and imageUrl
//       const newFields = fields.slice();
//       newFields[index].imageId = imageId;
//       newFields[index].imageUrl = URL.createObjectURL(file);
//       newFields[index].file = file;
//       setFields(newFields);
  
//       message.success('Upload successful!');
//       return false; // Return false since we've handled the upload manually
//     } catch (error) {
//       message.error('Upload failed.');
//       return false;
//     }
//   };

//   const handleDescriptionChange = (index, event) => {
//     const newFields = fields.slice();
//     newFields[index].description = event.target.value;
//     setFields(newFields);
//   };

//   const handleSubmit = (index) => {
//     // const field = fields[index];
//     // console.log('Submitted field:', field);
//     const { key, description, imageId,userId,productionBuilderId,orgId } = fields[index];
//     console.log({ key, description, imageId });
//     props.addProductDesc({key, description, imageId,userId,productionBuilderId,orgId})
//     // Perform submit action here, e.g., send data to API
//     //message.success(`Field submitted successfully with Image ID: ${field.imageId}`);
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={addField} style={{ marginBottom: 16 }}>
//         Add More
//       </Button>
//       {fields.map((field, index) => (
//         <div key={field.key} className="field-container" style={{ display: 'flex', marginBottom: 16 }}>
//           <Form.Item label={`Description ${index + 1}`} style={{ flex: 1 }}>
//             <Input.TextArea
//               value={field.description}
//               onChange={(e) => handleDescriptionChange(index, e)}
//               placeholder="Enter description"
//               autoSize={{ minRows: 3, maxRows: 5 }}
//               className="description-textarea"
//             />
//           </Form.Item>
//           <Form.Item label={`Upload ${index + 1}`} className="upload-container" style={{ marginRight: 16 }}>
//             <Upload
//               name="avatar"
//               listType="picture-card"
//               className="avatar-uploader"
//               showUploadList={false}
//               beforeUpload={(file) => beforeUpload(file, index, fields, setFields)}
//             >
//               {field.imageUrl ? (
//                 <img src={field.imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} />
//               ) : (
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               )}
//             </Upload>
//           </Form.Item>
//           <Button type="primary" onClick={() => handleSubmit(index)} style={{ alignSelf: 'flex-end' }}>
//             Submit
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = ({ auth, product, production }) => ({
 
//   user: auth.userDetails,
//   userId: auth.userDetails.userId,

//   orgId: auth.userDetails.organizationId,
//   productsDesc:product.productsDesc
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addProductDesc,
//       getProductDesc
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(DynamicFields);


import React, { useState,useEffect,useRef } from 'react';
import { base_url } from "../../../../Config/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProductDesc ,getProductDesc} from "../../ProductAction";
import { Form, Input, Button, Upload, message , Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { MultiAvatar } from '../../../../Components/UI/Elements';

const beforeUpload = (file, setImageId, setImageUrl) => {
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
  return true;
};
const token = sessionStorage.getItem("token");
const handleUpload = async (file, setImageId, setImageUrl) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${base_url}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });
    setImageId(response.data);
    setImageUrl(URL.createObjectURL(file));
    message.success('Image uploaded successfully');
  } catch (error) {
    message.error('Upload failed');
  }
};

const UploadForm = (props) => {
  const [description, setDescription] = useState('');
  const [imageId, setImageId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = () => {
    console.log('Description:', description);
    console.log('Image ID:', imageId);
    let data={
      imageId:imageId,
      description:description,
      orgId:props.orgId,
          userId:props.userId,
         productionBuilderId:props.rowdata.productionBuilderId,
    }
    props.addProductDesc(data)
    setDescription('');
    setImageId(null);
    setImageUrl(null)

    // Reset upload component by triggering form reset
    formRef.current.resetFields();
  };


    useEffect(() => {
    props.getProductDesc(props.rowdata.productionBuilderId);
   
  }, []);

  return (
    <>
    <Form layout="vertical" >
    <Row gutter={16}>
        <Col span={12}>
      <Form.Item label="Description">
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item label="Upload Image">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={(file) => beforeUpload(file, setImageId, setImageUrl)}
          customRequest={({ file }) => handleUpload(file, setImageId, setImageUrl)}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      </Col>
      </Row>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    <div className=" flex justify-end sticky top-28 z-auto">
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[2rem] max-xl:w-[2rem]"></div>
            <div className=" w-[8.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Description</div>
           
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[3.8rem]"></div>
          </div>

        
          
              <>
                {props.productsDesc.map((item) => {
                    
                  return (
                    <>
                      <div className="flex rounded-xl justify-center bg-white mt-[0.5rem]  h-[2.75rem]  p-3 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.description}
                            </div>
                          </div>
                          
                          
                          
                          </div>
                   
                        
                        </div>
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       <div className=" flex font-medium flex-col w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                         <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <MultiAvatar
                          
                          imageId={item.imageId}
                           imgWidth={"1.8rem"}
                           imgHeight={"1.8rem"}
                       />
                          
                         </div>
                       </div>
                       
                       
                       
                       </div>
                
                     
                     </div>
                      </div>
                    </>
                  );
                })}
              </> 
        
        </div>
      </div>
    
    </>
  );
};


const mapStateToProps = ({ auth, product, production }) => ({
 
  user: auth.userDetails,
  userId: auth.userDetails.userId,

  orgId: auth.userDetails.organizationId,
  productsDesc:product.productsDesc
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProductDesc,
      getProductDesc
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);

// export default UploadForm;