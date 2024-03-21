import React, { useEffect, useState,lazy } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getLeads,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  emptyLeads,
  handleLeadsConfirmationModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateLeadsModal = lazy(() => import("../UpdateLeads/UpdateLeadsModal"));
const OpenCETmodal = lazy(() => import("./OpenCETmodal"));
const AddLeadsEmailDrawerModal = lazy(() => import("../UpdateLeads/AddLeadsEmailDrawerModal"));
const AddLeadsNotesDrawerModal = lazy(() => import("../AddLeadsNotesDrawerModal"));
const AddConfirmLedsStatusModal = lazy(() => import("./AddConfirmLedsStatusModal"));

const ButtonGroup = Button.Group;

const LeadsCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    props.getLeads(props.userId, page,"creationdate");
  }, []);

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
   
    setPage(page + 1);
    props.getLeads(
      props.currentUser ? props.currentUser : props.userId,
      page,
      props.filter?props.filter:"creationdate"
    );
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
    updateLeadsModal,
    fetchingLeads,
    leadsAllData,
    user,
  } = props;
  if (isMobile){
    return (
      <>
       <div className=' flex justify-end sticky top-28 z-auto'>
       <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      
        <InfiniteScroll
          dataLength={leadsAllData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingLeads?<div class="items-center">Loading...</div>:null}
          height={"86vh"}
        >
          {leadsAllData.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
            const countryCode = item.address[0].country_alpha2_code
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                >
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
                      <div className="flex max-sm:w-full ">
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
  
                        <div class="w-full flex items-center">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col">
                              <div class="text-sm text-cardBody flex font-semibold  font-poppins cursor-pointer ">
                                {item.name}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
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
  
                    <div class="flex flex-row items-center md:w-[6rem] max-sm:flex-row w-full max-sm:justify-end">
                  

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
                  </div>
                  <div class="flex justify-between items-center w-full ">
                    <div className=" flex font-medium f ">
                    
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.countryDialCode && item.phoneNumber
                          ? `${item.countryDialCode} ${item.phoneNumber}`
                          : "No Data"}
                        
                      </div>
                    </div>
                    <div className=" flex font-medium ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                      <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium flex-col  ">
                     
                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                        {item.companyName || "No Data"}
                      </div>
                    </div>
                    <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.url !== null ? (
                        <Tooltip title={item.url}>
                          <div
                            //type="edit"
                            class="cursor-pointer"
                            onClick={() => {}}
                          >
                            {" "}
                            <a href={`https://www.${item.url}`} target="_blank">
                              <OpenInBrowserIcon
                                className=" !text-base cursor-pointer text-green-800"
                              />
                            </a>
                          </div>
                        </Tooltip>
                      ) : null}
                    </div>
  
                    <div className=" flex font-medium flex-col ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.sector}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.source}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium   ">
                      
  
                      <div class=" text-xs text-cardBody font-poppins">
                      <div>
                      {item.assignedTo === null ? (
                "No Data"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                          <MultiAvatar
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
                    <div className=" flex font-medium  ">
                     
          <div>
          <Tooltip title={item.ownerName}>
                  <MultiAvatar
                    primaryTitle={item.ownerName}
                    ownerImageId={item.ownerImageId}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                  </Tooltip>
                </div>
                
                    </div>
                  <div class="flex">
                    <div className=" flex font-medium mr-1  ">
                     
  
                      <div class=" text-xs text-cardBody font-poppins"></div>
                      <div>
                      <Tooltip title="Qualify? Lead will move to Customer section!">
                          <ConnectWithoutContactIcon
                            onClick={() => {
                              handleRowData(item);
                              props.handleLeadsConfirmationModal(true);
                           
                            }}
                            className="!text-base cursor-pointer text-[blue]"
                          />
                        </Tooltip>
                        
                      </div>
                    </div>
                    
                      <div className="mr-1">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            onClick={() => {
                              handleRowData(item);
                              handleLeadsNotesDrawerModal(true);
                           
                            }}
                            className=" !text-base cursor-pointer text-green-800"
                          />
                        </Tooltip>
                      </div>
                      <div className="mr-1">
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.activity"
                              defaultMessage="Activity"
                            />
                          }
                        >
                          <AddchartIcon
                            className="!text-base cursor-pointer text-blue-500"
                            onClick={() => {
                                  handleRowData(item);
                              props.handleCETmodal(true);
                          
                            }}
                          />
                        </Tooltip>
                      </div>
                    
  
                    
                      {user.leadsUpdateInd === true && user.crmInd === true && (
                        <div className="mr-1">
                          <Tooltip title="Edit">
                            <BorderColorIcon
                              className="!text-base cursor-pointer text-[tomato]"
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
                        <div className="mt-1 mr-1">
                          <StyledPopconfirm
                            title="Do you want to delete?"
                            onConfirm={() => deleteLeadsData(item.leadsId)}
                          >
                            
                            <DeleteOutlined
                              type="delete"
                              className=" !text-base cursor-pointer text-[red]"
                            />
                         
                          </StyledPopconfirm>
                        </div>
                      )}

                      <div className="mr-1">
                        <Tooltip
                          overlayStyle={{ maxWidth: "300px" }}
                          title={dataLoc}
                        >
                          <div class="cursor-pointer"
                           
                          >
                            <LocationOnIcon
                             className="!text-base cursor-pointer text-[#960a0a]"
                            />
                          </div>
                        </Tooltip>
                      </div>
                      <div className="mr-1">
                        <Tooltip title={item.email}>
                          <MailOutlineIcon
                            type="mail"
                            className="!text-base cursor-pointer text-green-400"
                            onClick={() => {
                              handleSetCurrentLeadsId(item);
                              props.handleLeadsEmailDrawerModal(true);
                            }}
                          />
                        </Tooltip>{" "}
                      </div>
                    
                   </div>
                   
                  </div>
                </div>
              </div>
              // </div>
            );
          })}
           </InfiniteScroll>
        </div>
        </div>
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
             rowdata={rowdata}
             handleRowData={handleRowData}
             addLeadsConfirmationModal={props.addLeadsConfirmationModal}
             handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
             />
      </>
    );
  }


   return (
    <>
     <div className=' flex  justify-center  sticky top-28 z-auto'>
     <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[92%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[12.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" w-[9.1rem] max-xl:w-[11.1rem] max-lg:w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Phone #</div>
        <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Country</div>
        <div className=" w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Company</div>
        <div className=" w-[8.8rem] max-xl:w-[4.81rem] max-lg:w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sector</div> 
        <div className= " w-[8.8rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Source</div> 
        <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned to</div>
        <div className=" w-[4.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        <div className=" w-[3.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={leadsAllData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingLeads?<div class="flex justify-center" >Loading...</div>:null}
        height={"75vh"}
        style={{overflowX:"hidden"}}
      >
           { !fetchingLeads && leadsAllData.length === 0 ?<NodataFoundPage />:leadsAllData.map((item,index) =>  {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.address[0].country_alpha2_code;
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
                className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-11 items-center p-3"
              >
                <div class="flex ">
                  <div className=" flex font-medium flex-col w-[12rem] max-xl:w-[9rem] max-lg:w-[5rem]   max-sm:w-full">
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
                            <div class="text-sm flex text-cardBody font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                  
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

                  <div class="flex flex-row items-center w-[6.5rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
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
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col w-[7.6rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
         
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "No Data"}
                 
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col w-12 max-sm:flex-row  max-sm:justify-between max-xl:w-8 max-lg:w-8 ">
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     
                       <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                     
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  w-[10rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[7rem] max-lg:w-[4rem] ">
                    <div class=" text-xs text-cardBody font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">
                      {item.companyName || "No Data"}
                    </div>
                  </div>
                  <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <div class="cursor-pointer"
                          onClick={() => {}}
                        >
                          {" "}
                          <a href={`https://www.${item.url}`} target="_blank">
                            <OpenInBrowserIcon
                               className=" !text-base cursor-pointer text-green-800"
                            />
                          </a>
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex font-medium flex-col  w-32 max-sm:flex-row  max-sm:justify-between max-xl:w-[4rem] max-lg:w-[4rem] max-lg:max-w-[10ch] truncate ">
           
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.sector}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  w-32 max-sm:flex-row  max-sm:justify-between max-xl:w-[4rem] max-lg:w-[4rem]">
           
           <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
             {item.source}
           </div>
         </div>
                </div>
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col w-[7.5rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[3rem] max-lg:w-[2rem] ">
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      <div>
                      {item.assignedTo === null ? (
                "No Data"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                          <MultiAvatar
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
                  <div className=" flex font-medium flex-col w-16  max-sm:flex-row  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[1.75rem]">
                    <div>
                    <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end">
                <Tooltip title={item.ownerName}>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.9rem"}
                imgHeight={"1.9rem"}
              />
            </Tooltip>
            </div>
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
                    <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
    {item.companyName ? (
      <Tooltip title="Qualify? Lead will move to Prospect section!">
        <ConnectWithoutContactIcon
          onClick={() => {
            handleRowData(item);
            props.handleLeadsConfirmationModal(true);
          }}
          className="!text-base cursor-pointer text-[blue]"
        />
      </Tooltip>
    ) : (
      <Tooltip title="Company name is required to enable qualification action">
        <ConnectWithoutContactIcon
          className="!text-base cursor-not-allowed text-gray-400"
        />
      </Tooltip>
    )}
  </div>
                  </div>
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                         className=" !text-base cursor-pointer text-green-800"
                          onClick={() => {
                            handleRowData(item);
                            handleLeadsNotesDrawerModal(true);
                         
                          }}
                         
                        />
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        title={
                          <FormattedMessage
                            id="app.activity"
                            defaultMessage="Activity"
                          />
                        }
                      >
                        <AddchartIcon
                         className="!text-base cursor-pointer text-blue-500"
                          onClick={() => {
                                handleRowData(item);
                            props.handleCETmodal(true);
                        
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    {user.leadsUpdateInd === true && user.crmInd === true && (
                      <div>
                        <Tooltip title="Edit">
                          <BorderColorIcon
                           className="!text-base cursor-pointer text-[tomato]"
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
                      <div>
                       
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => deleteLeadsData(item.leadsId)}>
                     <Tooltip title="Delete">
                          <DeleteOutlined
                            type="delete"
                            className=" !text-base cursor-pointer text-[red]"
                          />
                       </Tooltip>
                        </StyledPopconfirm>
                      </div>
                    )}
                    <div></div>
                  </div>
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <div class="cursor-pointer"
                         
                        >
                          <LocationOnIcon
                             className="!text-base cursor-pointer text-[#960a0a]"
                          />
                        </div>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title={item.email}>
                        <MailOutlineIcon
                          type="mail"
                          className="!text-base cursor-pointer text-green-400"
                          onClick={() => {
                            handleSetCurrentLeadsId(item);
                            props.handleLeadsEmailDrawerModal(true);
                          }}
                        />
                      </Tooltip>{" "}
                    </div>
                  </div>
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        // overlayStyle={{ maxWidth: "300px" }}
                        title={item.CreationType}
                      >
                          <div className="cursor-pointer">
    {item.CreationType === "Website" ? (
      <LanguageIcon className="!text-base cursor-pointer text-[#960a0a]" />
    ) : item.CreationType === "InApp" ? (
      <LanguageIcon className="!text-base cursor-pointer text-blue-500" />
    ) : (
      // Default 
      <LanguageIcon className="!text-base cursor-pointer" />
    )}
  </div>
                      
                      </Tooltip>
                    </div>

                  </div>
               
                </div>
              </div>
            </div>
          );
        })}
         </InfiniteScroll>
      </div>
      </div>
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
        // item={currentLeadsId}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        openCETmodal={props.openCETmodal}
        handleCETmodal={props.handleCETmodal}
      />
      <AddLeadsNotesDrawerModal
        rowdata={rowdata}
        addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
        handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
      />
          <AddConfirmLedsStatusModal
           rowdata={rowdata}
           handleRowData={handleRowData}
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingLeads: leads.fetchingLeads,
  openCETmodal: leads.openCETmodal,
  addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeads,
      emptyLeads,
      handleLeadsConfirmationModal,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      // getCountries,
      updateTypeForLead,
      handleCETmodal,
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
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem]`}  ></i>
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
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
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
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType} text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem]`} ></i>
      </Button>
    </Tooltip>
  );
}