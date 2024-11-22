import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Checkbox,Popconfirm} from "antd";
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
  handleUpdateUserModal,
  handleCustomerEmailDrawerModal,
  handleCustomerNotesDrawerModal,
  getCustomerById,
  emptyCustomer,
  customerToAccount,
  handleCustomerPulseDrawerModal,
  handleCustomerContactDrawerModal,
  handleCustomerOpportunityDrawerModal,
  handleAddressCutomerModal,
  getTeamUserList
} from "../../CustomerAction";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import FactoryIcon from '@mui/icons-material/Factory';
import SourceIcon from '@mui/icons-material/Source';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ScoreIcon from '@mui/icons-material/Score';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import ContactsIcon from '@mui/icons-material/Contacts';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import CustomerContactDrawerModal from "./CustomerContactDrawerModal";
import UpdateUserModal from "../CustomerTable/UpdateUserModal"
import CustomerOpportunityDrawerModal from "./CustomerOpportunityDrawerModal";
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CurrencySymbol } from "../../../../Components/Common";
import EmptyPage from "../../../Main/EmptyPage";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
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


dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); 
    }
};

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
    props.getTeamUserList(props.userId)
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
    <div className=" flex "> 
     
      <div className=' flex rounded w-[15%]  flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[#eaedf1] mt-1  items-center shadow-[#a3abb980] ">
       <div> Search team Member</div>
        </div>
        <div class="flex rounded  flex-col p-1 overflow-x-auto h-[78vh] box-content border bg-[#eaedf1] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.teamUserList.map((item,index) =>{
           return (
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center flex-no-wrap h-16">
          <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
            <MultiAvatar
               primaryTitle={item.firstName}
              imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex basis-[100%] overflow-hidden">
          
          <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >
        
 {item.fullName}

        </div> 
        </div>
          
       
        </div>
        <div className="flex flex-col max-sm:justify-between ">
          
              <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
                {item.mobileNo}             
                 </div>
            
          <div>
          <div class="font-medium text-xs ">
       
              <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
              {item.emailId}
              </div>
           
            
          </div>
          </div>
          </div>
          
      
       
      </div>
     )
    })}
        </div>
        </div>
         <div className=' flex sticky  w-[85%] z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
         <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold !text-lm sticky items-end z-10">
         <div class=" flex justify-between w-[82%] items-end font-poppins font-bold max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm ">
            <div className=" text-[#00A2E8] truncate  w-[11.5rem] max-md:w-[11.5rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            <ApartmentIcon className="!text-icon  "/>
            {translatedMenuItems[0]}
           {/* name */}
            </div>
            <div className=" w-[9.9rem] truncate max-md:w-[9.9rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            <WifiCalling3Icon className="!text-icon mr-1 text-[#4f5d75]"/>
            {translatedMenuItems[1]}
             {/* work */}
             <div className=" w-[2.1rem] truncate max-md:w-[2.1rem]  max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
           </div>
            </div>
            <div className=" w-[7.2rem] truncate max-md:w-[7.2rem]  max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            <FactoryIcon className="!text-icon mr-1 text-[#84a59d]"/> 
            {translatedMenuItems[2]}
             {/* sector */}

            </div>
            {/* <div className=" w-[7rem]  max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            <SourceIcon className="!text-icon mr-1 text-[#4b5043]"/> 
            {translatedMenuItems[3]}
           source

            </div> */}
           
            <div className=" w-[6.4rem] truncate max-md:w-[6.4rem]  max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            <LightbulbIcon className="!text-icon  text-[#84a59d]"/> 
            {translatedMenuItems[4]}
             {/* quotation */}

            </div>
            {props.user.aiInd && (
            <div className=" w-[4.71rem] truncate max-md:w-[4.71rem]   max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon mr-1 text-[#f28482]"/>  {translatedMenuItems[19]}
            {/* Score */}
           
            </div>
            )}         
            <div className=" w-[4.8rem] truncate max-md: w-[4.8rem]  max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
            {translatedMenuItems[6]}
            {/* Assigned" */}
          
            </div>
            <div className=" w-[4.7rem] truncate max-md:w-[4.7rem]  max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
            {translatedMenuItems[7]}
            {/* Assigned" */}
          
            </div>
            <div className=" w-[6.8rem] truncate  max-md:w-[6.8rem] max-xl:w-[3.81rem]">
            <AcUnitIcon className="!text-icon mr-1 text-[#667761]"/> 
            {translatedMenuItems[8]}
             {/* Customer" */}
          
            </div>
         
          </div>

          </div>
        <InfiniteScroll
        dataLength={teamCustomer.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamCustomer?<div style={{ textAlign: 'center' }}><BundleLoader/></div>:null}
        height={"83vh"}
        style={{ scrollbarWidth:"thin"}}
      >
      
      { !fetchingTeamCustomer && teamCustomer.length === 0 ?<EmptyPage/>:teamCustomer.map((item,index) =>  {
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
                className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex   w-[11.50rem] border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                        <div class=" text-xs  font-poppins max-sm:text-sm ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.customerId)}
              checked={props.selectedDeals.includes(item.customerId)}
              />
                        )}
                        </div>
                          <div class="flex items-center">

                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            {/* </Tooltip> */}
                          </div>
                       

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs text-blue-500 ml-1 font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm  cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem]  text-[tomato] font-bold"
                                    >
                                    {translatedMenuItems[9]}   {/* New */}
                                    </div>
                                  ) : null}
                              
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[7.54rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm ">
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
                      <div className=" flex max-sm:w-auto w-[2.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                       {/* Country */}
                        <div class=" text-xs  font-poppins max-sm:text-sm ">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[7.40rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                       {/* Sector  */}
                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm ">
                          {item.sector}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      {/* <div className=" flex max-sm:w-auto    w-[7rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm ">
                          {item.source}
                        </div>

                      </div> */}                    
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  max-sm:w-auto w-[6.82rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                    <div className=" flex max-sm:w-auto w-[3rem] items-center justify-center max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* >Pipeline Value */}

                        <div class=" text-xs  font-poppins items-center max-sm:text-sm text-center ">
                          {item.oppNo}

                        </div>
                      </div>
                      <div className=" flex  max-sm:w-auto items-center  w-[3.5rem]  max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                       {/* Pipeline Value */}
                       
                            {item.totalProposalValue && (
      <div class="text-xs flex font-poppins max-sm:text-sm text-center ">
<div>
        <CurrencySymbol currencyType={item.userCurrency}/>     </div> 
        <div>
        {`${Math.floor(item.totalProposalValue / 1000)}K`}
        </div>
      </div>
    )}
                      </div>     
                      </div>

                      {props.user.aiInd && (
           <div className=" flex  w-[4.62rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
         {item.noteScoreInd}
          
            </div>
            )}
{/* Score */}
                      <div className=" flex  max-sm:w-auto   w-[4.50rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                    {/* Assigned */}

                        <div class=" text-xs  font-poppins max-sm:text-sm ">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">None</div>
                            ) : (
                              <>
                                {/* {item.assignedTo === item.ownerName ? (

                                  null
                                ) : ( */}
                                  <div  className=" cursor-pointer"
                                 
                                  onClick={() => {
                                 
                                  handleSetCurrentCustomerId(item.customerId)
                                  props.handleUpdateUserModal(true);
                                  handleRowData(item);
                                  
                                }}
                                  >
                                  <MultiAvatar2
                                    primaryTitle={item.assignedTo}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                  </div>
                                {/* )} */}
                              </>
                            )}
                          </div>

                        </div>
                      </div>
              
                      <div className=" flex  w-[4.90rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3rem] max-sm:justify-between ">
                                  

                                  <div class=" text-xs  font-poppins">
                                  <MultiAvatar2
                  primaryTitle={item.ownerName}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                                    </div>
                                    </div>
                      

                      <div className=" flex  w-[7.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title= {translatedMenuItems[10]}
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button className="justify-start" type="primary"
                              style={{ width: "7rem", background: item.convertInd === 1 ? "tomato" : "linear-gradient(to right, #2BBCCF, #38C98D)" }}
                             
                              >
                              <div class="text-xs  flex  items-center  w-wk" >
                              <NextPlanIcon className="!text-icon mr-1"  />
                              {item.convertInd === 0 && translatedMenuItems[17]}
                                {item.convertInd === 1 && translatedMenuItems[16]}
                                {item.convertInd === 2 && translatedMenuItems[18]}
                                
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
                      <div className=" flex  w-[5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
</div>
                      <div class="flex max-sm:justify-between max-sm:w-wk  items-center justify-end h-8 bg-[#eef2f9]">
                     
                      <div class=" ">
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
                      
                        <div class=" ">
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
                        <div class="">
                        <Tooltip title= {translatedMenuItems[20]}>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleAddressCutomerModal(true);
            handleRowData(item);
          }}
          
        /> 
        </Tooltip>  
        </div>
        <div class="">
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
                              : <div class=" ">

                              </div>
                            }
                          </Tooltip>
                          </div>
           
                          <div class="!text-icon "
                            // style={{ fontSize: "0.8rem" }}
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
                                                       
                          <div class="">
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
                        <div class="">
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
                                               
                      
                        <div class="">
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

      <UpdateUserModal
         rowdata={rowdata}
      currentCustomerId={currentCustomerId}
      updateUserModal={props.updateUserModal}
      handleUpdateUserModal={props.handleUpdateUserModal}
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
  updateUserModal:customer.updateUserModal,
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
  addAddressCustomerModal:customer.addAddressCustomerModal,
  teamUserList:customer.teamUserList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamCustomer,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      handleUpdateUserModal,
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
      handleAddressCutomerModal,
      getTeamUserList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTeamCardList);

