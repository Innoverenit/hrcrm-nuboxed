import React, { useEffect, useState, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { Formik, Form, FastField, } from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import {  Input,Select, Button } from "antd";
import {
  MultiAvatar,
} from "../../../Components/UI/Elements";
import ProductBrandModal from "./ProductBrandModal"
import {addProductBrand,getBrandProduct,
  handleProductBrandModal,
  deleteProductBrandData,
  updateBrandProduct
} from "../ProductAction"
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const EmptyPage = lazy(() => import("../../Main/EmptyPage"));
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function BrandList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [currentBrandId, setCurrentBrandId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [newimageId, setnewimageId] = useState("");
  const [newbrandName, setNewBrandName] = useState('');

  useEffect(() => {
    props.getBrandProduct();
   
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

   "110", // 'Name', // 0
   "264",// 'Brand Id', // 1
   "1431",// 'Live', // 2
   "1004",// 'Inactive', // 3
   "84",// 'Delete', // 4
   "154",// 'Submit', // 5
   "170",//Edit14
   "1078", // Save15
   "1079",// Cancel16
  "1259", // Do you want to delete?"17
   
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  useEffect(() => {
    setData(props.brandProduct);
}, [props.brandProduct]);

 
  function handleSetImage(imageId) {
    setnewimageId(imageId);
  }

const handleEditClick = (brand,brandName) => {
  setEditsuppliesId(brand);
  setNewBrandName(brandName)
};

const handleCancelClick = (brand) => {
  setEditedFields((prevFields) => ({ ...prevFields, [brand]: undefined }));
  setEditsuppliesId(null);
};
   
function handleSetCurrentBrandId(item) {
  setCurrentBrandId(item);
  // console.log("opp",item);
}
const handleInputChange = (value, key, dataIndex) => {
  setEditedFields((prevFields) => ({
    ...prevFields,
    [dataIndex]: {
      ...prevFields[dataIndex],
      [key]: value,
    },
  }));
};
const handleSave = (item) => {
  console.log(newbrandName)
  console.log(newimageId)
  let data={
    brandName:newbrandName,
    imageId:newimageId?newimageId:item.imageId
  }
  props.updateBrandProduct(data,item.brand)
  
  setEditsuppliesId(null); // Exit edit mode
};
  return (
    <>
      <Formik
          initialValues={{
            brandName:"",
          }}
        //   validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
         
              props.addProductBrand(
                {
                  ...values,
                //   whatsapp: this.state.whatsapp ? "Different" : "Same",
                //   price:values.price,
                },
                // this.props.userId,
                // () => this.handleReset(resetForm)
              );
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
          }) => (
            <div class="overflow-y-auto  overflow-x-hidden rounded  max-sm:m-1 py-ygap w-[99.5%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col"
              >
                <div class=" h-full w-w47.5.5 max-sm:w-wk"
                >
                  <div class=" flex  flex-nowrap justify-between">             
                    <FastField name="imageId" component={PostImageUpld} />             
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
               
                            {/* name="salutation"
                           */}
                        <div class=" w-wk max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins"> 
                      {/* Name             */}
                      {translatedMenuItems[0]}
                          </div>
                          <FastField
                            isRequired
                            name="brandName"
                            // label="First Name"                          
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                                   
                    </div>
                  </div>               
                <Button
                  type="primary"
                  htmlType="submit"
            loading={props.addingProductBrand}
                >
   {translatedMenuItems[5]}   
                  {/*                     
                    Create */}
                </Button>                                        
                </div>              
              </div>  
            </Form>
            </div>
          )}
        </Formik>
 
      <div className=' flex  sticky h-[70vh] z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[95%]  justify-between p-1 bg-transparent font-bold font-poppins  !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">         
            <div className=" w-[9.2rem] truncate max-md:w-[4.5rem]  max-xl:w-[8.7rem] max-lg:w-[9.31rem]">         
            </div>
            <div className="  w-[11.4rem] text-[#00A2E8] text-sm  truncate max-md:w-[8.5rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            <BrandingWatermarkIcon className="!text-icon   mr-1" />  {translatedMenuItems[0]}
             {/* Name */}
            </div>
            <div className="  w-[22.63rem]  truncate max-md:w-[11.63rem]  max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
             {/* Brand Id */}
             <BrandingWatermarkIcon className="!text-icon text-[#436e1b]  mr-1" />  {`${translatedMenuItems[1]} ID`}
              {/* "Sector" */}
            </div>
            <div className=" w-[10.8rem]  truncate max-md:w-[5.12rem]  max-xl:w-[4.12rem] max-lg:w-[2.34rem]">     
            {/* Live */}
            {translatedMenuItems[2]}       
            </div>
            <div className="  w-[27.9rem]  truncate max-md:w-[11.9rem]  max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
           {/* Inactive */}
           {translatedMenuItems[3]}
              {/* Quotation" */}   
            </div>
            <div className=" w-[24.1rem]  truncate max-md:w-[1.1rem]  max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
          {/* Delete */}
          {translatedMenuItems[4]}
             {/* Pipeline" */}
            </div>       
          </div>
            {data.length === 0 ? <EmptyPage /> : data.map((item, index) => {
        
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] md:flex row-auto    max-sm:border-b-4 max-sm:border-blue-500"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex border-l-2 border-green-500 bg-[#eef2f9] h-8 w-[6.5rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                        <div class=" text-xs flex items-center  max-sm:text-sm font-poppins ">

{editsuppliesId === item.brand ? (
    <EditUpload
    imageId={item.imageId}
    imgWidth={100}
    imgHeight={100}
    getImage={handleSetImage}
  />                      
                    ) : (
                      <div className=" text-xs  font-poppins">
                        <div> 
                            {item.imageId ? (
                            <MultiAvatar
                              imageId={item.imageId ? item.imageId : ''}
                              imgHeight={"1.8rem"}
                              imgWidth={"1.8rem"}
                            />
                          ) : (
                            <div class="flex font-bold ml-gap items-center text-[0.65rem]" >
                              No Image
                            </div>
                          )}
                          </div>
                      </div>
                    )}                  
             </div>
                     </div>
                      </div>
                      <div className=" flex   max-sm:w-auto justify-start items-center h-8 ml-gap bg-[#eef2f9]  w-[8.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">

                      <div class=" text-xs ml-gap max-sm:text-sm font-poppins ">
                        {editsuppliesId === item.brand ? (
                            <Input
                            style={{ width: "3rem" }}
                          value={newbrandName}
                            // onChange={(e) => handleInputChange(e.target.value, item.brandName, 'brandName')}
                            onChange={(e) => setNewBrandName(e.target.value)}
                           
                          />                    
                    ) : (
                      <div className=" text-xs ml-gap font-poppins">
                        <div>  {item.brandName}</div>
                      </div>
                    )}
                        </div>
                      </div>
                      <div className=" flex justify-start items-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto   w-[16.81rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">               
                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm "
                         onClick={() => {
                          props.handleProductBrandModal(true);
                          handleSetCurrentBrandId(item);
                        }}
                        >
                          {item.brand}
                        </div>
                      </div>
                      <div className=" flex max-sm:w-auto  justify-center items-center h-8 ml-gap bg-[#eef2f9]  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">
                     <div class=" text-xs  font-poppins max-sm:text-sm ">
                          {item.brandCount}
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end  max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex max-sm:w-auto w-[21.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]   max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">
                      {/* Inactive */}
                      </div>
                      <div className=" flex max-sm:w-auto w-[19.615rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]   max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">
                      {/* Delete */}
                      </div>
                      <div className=" flex max-sm:w-auto  w-[3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]   max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">              
                        <div className=" flex  items-center justify-center h-8  bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.brand ? (
                        <>
                      <Button 
                      type="primary"
                    //   loading={props.updatingOrdrSuplrItems}
                    onClick={() => handleSave(item)}
                      >
                        {translatedMenuItems[7]} {/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.brand)} className="ml-[0.5rem]"
                        >
                        {translatedMenuItems[8]} {/* Cancel */}
                      </Button>
                      </>                   
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] "
                        tooltipTitle= {translatedMenuItems[6]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.brand,item.brandName)}
                      />
                    )}
    </div> 
                        <StyledPopconfirm
            title= {translatedMenuItems[9]}
            onConfirm={() => props.deleteProductBrandData({active:false},item.brand)}
          >        
           <DeleteOutlineIcon  className="!text-icon text-[tomato] cursor-pointer"  />         
          </StyledPopconfirm>      
                      </div>
                    </div>             
                  </div>
                </div>
              )
            })}
         
        </div>
      </div>
  <Suspense fallback={<BundleLoader />}>
  <ProductBrandModal
   translateText={props.translateText}
   selectedLanguage={props.selectedLanguage}
      currentBrandId={currentBrandId}
      addProductBrandModal={props.addProductBrandModal}
  handleProductBrandModal={props.handleProductBrandModal}
      />
      </Suspense>
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
  product
}) => ({
  userId: auth.userDetails.userId,
  addingProductBrand:product.addingProductBrand,
  
 
  user: auth.userDetails,
  brandProduct:product.brandProduct,
  addProductBrandModal:product.addProductBrandModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addProductBrand,
        updateBrandProduct,
        getBrandProduct,
        deleteProductBrandData,
      handleProductBrandModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BrandList);

