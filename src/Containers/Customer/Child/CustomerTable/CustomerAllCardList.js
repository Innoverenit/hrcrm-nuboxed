import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Checkbox,Popconfirm,Input} from "antd";
import {getAllDialCodeList} from "../../../Auth/AuthAction";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { getSources } from "../../../../Containers/Settings/Category/Source/SourceAction";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import FactoryIcon from '@mui/icons-material/Factory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ScoreIcon from '@mui/icons-material/Score';
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
  handleAddressCutomerModal, 
  updateCustomer,
  updateProspectUser,
} from "../../CustomerAction";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CustomerSearchedData from "./CustomerSearchedData";
// import { BundleLoader } from "../../../../Components/Placeholder";
import AddCustomerAdressModal from "./AddCustomerAdressModal";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CurrencySymbol } from "../../../../Components/Common";
import {getCrm,}from"./././../../../Leads/LeadsAction";
import EmptyPage from "../../../Main/EmptyPage";
import { BundleLoader } from "../../../../Components/Placeholder";

const CustomerContactDrawerModal =lazy(()=> import("./CustomerContactDrawerModal"));
const CustomerOpportunityDrawerModal =lazy(()=> import("./CustomerOpportunityDrawerModal"));
const AddCustomerDrawerModal =lazy(()=> import("../../AddCustomerDrawerModal"));
const AddCustomerEmailDrawerModal =lazy(()=> import("../UpdateCustomer/AddCustomerEmailDrawerModal"));
const AddCustomerNotesDrawerModal =lazy(()=> import("../CustomerDetail/AddCustomerNotesDrawerModal"));
const CustomerPulseDrawerModal =lazy(()=> import("./CustomerPulseDrawerModal"));

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
function CustomerAllCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page1, setPage1] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [page, setPage] = useState(0);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState("");
  const [isAssignDropdownVisible, setIsAssignDropdownVisible] = useState(null);
  const [selectedAssign, setSelectedAssign] = useState();
  const [touchcrm, setTouchcrm] = useState(false);
    const [touchSector, setTouchSector] = useState(false);
    const [touchDialCode, setTouchDialCode] = useState(false);
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
"1581",//SCORE 19
"185"//Address 20
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

  const handleAssignChange = (customerId,value) => {

    props.updateProspectUser(customerId,value);
    setIsAssignDropdownVisible(null); // Hide the dropdown after the request
  }; 

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
      if (field === 'sector') {
        mappedField = 'sectorId'; 
      } if (field === 'dialcCode') {
        mappedField = 'dialCcode';
      } else if (field === 'shipperName') {
        mappedField = 'name';
      }
      updatedData[mappedField] = value; // Update the value with selected option
      props.updateCustomer(updatedData,customerId)
      setEditableField(null);
      setEditingValue("");   
  };
  const handleButtonClick = (employeeId) => {
    props.getCrm(employeeId, page1, "creationdate");
    props.emptyLeads();
    setSelectedEmployee(employeeId);
  };
   const handleSelectAssignFocus = () => {
        if (!touchcrm) {
          props.getCrm()
          setTouchcrm(true);
        }
      };
  
      const handleSelectSectorFocus = () => {
        if (!touchSector) {
          props.getSectors();
          setTouchSector(true);
        }
      }
  
      const handleSelectDialCodeFocus = () => {
        if (!touchDialCode) {
          props.getAllDialCodeList();
          setTouchDialCode(true);
        }
      }
  const {
    fetchingAllCustomerList,
    allCustomers,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    handleCustomerContactDrawerModal,
    handleCustomerOpportunityDrawerModal,
    user,
    addDrawerCustomerContactModal,
    addDrawerCustomerOpportunityModal,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
    
  } = props;

  // if (loading) {
  //   return <div><BundleLoader/></div>;
  // }
