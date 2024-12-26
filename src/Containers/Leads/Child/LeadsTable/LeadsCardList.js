import React, { useEffect, useState,lazy } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddSubscriptionModal from "../../Child/LeadsTable/AddSubscriptionModal"
import dayjs from "dayjs";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import {
  getLeadsCold,
  getLeadsWarm,
  convertCustomerStatus,
  getLeadsHot,
  deleteLeadsData,
  setEditLeads,
  handleLeadsSubscriptionModal,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  emptyLeads,
  handleLeadsConfirmationModal,
  handleLeadsAddressDrawerModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Tooltip,Popconfirm,Checkbox } from "antd";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import SearchedData from "./SearchedData";
import AddLeadsAddressModal from "./AddLeadsAddressModal";
import EmptyPage from "../../../Main/EmptyPage";
import { BundleLoader } from "../../../../Components/Placeholder";

const OpenCETmodal = lazy(() => import("./OpenCETmodal")); //ActivityModal
const AddLeadsEmailDrawerModal = lazy(() => import("../UpdateLeads/AddLeadsEmailDrawerModal"));
const AddLeadsNotesDrawerModal = lazy(() => import("../AddLeadsNotesDrawerModal"));
const AddConfirmLedsStatusModal = lazy(() => import("./AddConfirmLedsStatusModal"));

const ButtonGroup = Button.Group;

const LeadsCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    //props.getLeads(props.userId, page,"creationdate");
    props.getLeadsHot(props.userId, page,"creationdate","hot");
    props.getLeadsCold(props.userId, page,"creationdate","cold");
    props.getLeadsWarm(props.userId, page,"creationdate","warm");
    
  }, []);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    '271', // 0
'110', // 1name
'102', // 2 phone
'1109', // 3 company
'277', // 4sector
'278', // 5source
'279', // 6 lob
'280', // 7
'76', // 8
 '1335', // 9
