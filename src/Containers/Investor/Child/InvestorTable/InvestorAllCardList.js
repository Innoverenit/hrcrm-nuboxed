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
import { Tooltip, Select, Checkbox} from "antd";
import relativeTime from 'dayjs/plugin/relativeTime';
import { CurrencySymbol } from "../../../../Components/Common";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
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
  getInvestorsbyId
} from "../../InvestorAction";
import {  DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../Components/Placeholder";

const AddInvestorNotesDrawerModal = lazy(() =>  import("../InvestorDetail/AddInvestorNotesDrawerModal"));
const InvestorPulseDrawerModal = lazy(() =>  import("./InvestorPulseDrawerModal"));
const  ContactsInvestorModal = lazy(() =>  import("./ContactsInvestorModal"));
const InvestorSearchedData = lazy(() =>  import("./InvestorSearchedData"));
const AddInvestorAdressModal = lazy(() =>  import("./AddInvestorAdressModal"));
const UpdateInvestorModal = lazy(() =>  import("../UpdateInvestor/UpdateInvestorModal"));
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
           "1161"//Shares9
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
    return () => props.emptyInvestor();
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

//Function to handle loading more data when scrolling
// const handleLoadMore1 = () => {
//   if (isFetching) return; // Prevent multiple calls by checking the flag

//   setIsFetching(true); // Set fetching flag to true
//   setTimeout(() => {
//     const { getInvestorsbyId } = props;
//     if (props.investorsbyId) {
//       setPage1((prevPage1) => {
//         if (prevPage1 === 0) {
//           // If current page is 0, start fetching page 1 data
//           getInvestorsbyId(
//             props.currentUser ? props.currentUser : selectedEmployee,
//             1, // Start with page 1 when scrolling begins
//             props.filter ? props.filter : "creationdate"
//           );
//           return 1; // Set page to 1 after first scroll
//         } else if (prevPage1 < callPageMapd) {
//           // Continue loading more pages if page < callPageMapd
//           getInvestorsbyId(
//             props.currentUser ? props.currentUser : selectedEmployee,
//             prevPage1 + 1, // Increment page number
//             props.filter ? props.filter : "creationdate"
//           );
//           return prevPage1 + 1; // Update page to the next number
//         } else {
//           // If on the last page, stop loading more
//           setHasMore(false);
//         }
//         return prevPage1;
//       });
//     }
//     setIsFetching(false); // Reset fetching flag after the call
//   }, 100);
// };

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




  const handleButtonClick = (employeeId) => {
    props.getInvestorsbyId(employeeId, page1, "creationdate");
    props.emptyInvestor();
    setSelectedEmployee(employeeId);
  };


  const {
    fetchingAllInvestors,
    fetchingInvestors,
    allInvestorsbyId,
    investorsbyId,
    handleUpdateInvestorModal,
    updateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    handleInvestorPulseDrawerModal,
    handleInvestorContModal,
    addDrawerInvestorPulseModal,
    addDrawerInvestorContactModal,
    user,
    IconShowhover,
    deleteInvestorData
  } = props;
  console.log("ee");
 
  // if (fetchingInvestors) {
  //   return <BundleLoader />;
  // }
  
  if (loading) {
    return <div><BundleLoader/></div>;
  }
console.log(selectedEmployee)
  return (
    <>
  {props.investorSerachedData.length > 0 ? (
    <InvestorSearchedData
    investorSerachedData={props.investorSerachedData}
    fetchingInvestorSearchData={props.fetchingInvestorSearchData}
    />
  ) : (
    <div  className=" flex">
       <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[#eaedf1] mt-1  items-center shadow-[#a3abb980] ">
       <div> Search team Member</div>
        </div>
        <div class="flex rounded w-[92%] flex-col  p-1 h-[73vh] box-content border bg-[#eaedf1] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.allEmployeeList.map((item,index) =>{
           return (
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                 
        <div class="flex items-center flex-no-wrap h-16">
          <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
            <MultiAvatar
              primaryTitle={item.empName}
              imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex basis-[100%] overflow-hidden">
          
          <div class="font-semibold text-[#337df4] cursor-pointer text-xs "
           onClick={() => handleButtonClick(item.employeeId)} 
          >
        
  {item.empName}

        </div> 
        </div>
          
       
        </div>
        <div className="flex flex-col max-sm:justify-between ">
          
              <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
                       </div>
            
          <div>
          <div class="font-medium text-xs ">
       
              <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
             
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
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[91%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="font-bold font-poppins text-xs w-[16.6rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[14.4rem] ">
              {translatedMenuItems[0]}
              {/* "Name" */}           
                      </div>
              <div className="font-bold font-poppins text-xs w-[11.1rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]">
              {translatedMenuItems[1]} 
              {/* Sector" */}            
                      </div>     
              <div className=" font-bold font-poppins text-xs w-[5.12rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]"># 
              {translatedMenuItems[2]}
              {/* "Deals" */}          
                      </div>
              <div className="font-bold font-poppins text-xs w-[6.2rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              {translatedMenuItems[3]}
               {/* "Pipeline Value" */}
                   
                </div>
                <div className=" font-bold font-poppins text-xs w-[8.34rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
              {translatedMenuItems[4]} 
              {/* Source */}               
              </div>
              <div className=" font-bold font-poppins text-xs w-[6.212rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
                {translatedMenuItems[9]}
             {/* Shares # */}
                </div> 
              {props.user.aiInd && (
                  <div className="font-poppins font-bold text-xs w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
               {translatedMenuItems[7]}
                {/* Score */}
                  </div>
                  )}
                     <div className="font-bold font-poppins text-xs w-[5.21rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
                {translatedMenuItems[8]}
              {/* Club */}
                </div>
              <div className=" font-bold font-poppins text-xs w-[6.3rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[10.3rem]">
              {translatedMenuItems[5]}
               {/* Assigned" */}
                    
               </div>
      
              <div className="font-bold font-poppins text-xs w-[8.813rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.21rem]">
              {translatedMenuItems[6]}
              {/* owner */}
                 
                      </div>
             
                 
            </div>
            <InfiniteScroll
        dataLength={investorsbyId.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={fetchingInvestors?<div  class="flex justify-center">Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
              
              {investorsbyId.map((item,index) =>  {
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
                    className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                  >
                                           <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                      <div className=" flex  w-[13.5rem]   max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto items-center ">
                                      <div className=" flex items-center   max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                          {/* >Source */}
      
                                          <div class="text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
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
                                              <div class=" flex max-sm:w-full  flex-row md:flex-col ml-1">                                          
                                                  {/* Name */}
                                                 
                                                  <div class=" text-xs text-blue-500 flex  font-poppins font-semibold cursor-pointer">
                                                  <Link class="overflow-ellipsis whitespace-nowrap   text-[#042E8A] cursor-pointer max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
            {item.name}
        </Link>                                
            
              &nbsp;&nbsp;
              {date === currentdate ? (
                <span class="text-[tomato] mt-[0.4rem] font-bold ml-1 text-[0.65rem]">
                  New
                </span>
              ) : null}
             
                                                  </div>
      </div>
      
                                              </Tooltip>      
                                              </div>                       
                                      </div>
                                      </div> 
                                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                      <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[13.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                                    {/* Sector  */}
                                          <div class=" text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">   
                                          {item.sector}
                                          </div>
                                      </div>
                                                                                                                  
                                   
                                 
                                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                          {/* Deals */}
                                          <div class=" text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                          {item.oppNo}
                                          </div>
                                      </div>    
                                                          
                                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.124rem] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
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
                                      <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[5.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                        {/* Source */}
      
                                          <div class=" text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-xs max-sm:text-sm">
                                          {item.source}
                                          </div>
                                      </div>
                                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Deals */}
      
                                          <div class="text-xs text-[blue] font-bold cursor-pointer justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                        <div  onClick={() => {
                                    props.handleInvestorPriceDrawer(true);
                                    handleCurrentRowData(item);
                                  }}>{item.allTotalQuantityOfShare}</div>
                                          </div>
                                      </div>
                                      {props.user.aiInd && (
                 <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  font-poppins w-[6.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
                 {item.noteScoreInd}
                
                  </div>
                  )}  
       </div>
       <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                         {/* Deals */}
                                          <div class="text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                         {item.club}
                                          </div>
                                      </div>
                                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                         {/* Assigned */}
                                          <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                          
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
                                      <div className=" flex  w-[3.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.1rem] max-lg:w-[3.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                                {/* Owner */}
                             <span>
                             <Tooltip title={item.ownerName}>
                      <div class="max-sm:flex justify-end w-[1.8rem]">
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
                  </span>                                                             
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
                  {user.imInd === true  &&  user.investorUpdateInd === true &&  (
                  <Tooltip title="Edit">
                    <BorderColorIcon className=" !text-icon cursor-pointer text-[tomato] max-sm:!text-xl"
                      onClick={() => {
                          handleUpdateInvestorModal(true);
                          handleCurrentRowData(item);                 
                      }}
                    />
                  </Tooltip>
                 )} 
                  </div>
                  <div>
                  <StyledPopconfirm
                              title="Do you want to delete?"
                              onConfirm={() =>
                                deleteInvestorData(item.investorId,props.userId)
                              }
                            >
                               <Tooltip title="Delete">
                             
                                <DeleteOutlined
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

  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
  <div className=" flex justify-between max-sm:hidden  w-[91%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className="font-bold font-poppins text-xs w-[16.6rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[14.4rem] ">
        {translatedMenuItems[0]}
        {/* "Name" */}           
                </div>
        <div className="font-bold font-poppins text-xs w-[11.1rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]">
        {translatedMenuItems[1]} 
        {/* Sector" */}            
                </div>     
        <div className=" font-bold font-poppins text-xs w-[5.12rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]"># 
        {translatedMenuItems[2]}
        {/* "Deals" */}          
                </div>
        <div className="font-bold font-poppins text-xs w-[6.2rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        {translatedMenuItems[3]}
         {/* "Pipeline Value" */}
             
          </div>
          <div className=" font-bold font-poppins text-xs w-[8.34rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
        {translatedMenuItems[4]} 
        {/* Source */}               
        </div>
        <div className=" font-bold font-poppins text-xs w-[6.212rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[9]}
       {/* Shares # */}
          </div> 
        {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
         {translatedMenuItems[7]}
          {/* Score */}
            </div>
            )}
               <div className="font-bold font-poppins text-xs w-[5.21rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
          {translatedMenuItems[8]}
        {/* Club */}
          </div>
        <div className=" font-bold font-poppins text-xs w-[6.3rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[10.3rem]">
        {translatedMenuItems[5]}
         {/* Assigned" */}
              
         </div>

        {/* <div className="font-bold font-poppins text-xs w-[8.813rem] max-xl:text-xs max-lg:text-[0.45rem] max-xl:w-[8.21rem]">
        {translatedMenuItems[6]}
        owner
           
                </div> */}
       
           
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
        
        { !fetchingAllInvestors && allInvestorsbyId.length === 0 ?<NodataFoundPage />:allInvestorsbyId.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex  w-[10.5rem]   max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto items-center ">
                                <div className=" flex items-center   max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
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
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col ml-1">                                          
                                            {/* Name */}
                                           
                                            <div class=" text-xs text-blue-500 flex  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap   text-[#042E8A] cursor-pointer max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
      {item.name}
  </Link>                                
      
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-[tomato] mt-[0.4rem] font-bold ml-1 text-[0.65rem]">
            New
          </span>
        ) : null}
       
                                            </div>
</div>

                                        </Tooltip>      
                                        </div>                       
                                </div>
                                </div> 
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                              {/* Sector  */}
                                    <div class=" text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">   
                                    {item.sector}
                                    </div>
                                </div>
                                                                                                            
                             
                           
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* Deals */}
                                    <div class=" text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.oppNo}
                                    </div>
                                </div>    
                                                    
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.124rem] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
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
                                <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9]  w-[7.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Source */}

                                    <div class=" text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-xs max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[4.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                             {/* Deals */}

                                    <div class="text-xs text-[blue] font-bold cursor-pointer justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                  <div  onClick={() => {
                              props.handleInvestorPriceDrawer(true);
                              handleCurrentRowData(item);
                            }}>{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>
                                {props.user.aiInd && (
           <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]  font-poppins w-[5.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
           {item.noteScoreInd}
          
            </div>
            )}  
 </div>
 <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
<div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Deals */}
                                    <div class="text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   {/* Assigned */}
                                    <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                    
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
                                {/* <div className=" flex  w-[3.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.1rem] max-lg:w-[3.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                          Owner
                       <span>
                       <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end w-[1.8rem]">
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
            </span>                                                             
              </div> */}
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
            {user.imInd === true  &&  user.investorUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon className=" !text-icon cursor-pointer text-[tomato] max-sm:!text-xl"
                onClick={() => {
                    handleUpdateInvestorModal(true);
                    handleCurrentRowData(item);                 
                }}
              />
            </Tooltip>
           )} 
            </div>
            <div>
            <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteInvestorData(item.investorId,props.userId)
                        }
                      >
                         <Tooltip title="Delete">
                       
                          <DeleteOutlined
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
}
    </div> 
       )}     
<Suspense fallback={<BundleLoader />}>
      <UpdateInvestorModal
        RowData={RowData}
        updateInvestorModal={updateInvestorModal}
        handleUpdateInvestorModal={handleUpdateInvestorModal}
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
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  employees: employee.employees,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  addInvestorAddressModal: investor.addInvestorAddressModal,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
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
      getInvestorsbyId
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorAllCardList);