console.log(selectedAssign)
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
  ) : (
        
    <div class="flex">
       <div className=' flex rounded w-[13%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
       <div > Search team member</div>
        </div>
        <div class="flex flex-col rounded overflow-x-auto  w-[11vw] h-[78vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.crmAllData.map((item,index) =>{
           return (
         <div class=" flex flex-col rounded border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] mt-1 max-sm:w-wk  scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center  h-16">
          <div class=" flex mr-[0.2rem] h-15" >
            <MultiAvatar
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex overflow-hidden">
          
          <div class="font-semibold text-[#337df4] font-poppins cursor-pointer text-lm truncate  " 
             onClick={() => handleButtonClick(item.employeeId)} >
        
          {item.empName}

        </div> 
        </div>              
        </div>
        <div className="flex flex-col max-sm:justify-between ">       
              <div class="overflow-hidden text-ellipsis font-poppins cursor-pointer text-lm truncate  flex items-center">
               {item.dailCode1} {item.mobileNo}
              </div>        
          <div>
          <div class="font-medium text-xs ">      
              <div class="overflow-hidden  text-ellipsis font-poppins cursor-pointer text-lm truncate  flex items-center">        
              {item.email} 
              </div>                    
          </div>
          </div>
          </div>                 
      </div>
 )
})}
        </div>
        </div>
         <div className=' flex sticky w-[87%] z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
         <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky items-end z-10">
         <div class=" flex justify-between w-[83%] items-end font-poppins font-bold max-lg:text-[0.45rem] max-xl:text-[0.65rem] !text-lm ">
            <div className=" text-[#00A2E8] truncate text-sm  w-[12.7rem] max-md:w-[11.5rem]  max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            <ApartmentIcon className="!text-icon  "/>
            {translatedMenuItems[0]}
           {/* name */}
            </div>
            <div className=" w-[10.9rem]  truncate max-md:w-[9.9rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            <WifiCalling3Icon className="!text-icon mr-1 text-[#4f5d75]"/>
            {translatedMenuItems[1]}
             {/* work */}
             <div className=" w-[2.1rem]  truncate max-md:w-[2.1rem]  max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
           </div>
            </div>
            <div className=" w-[7.7rem]  truncate max-md:w-[7.2rem]  max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            <FactoryIcon className="!text-icon mr-1 text-[#84a59d]"/> 
            {translatedMenuItems[2]}
             {/* sector */}
            </div>    
            {props.user.recruitProInd ?  
             <div className=" w-[8.5rem] truncate max-md:w-[6.4rem]   max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
             <LightbulbIcon className="!text-icon  text-[#84a59d]"/> 
            Requirement
             </div>   
             :               
            <div className=" w-[8.5rem] truncate max-md:w-[6.4rem]   max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            <LightbulbIcon className="!text-icon  text-[#84a59d]"/> 
            {translatedMenuItems[4]}
             {/* quotation */}

            </div>
}
            {props.user.aiInd && (
            <div className=" w-[4.71rem] truncate max-md:w-[4.71rem]   max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon mr-1 text-[#f28482]"/> 
            {/* Score */}
            {translatedMenuItems[19]}
            </div>
            )}         
            <div className=" w-[4.8rem] truncate  max-md:w-[4.8rem]  max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
            {translatedMenuItems[6]}
            {/* Assigned" */}
          
            </div>
            <div className=" w-[4.7rem] truncate  max-md:w-[4.7rem]   max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
            {translatedMenuItems[7]}
            {/* Assigned" */}
          
            </div>
            <div className=" w-[6.8rem] truncate  max-md:w-[6.8rem]   max-xl:w-[3.81rem]">
            <AcUnitIcon className="!text-icon mr-1 text-[#667761]"/> 
            {translatedMenuItems[8]}
             {/* Customer" */}         
            </div>   
          </div>
          </div>
        <InfiniteScroll
        dataLength={allCustomers.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllCustomerList?<div><BundleLoader/></div>:null}
        height={"83vh"}
        style={{ scrollbarWidth:"thin"}}
      >     
      { !fetchingAllCustomerList && allCustomers.length === 0 ?<EmptyPage/>:allCustomers.map((item,index) =>  {
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
                              <div
                className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:rounded-lg max-lg:text-[0.45rem] w-[100%] max-xl:text-[0.65rem]  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                
                                <div className=" flex  max-sm:w-auto   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">    
                                   <div class=" text-xs  font-poppins max-sm:text-sm  ">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.customerId)}
              checked={props.selectedDeals.includes(item.customerId)}
              />
                        )}
                        </div>
                        </div>
                                   <div className="flex max-sm:w-full">          
                      <div className=" flex  w-[12.50rem] border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[7rem] max-lg:w-[7rem]  max-sm:w-auto">
                       <div>  <MultiAvatar
                            primaryTitle={item.name}
                            imageId={item.imageId}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"} 
                          />
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
            {translatedMenuItems[9]}
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

                                        <div className=" flex  max-sm:w-auto  truncate  w-[8.54rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">                                                        
                            <div class="flex text-xs  max-sm:text-sm font-poppins   ml-gap">   
                            <div>
{editableField?.customerId === item.customerId && editableField?.field === 'countryDialCode' ? (
  <Select
  style={{ width: "10rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onBlur={() => handleEditRowField(null, null, null)}
  onFocus={handleSelectDialCodeFocus}
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
handleEditRowField(item.customerId, 'countryDialCode',item.countryDialCode)}   
className="cursor-pointer text-xs font-poppins">
+{item.countryDialCode || <div className="!text-lm">"Update..."</div>}&nbsp;

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
<div onClick={() => 
    handleEditRowField(item.customerId, 'phoneNumber',item.phoneNumber)}   
    className="cursor-pointer text-xs font-poppins">
    {item.phoneNumber || "Update..."}
    
    </div> 
)}                 
                      </div>
                            </div>                              
                        </div> 

                                <div className=" flex  w-[2.1rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
<div class=" text-xs  font-poppins max-sm:text-sm  ">
  <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
  {item.countryAlpha2Code}
</div>
</div>
<div className=" flex  max-sm:w-auto truncate   w-[7.7rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
    {/* sector */}
                <div class=" text-xs  max-sm:text-sm font-poppins   ml-gap">
                
                  <div>
{editableField?.customerId === item.customerId && editableField?.field === 'sector' ? (
  <Select
  style={{ width: "10rem" }}
  value={editingValue}
  onChange={handleChangeRowSelectItem} 
  onBlur={() => handleEditRowField(null, null, null)}
  onFocus={handleSelectSectorFocus}
  autoFocus
>
{props.sectors.map((country) => (
   <Option key={country.sectorId} value={country.sectorId}>
  {country.sectorName}
   </Option>
 ))}
</Select>
) : (
<div onClick={() => 
handleEditRowField(item.customerId, 'sector', item.sector)} 
className="cursor-pointer text-xs font-poppins">
{item.sector || "Update..."}

</div>         
                        )}
                      </div>
                </div>

              </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                  
<div className=" flex  w-[8.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">

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


<div className=" flex  w-[3.5rem] truncate  max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
<div class=" text-xs flex max-sm:text-sm font-poppins text-center">
                                <div>
        <CurrencySymbol currencyType={item.userCurrency}/>     </div> 
        <div>
                      {editableField?.customerId === item.customerId &&
   editableField?.field === 'totalProposalValue' ? (
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
    handleEditRowField(item.customerId, 'totalProposalValue', item.totalProposalValue)} 
    className="cursor-pointer text-xs font-poppins">
    {`${Math.floor(item.totalProposalValue / 1000)}K` || "Update..."}
    </div> 
)}                 
                      </div>
                          </div>
                                </div>
                                </div>
</div>     
                       
                            
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                {props.user.aiInd && (
            <div className=" flex    w-[4.62rem] truncate items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {/* {item.noteScoreInd} */}
            <div>
                                  {editableField?.customerId === item.customerId &&
               editableField?.field === 'noteScoreInd' ? (
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
                handleEditRowField(item.customerId, 'noteScoreInd', item.noteScoreInd)} 
                className="cursor-pointer text-xs font-poppins">
                {item.noteScoreInd  || "Update..."}
                </div> 
            )}                 
                                  </div>
                </div>
            )}
                             <div className=" flex w-[4.50rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3rem] max-sm:justify-between ">                    
                                                       <div class=" text-xs  font-poppins">
                                                       {item.assignedTo === null ? (
                                   "None"
                                 ) : (
                                                       <div>
                                    {isAssignDropdownVisible === item.customerId ? (
                                     <Select
                                       style={{ width: "8rem" }}
                                       value={selectedAssign}          
                                       onChange={(value) => {
                                         setSelectedAssign(value); 
                                         handleAssignChange(item.customerId,value); 
                                       }}
                                        onBlur={() => setIsAssignDropdownVisible(null, null, null)} 
                                        onFocus={handleSelectAssignFocus}
                                       autoFocus
                                     >
                                        {props.crmAllData.map(customer => (
                                            <Option key={customer.employeeId} value={customer.employeeId}>
                                             <div className="flex">
                                              <MultiAvatar
                                     primaryTitle={customer.empName} 
                                     imageId={item.imageId}
                                               imageURL={item.imageURL}
                                               imgWidth={"1.8rem"}
                                               imgHeight={"1.8rem"} 
                                   />
                                             <span>{customer.empName}</span> 
                                             </div>
                                            </Option>
                                          ))}
                                     </Select>
                                   ):(
                                     <div 
                                     onClick={() => {
                                       setIsAssignDropdownVisible(item.customerId); 
                                       setSelectedAssign(item.assignedTo); 
                                       }}  
                                     className="cursor-pointer"
                                   >
                                     <MultiAvatar2
                                     primaryTitle={item.assignedTo}
                                     imgWidth={"1.8rem"}
                                     imgHeight={"1.8rem"}
                                   />   
                                   </div>  
                                                         )}  
                               </div>
                                  )}
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
                      <div className=" flex   w-[7.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

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
                              <div class="text-xs   w-wk flex items-center" >
                              <NextPlanIcon className="!text-icon mr-1" />
                              {item.convertInd === 0 && translatedMenuItems[17]}
                                {item.convertInd === 1 && translatedMenuItems[16]}
                                {item.convertInd === 2 && translatedMenuItems[18]}
                            
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>
                       <div className=" flex  w-[5.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                      </div>
                      <div class="flex max-sm:justify-evenly max-sm:w-wk items-center justify-center h-8  bg-[#eef2f9]">
                      <div class="flex  max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
           <div class="">
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
   
         </div>
        
<div class="">
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
           <div >
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
                      <div class="flex  max-xl:w-[1.2rem] w-[1.1rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                          <Tooltip title={item.url}>
                            {item.url !== "" ? (
                              <div className="cursor-pointer"
                                //type="edit"
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
                          </div>  

                        <div                         
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
                                   
                      <div class="flex   max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                   <div>
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
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
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
  leads
}) => ({
  crmAllData:leads.crmAllData,
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
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,
  addAddressCustomerModal:customer.addAddressCustomerModal,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
  orgId: auth.userDetails.organizationId,
  dialcodeList: auth.dialcodeList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerlIST,
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
      getCountries,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
      handleAddressCutomerModal,
      getCrm,
      updateCustomer,
      getAllDialCodeList,
      getSources,
      getSectors,
      updateProspectUser,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerAllCardList);

