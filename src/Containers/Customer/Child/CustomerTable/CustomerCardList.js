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
import { getCountries ,getAllDialCodeList} from "../../../Auth/AuthAction";
import { getSources } from "../../../../Containers/Settings/Category/Source/SourceAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button, Popconfirm,Checkbox,Input } from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
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
  deleteCustomer,
  updateCustomer
  // handleUpdateUserModal
} from "../../CustomerAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
import { Link } from 'react-router-dom';
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

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerCardList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState("");

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
   props.getCountries();
  //  props.getSources(props.orgId);
   props.getSectors();
   props.getAllDialCodeList()
  }, []);

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
  const [hoverTimeout, setHoverTimeout] = useState(null);
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

  const handleMouseEnter = (item) => {
    const timeout = setTimeout(() => {
      handleCustomerPulseDrawerModal(true);
      handleSetCurrentCustomer(item);
    }, 4000); // 4 seconds delay
    setHoverTimeout(timeout);
  };
  const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves before 4 seconds
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
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
    // updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
  console.log("ee");

  const handleEditRowField = (customerId, field, currentValue) => {
    setEditableField({ customerId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleUpdateSubmit = async () => {
    const { customerId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    // if (field === 'shipByName') {
    //   mappedField = 'shipById'; 
    // } else if (field === 'dialCode2') {
    //   mappedField = 'dialCode';
    // } else if (field === 'shipperName') {
    //   mappedField = 'name';
    // }
    updatedData[mappedField] = editingValue;
    props.updateCustomer(updatedData,customerId)
    setEditableField(null);
      setEditingValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateSubmit(); 
    }
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);

      const { customerId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
    
      // Map the field to the correct key if needed
      // if (field === 'countryDialCode') {
      //   mappedField = 'shipById'; 
      // } if (field === 'dialCode') {
      //   mappedField = 'dialCode';
      // } else if (field === 'shipperName') {
      //   mappedField = 'name';
      // }
      updatedData[mappedField] = value; // Update the value with selected option
      props.updateCustomer(updatedData,customerId)
      setEditableField(null);
      setEditingValue("");
    
  };
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
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  ) : (  // Header
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-poppins font-bold  !text-lm max-xl:text-[0.65rem]  sticky z-10">
            <div class=" flex justify-between font-poppins w-[91%] items-end">
         
            <div className="truncate text-[#00A2E8] text-sm  w-[17.4rem] max-md:w-[15.5rem]  max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            <ApartmentIcon className="!text-icon  "/>
            {translatedMenuItems[0]}
           {/* name */}
            </div>
            <div className=" truncate w-[10.6rem] max-md:w-[9.9rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
                <WifiCalling3Icon className="!text-icon mr-1 text-[#4f5d75]"/>
            {translatedMenuItems[1]}
             {/* work */}
            </div>
            <div className=" w-[2.9rem] truncate max-md:w-[4.8rem]   max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
              {/* CountryFlag */}
            </div>
            <div className=" truncate w-[12rem] max-md:w-[12.3rem]  max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            <FactoryIcon className="!text-icon mr-1 text-[#84a59d]"/> 
            {translatedMenuItems[2]}
              {/* "Sector" */}        
            </div>
            <div className=" truncate w-[12.1rem] max-md:w-[9.1rem]  max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            <SourceIcon className="!text-icon mr-1 text-[#094074]"/> 
            {translatedMenuItems[3]}
             {/* "Source" */}       
            </div>   
            {props.user.recruitProInd ?  
             <div className=" w-[8.5rem] truncate max-md:w-[6.4rem]   max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
             <LightbulbIcon className="!text-icon  text-[#84a59d]"/> 
            Requirement
             </div>   
             :        
            <div className=" truncate w-[11.7rem] max-md:w-[14.9rem]  max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            <LightbulbIcon className="!text-icon text-[#84a59d]"/> 
            {translatedMenuItems[4]} 
              {/* Quotation" */}    
            </div>    
}       
            {props.user.aiInd && (
            <div className=" truncate w-[6.6rem] max-md:w-[5.81rem]  max-xl:w-[3.81rem]">
            {/* Score */}      <ScoreIcon className="!text-icon mr-1 text-[#f28482]"/> 
            {translatedMenuItems[18]}
            </div>
            )}    
            <div className="truncate w-[8rem] max-md:w-[7.2rem]  max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
            {translatedMenuItems[6]}   
            {/* Assigned */}
            </div>          
            <div className=" truncate w-[11.81rem] max-md:w-[5.81rem]  max-xl:w-[3.81rem]">
            <AcUnitIcon className="!text-icon  text-[#667761]"/> 
            {translatedMenuItems[7]}
              {/* Customer" */}
          
            </div>        
            </div>
          </div>
         {/* </ Header> */}
          <InfiniteScroll
            dataLength={customerByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingCustomers || fetchingCustomerPagination ? <div><BundleLoader/></div> : null}
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
                <div>  {/* Data Row */}
                  <div
                className="flex rounded justify-between  bg-white mt-1 items-center  w-[100%] py-ygap  max-sm:rounded-lg  max-xl:text-[0.65rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >      
                        <div className=" flex  max-sm:w-auto   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                    {/* Sector  */}
                        <div class=" text-xs  font-poppins max-sm:text-sm  ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.customerId)}
              checked={props.selectedDeals.includes(item.customerId)}
              />
                        )}
                        </div>

                      </div>
                      <div className="flex max-sm:w-auto">
                      <div className=" flex  w-[14rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
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
                      
                            <Tooltip>
                            <div class=" flex max-sm:w-full justify-center w-[100%] flex-row md:flex-col ml-1"> 
                              <div class=" flex items-center justify-between  text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] max-sm:text-sm   cursor-pointer" to={`/customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                    </Link>    
                                    &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem] text-[tomato] font-bold"
                                    >
                                      {translatedMenuItems[8]}
                                    </div>
                                  ) : null}
                                    <div>
                      {editableField?.customerId === item.customerId &&
   editableField?.field === 'name' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.customerId, 'name', item.name)} 
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
                                                            
                                </div>
                              </div>
                            </Tooltip>
                   
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[10.54rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs flex  font-poppins max-sm:text-sm  ml-gap ">        
<div>
{editableField?.customerId === item.customerId && editableField?.field === 'countryDialCode' ? (
  <Select
  style={{ width: "10rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
>
{props.dialcodeList.map((country) => (
   <Option key={country.country_dial_code} value={country.country_dial_code}>
  {country.country_dial_code}
   </Option>
 ))}
</Select>
) : (
<div onClick={() => 
handleEditRowField(item.customerId, 'countryDialCode', item.countryDialCode)} 
className="cursor-pointer text-xs font-poppins">
+{item.countryDialCode || "Update..."} &nbsp;

</div>         
                        )}
                      </div>
                      <div>
                      {editableField?.customerId === item.customerId &&
   editableField?.field === 'phoneNumber' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/>
) : (
<div  onClick={() => 
    handleEditRowField(item.customerId, 'phoneNumber', item.phoneNumber)} 
    className="cursor-pointer text-xs font-poppins">
    {item.phoneNumber || "Update..."}
    
    </div> 
)}                 
                      </div>
                          {/* {
                          `${item.countryDialCode} ${item.phoneNumber}`
                          } */}
                        </div>
                      </div>
                      <div className=" flex max-sm:w-auto  w-[3.1rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                  {/* Country */}
                        <div class=" text-xs  font-poppins max-sm:text-sm  ">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto  w-[12.41rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                    {/* Sector  */}
                        <div class=" text-xs ml-gap  font-poppins max-sm:text-sm  ">
                          {item.sector}
                        </div>
                      </div>
                
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  w-[10.215rem] truncate items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm  ">
                          {item.source}
                        </div>
                      </div>
                      <div className=" flex   max-sm:w-auto w-[9.6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                      <div className=" flex   max-sm:w-auto w-[5.1rem] items-center justify-center h-8  bg-[#eef2f9] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                     {/* Pipeline Value */}

                        <div class=" text-xs  cursor-pointer font-bold font-poppins  text-blue-600  max-sm:text-sm text-center  "
                          onClick={() => {
                                handleCustomerOpportunityDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}
                              >
                        {item.oppNo}
                        </div>
                      </div>                  
                   
                      <div className=" flex max-sm:w-auto w-[5.82rem] items-center justify-center h-8  bg-[#eef2f9] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">            
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center  ">
      {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div> 
                      </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">  
                      {props.user.aiInd && (
           <div className=" flex  w-[5.12rem] items-center font-poppins justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
         {item.noteScoreInd}
          
            </div>
            )}               
                      <div className=" flex  max-sm:w-auto   w-[6.30rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned</div> */}
                        <div class=" text-xs  font-poppins max-sm:text-sm  ">
                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">No Data</div>
                            ) : (
                              <>                           
                                  <div
                                  style={{cursor:"pointer"}}                              
                                onClick={() => {
                                  handleSetCurrentCustomerId(true);
                                  props.handleLeadsSubscriptionModal(item);
                                      }}
                                  >
                                  <MultiAvatar2
                                    primaryTitle={item.assignedTo}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                  </div>                         
                              </>
                            )}
                          </div>
                        </div>
                      </div>                   
                      <div className=" flex  w-[10.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
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
                              <div class="text-xs   flex items-center w-wk " >
                              <NextPlanIcon  className="!text-icon mr-1 "/>
                                {item.convertInd === 0 && translatedMenuItems[16]}
                                {item.convertInd === 1 && translatedMenuItems[15]}
                                {item.convertInd === 2 && translatedMenuItems[17]}
                      
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
                      </div>
                      <div class="flex max-sm:justify-evenly  max-sm:w-wk items-center"> 
                      <div class="items-center justify-center h-8 bg-[#eef2f9] flex" >
                          <Tooltip title={translatedMenuItems[11]}>
                            <MonitorHeartIcon className=" !text-icon cursor-pointer text-[#df9697]"                                     
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
            <div class="items-center justify-center w-[1.1rem]  h-8 bg-[#eef2f9] flex" >
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
                        <StyledPopconfirm
                          title= "Do you want to delete?"
                          onConfirm={() =>  props.deleteCustomer(item.customerId)}>
                     <Tooltip title="Delete">
                          <DeleteOutlineIcon
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
  source
}) => ({
  userId: auth.userDetails.userId,
  updateUserModal:customer.updateUserModal,
  dialcodeList: auth.dialcodeList,
  sources: source.sources,
  sectors: sector.sectors,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerNotesModal: customer.addDrawerCustomerNotesModal,
  customerByUserId: customer.customerByUserId,
  fetchingCustomerPagination: customer.fetchingCustomerPagination,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal: customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
  // updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  // countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,
  addAddressCustomerModal:customer.addAddressCustomerModal,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      getCustomerListByUserId,
      // handleUpdateUserModal,
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
      getSources,
      getAllCustomerEmployeelist,
      handleAddressCutomerModal,
      deleteCustomer,
      updateCustomer,
      getAllDialCodeList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardList);

