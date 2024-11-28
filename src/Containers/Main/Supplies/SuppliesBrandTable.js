import React, { useEffect, useState, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditUpload from "../../../Components/Forms/Edit/EditUpload";
import MaterialBrandModal from "./MaterialBrandModal"
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { Formik, Form, FastField } from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import ContactsIcon from '@mui/icons-material/Contacts';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import { Tooltip, Select,Input, Button} from "antd";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import FWLogo1 from "../../../Assets/Images/smallLogo.png"
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  MultiAvatar,
} from "../../../Components/UI/Elements";
import {addSuppliesBrand,
    getBrandSupplies,
    handleSuppliesBrandModal,
    deleteSuppliesBrandData,
    updateBrandMaterial
} from 
    "./SuppliesAction"
    import { StyledPopconfirm } from "../../../Components/UI/Antd";



const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function SuppliesBrandTable(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [editsuppliesId, setEditsuppliesId] = useState(null);
  const [currentBrandId, setCurrentBrandId] = useState("");
  const [newimageId, setnewimageId] = useState("");

  const [newbrandName, setNewBrandName] = useState('');
 
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);



  useEffect(() => {
   
    props.getBrandSupplies();
   
  }, []);

  useEffect(() => {
    setData(props.brandSupplies);
}, [props.brandSupplies]);

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
  "1078",//  Save
  "1079",//  Cancel
 "170", //  "Edit"
 "1259", //  "Do you want to delete?"
   "1258",//Deleted 10
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

  function handleSetCurrentBrandId(item) {
    setCurrentBrandId(item);
    // console.log("opp",item);
  }
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

