import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";

import { Link } from 'react-router-dom';
import {
    getTeamCustomer,
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
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ContactsIcon from '@mui/icons-material/Contacts';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import CustomerContactDrawerModal from "./CustomerContactDrawerModal";
import CustomerOpportunityDrawerModal from "./CustomerOpportunityDrawerModal";
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
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

function CustomerTeamCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
 
  const [pageNo, setPageNo] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
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
   
    props.getTeamCustomer(props.userId, pageNo);
    setPageNo(pageNo + 1);
    //   props.getSectors();
    // props.getCountries();
    // props.getAllCustomerEmployeelist();
  }, []);

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
"1581", //Score
"185"//Adress
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
   
      setPageNo(pageNo + 1);
      props.getTeamCustomer(
        props.currentUser ? props.currentUser : props.userId,
        pageNo,
      );
  };

  const {
    fetchingTeamCustomer,
    teamCustomer,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
    handleCustomerContactDrawerModal,
    addDrawerCustomerContactModal,
    handleCustomerOpportunityDrawerModal,
    addDrawerCustomerOpportunityModal
  } = props;
  console.log("ee");
 
  // if (fetchingTeamCustomer) {
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
         <div className=' flex sticky  z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky  z-10">
         <div class=" flex justify-between w-[89%]">
            <div className="font-poppins font-bold text-xs w-[13.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            {translatedMenuItems[0]}
           {/* name */}
            </div>
            <div className="font-poppins font-bold text-xs w-[8.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[1]}
             {/* work */}

            </div>
            <div className="font-poppins font-bold text-xs w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            {translatedMenuItems[2]}
             {/* sector */}

            </div>
            <div className="font-poppins font-bold text-xs w-[1.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            {translatedMenuItems[3]}
           {/* source */}

            </div>
            <div className="font-poppins font-bold text-xs w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">           
            </div>
            <div className="font-poppins font-bold text-xs w-[4.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            {translatedMenuItems[4]}
             {/* quotation */}

            </div>
            <div className=" font-poppins font-bold text-xs w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
            {translatedMenuItems[5]}
             {/* Pipeline" */}
         
            </div>  
            {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[1.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {/* Score */}
            {translatedMenuItems[19]}
            </div>
            )}         
            <div className="font-poppins font-bold text-xs w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            {translatedMenuItems[6]}
            {/* Assigned" */}
          
            </div>
            <div className="font-poppins font-bold text-xs w-[1.82rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] ">
            {translatedMenuItems[7]}
             {/* Owner" */}
         
            </div>
            <div className="font-poppins font-bold text-xs w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {translatedMenuItems[8]}
             {/* Customer" */}
          
            </div>
        
          </div>

          </div>
        <InfiniteScroll
        dataLength={teamCustomer.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamCustomer?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"80vh"}
        style={{ scrollbarWidth:"thin"}}
      >
      
      { !fetchingTeamCustomer && teamCustomer.length === 0 ?<NodataFoundPage />:teamCustomer.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const countryCode = item.countryAlpha2Code
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
                  <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex   w-[15rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div>
                            {/* <Tooltip title={item.name}> */}
                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            {/* </Tooltip> */}
                          </div>
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                    {translatedMenuItems[9]}   {/* New */}
                                    </div>
                                  ) : null}
                                  {/* <a class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[blue] cursor-pointer" 
                            href={`customer/${item.customerId}`}>{item.name} </a>
                              &nbsp;&nbsp;
        {date === currentdate ? (
          <div class="text-xs"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </div>
        ) : null}
        */}
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {
  
  (item.countryDialCode !== null && item.countryDialCode !== undefined) && 
  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?

 
  `${item.countryDialCode} ${item.phoneNumber}` :

  
  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?
  `${item.phoneNumber}` : 
  '' 
}

                          {/* {
                          `${item.countryDialCode} ${item.phoneNumber}`
                          } */}
                        </div>

                      </div>
                      <div className=" flex max-sm:w-auto items-center justify-center w-[2.1rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                       {/* Country */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[7.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                       {/* Sector  */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  items-center  w-[9.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.source}
                        </div>

                      </div>
                    


                      <div className=" flex items-center  max-sm:w-auto w-[4.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* >Pipeline Value */}

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex  max-sm:w-auto w-[2.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                       {/* Pipeline Value */}

                        {/* {item.totalProposalValue > 0 && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue}`}
      </div>
    )} */}
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {/* {`${item.userCurrency} ${item.totalProposalValue/1000}K`} */}
        {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div>     

                      {props.user.aiInd && (
           <div className=" flex  justify-center  w-[7.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
         {item.noteScoreInd}
          
            </div>
            )}
{/* Score */}
                      <div className=" flex items-center max-sm:w-auto   w-[4rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                    {/* Assigned */}

                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">None</div>
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
                      <div className=" flex items-center max-sm:w-auto w-[2rem] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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
                  
           

                      <div className=" flex justify-center  w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

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
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex justify-between items-center " >
                              {item.convertInd === 0 && translatedMenuItems[17]}
                                {item.convertInd === 1 && translatedMenuItems[16]}
                                {item.convertInd === 2 && translatedMenuItems[18]}
                                <NextPlanIcon className="!text-icon "  />
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
</div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                     
                      <div class="w-4">
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
                      
                        <div class="w-4">
                          <Tooltip title= {translatedMenuItems[13]}>
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-green-800"
                              onClick={() => {
                                handleCustomerNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>
                        </div> 
                        <Tooltip title= {translatedMenuItems[20]}>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAddressCutomerModal(true);
            handleRowData(item);
          }}
          
        /> 
        </Tooltip>  
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
                              : <div class=" w-4">

                              </div>
                            }
                          </Tooltip>
           
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
                                                       
                        <div class="w-4">
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
                        <div class="w-4">
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
                        </div>                                      
                                               
                      
                        <div class="w-4">
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
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
       />
         <CustomerPulseDrawerModal
        customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AddCustomerEmailDrawerModal
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      />
      <AddCustomerAdressModal
        item={rowdata}
         type="customer"
         addAddressCustomerModal={props.addAddressCustomerModal}
         handleAddressCutomerModal={props.handleAddressCutomerModal}
      /> 
<CustomerContactDrawerModal
        customer={currentCustomer}
        addDrawerCustomerContactModal={addDrawerCustomerContactModal}
        handleCustomerContactDrawerModal={handleCustomerContactDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      
      <CustomerOpportunityDrawerModal
        customer={currentCustomer}
        addDrawerCustomerOpportunityModal={addDrawerCustomerOpportunityModal}
        handleCustomerOpportunityDrawerModal={handleCustomerOpportunityDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />

<AddCustomerNotesDrawerModal
        customer={currentCustomer}
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
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
  teamCustomer: customer.teamCustomer,
  sales: opportunity.sales,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingTeamCustomer: customer.fetchingTeamCustomer,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  customerSearch: customer.customerSearch,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  addAddressCustomerModal:customer.addAddressCustomerModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamCustomer,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      customerToAccount,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      handleCustomerNotesDrawerModal,
      getCustomerById,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
      handleAddressCutomerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTeamCardList);

