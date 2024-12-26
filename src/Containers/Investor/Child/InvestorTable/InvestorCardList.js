import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArticleIcon from '@mui/icons-material/Article';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component"; 
import { Tooltip, Select,Checkbox,Input } from "antd";
import dayjs from "dayjs";
import ScoreIcon from '@mui/icons-material/Score';
import { getSources } from "../../../../Containers/Settings/Category/Source/SourceAction";
import { getSectors } from "../../../../Containers/Settings/Sectors/SectorsAction";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import {
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
  getTeamUserList
} from "../../../Customer/CustomerAction";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import ReactCountryFlag from 'react-country-flag';
import FactoryIcon from '@mui/icons-material/Factory';
import SourceIcon from '@mui/icons-material/Source';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {getInvestorsbyId,
  handleInvestorContModal,
  handleUpdateInvestorModal,
  handleInvestorPulseDrawerModal,
  handleInvestorDocumentModal,
  handleInvestorNotesDrawerModal,emptyInvestor,
  deleteInvestorData,
  handleInvestorPriceDrawer,
  handleInvestorAddressDrawerModal,
  UpdateInvestor
} from "../../InvestorAction";
import { BundleLoader } from "../../../../Components/Placeholder";

const EmptyPage = lazy(() => import("../../../Main/EmptyPage"));
const InvestorSearchedData = lazy(() => import("./InvestorSearchedData"));
const InvestorPulseDrawerModal = lazy(() => import("./InvestorPulseDrawerModal"));
const InventoryPriceDrawer = lazy(() => import("./InventoryPriceDrawer"));
const InvestorDocumentDrawerModal  = lazy(() => import("./InvestorDocumentDrawerModal"));
const AddInvestorAdressModal = lazy(() => import("./AddInvestorAdressModal"));
const AddInvestorNotesDrawerModal = lazy(() => import("../InvestorDetail/AddInvestorNotesDrawerModal"));
const ContactsInvestorModal = lazy(() => import("./ContactsInvestorModal"));
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState(""); 
  const [touchedSector, setTouchedSector] = useState(false);
  const [touchedSource, setTouchedSource] = useState(false);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
            "278",//1Sector
            "490",//2Deals
            "144",//3In Progress
            "579",//4signed
            "14",//5 Category
            "279",//6Source
            "589",//7 First Meeting
            "1161",//8 Shares
            "218",//9Value
            "592",//10Club
            "76",//11 Assigned
            "77",//12 Owner
          "138",//  document     13  
          "392", // pulse14 
          "185", // 185ADDress 15
          "316", // notes 16
          "608",// investor contact 17 
          "170",// 170edit  18 
          "84", // 84delete 19
          "1581", //Score
       
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
    props.getInvestorsbyId(props.userId, page,"creationdate");
    setPage(page + 1);
    //  props.getTeamUserList(props.userId)
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
  useEffect(() => {
    return () => props.emptyInvestor();
  }, []);

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }


  const handleLoadMore = () => {
    const callPageMapd = props.investorsbyId && props.investorsbyId.length &&props.investorsbyId[0].pageCount
    setTimeout(() => {
      const {
        getInvestorsbyId, 
      } = props;
      if  (props.investorsbyId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getInvestorsbyId(
                  props.currentUser ? props.currentUser : props.userId,
                  page,
                  props.filter?props.filter:"creationdate"
                );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const handleEditRowField = (investorId, field, currentValue) => {
    setEditableField({ investorId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleUpdateSubmit = async () => {
    const { investorId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === 'name') {
      mappedField = 'name'; 
    } else if (field === 'sector') {
      mappedField = 'sectorId';
    } else if (field === 'source') {
      mappedField = 'source';
    } else if (field === 'department') {
      mappedField = 'departmentId';
    }
    updatedData[mappedField] = editingValue;
    props.UpdateInvestor(updatedData,investorId)
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

      const { investorId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
    
     // Map the field to the correct key if needed
     if (field === 'name') {
      mappedField = 'name'; 
    } else if (field === 'sector') {
      mappedField = 'sectorId';
      } else if (field === 'source') {
        mappedField = 'source';
      } else if (field === 'department') {
        mappedField = 'departmentId';
      }
      updatedData[mappedField] = value; // Update the value with selected option
      props.UpdateInvestor(updatedData,investorId)
      setEditableField(null);
      setEditingValue("");
    
  };

  const handleContract = async (checked, investorId) => {
    const newCategory = checked ? "Institutional" : "Private";
  
    // Map the field to the correct key
    //  if (field === 'name') {
    //   mappedField = 'name'; 
    const mappedField = "pvtAndIntunlInd";
    const updatedData = { [mappedField]: newCategory }; // Update the value with toggle state
  
    // Call the prop function to update the data
    props.UpdateInvestor(updatedData, investorId);
  
    // Optionally reset any temporary state (if required)
    setEditableField(null);
  };
  const handleSelectSectorFocus = () => {
    if (!touchedSector) {
      props.getSectors();
      setTouchedSector(true);
    }
  };
  const handleSelectSourceFocus = () => {
    if (!touchedSource) {
      props.getSources(props.orgId);
      setTouchedSource(true);
    }
  };

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    handleInvestorContModal,
    handleInvestorPulseDrawerModal,
    handleInvestorDocumentModal,
    addDrawerInvestorPulseModal,
    addDrawerInvestorDocumentModal,
    addDrawerInvestorContactModal,
    investor,
    priceInvestorDrawer,
    deleteInvestorData,
    handleInvestorPriceDrawer,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  return (
    <>
   {props.investorSerachedData.length > 0 ? (
    <InvestorSearchedData
    investorSerachedData={props.investorSerachedData}
    fetchingInvestorSearchData={props.fetchingInvestorSearchData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between max-sm:hidden  w-[86%]  p-1 bg-transparent items-end font-bold !text-lm font-poppins max-xl:text-xs max-lg:text-[0.45rem] sticky  z-10">
          <div className="w-2"></div>
        <div className="text-[#00A2E8] text-sm w-[14.9rem] truncate max-md:w-[14.6rem] max-xl:w-[14.4rem] ">
        <LocationCityIcon className='!text-icon  '  /> {translatedMenuItems[0]} 
        {/* "Name" */}          
                     </div>
        <div className=" w-[16.55rem]  truncate max-md:w-[16.55rem]  max-xl:w-[16.1rem] max-lg:w-[18.1rem]">
        <FactoryIcon className="!text-icon   text-[#84a59d]"/>  {translatedMenuItems[1]}
        {/* "Sector" */}
                    </div>
                    <div className=" w-[10.21rem]  truncate max-md:w-[10.21rem] max-xl:w-[8.2rem]">
          <FormatListNumberedIcon className='!text-icon    text-[#42858c]' />   {translatedMenuItems[5]}
          {/* "Category" */}            
          </div>
          <div className=" w-[9.34rem]  truncate max-md:w-[9.34rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
          <SourceIcon className="!text-icon   text-[#4b5043]"/> {translatedMenuItems[6]}
        {/* "Source"         */}
          </div>
          <div className=" w-[9.22rem]  truncate max-md:w-[9.22rem] max-xl:w-[8.2rem]">
          {/* {translatedMenuItems[7]} */}
      {/* First Meeting */} <EventAvailableIcon className="!text-icon   text-[#4b5043]"/>  1st Meeting
          </div>
        <div className="  w-[10.12rem]  truncate max-md:w-[10.12rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]">
        <CurrencyExchangeIcon className='!text-icon mr-1   text-[#e4eb2f]' />
             {translatedMenuItems[2]}
         {/* "Deals" */}          
                </div>   
          <div className="  w-[12.212rem]  truncate max-md:w-[11.212rem] max-xl:w-[8.2rem]">
          <ShowChartIcon className='!text-icon    text-[#776871]' /> {translatedMenuItems[8]}
       {/* Shares # */}
          </div>         
          <div className=" w-[8.21rem]  truncate max-md:w-[1.21rem]  max-xl:w-[8.2rem]">
          <GolfCourseIcon className='!text-icon   text-[#f42c04]'/> {translatedMenuItems[10]}
        {/* Club */}
          </div>     
         {props.user.aiInd && (
            <div className=" w-[7.81rem]  truncate max-md:w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
             <ScoreIcon className="!text-icon   text-[#f28482]"/>  {translatedMenuItems[20]}
            {/* Score          */}
            </div>            
            )}
         <div className=" w-[6.33rem]  truncate max-md:w-[6.33rem]  max-xl:w-[10.3rem]">
         <AccountCircleIcon className="!text-icon   text-[#d64933]"/>  {translatedMenuItems[11]}
      {/* Assigned" */}         
         </div>
     
      </div>
        <InfiniteScroll
        dataLength={investorsbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingInvestors?<div><BundleLoader/></div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
        
        { !fetchingInvestors && investorsbyId.length === 0 ?<EmptyPage />:investorsbyId.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
              className="flex rounded justify-between  py-ygap bg-white mt-1  items-center  max-sm:rounded-lg max-xl:text-xs max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                
                                     <div className=" flex items-center  max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs  font-poppins  max-sm:text-sm">
                                    {props.showCheckboxes && (
                                    <Checkbox
                onChange={() => props.handleCheckboxChange(item.investorId)}
                checked={props.selectedDeals.includes(item.investorId)}
              />
                                    )}

                                    </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex   w-[10.5rem]  border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  items-center">
                                <div>

                                                   <MultiAvatar
                                                      primaryTitle={item.name}
                                                      imageId={item.imageId}
                                                      imageURL={item.imageURL}
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                                  
                                        </div>                                                 
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full w-[100%] flex-row md:flex-col ml-1">                                         
                                            {/* Name */}
                                  
                                            <div class=" flex items-center justify-between  text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap  text-xs  text-[#042E8A] cursor-pointer  max-sm:text-sm"  to={`/investor/${item.investorId}`} title={item.name}>
                                            {item.name}
                                        </Link>                                
                                              {/* {/* <Link */}
                                               {date === currentdate ? (
                                                <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
                       <div>
                      {editableField?.investorId === item.investorId &&
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
    handleEditRowField(item.investorId, 'name', item.name)} 
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100 ">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                        </div>
                                            </div>
                                            </ div>
                                        </Tooltip>
                              
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                {/* Sector                     */}
                                    <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">   
                                    {item.sector}
                                    </div>
                                </div>
                                                                                                                                                  
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-12 max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                              
                               {/* Country */}
                                  <div class="text-xs  font-poppins  max-sm:text-xs">
                                              <ReactCountryFlag
                                    countryCode={item.countryAlpha2Code}
                                    svg
                                    style={{
                                      width: '1rem',
                                      height: '1rem',
                                    }}
                                  />
                                  &nbsp;
                                {item.countryAlpha2Code}
                                              </div>
                                          </div>
                                          <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}

                                    <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {item.category}
                                    </div>
                                </div>
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[6.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs ml-gap font-poppins  max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[6.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* Deals */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">                               
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Deals */}

                                    
                                    <div class="text-xs w-[4.1rem]  text-center  justify-center  font-poppins  max-sm:text-sm"> 
                                      {item.oppNo}  </div>
                                    <div class="text-xs w-[4.3rem]  text-center  justify-center  font-poppins  max-sm:text-sm">
                                       {item.totalProposalValue && ( <span> {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}</span>)} </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                              
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                <div className=" flex  items-center justify-center w-[3.212rem]  max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* shares */}

                                    <div class="text-xs text-[blue] font-bold cursor-pointer justify-center  font-poppins  max-sm:text-sm">
                                  <div    onClick={() => {
                             handleInvestorPriceDrawer(true);
                              handleCurrentRowData(item);
                            }}>{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 w-[5.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # value */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.allTotalAmountOfShare}
                                    </div>
                                </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* club */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  font-poppins w-[5.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Assigned */}
                                    <div class=" text-xs  font-poppins  max-sm:text-sm">                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {/* {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : ( */}
                  <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                   </Tooltip>
                {/* )} */}
                </>
              )}
            </span>          
                                    </div>
                                </div>
                                
                 </div>
            
                  <div class=" flex w-wk justify-end items-center  h-8 ml-gap bg-[#eef2f9]">
                                <div class="flex cursor-pointer  max-sm:justify-evenly max-sm:w-wk max-sm:items-center">  
                                          
                                <div >
                          <Tooltip title={translatedMenuItems[14]} >
                            <MonitorHeartIcon
                                        onClick={() => {
                                        handleInvestorPulseDrawerModal(true);
                                        handleCurrentRowData(item);
                                      }}
                                      className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl"
                                    />
                                </Tooltip>
                          </div>  
                          <div >
                   <Tooltip title={translatedMenuItems[16]} >
                       <NoteAltIcon
                  onClick={() => {
                  props.handleInvestorNotesDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
              />
           </Tooltip>
                   </div> 
                         < Tooltip title={translatedMenuItems[15]} >
                          <AddLocationAltIcon
                            className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
                              onClick={() => {
                              props.handleInvestorAddressDrawerModal(true);
                              handleCurrentRowData(item);
                            }}
                             />   
                                  </Tooltip>                                                                        
                         
                   <div>
                                  <Tooltip title={translatedMenuItems[13]} >
                                    <ArticleIcon  className="!text-icon cursor-pointer  max-sm:!text-xl"
                                    onClick={() => {
                                    handleInvestorDocumentModal(true);
                                    handleCurrentRowData(item);
                                  }}
                                  />
                                  </Tooltip>
                                  </div>              
                   <div >
                    <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span class="cursor-pointer"
                  //type="edit"
                    onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
                    />
                  </a>
                </span>
              ):<div class=" w-3">                   
              </div>}
            </Tooltip>
                        </div>                                    
                    <div >
                        <span 
              className=" !text-icon cursor-pointer"    
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl" />}
            </span> 
                        </div>      
                        <div >         
            <Tooltip title={translatedMenuItems[17]} >
              <ContactEmergencyIcon
              className=" !text-icon cursor-pointer  text-blue-500 max-sm:!text-xl "
                  onClick={() => {
                  handleInvestorContModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            </div>                                                   
            <div >
            <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteInvestorData(item.investorId,props.userId)
                        }
                      >
                         <Tooltip title={translatedMenuItems[19]} >
                       
                          <DeleteOutlineIcon
                            type="delete"
                            className="!text-icon text-[red] cursor-pointer max-sm:!text-xl"
                          />
                       
                        </Tooltip>
                      </StyledPopconfirm>        
                  </div>
                  </div>
                   
                            </div>
                            </div>
                        </div>
                    )
                })}

     </InfiniteScroll> 
     </div>
     )}  
<Suspense fallback={"Loading"}>

<ContactsInvestorModal
        RowData={RowData}
        addDrawerInvestorContactModal={addDrawerInvestorContactModal}
        handleInvestorContModal={handleInvestorContModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />

<InvestorPulseDrawerModal
        RowData={RowData}
        addDrawerInvestorPulseModal={addDrawerInvestorPulseModal}
        handleInvestorPulseDrawerModal={handleInvestorPulseDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />

<InvestorDocumentDrawerModal
        RowData={RowData}
        addDrawerInvestorDocumentModal={addDrawerInvestorDocumentModal}
        handleInvestorDocumentModal={handleInvestorDocumentModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
      />
           <AddInvestorNotesDrawerModal
        RowData={RowData}
        addDrawerInvestorNotesModal={props.addDrawerInvestorNotesModal}
        handleInvestorNotesDrawerModal={props.handleInvestorNotesDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
      <InventoryPriceDrawer
          RowData={RowData}
          handleInvestorPriceDrawer={handleInvestorPriceDrawer}
          priceInvestorDrawer={priceInvestorDrawer}
          key={priceInvestorDrawer ? 'open' : 'closed'}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        />
        <AddInvestorAdressModal    
        item={RowData}
         type="investor"
         addInvestorAddressModal={props.addInvestorAddressModal}
         handleInvestorAddressDrawerModal={props.handleInvestorAddressDrawerModal}
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
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
  investor
}) => ({
  userId: auth.userDetails.userId,
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  investorsbyId:investor.investorsbyId,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  user: auth.userDetails,
  priceInvestorDrawer: investor.priceInvestorDrawer,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  addInvestorAddressModal: investor.addInvestorAddressModal,
  addDrawerInvestorDocumentModal: investor.addDrawerInvestorDocumentModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorsbyId,
      deleteInvestorData,
      handleUpdateInvestorModal,
      handleInvestorContModal,
      emptyInvestor,
      handleInvestorPulseDrawerModal,
      handleInvestorDocumentModal,
      handleInvestorNotesDrawerModal,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      handleInvestorPriceDrawer,
      handleInvestorAddressDrawerModal,
      getTeamUserList,
      UpdateInvestor,
      getSectors,
      getSources
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorCardList);

