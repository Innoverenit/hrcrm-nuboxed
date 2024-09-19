import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import {
  MultiAvatar,
  MultiAvatar2,
 
} from "../../../../Components/UI/Elements";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { Link } from 'react-router-dom';
import {
  getAllCustomerlIST,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  handleCustomerNotesDrawerModal,
  getCustomerById,
  emptyCustomer,
  customerToAccount,
  handleCustomerPulseDrawerModal,
  handleCustomerContactDrawerModal,
  handleCustomerOpportunityDrawerModal,
  handleAddressCutomerModal
} from "../../CustomerAction";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
const CustomerContactDrawerModal =lazy(()=> import("./CustomerContactDrawerModal"));
const CustomerOpportunityDrawerModal =lazy(()=> import("./CustomerOpportunityDrawerModal"));
const AddCustomerDrawerModal =lazy(()=> import("../../AddCustomerDrawerModal"));
const AddCustomerEmailDrawerModal =lazy(()=> import("../UpdateCustomer/AddCustomerEmailDrawerModal"));
const AddCustomerNotesDrawerModal =lazy(()=> import("../CustomerDetail/AddCustomerNotesDrawerModal"));
const CustomerPulseDrawerModal =lazy(()=> import("./CustomerPulseDrawerModal"));
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerAllCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

    "110", // 'Name', // 0
   "378",// 'Work', // 1
   "278",// 'Sector', // 2
   "279",// 'Source', // 3
   "213",// 'Quotation', // 4
   "328",// 'PipeLine', // 5
   "76",// 'Assigned', // 6
   "77",// 'Owner', // 7
   "248",// 'Customer', // 8
       "100",   // new 9
    "1300" , //  Change status to Customer?"10
    "213" ,  // "Opportunity"11
    "392" ,  // Pulse 12
    "316" ,  // "Notes"13
    "170" ,  // "Edit" 14
   "73", // Contact 15
   "144" ,//In Progress 16
   "387",//  Convert 17
   "389",//   Converted 18
"1581"//SCORE 19
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
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    setPage(page + 1);
    props.getAllCustomerlIST(page,props.filter?props.filter:"creationdate");
    //   props.getSectors();
    // props.getCountries();
    // props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyCustomer();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


