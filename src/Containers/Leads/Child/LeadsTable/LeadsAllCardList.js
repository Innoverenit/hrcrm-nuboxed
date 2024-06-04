import React, { useEffect, useState,lazy,Suspense } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import moment from "moment";
import LanguageIcon from '@mui/icons-material/Language';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getAllLeads,
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
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateLeadsModal =lazy(()=>import("../UpdateLeads/UpdateLeadsModal"));
const AddLeadsEmailDrawerModal =lazy(()=>import("../UpdateLeads/AddLeadsEmailDrawerModal"));
const BorderColorIcon =lazy(()=>import("@mui/icons-material/BorderColor"));
const OpenCETmodal =lazy(()=>import("./OpenCETmodal"));
const AddLeadsNotesDrawerModal =lazy(()=>import("../AddLeadsNotesDrawerModal"));

const ButtonGroup = Button.Group;

const LeadsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    props.getAllLeads(page,"creationdate");
    props.getAllLeadsHot(page,"creationdate","hot")
    props.getAllLeadsWarm(page,"creationdate","warm")
    props.getAllLeadsCold(page,"creationdate","cold")
  }, []);
  useEffect(() => {
   props.emptyLeads();
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
//   const handleLoadMore = () => {
//     setPage(page + 1);
//     props.getAllLeads(page,props.filter?props.filter:"creationdate");
// };
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



  return (
    <>
      <div className=' flex  sticky  z-auto'>
      <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[15.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Hot</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Phone #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Country</div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Company</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sector</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Source</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">LOB</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">By</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllLeadsHot?<div  class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
             { !fetchingAllLeadsHot && allleadsInfoHot.length === 0 ?<NodataFoundPage />:allleadsInfoHot.map((item,index) =>  {
          const currentdate = moment().format("DD/MM/YYYY");
          const date = moment(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.address[0].country_alpha2_code
          const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
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
                    <div class="w-[4%]"></div>

                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-sm flex text-cardBody font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-xs  text-[tomato] font-bold"
                                
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
                <div className=" flex font-medium flex-col w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "No Data"}
               
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex font-medium flex-col  w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs text-cardBody   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "No Data"}
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
                             className=" !text-xl cursor-pointer text-green-800"
                          />
                        </a>
                      </div>
                    </Tooltip>
                  ) : null}
                </div>

                <div className=" flex font-medium flex-col  w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex font-medium flex-col  w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex font-medium flex-col  w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex font-medium flex-col w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    <div>
                    {item.assignedTo === null ? (
              "No Data"
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
                   <div className=" flex font-medium flex-col w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
                  {/* <Tooltip title={item.assignedBy}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.assignedBy}> */}
            <MultiAvatar
            
              primaryTitle={item.assignedBy}
              // imageId={item.ownerImageId}
              imgWidth={"1.9rem"}
              imgHeight={"1.9rem"}
            />
          {/* </Tooltip> */}
          </div>
        {/* </Tooltip> */}
                  </div>
                  )}
                </div>
                <div className=" flex font-medium flex-col w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.ownerName}> */}
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.9rem"}
              imgHeight={"1.9rem"}
            />
          {/* </Tooltip> */}
          </div>
        {/* </Tooltip> */}
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs text-cardBody font-poppins"></div>
                  <div>
  {item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <ConnectWithoutContactIcon
        onClick={() => {
          handleRowData(item);
          props.handleLeadsConfirmationModal(true);
        }}
        className="!text-xl cursor-pointer text-[blue]"
      />
    </Tooltip>
  ) : (
    <Tooltip title="Company name is required to enable qualification action">
      <ConnectWithoutContactIcon
        className="!text-xl cursor-not-allowed text-gray-400"
      />
    </Tooltip>
  )}
</div>
                </div>
                </div>
                <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                
                  <div class="w-5">
                    <Tooltip title="Notes">
                      <NoteAltIcon
                       className=" !text-xl cursor-pointer text-green-800"
                        onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <div class="w-5">
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="app.activity"
                          defaultMessage="Activity"
                        />
                      }
                    >
                      <AddchartIcon
                       className="!text-xl cursor-pointer text-blue-500"
                        onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>
               

               
                  
                  
               
               
                  <div class="w-5">
                    <Tooltip
                      overlayStyle={{ maxWidth: "300px" }}
                      title={dataLoc}
                    >
                      <div class="cursor-pointer"
                       
                      >
                        <LocationOnIcon
                           className="!text-xl cursor-pointer text-[#960a0a]"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div class="w-5">
                    <Tooltip title={item.email}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-xl cursor-pointer text-green-400"
                        onClick={() => {
                          handleSetCurrentLeadsId(item);
                          props.handleLeadsEmailDrawerModal(true);
                        }}
                      />
                    </Tooltip>{" "}
                  </div>
                  {user.leadsUpdateInd === true && user.crmInd === true && (
                   <div class="w-5">
                      <Tooltip title="Edit">
                        <BorderColorIcon
                         className="!text-xl cursor-pointer text-[tomato]"
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
                    <div class="w-5">
                     
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title="Delete">
                        <DeleteOutlined
                          type="delete"
                          className=" !text-xl cursor-pointer text-[red]"
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
      <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[15.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Warm</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Phone #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Country</div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Company</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sector</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Source</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">LOB</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">By</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoWarm.length}
        next={handleLoadMore1}
        hasMore={hasMore}
        loader={fetchingAllLeadsWarm?<div class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsWarm && allleadsInfoWarm.length === 0 ?<NodataFoundPage />:allleadsInfoWarm.map((item,index) =>  {
          const currentdate = moment().format("DD/MM/YYYY");
          const date = moment(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.address[0].country_alpha2_code
          const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
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
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                        <Tooltip>
                          <div class="max-sm:w-full justify-between flex md:flex-col">
                            <div class="text-sm flex text-cardBody font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-xs  text-[tomato] font-bold"
                                  
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
                  <div className=" flex font-medium flex-col w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
         
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "No Data"}
                 
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                     
                       <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                     
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                    <div class=" text-xs text-cardBody   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                      {item.companyName || "No Data"}
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
                               className=" !text-xl cursor-pointer text-green-800"
                            />
                          </a>
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex font-medium flex-col  w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
           
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      {item.sector}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
           
           <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             {item.source}
           </div>
         </div>
         <div className=" flex font-medium flex-col  w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
           
           <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
             {item.lob}
           </div>
         </div>
                </div>
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                  <div className=" flex font-medium flex-col w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                      <div>
                      {item.assignedTo === null ? (
                "No Data"
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
                     <div className=" flex font-medium flex-col w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                      {item.assignedBy && (
                    <div>
                    {/* <Tooltip title={item.assignedBy}> */}
                <div class="max-sm:flex justify-end">
                {/* <Tooltip title={item.assignedBy}> */}
              <MultiAvatar
              
                primaryTitle={item.assignedBy}
                // imageId={item.ownerImageId}
                imgWidth={"1.9rem"}
                imgHeight={"1.9rem"}
              />
            {/* </Tooltip> */}
            </div>
          {/* </Tooltip> */}
                    </div>
                    )}
                  </div>
                  <div className=" flex font-medium flex-col w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    <div>
                    {/* <Tooltip title={item.ownerName}> */}
                <div class="max-sm:flex justify-end">
                {/* <Tooltip title={item.ownerName}> */}
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.9rem"}
                imgHeight={"1.9rem"}
              />
            {/* </Tooltip> */}
            </div>
          {/* </Tooltip> */}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                    <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
    {item.companyName ? (
      <Tooltip title="Qualify? Lead will move to Prospect section!">
        <ConnectWithoutContactIcon
          onClick={() => {
            handleRowData(item);
            props.handleLeadsConfirmationModal(true);
          }}
          className="!text-xl cursor-pointer text-[blue]"
        />
      </Tooltip>
    ) : (
      <Tooltip title="Company name is required to enable qualification action">
        <ConnectWithoutContactIcon
          className="!text-xl cursor-not-allowed text-gray-400"
        />
      </Tooltip>
    )}
  </div>
                  </div>
                  </div>
                  <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                  
                    <div class="w-5">
                      <Tooltip title="Notes">
                        <NoteAltIcon
                         className=" !text-xl cursor-pointer text-green-800"
                          onClick={() => {
                            handleRowData(item);
                            handleLeadsNotesDrawerModal(true);
                         
                          }}
                         
                        />
                      </Tooltip>
                    </div>
                    <div class="w-5">
                      <Tooltip
                        title={
                          <FormattedMessage
                            id="app.activity"
                            defaultMessage="Activity"
                          />
                        }
                      >
                        <AddchartIcon
                         className="!text-xl cursor-pointer text-blue-500"
                          onClick={() => {
                                handleRowData(item);
                            props.handleCETmodal(true);
                        
                          }}
                        />
                      </Tooltip>
                    </div>
                 

                 
                   
                    
                 
                 
                    <div class="w-5">
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <div class="cursor-pointer"
                         
                        >
                          <LocationOnIcon
                             className="!text-xl cursor-pointer text-[#960a0a]"
                          />
                        </div>
                      </Tooltip>
                    </div>
                    <div class="w-5">
                      <Tooltip title={item.email}>
                        <MailOutlineIcon
                          type="mail"
                          className="!text-xl cursor-pointer text-green-400"
                          onClick={() => {
                            handleSetCurrentLeadsId(item);
                            props.handleLeadsEmailDrawerModal(true);
                          }}
                        />
                      </Tooltip>{" "}
                    </div>
                    {user.leadsUpdateInd === true && user.crmInd === true && (
                     <div class="w-5">
                        <Tooltip title="Edit">
                          <BorderColorIcon
                           className="!text-xl cursor-pointer text-[tomato]"
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
                      <div class="w-5">
                       
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                     <Tooltip title="Delete">
                          <DeleteOutlined
                            type="delete"
                            className=" !text-xl cursor-pointer text-[red]"
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
      <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[92%] max-sm:hidden p-1 bg-transparent font-bold sticky top-0 z-10">
      <div className=" w-[15.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Cold</div>
        <div className=" w-[7.1rem] max-xl:w-[12.1rem] max-lg:w-[7.1rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" w-[6.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Phone #</div>
        <div className=" w-[6.8rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Country</div>
        <div className=" w-[21.5rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Company</div>
        <div className=" w-[8.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sector</div> 
        <div className= " w-[8.91rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Source</div> 
        <div className= " w-[8.82rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">LOB</div> 
        <div className=" w-[9.2rem] max-xl:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned </div>
        <div className=" w-[4.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">By</div>
        <div className=" w-[5.5rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        <div className=" w-[6.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfoCold.length}
        next={handleLoadMore2}
        hasMore={hasMore}
        loader={fetchingAllLeadsCold?<div class="flex justify-center">Loading...</div>:null}
        height={"22vh"}
        endMessage={<div class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingAllLeadsCold && allleadsInfoCold.length === 0 ?<NodataFoundPage />:allleadsInfoCold.map((item,index) =>  {
          const currentdate = moment().format("DD/MM/YYYY");
          const date = moment(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.address[0].country_alpha2_code
          const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
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
                    <div class="w-[4%]"></div>

                    <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                        <div class="max-sm:w-full justify-between flex md:flex-col">
                          <div class="text-sm flex text-cardBody font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                            {item.name}
                            &nbsp;&nbsp;
                            {date === currentdate ? (
                              <div class="text-xs  text-[tomato] font-bold"
                                
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
                <div className=" flex font-medium flex-col w-[5.6rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
       
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.countryDialCode && item.phoneNumber
                      ? `${item.countryDialCode} ${item.phoneNumber}`
                      : "No Data"}
               
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[3.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                   
                     <CountryFlag1 countryCode={countryCode} />
                    &nbsp;
                    {countryCode}
                   
                  </div>
                </div>
                <div className=" flex font-medium flex-col  w-[10rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                  <div class=" text-xs text-cardBody   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate max-sm:text-sm">
                    {item.companyName || "No Data"}
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
                             className=" !text-xl cursor-pointer text-green-800"
                          />
                        </a>
                      </div>
                    </Tooltip>
                  ) : null}
                </div>

                <div className=" flex font-medium flex-col  w-[5.01rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
         
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    {item.sector}
                  </div>
                </div>
                <div className=" flex font-medium flex-col  w-[6rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
         
         <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.source}
         </div>
       </div>
       <div className=" flex font-medium flex-col  w-[5.5rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
         
         <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
           {item.lob}
         </div>
       </div>
              </div>
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                <div className=" flex font-medium flex-col w-[2.02rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                  <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                    <div>
                    {item.assignedTo === null ? (
              "No Data"
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
                   <div className=" flex font-medium flex-col w-[4rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    {item.assignedBy && (
                  <div>
                  {/* <Tooltip title={item.assignedBy}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.assignedBy}> */}
            <MultiAvatar
            
              primaryTitle={item.assignedBy}
              // imageId={item.ownerImageId}
              imgWidth={"1.9rem"}
              imgHeight={"1.9rem"}
            />
          {/* </Tooltip> */}
          </div>
        {/* </Tooltip> */}
                  </div>
                  )}
                </div>
                <div className=" flex font-medium flex-col w-[3.11rem]  max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                  <div>
                  {/* <Tooltip title={item.ownerName}> */}
              <div class="max-sm:flex justify-end">
              {/* <Tooltip title={item.ownerName}> */}
            <MultiAvatar
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
              imgWidth={"1.9rem"}
              imgHeight={"1.9rem"}
            />
          {/* </Tooltip> */}
          </div>
        {/* </Tooltip> */}
                  </div>
                </div>
                <div className=" flex font-medium flex-col w-[2.1rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                  <div class=" text-xs text-cardBody font-poppins"></div>
                  <div>
  {item.companyName ? (
    <Tooltip title="Qualify? Lead will move to Prospect section!">
      <ConnectWithoutContactIcon
        onClick={() => {
          handleRowData(item);
          props.handleLeadsConfirmationModal(true);
        }}
        className="!text-xl cursor-pointer text-[blue]"
      />
    </Tooltip>
  ) : (
    <Tooltip title="Company name is required to enable qualification action">
      <ConnectWithoutContactIcon
        className="!text-xl cursor-not-allowed text-gray-400"
      />
    </Tooltip>
  )}
</div>
                </div>
                </div>
                <div class="flex max-sm:justify-end max-sm:w-wk items-center"> 
                
                  <div class="w-5">
                    <Tooltip title="Notes">
                      <NoteAltIcon
                       className=" !text-xl cursor-pointer text-green-800"
                        onClick={() => {
                          handleRowData(item);
                          handleLeadsNotesDrawerModal(true);
                       
                        }}
                       
                      />
                    </Tooltip>
                  </div>
                  <div class="w-5">
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="app.activity"
                          defaultMessage="Activity"
                        />
                      }
                    >
                      <AddchartIcon
                       className="!text-xl cursor-pointer text-blue-500"
                        onClick={() => {
                              handleRowData(item);
                          props.handleCETmodal(true);
                      
                        }}
                      />
                    </Tooltip>
                  </div>
               

               
                 
                  
               
               
                  <div class="w-5">
                    <Tooltip
                      overlayStyle={{ maxWidth: "300px" }}
                      title={dataLoc}
                    >
                      <div class="cursor-pointer"
                       
                      >
                        <LocationOnIcon
                           className="!text-xl cursor-pointer text-[#960a0a]"
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div class="w-5">
                    <Tooltip title={item.email}>
                      <MailOutlineIcon
                        type="mail"
                        className="!text-xl cursor-pointer text-green-400"
                        onClick={() => {
                          handleSetCurrentLeadsId(item);
                          props.handleLeadsEmailDrawerModal(true);
                        }}
                      />
                    </Tooltip>{" "}
                  </div>
                  {user.leadsUpdateInd === true && user.crmInd === true && (
                   <div class="w-5">
                      <Tooltip title="Edit">
                        <BorderColorIcon
                         className="!text-xl cursor-pointer text-[tomato]"
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
                    <div class="w-5">
                     
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                   <Tooltip title="Delete">
                        <DeleteOutlined
                          type="delete"
                          className=" !text-xl cursor-pointer text-[red]"
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
  fetchingAllLeadsCold: leads.fetchingAllLeadsCold

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllLeads,
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
        <i className={`${iconType} text-xl max-xl:text-[0.65rem] max-lg:text-[0.45rem]`}  ></i>
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
        <i className={`${iconType} text-xl max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
        <i className={`${iconType} text-xl max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}