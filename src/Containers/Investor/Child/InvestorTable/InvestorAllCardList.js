import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import { useDispatch } from 'react-redux';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Input, Checkbox} from "antd";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CurrencySymbol } from "../../../../Components/Common";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ReactCountryFlag from 'react-country-flag';
import { getSources } from "../../../../Containers/Settings/Category/Source/SourceAction";
import { getSectors } from "../../../../Containers/Settings/Sectors/SectorsAction";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import FactoryIcon from '@mui/icons-material/Factory';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SourceIcon from '@mui/icons-material/Source';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import ScoreIcon from '@mui/icons-material/Score';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
} from "../../../Customer/CustomerAction";
import {getAllInvestorsbyId,handleInvestorNotesDrawerModal,emptyInvestor,
  handleUpdateInvestorModal,
  handleInvestorPulseDrawerModal,
  handleInvestorContModal,
  deleteInvestorData,
  handleInvestorAddressDrawerModal,
  getAllEmployeelist,
  getInvestorsbyId, 
  handleInvestorPriceDrawer,
  UpdateInvestor
} from "../../InvestorAction";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";


const InventoryPriceDrawer = lazy(() => import("./InventoryPriceDrawer"));
const EmptyPage = lazy(() => import("../../../Main/EmptyPage"));
const AddInvestorNotesDrawerModal = lazy(() =>  import("../InvestorDetail/AddInvestorNotesDrawerModal"));
const InvestorPulseDrawerModal = lazy(() =>  import("./InvestorPulseDrawerModal"));
const  ContactsInvestorModal = lazy(() =>  import("./ContactsInvestorModal"));
const InvestorSearchedData = lazy(() =>  import("./InvestorSearchedData"));
const AddInvestorAdressModal = lazy(() =>  import("./AddInvestorAdressModal"));
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

