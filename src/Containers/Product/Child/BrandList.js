import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";

import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
//import { getCountries } from "../../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button, Popconfirm } from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../Components/UI/Elements";
import ProductBrandModal from "./ProductBrandModal"
import { Link } from 'react-router-dom';
import {addProductBrand,getBrandProduct,
  handleProductBrandModal,
  deleteProductBrandData
} from "../ProductAction"
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { DeleteOutlined } from "@ant-design/icons";



const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function BrandList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentBrandId, setCurrentBrandId] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);



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

 


 

  
//   const handleLoadMore = () => {
//     const callPageMapd = props.customerByUserId && props.customerByUserId.length &&props.customerByUserId[0].pageCount
//     setTimeout(() => {

//       if  (props.customerByUserId)
//       {
//         if (page < callPageMapd) {
//           setPage(page + 1);
//           props.getCustomerListByUserId(props.userId, page, "creationdate");
//       }
//       if (page === callPageMapd){
//         setHasMore(false)
//       }
//     }
//     }, 100);
//   };
 
  
  


   
 
function handleSetCurrentBrandId(item) {
  setCurrentBrandId(item);
  // console.log("opp",item);
}


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
            <div class="overflow-y-auto  overflow-x-hidden ">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col"
              >
                <div class=" h-full w-w47.5 max-sm:w-wk"
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
 
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky z-10">
            <div></div>
            <div className="font-poppins w-[12.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
           
            </div>
            <div className="font-poppins w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[0]}
             {/* work */}
            </div>
            <div className="font-poppins w-[8.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
        {/* Brand Id */}
        {`${translatedMenuItems[1]}Id`}
              {/* "Sector" */}
          
            </div>
            <div className="font-poppins w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
          
            {/* Live */}
            {translatedMenuItems[2]}
         
            </div>
            <div className="font-poppins w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
              

            </div>
            <div className="font-poppins w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
           {/* Inactive */}
           {translatedMenuItems[3]}
              {/* Quotation" */}
     
            </div>
            <div className="font-poppins w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
          {/* Delete */}
          {translatedMenuItems[4]}
             {/* Pipeline" */}
            </div>       
          
            <div className="w-[4.12rem]"></div>

          </div>
       

            {props.brandProduct.length === 0 ? <NodataFoundPage /> : props.brandProduct.map((item, index) => {
        
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex  w-[13rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div>
                            
                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                     
                          </div>
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.brandName}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {/* {date === currentdate ? (
                                    <div class="text-[0.65rem] mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                      {translatedMenuItems[9]}
                                    </div>
                                  ) : null} */}

                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">



                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                  
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]"
                         onClick={() => {
                          props.handleProductBrandModal(true);
                          handleSetCurrentBrandId(item);
                        }}
                        >
                          {item.brand}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.brandCount}
                        </div>

                      </div>


                      <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => props.deleteProductBrandData({active:false},item.brand)}
          >
           
           
            <DeleteOutlined
           
            type="delete" className="!text-icon cursor-pointer text-[red]" />
          
          </StyledPopconfirm>
                        </div>

                      </div>
                      {/* <div className=" flex max-sm:w-auto  items-center  w-[5.1rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
        
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                         
                        </div>
                      </div>
                      <div className=" flex items-center  max-sm:w-auto w-[6.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                 

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div> */}
                    </div>
                    {/* <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex max-sm:w-auto w-[4.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
     
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
      {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div>                  
                      <div className=" flex items-center max-sm:w-auto   w-[4rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                      

                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">No Data</div>
                            ) : (
                              <>
                                {item.assignedTo === item.ownerName ? (

                                  null
                                ) : (
                                  <MultiAvatar2
                                    primaryTitle={item.assignedTo}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                )}
                              </>
                            )}
                          </div>

                        </div>
                      </div>
                      <div className=" flex f items-center max-sm:w-auto w-[2rem] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                        <Tooltip title={item.ownerName}>
                          <div class="max-sm:flex justify-end">
                            <Tooltip title={item.ownerName}>
                              <MultiAvatar
                                primaryTitle={item.ownerName}
                                imageId={item.ownerImageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </Tooltip>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                      <div className=" flex  justify-center  w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title={translatedMenuItems[10]}
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button type="primary"
                              style={{ width: "8rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}>
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] " >
                                {item.convertInd === 0 && "Convert"}
                                {item.convertInd === 1 && "In progress"}
                                {item.convertInd === 2 && "Converted"}
                                <NextPlanIcon  className="!text-icon "/>
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>

                     
                        <div>
                          <Tooltip title={item.url}>
                            {item.url !== "" ? (
                              <div
                                //type="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() => { }}
                              >
                                {" "}
                                <a href={`https://${item.url}`} target="_blank">
                                  <ExploreIcon
                                    className=" !text-icon cursor-pointer text-[green]"

                                  />
                                </a>
                              </div>
                            )
                              : <div class=" w-3">

                              </div>
                            }
                          </Tooltip>

                        </div>
                        <div>
                          <div
                            style={{ fontSize: "0.8rem" }}
                            onClick={() => {
                              props.getCustomerDetailsById(item.customerId);
                              props.getCustomerKeySkill(item.customerId);
                              //   this.props.getCustomerDocument(item.customerId );

                              props.handleCustomerDrawerModal(item, true);
                            }}
                          >
                            {" "}
                            {user.pulseAccessInd === true && <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                            />}
                          </div>
                        </div>
                        <div>
                        </div>                    
                        <div >
                          <Tooltip title={translatedMenuItems[15]}>
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                              onClick={() => {
                                handleCustomerContactDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}

                            />
                          </Tooltip>
                        </div>
                        <div >
                          <Tooltip title={translatedMenuItems[11]}>
                            <LightbulbIcon
                              className=" !text-icon cursor-pointer text-[#AF5910]"
                              onClick={() => {
                                handleCustomerOpportunityDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>

                        </div>                                       
                        <div >
                          <Tooltip title={translatedMenuItems[12]}>
                            <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                              onClick={() => {
                                handleCustomerPulseDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}
                            />
                          </Tooltip>
                        </div>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAddressCutomerModal(true);
            handleRowData(item);
          }}
          
        /> 
                        <div >
                          <Tooltip title={translatedMenuItems[13]}>
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#4bc076]"
                              onClick={() => {
                                handleCustomerNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}
                            />
                          </Tooltip>
                        </div>                                     
                        <div >
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

                            <LocationOnIcon
                              className=" !text-icon cursor-pointer text-[#960A0A]"
                            />
                          </Tooltip>
                        </div>
                        <div >
                          {props.user.customerUpdateInd === true && user.crmInd === true && (
                            <Tooltip title={translatedMenuItems[14]}>
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                                onClick={() => {
                                  props.setEditCustomer(item);
                                  handleUpdateCustomerModal(true);
                                  handleSetCurrentCustomerId(item.customerId);

                                }}
                              />
                            </Tooltip>
                          )}
             
                        </div>                 
                    </div> */}
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
        getBrandProduct,
        deleteProductBrandData,
      handleProductBrandModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BrandList);