const [rowdata, setrowdata] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const handleConfirm = (customerId) => {
    // Call the function to change the status to "Lost" here
    props.customerToAccount(customerId);
  };
  const handleLoadMore = () => {
   
      setPage(page + 1);
      props.getAllCustomerlIST( page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingAllCustomerList,
    allCustomers,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    updateCustomerModal,
    fetchingAllCustomerListError,
    fetchingAllCustomers,
    handleCustomerContactDrawerModal,
    handleCustomerOpportunityDrawerModal,
    user,
    addDrawerCustomerContactModal,
    addDrawerCustomerOpportunityModal,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
 
  // if (fetchingAllCustomerList) {
  //   return <BundleLoader />;
  // }
  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
    
    {props.customerSearch.length > 0 ? (
    <CustomerSearchedData
    customerSearch={props.customerSearch}
    fetchingCustomerInputSearchData={props.fetchingCustomerInputSearchData}
    />
  ) : (
         <div className=' flex justify-end sticky  z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky text-xs  z-10">
        <div class=" flex justify-between font-poppins w-[93%]">
            <div className="font-poppins w-[13.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.7rem] max-lg:w-[7.31rem]">
            {translatedMenuItems[0]}
              {/* name */}
            </div> 
            <div className="font-poppins w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[1]}          
                {/* defaultMessage="Work" */}
            
            </div>
            <div className="font-poppins w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.33rem]">
            {translatedMenuItems[2]}     
                {/* defaultMessage="Sector" */}
            </div>
            <div className="font-poppins w-[3.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            {translatedMenuItems[3]}      
                {/* defaultMessage="Source" */}
           
            </div>
          
            <div className="font-poppins w-[3.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.36rem]">
            {translatedMenuItems[4]}            
                {/* defaultMessage="Quotation" */}
      
            </div>
            <div className="font-poppins w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.8rem]">
            {translatedMenuItems[5]}            
                {/* defaultMessage="Pipeline" */}
       
            </div>    
            {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {/* Score */}
            {translatedMenuItems[19]}  
            </div>
            )}  
            <div className="font-poppins w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[3.2rem]">
            {translatedMenuItems[6]}            
           {/* ="Assigned" */}
             
            </div>
            <div className="font-poppins w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.8rem] max-lg:w-[6.2rem]">
              {translatedMenuItems[7]}  
           {/* owner */}

            </div>
            <div className="font-poppins w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[8]}
             {/* customer */}
            </div>
          
            <div className="w-[3.8rem]"></div>
            </div>
      </div>
        <InfiniteScroll
        dataLength={allCustomers.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllCustomerList?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{ scrollbarWidth:"thin"}}
      >
      
      { !fetchingAllCustomerList && allCustomers.length === 0 ?<NodataFoundPage />:allCustomers.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         //const countryCode = item.countryAlpha2Code
         const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col   items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                                >
                                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                   <div className=" flex  w-[15rem] max-xl:w-[7rem] max-lg:w-[7rem]  max-sm:w-auto">
                                   <div className="flex max-sm:w-full">
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
                                            <div class=" text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
      {item.name}
    </Link>                                   
       
             
        {date === currentdate ? (
    <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
    >
            {translatedMenuItems[9]}
          </div>
        ) : null}   
                                            </div>
                                            </div>
                                        </Tooltip>
                      </div>
                    </div>
                                    </div> 
                                    <div className=" flex  max-sm:w-auto  items-center  w-[5.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">
                           
                                   
                                    <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   
                                    {item.phoneNumber}
                                    </div>
                                
                                </div> 
                                <div className=" flex  max-sm:w-auto items-center  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
            {/* sector */}
                        <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex items-center  max-sm:w-auto w-[7.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  {item.source}
</div>

</div>
<div className=" flex justify-center w-[5.1rem] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">


{/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
<div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
  {item.countryAlpha2Code}
</div>
</div>
                                
                                <div className=" flex w-[30%] max-xl:w-[2.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.oppNo}

                          </div>
                                </div>
                            
                              
                                <div className=" flex  w-[4.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                  

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.totalProposalValue}

                          </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex w-[1rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between ">
                                    

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.weight}

                          </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  justify-center  w-[8.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
        {item.noteScoreInd}
          
            </div>
            )}
{/* SCORE */}

                                <div className=" flex items-center  flex-col w-[3rem] max-sm:w-auto max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3rem] max-sm:justify-between ">
                                  

                                    <div class=" text-xs  font-poppins">
                                    
                                    <div>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              )}
            </div>
             
                                    </div>
                                </div>
                                <div className=" flex items-center  w-[6rem] max-xl:w-[5rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between mb-2 ">
                       
                     

                       <Tooltip title={item.ownerName}>
       <MultiAvatar
         primaryTitle={item.ownerName}
         imageId={item.ownerImageId}
         imgWidth={"1.8rem"}
         imgHeight={"1.8rem"}
       />
     </Tooltip>
        
                                </div>
            
                      
                      <div className=" flex  justify-center w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title= {translatedMenuItems[10]}
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button type="primary"
                            style={{ width: "6.5rem", background: item.convertInd === 1 ? "tomato" : "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                           
                            >
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] " >
                              {item.convertInd === 0 && translatedMenuItems[17]}
                                {item.convertInd === 1 && translatedMenuItems[16]}
                                {item.convertInd === 2 && translatedMenuItems[18]}
                               <NextPlanIcon className="!text-icon " />
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
                      </div>
                      <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] ml-1 max-sm:flex-row max-sm:w-[10%]">
                    
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
                              : 
                              <div class=" w-3">

                              </div>
                            }
                          </Tooltip>
                          </div>
                        
                      
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
                   
                    
                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                   
                          <Tooltip title= {translatedMenuItems[15]}>
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                              onClick={() => {
                                handleCustomerContactDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}

                            />
                          </Tooltip>
                        </div>
                       
                    
                          <Tooltip title= {translatedMenuItems[11]}>
                            <LightbulbIcon
                              className=" !text-icon cursor-pointer text-[#AF5910]"
                              onClick={() => {
                                handleCustomerOpportunityDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>
                       
                     
                      <div class="flex w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
           
                          <Tooltip title= {translatedMenuItems[12]}>
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
              
                          <Tooltip title= {translatedMenuItems[13]}>
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#4bc076]"
                              onClick={() => {
                                handleCustomerNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>

                    
                    

                      <div class="flex w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                      
                    
                          {props.user.customerUpdateInd === true && user.crmInd === true && (
                            <Tooltip title= {translatedMenuItems[14]}>
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
                          {/* <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> */}
                     
                      </div>
                      </div>
                    </div>
                    </div>
                   
                    )
                })}
                </InfiniteScroll>
      </div>
      </div>
        )}
  
      <AddCustomerDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />

      <UpdateCustomerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
      <CustomerContactDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        addDrawerCustomerContactModal={addDrawerCustomerContactModal}
        handleCustomerContactDrawerModal={handleCustomerContactDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <CustomerOpportunityDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        addDrawerCustomerOpportunityModal={addDrawerCustomerOpportunityModal}
        handleCustomerOpportunityDrawerModal={handleCustomerOpportunityDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
         <CustomerPulseDrawerModal
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
    customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <AddCustomerEmailDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      />

<AddCustomerAdressModal
        item={rowdata}
         type="customer"
         addAddressCustomerModal={props.addAddressCustomerModal}
         handleAddressCutomerModal={props.handleAddressCutomerModal}
      /> 
<AddCustomerNotesDrawerModal
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      /> 
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
}) => ({
  userId: auth.userDetails.userId,
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  allCustomers: customer.allCustomers,
  sales: opportunity.sales,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingAllCustomerList: customer.fetchingAllCustomerList,
  fetchingAllCustomerListError: customer.fetchingAllCustomerListError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,
  addAddressCustomerModal:customer.addAddressCustomerModal,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerlIST,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      // getSectors,
      customerToAccount,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      handleCustomerNotesDrawerModal,
      getCustomerById,
      getCountries,
      // getAllCustomerEmployeelist,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
      handleAddressCutomerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerAllCardList);