function InvestorAllCardList(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
    const [editableField, setEditableField] = useState(null); 
    const [editingValue, setEditingValue] = useState(""); 
    const [touchedSector, setTouchedSector] = useState(false);
    const [touchedSource, setTouchedSource] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [       
          "110",//0 Name
          "278",//1Sector
          "490",//2Deals
           "328",//3Pipeline
           "279",//4Source
           "76",//5 Assigned
           "77",//6  Owner
           "1581", //Score 7
           "592",//Club 8
           "1161",//Shares9
           "14",//10 Category
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
    props.getAllInvestorsbyId( page,"creationdate");
    setPage(page + 1);
    props.getAllEmployeelist();
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
  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  const handleLoadMore = () => {
    const callPageMapd = props.allInvestorsbyId && props.allInvestorsbyId.length &&props.allInvestorsbyId[0].pageCount
    setTimeout(() => {  
      if  (props.allInvestorsbyId)
      {
        if (page < callPageMapd) {    
    setPage(page + 1);
    props.getAllInvestorsbyId(
      props.currentUser ? props.currentUser :
      page,
      props.filter?props.filter:"creationdate"
    );
            }
              if (page === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  }

  const callPageMapd =
  props.investorsbyId && props.investorsbyId.length && props.investorsbyId[0].pageCount;


const handleLoadMore1 = () => {
  if (isFetching || !hasMore) return; // Prevent multiple calls and check if there's more data

  setIsFetching(true); // Set fetching flag to true

  const { getInvestorsbyId } = props;
  const currentPage = page1; // Capture the current page value

  setTimeout(() => {
    if (currentPage === 0) {
      // If current page is 0, start fetching page 1 data
      getInvestorsbyId(
        props.currentUser ? props.currentUser : selectedEmployee,
        1, // Start with page 1 when scrolling begins
        props.filter ? props.filter : "creationdate"
      );
      setPage1(1); // Set page to 1 after first scroll
    } else if (currentPage < callPageMapd) {
      // Continue loading more pages if currentPage < callPageMapd
      getInvestorsbyId(
        props.currentUser ? props.currentUser : selectedEmployee,
        currentPage + 1, // Increment page number
        props.filter ? props.filter : "creationdate"
      ).then((data) => {
        if (!data || data.length === 0) {
          // If no data returned, set hasMore to false
          setHasMore(false);
        }
        setPage1(currentPage + 1); // Update page to the next number
      });
    } else {
      // If on the last page, stop loading more
      setHasMore(false);
    }

    setIsFetching(false); // Reset fetching flag after the call
  }, 100);
};

useEffect(() => {
  return () => props.emptyInvestor();
}, []);


  const handleButtonClick = (employeeId) => {
    props.getInvestorsbyId(employeeId, page1, "creationdate");
    props.emptyInvestor();
    setSelectedEmployee(employeeId);
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
    fetchingAllInvestors,
    fetchingInvestors,
    allInvestorsbyId,
    investorsbyId,
    handleUpdateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    handleInvestorPulseDrawerModal,
    handleInvestorContModal,
    addDrawerInvestorPulseModal,
    addDrawerInvestorContactModal,
    user,
    priceInvestorDrawer,
    IconShowhover, 
    handleInvestorPriceDrawer,
    deleteInvestorData
  } = props;
  console.log("ee");
 
console.log(selectedEmployee)
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
    <div  className=" flex">
       <div className=' flex rounded w-[13%] h-[87vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
       <div> Search team Member</div>
        </div>
        <div class="flex flex-col rounded w-[11vw]    p-1 h-[78vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.allEmployeeList.map((item,index) =>{
           return (
         <div class="flex flex-col rounded border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] mt-1 max-sm:w-wk  scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                 
        <div class="flex items-center  h-16">
          <div class=" flex  mr-[0.2rem] h-15" >
            <MultiAvatar
              primaryTitle={item.empName}
              imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex  overflow-hidden">        
          <div class="font-semibold text-[#337df4] font-poppins  truncate cursor-pointer text-lm "    
             onClick={() => handleButtonClick(item.employeeId)} 
          >      
  {item.empName}
        </div> 
        </div>             
        </div>
        <div className="flex flex-col max-sm:justify-between ">        
        <div class="overflow-hidden text-ellipsis font-poppins cursor-pointer text-lm  flex items-center">
        {item.dailCode1} {item.mobileNo} 
                       </div>           
          <div>
          <div class="font-medium text-xs ">
       
          <div class="overflow-hidden text-ellipsis font-poppins cursor-pointer text-lm  flex items-center">
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
        {selectedEmployee ?
        <>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      
            <InfiniteScroll
        dataLength={investorsbyId.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={fetchingInvestors?<div><BundleLoader/></div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
              
              {investorsbyId.map((item,index) =>  {
               const currentdate = dayjs().format("DD/MM/YYYY");
               const Category=item.pvtAndIntunlInd?"Institutional":"Private"
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
                    className="flex rounded justify-between  py-ygap  bg-white mt-1  items-center max-sm:rounded-lg max-xl:text-xs max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                  >
                                           <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                      <div className=" flex  w-[13.5rem]   max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto items-center ">
                                      <div className=" flex items-center   max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                      <div className=" flex   w-[13.5rem] h-8 border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  items-center">
      <div>
                  <MultiAvatar
                    primaryTitle={item.name}
                    imageId={item.imageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8em"}
                    imgHeight={"1.8em"}
                  />
                
      </div>
                                   
                                         
                                              <Tooltip>
                                              <div class=" flex max-sm:w-full w-[100%] flex-row md:flex-col ml-1">                                          
                                                  {/* Name */}
                                                 
                                                  <div class=" text-xs text-blue-500 flex justify-between  font-poppins font-semibold cursor-pointer">
                                                  <Link class="overflow-ellipsis whitespace-nowrap   text-[#042E8A] cursor-pointer  max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
            {item.name}
        </Link>                                
            
              &nbsp;&nbsp;
              {date === currentdate ? (
                <span class="text-[tomato] mt-[0.4rem] font-bold ml-1 text-[0.65rem]">
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
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100  ">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
             
                                                  </div>
      </div>
      
                                              </Tooltip>      
                                              </div>                       
                                      </div>
                                      </div> 
                                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                      <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[8.13rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                                    {/* Sector  */}
                                          <div class=" text-xs ml-gap font-poppins  max-sm:text-xs">   
                                          {item.sector}
                                          </div>
                                      </div>
                                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.30rem] max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                 {/* Country */}
                                  <div class=" text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
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
                              <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[5.12rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Category */}

                                    <div class=" text-xs justify-center ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>    
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.14rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Source */}
                                    <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                     
                                                          
                                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.11rem] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
      <div class=" text-xs flex max-sm:text-sm font-poppins text-center">
                                      <div>
              <CurrencySymbol currencyType={item.userCurrency}/>     </div> 
              <div>
              {`${Math.floor(item.totalProposalValue / 1000)}K`}
              </div>
                                </div>
                                      </div>                    
                                     
                                      </div>
                                    
                                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[8.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">

<div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[3.01rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
{/* sHARES*/}

    <div class="text-xs text-[blue] font-bold cursor-pointer justify-center  font-poppins  max-sm:text-sm">
  <div    onClick={() => {
handleInvestorPriceDrawer(true);
handleCurrentRowData(item);
}}>{item.allTotalQuantityOfShare}</div>
    </div>
</div>

<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
    {/* # Value */}
    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
   {item.allTotalAmountOfShare}
    </div>
</div>
</div>      
       </div>
       <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                         {/* Deals */}
                                          <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                         {item.club}
                                          </div>
                                      </div>
                                      {props.user.aiInd && (
                 <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  font-poppins w-[6.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
                 {item.noteScoreInd}
                
                  </div>
                  )}  
                                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                         {/* Assigned */}
                                          <div class=" text-xs  font-poppins  max-sm:text-sm">
                                          
                                          <span>
                    {item.assignedTo === null ? (
                      "None"
                    ) : (
                      <>
                      {item.assignedTo === item.ownerName ? (                 
                        null
                      ) : (
                        <Tooltip title={item.assignedTo}> 
                      <MultiAvatar2
                        primaryTitle={item.assignedTo}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                         </Tooltip>
                      )}
                      </>
                    )}
                  </span>          
                                     </div>
                                      </div>
                                 
                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
      <svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
      </svg>
      {getRelativeTime(item.creationDate)}
      </span></div>
                 </div>
                                      <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                      <div class="flex items-center justify-evenly w-wk">            
                                      <div >
                                <Tooltip title="Pulse">
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
                         <Tooltip title="Notes">
             <NoteAltIcon
                        onClick={() => {
                        props.handleInvestorNotesDrawerModal(true);
                        handleCurrentRowData(item);
                      }}
                      className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
                    />
                 </Tooltip>
                         </div>
                                <AddLocationAltIcon
                className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
                  onClick={() => {
                  props.handleInvestorAddressDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                
              />                                                                                       
                         <div>
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
                    ):<div>
                           
                    </div>}
                  </Tooltip>
                              </div>                   
                          
                          <div >
                              <span 
                    className=" !text-icon cursor-pointer max-sm:!text-xl "
              
                  >
                    {" "}
                    {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl" />}
                  </span> 
                              </div>       
                              <div>       
                  <Tooltip title="Investor Contact">
                    <ContactEmergencyIcon
                    className=" !text-icon cursor-pointer  text-blue-500 max-sm:!text-xl"
                        onClick={() => {
                        handleInvestorContModal(true);
                          handleCurrentRowData(item);
                        
                      }}
                    />
                  </Tooltip>
       
                  </div>
                 
            
                  <div>
                  <StyledPopconfirm
                              title="Do you want to delete?"
                              onConfirm={() =>
                                deleteInvestorData(item.investorId,props.userId)
                              }
                            >
                               <Tooltip title="Delete">
                             
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
     </>
     :
     <div className=' flex sticky  w-[87%] z-auto'>
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
  <div className=" flex justify-between max-sm:hidden  w-[82%]  p-1 bg-transparent font-bold sticky items-end !text-lm font-poppins  max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
        <div className=" flex text-[#00A2E8] text-sm truncate w-[10.68rem] max-xl:w-[14.4rem] ">
        <LocationCityIcon className='!text-icon  '  /> {translatedMenuItems[0]}  
        {/* "Name" */}              
                </div>
        <div className="flex  w-[10.9rem] truncate max-md:w-[13.1rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]">
        <FactoryIcon className="!text-icon mr-1  text-[#84a59d]"/> {translatedMenuItems[1]}
        {/* Sector" */}          
                </div>   
                <div className=" w-[5.3rem] truncate max-md:w-[6.23rem] max-xl:w-[8.2rem]">
          <FormatListNumberedIcon className='!text-icon    text-[#42858c]' /> {translatedMenuItems[5]}
          {/* "Category */}
          </div>
          <div className=" w-[7.34rem] truncate max-md:w-[5.34rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
          <SourceIcon className="!text-icon  mr-1 text-[#4b5043]"/>{translatedMenuItems[6]}
         {/* Source" */}         
          </div> 
        <div className=" w-[4.4rem] truncate max-md:w-[5.12rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]">
        <CurrencyExchangeIcon className='!text-icon   text-[#e4eb2f]' /> {translatedMenuItems[2]}
         {/* Deals */}      
                </div>      
          <div className="  w-[8.212rem] truncate max-md:w-[6.212rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          <ShowChartIcon className='!text-icon    text-[#776871]' /> {translatedMenuItems[9]}
       {/* Shares # */}
          </div>              
          <div className=" w-[4.21rem] truncate max-md:w-[4.21rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          <GolfCourseIcon className='!text-base  text-[#f42c04]'/>  {translatedMenuItems[18]}
        {/* Club */}
          </div>
          {props.user.aiInd && (
            <div className=" w-[5.1rem] truncate max-md:w-[3.81rem] max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon   text-[#f28482]"/>  {translatedMenuItems[15]}
          {/* Score */}
            </div>
            )}
        <div className=" w-[4.3rem] truncate max-md:w-[6.3rem] max-xl:w-[10.3rem]">
        <AccountCircleIcon className="!text-icon   text-[#d64933]"/> {translatedMenuItems[7]}
        {/* Assigned" */}           
         </div>      
      </div>
        <InfiniteScroll
        dataLength={allInvestorsbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllInvestors?<div class="flex items-center">Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
        
        { !fetchingAllInvestors && allInvestorsbyId.length === 0 ?<EmptyPage/>:allInvestorsbyId.map((item,index) =>  {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const Category=item.pvtAndIntunlInd?"Institutional":"Private"
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
              className="flex rounded justify-between  bg-white mt-1  py-ygap items-center max-sm:rounded-lg max-xl:text-xs max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex  w-[10.5rem]   max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto items-center ">
                                <div className=" flex items-center   max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
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
                                <div className=" flex   w-[13.5rem]  border-l-2 border-green-500 bg-[#eef2f9]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  items-center">
<div>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />       
</div>                                                      
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full w-[100%] flex-row md:flex-col ml-1">                                          
                                            {/* Name */}
                                           
                                            <div class=" text-xs text-blue-500 flex justify-between  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap   text-[#042E8A] cursor-pointer  max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
      {item.name}
  </Link>                                
      
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-[tomato] mt-[0.4rem] font-bold ml-1 text-[0.65rem]">
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
    className="cursor-pointer text-xs font-poppins flex opacity-0 hover:opacity-100 items-center">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div>
                                            </div>
</div>
                                        </Tooltip>      
                                        </div>                       
                                </div>
                                </div> 
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex   w-[8.12rem] items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                         
                                     {/* Sector  */}
                                    <div class=" text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                    {item.sector}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.30rem] max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                 {/* Country */}
                                  <div class=" text-xs font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
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
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[5.12rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Category */}

                                    <div class=" text-xs justify-center ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {Category}
                                    </div>
                                </div>

                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.14rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Source */}
                                    <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>   
                                                    
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                     {/*signed */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.totalWonOppProposalValue}
                                    </div>
                                </div>                  
                               
                                </div>
                              
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">                            
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[8.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[3.01rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* sHARES*/}

                                    <div class="text-xs text-[blue] font-bold cursor-pointer justify-center  font-poppins  max-sm:text-sm">
                                  <div    onClick={() => {
                       handleInvestorPriceDrawer(true);
                              handleCurrentRowData(item);
                            }}>{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>

                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Value */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.allTotalAmountOfShare}
                                    </div>
                                </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.100rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Club */}
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                          </div>                       
 </div>
 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center ">
                                {props.user.aiInd && (
           <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] font-poppins w-[5.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* Assigned */}

                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                   </Tooltip>
                )}
                </>
              )}
            </span>           
                                    </div>
                                </div>                          
                   <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[5.5rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                  </div>   
           </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                                <div class="flex items-center justify-evenly w-wk">            
                                <div >
                          <Tooltip title="Pulse">
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
                   <Tooltip title="Notes">
       <NoteAltIcon
                  onClick={() => {
                  props.handleInvestorNotesDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                className=" !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
              />
           </Tooltip>
                   </div>
                          <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
            onClick={() => {
            props.handleInvestorAddressDrawerModal(true);
            handleCurrentRowData(item);
          }}
          
        />                                                                                                  
                   <div className="w-[1.1rem]">
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
              ):<div>
                     
              </div>}
            </Tooltip>
                        </div>                                      
                    <div >
                        <span 
              className=" !text-icon cursor-pointer max-sm:!text-xl "      >
          
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl" />}
            </span> 
                        </div>       
                        <div>       
            <Tooltip title="Investor Contact">
              <ContactEmergencyIcon
              className=" !text-icon cursor-pointer  text-blue-500 max-sm:!text-xl"
                  onClick={() => {
                  handleInvestorContModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            </div>
            <div>
            <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteInvestorData(item.investorId,props.userId)
                        }
                      >
                         <Tooltip title="Delete">
                       
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
     </div>
}
    </div> 
       )}     
<Suspense fallback={"Loading"}>
  <AddInvestorNotesDrawerModal
        RowData={RowData}
        addDrawerInvestorNotesModal={props.addDrawerInvestorNotesModal}
        handleInvestorNotesDrawerModal={props.handleInvestorNotesDrawerModal}
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
      <ContactsInvestorModal
        RowData={RowData}
        addDrawerInvestorContactModal={addDrawerInvestorContactModal}
        handleInvestorContModal={handleInvestorContModal}
        handleCurrentRowData={handleCurrentRowData}
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
       <InventoryPriceDrawer
          RowData={RowData}
          handleInvestorPriceDrawer={handleInvestorPriceDrawer}
          priceInvestorDrawer={priceInvestorDrawer}
          key={priceInvestorDrawer ? 'open' : 'closed'}
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
  allEmployeeList:investor.allEmployeeList,
  investorsbyId:investor.investorsbyId,
  allInvestorsbyId:investor.allInvestorsbyId,
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingAllInvestors: investor.fetchingAllInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  user: auth.userDetails,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  employees: employee.employees,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  addInvestorAddressModal: investor.addInvestorAddressModal,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  priceInvestorDrawer: investor.priceInvestorDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllInvestorsbyId,
      handleUpdateInvestorModal,
      handleInvestorPulseDrawerModal,
      emptyInvestor,
      handleInvestorNotesDrawerModal,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      handleInvestorContModal,
      deleteInvestorData,
      handleInvestorAddressDrawerModal,
      getAllEmployeelist,
      handleInvestorPriceDrawer,
      getInvestorsbyId,
      UpdateInvestor,
      getSectors,
      getSources
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorAllCardList);

