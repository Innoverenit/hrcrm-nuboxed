import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button, Popconfirm,Checkbox } from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import {
  getCustomerListByUserId,
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
  handleAddressCutomerModal,
  deleteCustomer
} from "../../CustomerAction";
import { DeleteOutlined} from "@ant-design/icons";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
import EmptyPage from "../../../Main/EmptyPage";
const AddCustomerDrawerModal = lazy(() =>
  import("../../AddCustomerDrawerModal")
);
const AddCustomerEmailDrawerModal = lazy(() =>
  import("../UpdateCustomer/AddCustomerEmailDrawerModal")
);
const AddCustomerNotesDrawerModal = lazy(() =>
  import("../CustomerDetail/AddCustomerNotesDrawerModal")
);
const CustomerPulseDrawerModal = lazy(() =>
  import("./CustomerPulseDrawerModal")
);
const CustomerContactDrawerModal = lazy(() =>
  import("./CustomerContactDrawerModal")
);
const CustomerOpportunityDrawerModal = lazy(() =>
  import("./CustomerOpportunityDrawerModal")
);
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerCardList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  // const [page1, setPage1] = useState(0);
  // const [page2, setPage2] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(props.viewType)

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
   "248",// 'Customer', // 7
    "100",   // new 8
    "1300" , //  Change status to Customer?"9
    "213" ,  // "Opportunity"10
    "392" ,  // Pulse 11
    "316" ,  // "Notes"12
    "170" ,  // "Edit" 13
   "73", // Contact 14
   "144" ,//In Progress 15
   "387",//  Convert 16
   "389",//   Converted 17
   "1581", //Score 18
   "185"//Address 19
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
    
      props.emptyCustomer()
      props.getCustomerListByUserId(props.userId, page, "creationdate");
   
  }, [props.viewType]);

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

  }, []);

  const [JsonData, setJsonData] = useState(props.customerByUserId);

  console.log(JsonData)
  useEffect(() => {
    setJsonData(props.customerByUserId)
  }, [props.customerByUserId]);

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
    const callPageMapd = props.customerByUserId && props.customerByUserId.length &&props.customerByUserId[0].pageCount
    setTimeout(() => {

      if  (props.customerByUserId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          props.getCustomerListByUserId(props.userId, page, "creationdate");
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const {
    fetchingCustomers,
    customerByUserId,
    fetchingCustomerPagination,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    addDrawerCustomerContactModal,
    addDrawerCustomerOpportunityModal,
    handleCustomerPulseDrawerModal,
    handleCustomerContactDrawerModal,
    handleCustomerOpportunityDrawerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
  console.log("ee");

  // if (fetchingCustomers) {
  //   return <BundleLoader />;
  // }
console.log(page)
console.log(props.userId)
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
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky z-10">
            <div class=" flex justify-between font-poppins w-[89%] items-end">
         
            <div className="font-poppins font-bold  text-[#00A2E8] text-base w-[20.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            <ApartmentIcon className="!text-icon  "/>
            {translatedMenuItems[0]}
           {/* name */}
            </div>
            <div className="font-poppins  font-bold text-xs  w-[16.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
                <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
            {translatedMenuItems[1]}
             {/* work */}
            </div>
            <div className="font-poppins font-bold text-xs  w-[12.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            <FactoryIcon className="!text-icon  text-[#84a59d]"/> 
            {translatedMenuItems[2]}
              {/* "Sector" */}
          
            </div>
            <div className="font-poppins font-bold text-xs  w-[9.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            <SourceIcon className="!text-icon  text-[#4b5043]"/> 
            {translatedMenuItems[3]}
             {/* "Source" */}
         
            </div>         
            <div className="font-poppins font-bold text-xs w-[8.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            <LightbulbIcon className="!text-icon text-[#84a59d]"/> 
            {translatedMenuItems[4]} 
              {/* Quotation" */}
     
            </div>
            <div className="font-poppins font-bold text-xs  w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
            <FilterAltIcon className="!text-icon  text-[#ff66b3]"/> 
            {translatedMenuItems[5]}
             {/* Pipeline" */}
            </div>   
            {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[9.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {/* Score */}      <ScoreIcon className="!text-icon  text-[#f28482]"/> 
            {translatedMenuItems[18]}
            </div>
            )}    
            <div className="font-poppins font-bold text-xs w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon  text-[#d64933]"/> 
            {translatedMenuItems[6]}   
            {/* Assigned */}
            </div>          
            <div className="font-poppins font-bold text-xs w-[9.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            <AcUnitIcon className="!text-icon  text-[#92dce5]"/> 
            {translatedMenuItems[7]}
              {/* Customer" */}
          
            </div>
         
            </div>
           

          </div>
          <InfiniteScroll
            dataLength={customerByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingCustomers || fetchingCustomerPagination ? <div class="flex justify-center">Loading...</div> : null}
            height={"83vh"}
            style={{ scrollbarWidth:"thin"}}
          >

            {!fetchingCustomers && customerByUserId.length === 0 ? <EmptyPage /> : customerByUserId.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
              const countryCode = item.countryAlpha2Code
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
              );
              const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                } 
           Street : ${item.address && item.address.length && item.address[0].street
                }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address && item.address.length && item.address[0].country) || ""
                } 
           PostalCode : ${item.address && item.address.length && item.address[0].postalCode
                } `;
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex  w-[13rem] border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                        <div className=" flex  max-sm:w-auto   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                    {/* Sector  */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.customerId)}
              checked={props.selectedDeals.includes(item.customerId)}
              />
                        )}
                        </div>

                      </div>
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

                          <div class="max-sm:w-full flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs ml-1 text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem] text-[tomato] font-bold"
                                    >
                                      {translatedMenuItems[8]}
                                    </div>
                                  ) : null}                              
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[8.54rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] ml-gap max-lg:text-[0.45rem]">
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
                      <div className=" flex max-sm:w-auto  w-[3.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                  {/* Country */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[9.21rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                    {/* Sector  */}
                        <div class=" text-xs ml-gap  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  w-[7.215rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.source}
                        </div>

                      </div>
                   
                      <div className=" flex   max-sm:w-auto w-[5.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                     {/* Pipeline Value */}

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div>
                    
                   
                      <div className=" flex max-sm:w-auto w-[5.82rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                       {/* Pipeline Value */}

                        {/* {item.totalProposalValue > 0 && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue}`}
      </div>
    )} */}
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
      {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div> 
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">  
                      {props.user.aiInd && (
           <div className=" flex  w-[5.12rem] items-center font-poppins justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
         {item.noteScoreInd}
          
            </div>
            )}               
                      <div className=" flex  max-sm:w-auto   w-[7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned</div> */}

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
          
              
                      <div className=" flex  w-[9.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title={translatedMenuItems[9]}
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button className="justify-start" type="primary"
                              style={{ width: "7rem", background: item.convertInd === 1 ? "tomato" :"linear-gradient(to right, #2BBCCF, #38C98D)" }}>
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] flex items-center w-wk " >
                              <NextPlanIcon  className="!text-icon mr-1 "/>
                                {item.convertInd === 0 && translatedMenuItems[17]}
                                {item.convertInd === 1 && translatedMenuItems[16]}
                                {item.convertInd === 2 && translatedMenuItems[18]}
                      
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
                      </div>
                      <div class="flex max-sm:justify-evenly max-sm:w-wk items-center"> 
                      <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          <Tooltip title={translatedMenuItems[11]}>
                            <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                              onClick={() => {
                                handleCustomerPulseDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}
                            />
                          </Tooltip>
                        </div>
                     
                        <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          <Tooltip title={translatedMenuItems[12]}>
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
                        <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                        <Tooltip title={translatedMenuItems[19]}>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAddressCutomerModal(true);
            handleRowData(item);
          }}
          
        />   
            </Tooltip>   
            </div>     
            <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
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
                
                          <div className="!text-icon"
                      
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
                          <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          <Tooltip title={translatedMenuItems[14]}>
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                              onClick={() => {
                                handleCustomerContactDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}

                            />
                          </Tooltip>
                        </div>
                        <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          <Tooltip title={translatedMenuItems[10]}>
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
                                                
                       
                        <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          {props.user.customerUpdateInd === true && user.crmInd === true && (
                            <Tooltip title={translatedMenuItems[13]}>
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
                        {/* <div class=" text-xs  font-poppins"> */}
                        <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >            
                        <StyledPopconfirm
                          title= "Do you want to delete?"
                          onConfirm={() =>  props.deleteCustomer(item.customerId)}>
                     <Tooltip title="Delete">
                          <DeleteOutlined
                            type="delete"
                            className=" !text-icon cursor-pointer text-[red]"
                          />
                       </Tooltip>
                        </StyledPopconfirm>
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
  <Suspense fallback={<BundleLoader />}>
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
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />


      <AddCustomerNotesDrawerModal
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      <AddCustomerAdressModal
        item={rowdata}
         type="customer"
         addAddressCustomerModal={props.addAddressCustomerModal}
         handleAddressCutomerModal={props.handleAddressCutomerModal}
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
}) => ({
  userId: auth.userDetails.userId,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerNotesModal: customer.addDrawerCustomerNotesModal,
  customerByUserId: customer.customerByUserId,
  fetchingCustomerPagination: customer.fetchingCustomerPagination,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal: customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
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

      getCustomerListByUserId,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
      setEditCustomer,
      getSectors,
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
      getAllCustomerEmployeelist,
      handleAddressCutomerModal,
      deleteCustomer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardList);