'77', // 10
'1114', // 11
'272', //12
'273', //13
'185',//Address 14
'1148',//subscription 15
'316',//notes16
'1165',// 17 activity
'140',// 18 email
'170',//19 edit
'1259',//20 "Do you want to delete?"
"100",// New 21
"1581",// Score 22
"271",// "Hot"23
"272",// "Warm"24
"273",// "Cold"25
"1454",// Company name is required to enable qualification action26
"84",// Delete27
 "1582",// Qualify? Lead will move to Prospect section!28
 

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
    return () => props.emptyLeads();
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
  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (item) => {
    setrowData(item);
  };
  const handleLoadMore = () => {
    const callPageMapd = props.leadsAllDataHot && props.leadsAllDataHot.length &&props.leadsAllDataHot[0].pageCount
    setTimeout(() => {
      const {
        getLeadsHot,
        // userDetails: { employeeId },
      } = props;
      if  (props.leadsAllDataHot)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getLeadsHot(
            props.currentUser ? props.currentUser : props.userId,
            page,
            props.filter?props.filter:"creationdate",
            "hot"
          );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const handleLoadMore1 = () => {
    const callPageMapd = props.leadsAllDataWarm && props.leadsAllDataWarm.length &&props.leadsAllDataWarm[0].pageCount
    setTimeout(() => {
      const {
        getLeadsWarm,
       // userDetails: { employeeId },
      } = props;
      if  (props.leadsAllDataWarm)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getLeadsWarm(
            props.currentUser ? props.currentUser : props.userId,
            page,
            props.filter?props.filter:"creationdate",
            "warm"
          );
     }
       if (page === callPageMapd){
         setHasMore(false)
       }
    }
     }, 100);
  };
  const handleLoadMore2 = () => {
    const callPageMapd = props.leadsAllDataCold && props.leadsAllDataCold.length &&props.leadsAllDataCold[0].pageCount
    setTimeout(() => {
      const {
        getLeadsCold,
       // userDetails: { employeeId },
      } = props;
      if  (props.leadsAllDataCold)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getLeadsCold(
            props.currentUser ? props.currentUser : props.userId,
            page,
            props.filter?props.filter:"creationdate",
            "cold"
          );
       }
     if (page === callPageMapd){
        setHasMore(false)
       }
    }
     }, 100);
  };

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const handleToggleCollection=(checked)=>{
    if(checked ){
        props.handleLeadsConfirmationModal(true)
    }
    }
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    fetchingLeads,
    leadsAllData,
    user,
  } = props;


   return (
    <div>
         {props.serachedData.length > 0 ? (
    <SearchedData
    serachedData={props.serachedData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
  fetchingLeadsInputSearchData={props.fetchingLeadsInputSearchData}
    />
  ) : (
      <>
     <div className=' flex  sticky  z-auto'>
     <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm z-10">
        <div className="   flex justify-between w-[92%] font-bold font-poppins !text-lm">
         <div className=" flex   text-white w-[8.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem] items-center   bg-red-600  justify-center "> 
          {translatedMenuItems[0]}</div>
          <div className=" w-[4.12rem] truncate max-xl:w-[11.1rem] max-lg:w-[13.1rem] "></div>
        <div className=" w-[19.1rem] text-[#00A2E8] text-sm truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  "> 
             <ApartmentIcon className="!text-icon  "/>
              {translatedMenuItems[1]}</div>

        <div className=" w-[17.4rem] truncate max-xl:w-[7.2rem] max-lg:w-[5.2rem]  ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
            {translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[19.9rem] truncate max-xl:w-[8.5rem] max-lg:w-[5.5rem]   "> 
          <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
          {translatedMenuItems[4]}</div>
        <div className=" w-[14.8rem] truncate max-xl:w-[7.81rem] max-lg:w-[3.81rem] ">
            <FactoryIcon className="!text-icon  text-[#84a59d]"/>
         {translatedMenuItems[5]}</div> 
        <div className= " w-[13.91rem] truncate max-xl:w-[4.8rem] max-lg:w-[4.8rem] ">
           <SourceIcon className="!text-icon  text-[#4b5043]"/>
         {translatedMenuItems[6]}</div> 
        <div className= " w-[9.82rem] truncate max-xl:w-[7.82rem] max-lg:w-[8.8rem] ">
          {translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className="truncate w-[7.81rem]  max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}  
             {translatedMenuItems[22]}
          
            </div>
            )}
        <div className=" w-[7.2rem] truncate max-xl:w-[6.2rem] "> 
           <AccountCircleIcon className="!text-icon  text-[#d64933]"/> 
           {translatedMenuItems[8]} </div>
        <div className=" w-[5.9rem] truncate max-xl:w-[2.2rem] max-lg:w-[4.2rem] ">
          {translatedMenuItems[9]}</div>
        <div className=" w-[7.3rem]  truncate max-xl:w-[3.3rem] max-lg:w-[6.3rem] ">
          <ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>
          {translatedMenuItems[11]}</div>
      
        <div className="w-4"></div>
</div>
      </div>
      <InfiniteScroll
        dataLength={props.leadsAllDataHot.length}
        next={handleLoadMore}
      hasMore={hasMore}
        loader={props.fetchingLeadsHot?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
     
           { !props.fetchingLeadsHot && props.leadsAllDataHot.length === 0 ?<EmptyPage/>:props.leadsAllDataHot.map((item,index) =>  {
          //  {leadsAllData.map((item,index) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.countryAlpha2Code;
          console.log(countryCode)
          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
              <div
                className="flex  justify-between bg-white mt-1  items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
               <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.leadsId)}
              checked={props.selectedDeals.includes(item.leadsId)}
              />
                        )}
                        </div>
               <div class="flex flex-row  h-8 border-l-2 border-green-500 bg-[#eef2f9] items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                    <div>
                      <ButtonGroup>
                        <RoleButton
                        className="!text-icon"
                          type="Hot"
                          iconType="fas fa-mug-hot"
                          // tooltip="Hot"
                          tooltip=   {translatedMenuItems[23]}
                          role={item.type}
                            onClick={() => {
                            const typ = "Hot";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>
                    <div>
                      <ButtonGroup>
                        <RoleButton1
                         className="!text-icon"
                          type="Warm"
                          iconType="	fas fa-burn"
                          // tooltip="Warm"
                          tooltip=   {translatedMenuItems[24]}
                          role={item.type}
                            onClick={() => {
                            const typ = "Warm";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>
                    <div>
                      <ButtonGroup>
                        <RoleButton2
                         className="!text-icon"
                          type="Cold"
                          iconType="far fa-snowflake"
                          // tooltip="Cold"
                          tooltip=   {translatedMenuItems[25]}
                          role={item.type}
                            onClick={() => {
                            const typ = "Cold";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className=" flex  w-[11.2rem] h-8 ml-gap bg-[#eef2f9] items-center max-xl:w-[9.5rem] max-lg:w-[5rem]     max-sm:w-auto">
                    <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                      <div >
                       
                          <MultiAvatar
                            primaryTitle={item.name}
                            imageId={item.imageId}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
                      <div class="max-sm:w-full md:flex items-center">
                        <Tooltip>
                          <div class="max-sm:w-full justify-between flex md:flex-col">
                            <div class="text-xs flex  font-semibold ml-gap font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-[0.65rem]  text-[tomato] font-bold"  >                            
                                
                                {translatedMenuItems[21]}  {/* New */}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div> 
                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                  <div className=" flex  w-[6.9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.countryDialCode && item.phoneNumber
             ? `${item.countryDialCode} ${item.phoneNumber}`
             : "None"}
      
         </div>
       </div>              
                                            
                  <div className=" flex w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                     
                       <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                     
                    </div>
                  </div>
                  <div className=" flex   w-[10rem]  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                    <div class=" text-xs   ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                      {item.companyName || "None"}
                    </div>
                  </div>
                  <div class="flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  cursor-pointer  ">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <div class="cursor-pointer"
                            onClick={() => {}}
                        >
                          {" "}
                          <a href={`https://www.${item.url}`} target="_blank">
                            <OpenInBrowserIcon
                               className=" !text-icon cursor-pointer text-green-800"
                            />
                          </a>
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex   w-[8.35rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">         
                    <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      {item.sector}
                    </div>
                  </div>
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 
                  
                  <div className=" flex   w-[7.8rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
           
           <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             {item.source}
           </div>
         </div>
         <div className=" flex   w-[5.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
           
           <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             {item.lob}
           </div>
         </div>
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                {props.user.aiInd && (
           <div className=" flex text-xs justify-center items-center  h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
         {item.noteScoreInd}
          
            </div>
            )}
{/* Score */}

                  <div className=" flex w-[3.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      <div>
                      {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <MultiAvatar
                  style={{ backgroundColor: "rgb(148, 179, 228)", color: "#fff" }} 
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
                     <div className=" flex  w-[3.6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                      {item.assignedBy && (
                    <div>
                    {/* <Tooltip title={item.assignedBy}> */}
                <div class="max-sm:flex justify-end">
           
              <MultiAvatar
              
                primaryTitle={item.assignedBy}
                // imageId={item.ownerImageId}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </div>
                    </div>
                    )}
                  </div>
           
                  <div className=" flex w-[3.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                    <div class=" text-xs  font-poppins"></div>
                    <div>
  {!item.companyName && item.leadType === "BtoC" ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <Popconfirm
        title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
        onConfirm={() => {
          handleRowData(item);
          if (item.leadType === "BtoB") {
            props.handleLeadsConfirmationModal(true);
          } else {
            props.convertCustomerStatus(item.leadsId,props.userId);
          }
        }}
        okText="Yes"
        cancelText="No"
      >
        <ConnectWithoutContactIcon
          className="!text-icon cursor-pointer text-[blue]"
        />
      </Popconfirm>
    </Tooltip>
  ) : item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <Popconfirm
        title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
        onConfirm={() => {
          handleRowData(item);
          if (item.leadType === "BtoB") {
            props.handleLeadsConfirmationModal(true);
          } else {
            props.convertCustomerStatus(item.leadsId,props.userId);
          }
        }}
        okText="Yes"
        cancelText="No"
      >
        <ConnectWithoutContactIcon
          className="!text-icon cursor-pointer text-[blue]"
        />
      </Popconfirm>
    </Tooltip>
  ) : (
    <Tooltip title="Company name is required to enable qualification action">
      <ConnectWithoutContactIcon
        className="!text-icon cursor-not-allowed text-gray-400"
      />
    </Tooltip>
  )}
</div>

                  </div>
                  </div>
                  <div class="flex justify-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly max-sm:w-wk items-center"> 
             
                  <div >
                      <Tooltip title={translatedMenuItems[15]}>
                      
                        <SubscriptionsIcon
                         className=" !text-icon cursor-pointer text-green-800"
                         onClick={() => {
                          handleSetCurrentLeadsId(true);
                          props.handleLeadsSubscriptionModal(item);
                              }}
                          //   onClick={() => {
                          //   handleSetCurrentLeadsId(item);
                          //   // handleRowData(item);
                          //   props.handleLeadsSubscriptionModal(true);                      
                          // }}                     
                        />
                      </Tooltip>
                    </div>
                    <div >
                      <Tooltip title={translatedMenuItems[16]}>
                        <NoteAltIcon
                         className=" !text-icon cursor-pointer text-green-800"
                            onClick={() => {
                            handleRowData(item);
                            handleLeadsNotesDrawerModal(true);                     
                          }}                        
                        />
                      </Tooltip>
                    </div>
                    <div>
              <Tooltip title={translatedMenuItems[14]}>
 <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleLeadsAddressDrawerModal(true);
          handleSetCurrentLeadsId(item);
          }}
          
        />
     </Tooltip>
     </div>
                    <div >
                      <Tooltip
                        title={translatedMenuItems[17]}
                      >
                        {/* activity */}
                        <HourglassFullIcon
                         className="!text-icon cursor-pointer text-blue-500"
                            onClick={() => {
                                handleRowData(item);
                            props.handleCETmodal(true);
                        
                          }}
                        />
                      </Tooltip>
                    </div>                                          
                   
                    <div >
                      <Tooltip title={translatedMenuItems[18]}>
                        <MailOutlineIcon
                          type="mail"
                          className="!text-icon cursor-pointer text-green-400"
                            onClick={() => {
                            handleSetCurrentLeadsId(item);
                            props.handleLeadsEmailDrawerModal(true);
                          }}
                        />
                      </Tooltip>{" "}
                    </div>
                
                    {user.leadsDeleteInd === true && user.crmInd === true && (
                      <div >                     
                        <StyledPopconfirm
                          title={translatedMenuItems[20]}
                          onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                     <Tooltip title={translatedMenuItems[27]}>
                          <DeleteOutlineIcon
                            type="delete"
                            className=" !text-icon cursor-pointer text-[red]"
                          />
                       </Tooltip>
                        </StyledPopconfirm>
                      </div>
                    )}                
               </div>
               
              </div>
            </div>
          );
        })}
         </InfiniteScroll>
      </div>
      </div>

      <div className=' flex   sticky z-auto mt-1'>
     <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm z-10">
        <div className="   flex justify-between w-[92%] font-bold font-poppins !text-lm">
         <div className=" flex   text-white w-[8.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]    bg-orange-400  items-center justify-center "> 
          {translatedMenuItems[12]}</div>
          <div className=" w-[4.12rem] truncate max-xl:w-[11.1rem] max-lg:w-[13.1rem] "></div>
        <div className=" w-[19.1rem] text-[#00A2E8] text-sm truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  "> 
             <ApartmentIcon className="!text-icon  "/>
              {translatedMenuItems[1]}</div>

        <div className=" w-[17.4rem] truncate max-xl:w-[7.2rem] max-lg:w-[5.2rem]  ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
            {translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[19.9rem] truncate max-xl:w-[8.5rem] max-lg:w-[5.5rem]   "> 
          <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
          {translatedMenuItems[4]}</div>
        <div className=" w-[14.8rem] truncate max-xl:w-[7.81rem] max-lg:w-[3.81rem] ">
            <FactoryIcon className="!text-icon  text-[#84a59d]"/>
         {translatedMenuItems[5]}</div> 
        <div className= " w-[13.91rem] truncate max-xl:w-[4.8rem] max-lg:w-[4.8rem] ">
           <SourceIcon className="!text-icon  text-[#4b5043]"/>
         {translatedMenuItems[6]}</div> 
        <div className= " w-[9.82rem] truncate max-xl:w-[7.82rem] max-lg:w-[8.8rem] ">
          {translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className="truncate w-[7.81rem]  max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}  
             {translatedMenuItems[22]}
          
            </div>
            )}
        <div className=" w-[7.2rem] truncate max-xl:w-[6.2rem] "> 
           <AccountCircleIcon className="!text-icon  text-[#d64933]"/> 
           {translatedMenuItems[8]} </div>
        <div className=" w-[5.9rem] truncate max-xl:w-[2.2rem] max-lg:w-[4.2rem] ">
          {translatedMenuItems[9]}</div>
        <div className=" w-[7.3rem]  truncate max-xl:w-[3.3rem] max-lg:w-[6.3rem] ">
          <ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>
          {translatedMenuItems[11]}</div>
      
        <div className="w-4"></div>
</div>
      </div>
      <InfiniteScroll
        dataLength={props.leadsAllDataWarm.length}
        next={handleLoadMore1}
      hasMore={hasMore}
        loader={props.fetchingLeadsWarm?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
      
           { !props.fetchingLeadsWarm && props.leadsAllDataWarm.length === 0 ?<EmptyPage/>:props.leadsAllDataWarm.map((item,index) =>  {
          
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.countryAlpha2Code;
          console.log(countryCode)
          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
            <div
              className="flex  justify-between bg-white mt-1  items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
               max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {props.showCheckboxes && (
                      <Checkbox
              onChange={() => props.handleCheckboxChange(item.leadsId)}
            checked={props.selectedDeals.includes(item.leadsId)}
            />
                      )}
                      </div>
             <div class="flex flex-row  h-8 border-l-2 border-green-500 bg-[#eef2f9] items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                      className="!text-icon"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip=   {translatedMenuItems[23]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Hot";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton1
                       className="!text-icon"
                        type="Warm"
                        iconType="	fas fa-burn"
                        // tooltip="Warm"
                        tooltip=   {translatedMenuItems[24]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Warm";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton2
                       className="!text-icon"
                        type="Cold"
                        iconType="far fa-snowflake"
                        // tooltip="Cold"
                        tooltip=   {translatedMenuItems[25]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex  w-[11.2rem] h-8 ml-gap bg-[#eef2f9] items-center max-xl:w-[9.5rem] max-lg:w-[5rem]     max-sm:w-auto">
                  <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div >
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold ml-gap font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"  >                            
                              
                              {translatedMenuItems[21]}  {/* New */}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div> 
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[6.9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
       <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
         {item.countryDialCode && item.phoneNumber
           ? `${item.countryDialCode} ${item.phoneNumber}`
           : "None"}
    
       </div>
     </div>              
                                          
                <div className=" flex w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex   w-[10rem]  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs   ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
                <div class="flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  cursor-pointer  ">
                  {item.url !== null ? (
                    <Tooltip title={item.url}>
                      <div class="cursor-pointer"
                          onClick={() => {}}
                      >
                        {" "}
                        <a href={`https://www.${item.url}`} target="_blank">
                          <OpenInBrowserIcon
                             className=" !text-icon cursor-pointer text-green-800"
                          />
                        </a>
                      </div>
                    </Tooltip>
                  ) : null}
                </div>

                <div className=" flex   w-[8.35rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">         
                  <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                
                <div className=" flex   w-[7.8rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              {props.user.aiInd && (
         <div className=" flex text-xs justify-center items-center  h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
       {item.noteScoreInd}
        
          </div>
          )}
{/* Score */}

                <div className=" flex w-[3.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    <div>
                    {item.assignedTo === null ? (
              "None"
            ) : (
              <>
              {item.assignedTo === item.ownerName ? (
                
                null
              ) : (
                <MultiAvatar
                style={{ backgroundColor: "rgb(148, 179, 228)", color: "#fff" }} 
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
                   <div className=" flex  w-[3.6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
                  {/* <Tooltip title={item.assignedBy}> */}
              <div class="max-sm:flex justify-end">
         
            <MultiAvatar
            
              primaryTitle={item.assignedBy}
              // imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          </div>
                  </div>
                  )}
                </div>
         
                <div className=" flex w-[3.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins"></div>
                  <div>
{!item.companyName && item.leadType === "BtoC" ? (
  <Tooltip title="Qualify? Lead will move to Prospect section!">
    <Popconfirm
      title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
      onConfirm={() => {
        handleRowData(item);
        if (item.leadType === "BtoB") {
          props.handleLeadsConfirmationModal(true);
        } else {
          props.convertCustomerStatus(item.leadsId,props.userId);
        }
      }}
      okText="Yes"
      cancelText="No"
    >
      <ConnectWithoutContactIcon
        className="!text-icon cursor-pointer text-[blue]"
      />
    </Popconfirm>
  </Tooltip>
) : item.companyName ? (
  <Tooltip title="Qualify? Lead will move to Prospect section!">
    <Popconfirm
      title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
      onConfirm={() => {
        handleRowData(item);
        if (item.leadType === "BtoB") {
          props.handleLeadsConfirmationModal(true);
        } else {
          props.convertCustomerStatus(item.leadsId,props.userId);
        }
      }}
      okText="Yes"
      cancelText="No"
    >
      <ConnectWithoutContactIcon
        className="!text-icon cursor-pointer text-[blue]"
      />
    </Popconfirm>
  </Tooltip>
) : (
  <Tooltip title="Company name is required to enable qualification action">
    <ConnectWithoutContactIcon
      className="!text-icon cursor-not-allowed text-gray-400"
    />
  </Tooltip>
)}
</div>

                </div>
                </div>
                <div class="flex justify-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly max-sm:w-wk items-center"> 
           
                <div >
                    <Tooltip title={translatedMenuItems[15]}>
                    
                      <SubscriptionsIcon
                       className=" !text-icon cursor-pointer text-green-800"
                       onClick={() => {
                        handleSetCurrentLeadsId(true);
                        props.handleLeadsSubscriptionModal(item);
                            }}
                        //   onClick={() => {
                        //   handleSetCurrentLeadsId(item);
                        //   // handleRowData(item);
                        //   props.handleLeadsSubscriptionModal(true);                      
                        // }}                     
                      />
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip title={translatedMenuItems[16]}>
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);                     
                        }}                        
                      />
                    </Tooltip>
                  </div>
                  <div>
            <Tooltip title={translatedMenuItems[14]}>
<AddLocationAltIcon
        className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
          props.handleLeadsAddressDrawerModal(true);
          // handleSetCurrentContact(item);
        handleSetCurrentLeadsId(item);
        }}
        
      />
   </Tooltip>
   </div>
                  <div >
                    <Tooltip
                      title={translatedMenuItems[17]}
                    >
                      {/* activity */}
                      <HourglassFullIcon
                       className="!text-icon cursor-pointer text-blue-500"
                          onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>                                          
                 
                  <div >
                    <Tooltip title={translatedMenuItems[18]}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-icon cursor-pointer text-green-400"
                          onClick={() => {
                          handleSetCurrentLeadsId(item);
                          props.handleLeadsEmailDrawerModal(true);
                        }}
                      />
                    </Tooltip>{" "}
                  </div>
              
                  {user.leadsDeleteInd === true && user.crmInd === true && (
                    <div >                     
                      <StyledPopconfirm
                        title={translatedMenuItems[20]}
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title={translatedMenuItems[27]}>
                        <DeleteOutlineIcon
                          type="delete"
                          className=" !text-icon cursor-pointer text-[red]"
                        />
                     </Tooltip>
                      </StyledPopconfirm>
                    </div>
                  )}                
             </div>
             
            </div>
          </div>
          );
        })}
         </InfiniteScroll>
      </div>
      </div>

      <div className=' flex   sticky  z-auto mt-1'>
     <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm z-10">
        <div className="   flex justify-between w-[92%] font-bold font-poppins !text-lm">
         <div className="  flex  text-white w-[8.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]    bg-blue-600 items-center  justify-center "> 
          {translatedMenuItems[13]}</div>
          <div className=" w-[4.12rem]   truncate max-xl:w-[11.1rem] max-lg:w-[13.1rem] "></div>
        <div className=" w-[19.1rem] text-[#00A2E8] text-sm truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  "> 
             <ApartmentIcon className="!text-icon  "/>
              {translatedMenuItems[1]}</div>

        <div className=" w-[17.4rem] truncate max-xl:w-[7.2rem] max-lg:w-[5.2rem]  ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
            {translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[19.9rem] truncate max-xl:w-[8.5rem] max-lg:w-[5.5rem]   "> 
          <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>
          {translatedMenuItems[4]}</div>
        <div className=" w-[14.8rem] truncate max-xl:w-[7.81rem] max-lg:w-[3.81rem] ">
            <FactoryIcon className="!text-icon  text-[#84a59d]"/>
         {translatedMenuItems[5]}</div> 
        <div className= " w-[13.91rem] truncate max-xl:w-[4.8rem] max-lg:w-[4.8rem] ">
           <SourceIcon className="!text-icon  text-[#4b5043]"/>
         {translatedMenuItems[6]}</div> 
        <div className= " w-[9.82rem] truncate max-xl:w-[7.82rem] max-lg:w-[8.8rem] ">
          {translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className="truncate w-[7.81rem]  max-xl:w-[3.81rem]">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}  
             {translatedMenuItems[22]}
          
            </div>
            )}
        <div className=" w-[7.2rem] truncate max-xl:w-[6.2rem] "> 
           <AccountCircleIcon className="!text-icon  text-[#d64933]"/> 
           {translatedMenuItems[8]} </div>
        <div className=" w-[5.9rem] truncate max-xl:w-[2.2rem] max-lg:w-[4.2rem] ">
          {translatedMenuItems[9]}</div>
        <div className=" w-[7.3rem]  truncate max-xl:w-[3.3rem] max-lg:w-[6.3rem] ">
          <ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>
          {translatedMenuItems[11]}</div>
      
        <div className="w-4"></div>