const handleSave = (item) => {
  console.log(newbrandName)
  console.log(newimageId)
  let data={
    brandName:newbrandName,
    imageId:newimageId?newimageId:item.imageId
  }
  props.updateBrandMaterial(data,item.brand)
  
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
         
              props.addSuppliesBrand(
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
            <div class="overflow-y-auto  overflow-x-hidden flex justify-evenly">
            <Form className="form-background mt-2">
              <div class=" flex justify-around max-sm:flex-col"
              >
                <div class=" h-full  max-sm:w-wk"
                >
                  <div class=" flex  flex-nowrap justify-evenly">
                
                    <FastField className="mr-2" name="imageId" component={PostImageUpld} />
               
                    <div>
                      <div class="ml-2 flex justify-between max-sm:flex-col">
               
                            {/* name="salutation"
                           */}
                        <div class=" w-wk max-sm:w-full">
                        <div class="ml-2 text-xs font-bold font-poppins"> 
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
                       
                        <Button
                  type="primary"
                  htmlType="submit"
            loading={props.addingSuppliesBrand}
                >
    {/* Submit      */}
    {translatedMenuItems[5]}   
                  {/*                     
                    Create */}
                </Button>
                </div>

                      </div>                  
                     
                    </div>
                 
                  </div>                                                                                                                                                                            
                </div>            
              </div>                            
            </Form>
            </div>
          )}
        </Formik>
 
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[99%]  justify-between p-1 bg-transparent font-poppins font-bold !text-lm sticky items-end z-10">
            <div class="w-[5rem]"></div>
            <div className="text-[#00A2E8]  w-[24.9rem] truncate max-md:w-[23.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
             {/* Name */}
             <ContactsIcon className="!text-icon mr-1 "/>  {translatedMenuItems[0]}
            </div>
            <div className=" w-[24.5rem] truncate max-md:w-[20.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
          {/* Brand Id */}
          <BrandingWatermarkIcon className="!text-icon" />   {`${translatedMenuItems[1]} ID`}
            </div>
            <div className=" w-[7.63rem] truncate max-md:w-[5.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">    
            <LiveTvIcon className="!text-icon" />  {translatedMenuItems[2]}
            {/* Live */}
            </div>
            <div className=" w-[8.12rem] truncate max-md:w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">      
             {/* Inactive */}
             <ToggleOffIcon className="!text-icon" />   {translatedMenuItems[3]}
            </div>
            <div className="w-[8.2rem] truncate max-md:w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
              
   {/* Delete */}
  < DeleteOutlineIcon
   />{translatedMenuItems[10]}
            </div>
               
            <div className="w-[2.12rem]"></div>

          </div>
       

             {data.length === 0 ? <NodataFoundPage /> : data.map((item, index) => {
       
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">          
                        <div className="flex w-[5rem] items-center max-sm:w-auto  border-l-2 border-green-500 bg-[#eef2f9]">
                          <div>
                            
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
                            <div class="font-poppins ml-gap text-xs" >
                              No Image
                            </div>
                          )}
                          </div>
                      </div>
                    )}
                     
                          </div>
                          </div>
                          <div className=" flex  items-center justify-start max-sm:w-auto  h-8 ml-gap bg-[#eef2f9]   items-center w-[25.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {editsuppliesId === item.brand ? (
                            <Input
                            style={{ width: "3rem" }}
                          value={newbrandName}
                            // onChange={(e) => handleInputChange(e.target.value, item.brandName, 'brandName')}
                            onChange={(e) => setNewBrandName(e.target.value)}
                           
                          />
                      
                       
                    ) : (
                      <div className=" text-xs ml-gap items-center font-poppins">
                        <div>  {item.brandName}</div>
                      </div>
                    )}
                        </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                   
                    
                      <div className=" flex  items-center justify-start max-sm:w-auto  h-8 ml-gap bg-[#eef2f9]   items-center w-[25.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                  
                        <div class="flex text-xs text-blue-500 ml-gap font-poppins font-semibold  cursor-pointer"
                          onClick={() => {
                            props.handleSuppliesBrandModal(true);
                            handleSetCurrentBrandId(item);
                          }}
                        >
                          {item.brand}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto   h-8 ml-gap bg-[#eef2f9] justify-center   items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.liveCount}
                        </div>

                      </div>
                      <div className=" flex max-sm:w-auto   h-8 ml-gap bg-[#eef2f9] justify-center   items-center w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs ml-gap font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  {item.inactiveCount}
</div>

</div>
<div className=" flex max-sm:w-auto   h-8 ml-gap bg-[#eef2f9] justify-center   items-center  w-[8.01rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs ml-gap  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  {item.deleteCount}
</div>

</div>

<div class="flex justify-end max-sm:justify-end max-sm:w-wk items-center">

                      <div className=" flex   h-8 ml-gap bg-[#eef2f9] justify-center   items-center md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
    {editsuppliesId === item.brand ? (
                        <>
                      <Button 
                      type="primary"
                    //   loading={props.updatingOrdrSuplrItems}
                    onClick={() => handleSave(item)}
                      >
                         {translatedMenuItems[6]}{/* Save */}
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.brand)} className="ml-[0.5rem]"
                        >
                         {translatedMenuItems[7]} {/* Cancel */}
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle=  {translatedMenuItems[8]}
                        iconType="edit"
                        onClick={() => handleEditClick(item.brand,item.brandName)}
                      />
                    )}
    </div> 
                                    
                    <div className=" flex max-sm:w-auto  h-8 ml-gap bg-[#eef2f9] justify-center   items-center w-[1.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
<StyledPopconfirm
title=  {translatedMenuItems[9]}
onConfirm={() => props.deleteSuppliesBrandData({active:false},item.brand)}
>


<DeleteOutlineIcon

type="delete" className="!text-icon cursor-pointer text-[red]" />

</StyledPopconfirm>
</div>

</div>
</div>
             </div>     
                  </div>
                </div>
              )
            })} 
         
        </div>
      </div>
    
  
  <Suspense fallback={<div className="custom-loader">
          <div className="loader !block"> </div>
      <div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
    </div>}>
  <MaterialBrandModal
      currentBrandId={currentBrandId}
  addSuppliesBrandModal={props.addSuppliesBrandModal}
  handleSuppliesBrandModal={props.handleSuppliesBrandModal}
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
  product,
  supplies
}) => ({
  userId: auth.userDetails.userId,
  addingProductBrand:product.addingProductBrand,
  
 
  user: auth.userDetails,
  brandSupplies:supplies.brandSupplies,
  addSuppliesBrandModal:supplies.addSuppliesBrandModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addSuppliesBrand,
        getBrandSupplies,
        updateBrandMaterial,
        handleSuppliesBrandModal,
        deleteSuppliesBrandData
        // getBrandProduct
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesBrandTable);

