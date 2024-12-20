import React, { useEffect, useState,lazy,Suspense } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import "jspdf-autotable";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  //getAllLeads,
  getAllLeadsHot,
  getAllLeadsWarm,
  getAllLeadsCold,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  emptyLeads,
  handleLeadsConfirmationModal,
  convertCustomerStatus,
  handleLeadsAddressDrawerModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Tooltip,Popconfirm ,Checkbox} from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import SearchedData from "./SearchedData";
import AddConfirmLedsStatusModal from "./AddConfirmLedsStatusModal";
import AddLeadsAddressModal from "./AddLeadsAddressModal";
import EmptyPage from "../../../Main/EmptyPage";
const AddLeadsEmailDrawerModal =lazy(()=>import("../UpdateLeads/AddLeadsEmailDrawerModal"));
const BorderColorIcon =lazy(()=>import("@mui/icons-material/BorderColor"));
const OpenCETmodal =lazy(()=>import("./OpenCETmodal"));
const AddLeadsNotesDrawerModal =lazy(()=>import("../AddLeadsNotesDrawerModal"));

const ButtonGroup = Button.Group;

const LeadsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    //props.getAllLeads(page,"creationdate");
    props.getAllLeadsHot(page,"creationdate","hot")
    props.getAllLeadsWarm(page,"creationdate","warm")
    props.getAllLeadsCold(page,"creationdate","cold")
  }, []);
  useEffect(() => {
   props.emptyLeads();
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '271', // 0
          '110', // 1
          '102', // 2
          '1109', // 3
          '277', // 4
          '278', // 5
          '279', // 6
          '280', // 7
          '76', // 8
          '1335', // 9
          '77', // 10
          '1114', // 11
          '272', //12
          '273', //13
'185',//Address 14
'316',//notes15
'1165',// 16activity
'140',// 17 email
'170',//18 edit
'1259',//19 "Do you want to delete?"
"100",// New 20
"271",// "Hot"21
"272",// "Warm"22
"273",// "Cold"23
"1454",// Company name is required to enable qualification action24
"84",// Delete25
 "1582",// Qualify? Lead will move to Prospect section!26
 "1581",// Score 27
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

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    const callPageMapd = props.allleadsInfoHot && props.allleadsInfoHot.length &&props.allleadsInfoHot[0].pageCount
    setTimeout(() => {
      const {
        getAllLeadsHot,
        // userDetails: { employeeId },
      } = props;
      if  (props.allleadsInfoHot)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getAllLeadsHot(page,props.filter?props.filter:"creationdate","hot");
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const handleLoadMore1 = () => {
   const callPageMapd = props.allleadsInfoWarm && props.allleadsInfoWarm.length &&props.allleadsInfoWarm[0].pageCount
    setTimeout(() => {
      const {
        getAllLeadsWarm,
        // userDetails: { employeeId },
      } = props;
      if  (props.allleadsInfoWarm)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getAllLeadsWarm(page,props.filter?props.filter:"creationdate", "warm");
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const handleLoadMore2 = () => {
    const callPageMapd = props.allleadsInfoCold && props.allleadsInfoCold.length &&props.allleadsInfoCold[0].pageCount
    setTimeout(() => {
      const {
        getAllLeadsCold,
        // userDetails: { employeeId },
      } = props;
      if  (props.allleadsInfoCold)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getAllLeadsCold(page,props.filter?props.filter:"creationdate","cold");
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
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    fetchingAllLeads,
    allleadsInfo,
    user,
    allleadsInfoHot,
    allleadsInfoWarm,
    allleadsInfoCold,
    fetchingAllLeadsHot,
    fetchingAllLeadsWarm,
    fetchingAllLeadsCold
  } = props;



  return (
    <>
       {props.serachedData.length > 0 ? (
    <SearchedData
    serachedData={props.serachedData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
  fetchingLeadsInputSearchData={props.fetchingLeadsInputSearchData}
    />
  ) : (
    <div>
  <div className=' flex  sticky  z-auto'>
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
  <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent  sticky top-0 max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
  <div className=" flex  w-[90%]  max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
        <div className="flex w-[6.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  text-white bg-red-600 truncate items-center justify-center "> {translatedMenuItems[0]}</div>
        <div className=" w-[1.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem]"></div>
        <div className="  w-[23.1rem] text-[#00A2E8]  text-sm max-xl:w-[12.1rem] max-lg:w-[7.1rem]  truncate ">    <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}</div>
       
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] truncate ">  <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[10.2rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  truncate "> <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[4]}</div>
        <div className=" w-[9.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] truncate">  <FactoryIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[5]}</div> 
        <div className= " w-[9.9rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] truncate"> <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}</div> 
        <div className= " w-[7.3rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] truncate">{translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className=" w-[4.81rem] max-xl:w-[3.81rem] truncate">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}   {translatedMenuItems[27]}      
            </div>
            )}
        <div className=" w-[4.23rem] max-xl:w-[6.2rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[8]} </div>
        <div className=" w-[3.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] truncate">{translatedMenuItems[9]}</div>
        <div className=" w-[3.7rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[10]}</div>
        <div className=" w-[5.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] truncate"><ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>{translatedMenuItems[11]}</div>
      
        {/* <div className="w-12"></div> */}

      </div>
      </div>
      <InfiniteScroll
        dataLength={allleadsInfoHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllLeadsHot?<div  class="flex justify-center">Loading...</div>:null}
        height={"25vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-600">You have reached the end of page. </div>}
      >
             { !fetchingAllLeadsHot && allleadsInfoHot.length === 0 ?<EmptyPage/>:allleadsInfoHot.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 py-ygap items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.leadsId)}
              checked={props.selectedDeals.includes(item.leadsId)}
              />
                        )}
                        </div>
             <div class="flex flex-row items-center w-[4.2rem] border-l-2 border-green-500 bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        className="!text-icon"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={translatedMenuItems[21]}
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
                        tooltip={translatedMenuItems[22]}
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
                        tooltip={translatedMenuItems[23]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex  w-[15.9rem]  h-8 ml-gap bg-[#eef2f9] mt-1  max-xl:w-[9.5rem] max-lg:w-[5rem]  max-sm:w-auto">
                  <div className="flex text-xs max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div>
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
             

                    <div class="max-sm:w-full md:flex items-center ml-1">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"
                                
                              >
                               {translatedMenuItems[20]} {/* New */}
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
              <div className=" flex  w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex w-[6.8rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
           
                <div className=" flex   w-[6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 cursor-pointer w-8 ">
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

                <div className=" flex   w-[7.35rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex   w-[7.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
       {props.user.aiInd && (
           <div className=" flex  justify-center  w-[3.5rem] items-center  h-8 ml-gap bg-[#eef2f9] mt-1 max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}

              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[3.02rem] items-center justify-center h-8 mt-1 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[3.03rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
              
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.assignedBy}> */}
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
                <div className=" flex  w-[4.11rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.ownerName}> */}
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
    
          </div>
     
                  </div>
                </div>
          
                <div className=" flex w-[4.5rem] items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
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
                <div class="flex max-sm:justify-evenly max-sm:w-wk mt-1  items-center justify-center h-8 ml-gap bg-[#eef2f9]"> 
          
                  <div >
                    <Tooltip title={translatedMenuItems[15]}>
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleLeadsAddressDrawerModal(true);
            handleRowData(item);
          }}
          
        /> 
                  <div >
                    <Tooltip
                      title={translatedMenuItems[16]}
                    >
                      {/* Activity */}
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
                    <Tooltip title={translatedMenuItems[17]}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-icon cursor-pointer text-red-600"
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
                   title={translatedMenuItems[19]}
                   onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
              <Tooltip  title={translatedMenuItems[27]}>
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

  <div className=' flex  sticky  z-auto'>
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
  <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky top-0 max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
  <div className=" flex  w-[90%]  max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky max-xl:text-[0.65rem] max-lg:text-[0.45rem]   z-10">
      <div className="flex items-center justify-center w-[6.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem] truncate bg-orange-400 text-white">{translatedMenuItems[12]}</div>
        <div className=" w-[1.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem]"></div>
        <div className="  w-[23.1rem] text-[#00A2E8]  text-sm max-xl:w-[12.1rem] max-lg:w-[7.1rem]  truncate ">    <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}</div>
       
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] truncate ">  <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[10.2rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  truncate "> <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[4]}</div>
        <div className=" w-[9.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] truncate">  <FactoryIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[5]}</div> 
        <div className= " w-[9.9rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] truncate"> <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}</div> 
        <div className= " w-[7.3rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] truncate">{translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className=" w-[4.81rem] max-xl:w-[3.81rem] truncate">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}   {translatedMenuItems[27]}      
            </div>
            )}
        <div className=" w-[4.23rem] max-xl:w-[6.2rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[8]} </div>
        <div className=" w-[3.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] truncate">{translatedMenuItems[9]}</div>
        <div className=" w-[3.7rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[10]}</div>
        <div className=" w-[5.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] truncate"><ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>{translatedMenuItems[11]}</div>
      
        {/* <div className="w-12"></div> */}

      </div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoWarm.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={fetchingAllLeadsWarm?<div class="flex justify-center">Loading...</div>:null}
        height={"25vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsWarm && allleadsInfoWarm.length === 0 ?<EmptyPage/>:allleadsInfoWarm.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.leadsId)}
              checked={props.selectedDeals.includes(item.leadsId)}
              />
                        )}
                        </div>
             <div class="flex flex-row items-center w-[4.2rem] border-l-2 border-green-500 bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        className="!text-icon"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={translatedMenuItems[21]}
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
                        tooltip={translatedMenuItems[22]}
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
                        tooltip={translatedMenuItems[23]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex  w-[15.9rem]  h-8 ml-gap bg-[#eef2f9] mt-1  max-xl:w-[9.5rem] max-lg:w-[5rem]  max-sm:w-auto">
                  <div className="flex text-xs max-sm:w-full  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div>
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
             

                    <div class="max-sm:w-full md:flex items-center ml-1">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"
                                
                              >
                               {translatedMenuItems[20]} {/* New */}
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
              <div className=" flex  w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex w-[6.8rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
              
                <div className=" flex   w-[6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 cursor-pointer w-8 ">
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

                <div className=" flex   w-[7.35rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex   w-[7.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
       {props.user.aiInd && (
           <div className=" flex  justify-center  w-[3.5rem] items-center  h-8 ml-gap bg-[#eef2f9] mt-1 max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}

              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[3.02rem] items-center justify-center h-8 mt-1 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[3.03rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
              
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.assignedBy}> */}
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
                <div className=" flex  w-[4.11rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.ownerName}> */}
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
    
          </div>
     
                  </div>
                </div>
          
                <div className=" flex w-[4.5rem] items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
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
                <div class="flex max-sm:justify-evenly max-sm:w-wk mt-1  items-center justify-center h-8 ml-gap bg-[#eef2f9]"> 
          
                  <div >
                    <Tooltip title={translatedMenuItems[15]}>
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleLeadsAddressDrawerModal(true);
            handleRowData(item);
          }}
          
        /> 
                  <div >
                    <Tooltip
                      title={translatedMenuItems[16]}
                    >
                      {/* Activity */}
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
                    <Tooltip title={translatedMenuItems[17]}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-icon cursor-pointer text-red-600"
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
                     title={translatedMenuItems[19]}
                     onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                <Tooltip  title={translatedMenuItems[27]}>
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

      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex  w-[100%] max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky top-0 max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
      <div className=" flex  w-[90%]  max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
        <div className="flex items-center w-[6.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  text-white bg-blue-600 truncate justify-center "> {translatedMenuItems[13]}</div>
        <div className=" w-[1.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem]"></div>
        <div className="  w-[23.1rem] text-[#00A2E8]  text-sm max-xl:w-[12.1rem] max-lg:w-[7.1rem]  truncate ">    <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}</div>
       
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] truncate ">  <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[10.2rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  truncate "> <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[4]}</div>
        <div className=" w-[9.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] truncate">  <FactoryIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[5]}</div> 
        <div className= " w-[9.9rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] truncate"> <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}</div> 
        <div className= " w-[7.3rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] truncate">{translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className=" w-[4.81rem] max-xl:w-[3.81rem] truncate">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}   {translatedMenuItems[27]}      
            </div>
            )}
        <div className=" w-[4.23rem] max-xl:w-[6.2rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[8]} </div>
        <div className=" w-[3.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] truncate">{translatedMenuItems[9]}</div>
        <div className=" w-[3.7rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[10]}</div>
        <div className=" w-[5.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] truncate"><ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>{translatedMenuItems[11]}</div>
      
        {/* <div className="w-12"></div> */}

      </div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoCold.length}
        next={handleLoadMore2}
        hasMore={hasMore}
        loader={fetchingAllLeadsCold?<div class="flex justify-center">Loading...</div>:null}
        height={"25vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsCold && allleadsInfoCold.length === 0 ?<EmptyPage/>:allleadsInfoCold.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.leadsId)}
              checked={props.selectedDeals.includes(item.leadsId)}
              />
                        )}
                        </div>
             <div class="flex flex-row items-center text-xs w-[4.2rem] border-l-2 border-green-500 bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        className="!text-icon text-xs"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={translatedMenuItems[21]}
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
                        className="!text-icon text-xs"
                        type="Warm"
                        iconType="	fas fa-burn"
                        // tooltip="Warm"
                        tooltip={translatedMenuItems[22]}
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
                        className="!text-icon text-xs"
                        type="Cold"
                        iconType="far fa-snowflake"
                        // tooltip="Cold"
                        tooltip={translatedMenuItems[23]}
                        role={item.type}
                          onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex  w-[15.9rem]  h-8 ml-gap bg-[#eef2f9] mt-1  max-xl:w-[9.5rem] max-lg:w-[5rem]  max-sm:w-auto">
                  <div className="flex text-xs max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div>
                     
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
                          <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"
                                
                              >
                               {translatedMenuItems[20]} {/* New */}
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
              <div className=" flex  w-[2.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex w-[6.8rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
             
                <div className=" flex   w-[6rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 cursor-pointer w-8 ">
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

                <div className=" flex   w-[7.35rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex   w-[6.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mt-1 max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
       {props.user.aiInd && (
           <div className=" flex  justify-center  w-[3.5rem] items-center  h-8 ml-gap bg-[#eef2f9] mt-1 max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}

              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[3.02rem] items-center justify-center h-8 mt-1 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[3.03rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
              
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.assignedBy}> */}
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
                <div className=" flex  w-[4.11rem]  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.ownerName}> */}
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
    
          </div>
     
                  </div>
                </div>
          
                <div className=" flex w-[4.5rem] items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
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
                <div class="flex max-sm:justify-evenly max-sm:w-wk mt-1  items-center justify-center h-8 ml-gap bg-[#eef2f9]"> 
          
                  <div >
                    <Tooltip title={translatedMenuItems[15]}>
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                          onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleLeadsAddressDrawerModal(true);
            handleRowData(item);
          }}
          
        /> 
                  <div >
                    <Tooltip
                      title={translatedMenuItems[16]}
                    >
                      {/* Activity */}
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
                    <Tooltip title={translatedMenuItems[17]}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-icon cursor-pointer text-red-600"
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
                     title={translatedMenuItems[19]}
                     onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                <Tooltip  title={translatedMenuItems[27]}>
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
    
      </div>
)}

      <Suspense fallback={<BundleLoader/>}>
  
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
      <AddLeadsAddressModal
             item={rowdata}
              type="leads"
          addDrawerLeadsAddressModal={props.addDrawerLeadsAddressModal}
          handleLeadsAddressDrawerModal={props.handleLeadsAddressDrawerModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
           />
       <AddConfirmLedsStatusModal
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           />
      </Suspense>
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  allleadsInfo: leads.allleadsInfo,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingAllLeads: leads.fetchingAllLeads,
  openCETmodal: leads.openCETmodal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
  allleadsInfoHot: leads.allleadsInfoHot,
  fetchingAllLeadsHot: leads.fetchingAllLeadsHot,
  allleadsInfoWarm: leads.allleadsInfoWarm,
  fetchingAllLeadsWarm: leads.fetchingAllLeadsWarm,
  allleadsInfoCold: leads.allleadsInfoCold,
  serachedData:leads.serachedData,
  addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  fetchingAllLeadsCold: leads.fetchingAllLeadsCold,
  addDrawerLeadsAddressModal:leads.addDrawerLeadsAddressModal,
  fetchingLeadsInputSearchData: leads.fetchingLeadsInputSearchData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getAllLeads,
      emptyLeads,
      deleteLeadsData,
      convertCustomerStatus,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      updateTypeForLead,
      handleCETmodal,
      getAllLeadsHot,
      handleLeadsConfirmationModal,
  getAllLeadsWarm,
  getAllLeadsCold,
  handleLeadsAddressDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsAllCardList);
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