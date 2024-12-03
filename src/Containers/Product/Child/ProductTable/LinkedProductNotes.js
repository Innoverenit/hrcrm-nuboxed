import React, { useState,useEffect,useRef } from 'react';
import { base_url } from "../../../../Config/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addProductDesc ,getProductDesc} from "../../ProductAction";
import { Form, Input, Button, Upload, message , Col, Row } from 'antd';
import axios from 'axios';
import { MultiAvatar } from '../../../../Components/UI/Elements';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
               <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" />
              <div class="mt-2">Upload</div>
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
    <div className=" flex  sticky z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
            <div className=" w-[2rem] max-xl:w-[2rem]"></div>
            <div className=" w-[8.52rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Description</div>
           
            {/* <div className="md:w-[4.2rem]">Scan</div> */}
            <div className="w-[3.8rem]"></div>
          </div>

        
          
              <>
                {props.productsDesc.map((item) => {
                    
                  return (
                    <>
                      <div className="flex rounded  bg-white mt-[0.5rem]  h-8  p-1 max-sm:h-[7.5rem] max-sm:flex-col">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex   w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="   text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.description}
                            </div>
                          </div>
                          
                          
                          
                          </div>
                   
                        
                        </div>
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                       
                       
                          
                       <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       <div className=" flex   w-[6.4rem] max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                         <div class="   text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
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