import React, { useEffect, useState,lazy,Suspense } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DeleteOutlined } from "@ant-design/icons";
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
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SearchedData from "./SearchedData";
import AddConfirmLedsStatusModal from "./AddConfirmLedsStatusModal";
const UpdateLeadsModal =lazy(()=>import("../UpdateLeads/UpdateLeadsModal"));
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
    'Hot', // 0
'Name', // 1
'Phone', // 2
'Country', // 3
'Company', // 4
'Sector', // 5
'Source', // 6
'LOB', // 7
'Assigned', // 8
'By', // 9
'Owner', // 10
'Qualify', // 11
'Warm', //12
'Cold', //13

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
        userDetails: { employeeId },
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
        userDetails: { employeeId },
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
        userDetails: { employeeId },
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
    updateLeadsModal,
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


  if (loading) {
    return <div><BundleLoader/></div>;
  }
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
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[10.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-white bg-red-600  justify-center "> {translatedMenuItems[0]}</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[1]}</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[2]} #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
          {/* {translatedMenuItems[3]} */}
          </div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[4]}</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[5]}</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[6]}</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[7]}</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[8]} </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[9]}</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[10]}</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[11]}</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllLeadsHot?<div  class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
             { !fetchingAllLeadsHot && allleadsInfoHot.length === 0 ?<NodataFoundPage />:allleadsInfoHot.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class="flex flex-row items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        className="!text-icon"
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={
                          <FormattedMessage
                            id="app.hot"
                            defaultMessage="Hot"
                          />
                        }
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
                        tooltip={
                          <FormattedMessage
                            id="app.warm"
                            defaultMessage="Warm"
                          />
                        }
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
                        tooltip={
                          <FormattedMessage
                            id="app.cold"
                            defaultMessage="Cold"
                          />
                        }
                        role={item.type}
                        onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[9rem] max-xl:w-[9.5rem] max-lg:w-[5rem]   max-sm:w-auto">
                  <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div>
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
                    <div class="w-[4%]"></div>

                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"
                                
                              >
                                New
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
                <div className=" flex w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
                <div className=" flex  w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex   w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
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

                <div className=" flex   w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex   w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
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
                <div className=" flex  w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
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
                <div className=" flex  w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins"></div>
                  <div>
  {item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <ConnectWithoutContactIcon
        onClick={() => {
          handleRowData(item);
          props.handleLeadsConfirmationModal(true);
        }}
        className="!text-icon cursor-pointer text-[blue]"
      />
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
                <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                
                  <div >
                    <Tooltip title="Notes">
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                        onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="app.activity"
                          defaultMessage="Activity"
                        />
                      }
                    >
                      <AddchartIcon
                       className="!text-icon cursor-pointer text-blue-500"
                        onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>                                                                                   
                  <div >
                    <Tooltip
                      overlayStyle={{ maxWidth: "300px" }}
                      title={dataLoc}
                    >
                      <div class="cursor-pointer" >                                        
                        <LocationOnIcon
                           className="!text-icon cursor-pointer text-[#960a0a]"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip title={item.email}>
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
                  {user.leadsUpdateInd === true && user.crmInd === true && (
                   <div >
                      <Tooltip title="Edit">
                        <BorderColorIcon
                         className="!text-icon cursor-pointer text-[tomato]"
                          onClick={() => {
                            props.setEditLeads(item);
                            handleUpdateLeadsModal(true);
                            handleSetCurrentLeadsId(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                  {user.leadsDeleteInd === true && user.crmInd === true && (
                    <div >
                     
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title="Delete">
                        <DeleteOutlined
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
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[10.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] bg-orange-600 text-white">{translatedMenuItems[12]}</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[1]}</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[2]} #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
          {/* {translatedMenuItems[3]} */}
          </div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[4]}</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[5]}</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[6]}</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[7]}</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[8]} </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[9]}</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[10]}</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[11]}</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoWarm.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={fetchingAllLeadsWarm?<div class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsWarm && allleadsInfoWarm.length === 0 ?<NodataFoundPage />:allleadsInfoWarm.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class="flex flex-row items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={
                          <FormattedMessage
                            id="app.hot"
                            defaultMessage="Hot"
                          />
                        }
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
                        type="Warm"
                        iconType="	fas fa-burn"
                        // tooltip="Warm"
                        tooltip={
                          <FormattedMessage
                            id="app.warm"
                            defaultMessage="Warm"
                          />
                        }
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
                        type="Cold"
                        iconType="far fa-snowflake"
                        // tooltip="Cold"
                        tooltip={
                          <FormattedMessage
                            id="app.cold"
                            defaultMessage="Cold"
                          />
                        }
                        role={item.type}
                        onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex w-[9rem] max-xl:w-[9.5rem] max-lg:w-[5rem]   max-sm:w-auto">
                  <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                    <div>
                     
                        <MultiAvatar
                          primaryTitle={item.name}
                          imageId={item.imageId}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                     
                    </div>
                    <div class="w-[4%]"></div>

                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"                             
                              >
                                New
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
                <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
                <div className=" flex  w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex  w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
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

                <div className=" flex   w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex   w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex   w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
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
                <div className=" flex  w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
          
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />   
          </div>  
                  </div>
                </div>
                <div className=" flex  w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins"></div>
                  <div>
  {item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <ConnectWithoutContactIcon
        onClick={() => {
          handleRowData(item);
          props.handleLeadsConfirmationModal(true);
        }}
        className="!text-icon cursor-pointer text-[blue]"
      />
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
                <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                
                  <div >
                    <Tooltip title="Notes">
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                        onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="app.activity"
                          defaultMessage="Activity"
                        />
                      }
                    >
                      <AddchartIcon
                       className="!text-icon cursor-pointer text-blue-500"
                        onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>         
                             <div >
                    <Tooltip
                      overlayStyle={{ maxWidth: "300px" }}
                      title={dataLoc}
                    >
                      <div class="cursor-pointer">
                                          
                        <LocationOnIcon
                           className="!text-icon cursor-pointer text-[#960a0a]"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip title={item.email}>
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
                  {user.leadsUpdateInd === true && user.crmInd === true && (
                   <div >
                      <Tooltip title="Edit">
                        <BorderColorIcon
                         className="!text-icon cursor-pointer text-[tomato]"
                          onClick={() => {
                            props.setEditLeads(item);
                            handleUpdateLeadsModal(true);
                            handleSetCurrentLeadsId(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                  {user.leadsDeleteInd === true && user.crmInd === true && (
                    <div >
                     
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title="Delete">
                        <DeleteOutlined
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
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[10.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] bg-blue-600 text-white">{translatedMenuItems[13]}</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[1]}</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[2]} #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
          {/* {translatedMenuItems[3]} */}
          </div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{translatedMenuItems[4]}</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[5]}</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[6]}</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[7]}</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[8]} </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[9]}</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[10]}</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{translatedMenuItems[11]}</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoCold.length}
        next={handleLoadMore2}
        hasMore={hasMore}
        loader={fetchingAllLeadsCold?<div class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsCold && allleadsInfoCold.length === 0 ?<NodataFoundPage />:allleadsInfoCold.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
            >
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
             <div class="flex flex-row items-center w-[6.2rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                  <div>
                    <ButtonGroup>
                      <RoleButton
                        type="Hot"
                        iconType="fas fa-mug-hot"
                        // tooltip="Hot"
                        tooltip={
                          <FormattedMessage
                            id="app.hot"
                            defaultMessage="Hot"
                          />
                        }
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
                        type="Warm"
                        iconType="	fas fa-burn"
                        // tooltip="Warm"
                        tooltip={
                          <FormattedMessage
                            id="app.warm"
                            defaultMessage="Warm"
                          />
                        }
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
                        type="Cold"
                        iconType="far fa-snowflake"
                        // tooltip="Cold"
                        tooltip={
                          <FormattedMessage
                            id="app.cold"
                            defaultMessage="Cold"
                          />
                        }
                        role={item.type}
                        onClick={() => {
                          const typ = "Cold";
                          props.updateTypeForLead(item.leadsId, typ);
                        }}
                      />
                    </ButtonGroup>
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[9rem] max-xl:w-[9.5rem] max-lg:w-[5rem]   max-sm:w-auto">
                  <div className="flex max-sm:w-full max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
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
                           
                            {date === currentdate ? (
                              <div class="text-[0.65rem]  text-[tomato] font-bold"
                                
                              >
                                New
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
                <div className=" flex  w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "None"}
               
                  </div>
                </div>
                <div className=" flex  w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex   w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "None"}
                  </div>
                </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
               
                <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
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

                <div className=" flex   w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex  w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex  w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex  w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
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
                   <div className=" flex  w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
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
                <div className=" flex  w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">       
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />       
          </div>   
                  </div>
                </div>
                <div className=" flex  w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs  font-poppins"></div>
                  <div>
  {item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <ConnectWithoutContactIcon
        onClick={() => {
          handleRowData(item);
          props.handleLeadsConfirmationModal(true);
        }}
        className="!text-icon cursor-pointer text-[blue]"
      />
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
                <div class="flex max-sm:justify-end max-sm:w-wk items-center">              
                  <div >
                    <Tooltip title="Notes">
                      <NoteAltIcon
                       className=" !text-icon cursor-pointer text-green-800"
                        onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);                     
                        }}                     
                      />
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="app.activity"
                          defaultMessage="Activity"
                        />
                      }
                    >
                      <AddchartIcon
                       className="!text-icon cursor-pointer text-blue-500"
                        onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>                                                                                      
                  <div >
                    <Tooltip
                      overlayStyle={{ maxWidth: "300px" }}
                      title={dataLoc}
                    >
                      <div class="cursor-pointer"                     
                      >
                        <LocationOnIcon
                           className="!text-icon cursor-pointer text-[#960a0a]"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div >
                    <Tooltip title={item.email}>
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
                  {user.leadsUpdateInd === true && user.crmInd === true && (
                   <div >
                      <Tooltip title="Edit">
                        <BorderColorIcon
                         className="!text-icon cursor-pointer text-[tomato]"
                          onClick={() => {
                            props.setEditLeads(item);
                            handleUpdateLeadsModal(true);
                            handleSetCurrentLeadsId(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  )}
                  {user.leadsDeleteInd === true && user.crmInd === true && (
                    <div >
                     
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title="Delete">
                        <DeleteOutlined
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
      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
      <OpenCETmodal
        rowdata={rowdata}
        openCETmodal={props.openCETmodal}
        handleCETmodal={props.handleCETmodal}
      />
      <AddLeadsNotesDrawerModal
        rowdata={rowdata}
        addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
        handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
      />
       <AddConfirmLedsStatusModal
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
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
  updateLeadsModal: leads.updateLeadsModal,
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
  fetchingLeadsInputSearchData: leads.fetchingLeadsInputSearchData

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getAllLeads,
      emptyLeads,
      deleteLeadsData,
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
  getAllLeadsCold
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