</div>
      </div>
      <InfiniteScroll
        dataLength={props.leadsAllDataCold.length}
        next={handleLoadMore2}
      hasMore={hasMore}
        loader={props.fetchingLeadsCold?<div><BundleLoader/></div>:null}
        height={"24vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >    
           { !props.fetchingLeadsCold && props.leadsAllDataCold.length === 0 ?<EmptyPage/>:props.leadsAllDataCold.map((item,index) =>  {
          //  {leadsAllData.map((item,index) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.countryAlpha2Code;
          console.log(countryCode)
          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
            <div
              className="flex  justify-between bg-white mt-1  items-center py-ygap max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
               max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  ">
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {props.showCheckboxes && (
                      <Checkbox
              onChange={() => props.handleCheckboxChange(item.leadsId)}
            checked={props.selectedDeals.includes(item.leadsId)}
            />
                      )}
                      </div>
             <div class="flex flex-row  h-8 border-l-2 border-green-500 bg-[#eef2f9] items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                      className="!text-icon"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip=   {translatedMenuItems[23]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Hot";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton1
                       className="!text-icon"
                        type="Warm"
                        iconType="	fas fa-burn"
                        // tooltip="Warm"
                        tooltip=   {translatedMenuItems[24]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Warm";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                  <div>
                    <ButtonGroup>
                      <RoleButton2
                       className="!text-icon"
                        type="Cold"
                        iconType="far fa-snowflake"
                        // tooltip="Cold"
                        tooltip=   {translatedMenuItems[25]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex  w-[11.2rem] h-8 ml-gap bg-[#eef2f9] items-center max-xl:w-[9.5rem] max-lg:w-[5rem]     max-sm:w-auto">
                  <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div >
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold ml-gap font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"  >                            
                              
                              {translatedMenuItems[21]}  {/* New */}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div> 
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[6.9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
       <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
         {item.countryDialCode && item.phoneNumber
           ? `${item.countryDialCode} ${item.phoneNumber}`
           : "None"}
    
       </div>
     </div>              
                                          
                <div className=" flex w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex   w-[10rem]  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs   ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
                <div class="flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  cursor-pointer  ">
                  {item.url !== null ? (
                    <Tooltip title={item.url}>
                      <div class="cursor-pointer"
                          onClick={() => {}}
                      >
                        {" "}
                        <a href={`https://www.${item.url}`} target="_blank">
                          <OpenInBrowserIcon
                             className=" !text-icon cursor-pointer text-green-800"
                          />
                        </a>
                      </div>
                    </Tooltip>
                  ) : null}
                </div>

                <div className=" flex   w-[8.35rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">         
                  <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                
                <div className=" flex   w-[7.8rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              {props.user.aiInd && (
         <div className=" flex text-xs justify-center items-center  h-8 ml-gap bg-[#eef2f9] w-[4.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
       {item.noteScoreInd}
        
          </div>
          )}
{/* Score */}

                <div className=" flex w-[3.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    <div>
                    {item.assignedTo === null ? (
              "None"
            ) : (
              <>
              {item.assignedTo === item.ownerName ? (
                
                null
              ) : (
                <MultiAvatar
                style={{ backgroundColor: "rgb(148, 179, 228)", color: "#fff" }} 
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
                   <div className=" flex  w-[3.6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
                  {/* <Tooltip title={item.assignedBy}> */}
              <div class="max-sm:flex justify-end">
         
            <MultiAvatar
            
              primaryTitle={item.assignedBy}
              // imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          </div>
                  </div>
                  )}
                </div>
         
                <div className=" flex w-[3.7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins"></div>
                  <div>
{!item.companyName && item.leadType === "BtoC" ? (
  <Tooltip title="Qualify? Lead will move to Prospect section!">
    <Popconfirm
      title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
      onConfirm={() => {
        handleRowData(item);
        if (item.leadType === "BtoB") {
          props.handleLeadsConfirmationModal(true);
        } else {
          props.convertCustomerStatus(item.leadsId,props.userId);
        }
      }}
      okText="Yes"
      cancelText="No"
    >
      <ConnectWithoutContactIcon
        className="!text-icon cursor-pointer text-[blue]"
      />
    </Popconfirm>
  </Tooltip>
) : item.companyName ? (
  <Tooltip title="Qualify? Lead will move to Prospect section!">
    <Popconfirm
      title={item.leadType === "BtoB" ? "Would you like to open the modal?" : "Would you like to convert the lead to contact?"}
      onConfirm={() => {
        handleRowData(item);
        if (item.leadType === "BtoB") {
          props.handleLeadsConfirmationModal(true);
        } else {
          props.convertCustomerStatus(item.leadsId,props.userId);
        }
      }}
      okText="Yes"
      cancelText="No"
    >
      <ConnectWithoutContactIcon
        className="!text-icon cursor-pointer text-[blue]"
      />
    </Popconfirm>
  </Tooltip>
) : (
  <Tooltip title="Company name is required to enable qualification action">
    <ConnectWithoutContactIcon
      className="!text-icon cursor-not-allowed text-gray-400"
    />
  </Tooltip>
)}
</div>

                </div>
                </div>
                <div class="flex justify-center h-8 ml-gap bg-[#eef2f9] max-sm:justify-evenly max-sm:w-wk items-center"> 
           
                <div >
                    <Tooltip title={translatedMenuItems[15]}>
                    
                      <SubscriptionsIcon
                       className=" !text-icon cursor-pointer text-green-800"
                       onClick={() => {
                        handleSetCurrentLeadsId(true);
                        props.handleLeadsSubscriptionModal(item);
                            }}
                        //   onClick={() => {
                        //   handleSetCurrentLeadsId(item);
                        //   // handleRowData(item);
                        //   props.handleLeadsSubscriptionModal(true);                      
                        // }}                     
                      />
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip title={translatedMenuItems[16]}>
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);                     
                        }}                        
                      />
                    </Tooltip>
                  </div>
                  <div>
            <Tooltip title={translatedMenuItems[14]}>
<AddLocationAltIcon
        className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
          props.handleLeadsAddressDrawerModal(true);
          // handleSetCurrentContact(item);
        handleSetCurrentLeadsId(item);
        }}
        
      />
   </Tooltip>
   </div>
                  <div >
                    <Tooltip
                      title={translatedMenuItems[17]}
                    >
                      {/* activity */}
                      <HourglassFullIcon
                       className="!text-icon cursor-pointer text-blue-500"
                          onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>                                          
                 
                  <div >
                    <Tooltip title={translatedMenuItems[18]}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-icon cursor-pointer text-green-400"
                          onClick={() => {
                          handleSetCurrentLeadsId(item);
                          props.handleLeadsEmailDrawerModal(true);
                        }}
                      />
                    </Tooltip>{" "}
                  </div>
                
                  {user.leadsDeleteInd === true && user.crmInd === true && (
                    <div >                     
                      <StyledPopconfirm
                        title={translatedMenuItems[20]}
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title={translatedMenuItems[27]}>
                        <DeleteOutlineIcon
                          type="delete"
                          className=" !text-icon cursor-pointer text-[red]"
                        />
                     </Tooltip>
                      </StyledPopconfirm>
                    </div>
                  )}                
             </div>
             
            </div>
          </div>
          );
        })}
         </InfiniteScroll>
      </div>
      </div>
      </>
      )}
    
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
      <OpenCETmodal
        rowdata={rowdata}
        // currentContact={currentContact}
        lead={rowdata.leadsId}
        type="leads"
        // item={currentLeadsId}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        openCETmodal={props.openCETmodal}
        handleCETmodal={props.handleCETmodal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
      <AddLeadsNotesDrawerModal
        rowdata={rowdata}
        addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
        handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      />
          <AddConfirmLedsStatusModal
           rowdata={rowdata}
           handleRowData={handleRowData}
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           />
           <AddSubscriptionModal
             item={currentLeadsId}
          //  rowdata={rowdata}
          //  handleRowData={handleRowData}
          addDrawerLeadsSubscriptionModal={props.addDrawerLeadsSubscriptionModal}
           handleLeadsSubscriptionModal={props.handleLeadsSubscriptionModal}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           />

<AddLeadsAddressModal
             item={currentLeadsId}
              type="leads"
          //  rowdata={rowdata}
          //  handleRowData={handleRowData}
          addDrawerLeadsAddressModal={props.addDrawerLeadsAddressModal}
          handleLeadsAddressDrawerModal={props.handleLeadsAddressDrawerModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
           />
    </div>
  );

  
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  leadsAllDataHot:leads.leadsAllDataHot,
  leadsAllDataWarm:leads.leadsAllDataWarm,
  leadsAllDataCold:leads.leadsAllDataCold,
  userId: auth.userDetails.userId,
  fetchingLeadsHot:leads.fetchingLeadsHot,
  fetchingLeadsWarm:leads.fetchingLeadsWarm,
  fetchingLeadsCold:leads.fetchingLeadsCold,
  lead: leads.lead,
  serachedData:leads.serachedData,
  user: auth.userDetails,

  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingLeads: leads.fetchingLeads,
  openCETmodal: leads.openCETmodal,
  addDrawerLeadsAddressModal:leads.addDrawerLeadsAddressModal,
  addDrawerLeadsSubscriptionModal:leads.addDrawerLeadsSubscriptionModal,
  addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
  fetchingLeadsInputSearchData: leads.fetchingLeadsInputSearchData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getLeads,
      convertCustomerStatus,
      emptyLeads,
      handleLeadsConfirmationModal,
      handleLeadsSubscriptionModal,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      // getCountries,
      updateTypeForLead,
      handleCETmodal,
      getLeadsCold,
      getLeadsWarm,
      getLeadsHot,
      handleLeadsAddressDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsCardList);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "red" : "grey",
          height:"1.875rem"
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} !text-icon max-xl:text-[0.65rem] max-lg:text-[0.45rem]`}  ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton1({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "orange" : "grey",
          height:"1.875rem"
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} !text-icon max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}
function RoleButton2({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "blue" : "grey",
          height:"1.875rem"
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} !text-icon max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}