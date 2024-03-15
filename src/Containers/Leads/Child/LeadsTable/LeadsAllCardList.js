import React, { useEffect, useState,lazy,Suspense } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
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

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllLeads(page,props.filter?props.filter:"creationdate");
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
  } = props;

  if (isMobile){
    return (
      <>
       <div className=' flex  sticky top-28 z-auto'>
       <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <InfiniteScroll
          dataLength={allleadsInfo.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingAllLeads?<div class="items-center">Loading...</div>:null}
          height={"75vh"}
        >
          {allleadsInfo.map((item) => {
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                >
                 <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
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
                             
                              <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                                {item.name}
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <div class="text-xs text-[tomato] font-bold"
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
  
                    <div class="flex flex-row items-center md:w-[11%] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <ButtonGroup>
                          <RoleButton
                            type="Warm"
                            iconType="	fas fa-burn"
                       
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
                          <RoleButton
                            type="Hot"
                            iconType="fas fa-mug-hot"
                           
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
                          <RoleButton
                            type="Cold"
                            iconType="far fa-snowflake"
                      
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
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium  ">
             
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.countryDialCode && item.phoneNumber
                          ? `${item.countryDialCode} ${item.phoneNumber}`
                          : "Not Available"}
                       
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
                    <div className=" flex font-medium  ">
                    
                      <div class=" text-xs text-cardBody font-semibold  font-poppins">
                        {item.companyName || "Not Available"}
                      </div>
                    </div>
                    <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.url !== null ? (
                        <Tooltip title={item.url}>
                          <div
                         
                            style={{ cursor: "pointer" }}
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
  
                    <div className=" flex font-medium  ">
                     
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.sector}
                      </div>
                    </div>
                    <div className=" flex font-medium  ">
                     
                     <div class=" text-xs text-cardBody font-poppins">
                       {item.source}
                     </div>
                   </div>
                  </div>
                  <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium  ">
                    
  
                      <div class=" text-xs text-cardBody font-poppins">
                        <div>
                          {item.assignedTo === null ? (
                            "None"
                          ) : (
                            <MultiAvatar
                              primaryTitle={item.assignedTo}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" flex font-medium ">
                     
                    <Tooltip title={item.ownerName}>
                      <div>
                        <MultiAvatar
                          primaryTitle={item.ownerName}
                          imageId={item.ownerImageId}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />
                      </div>
                      </Tooltip>
                    </div>
                    <div className=" flex font-medium ">
                     
  
                      <div class=" text-xs text-cardBody font-poppins"></div>
                      <div>
                        <StatusCustomerToggle
                          type={props.convertInd ? "primary" : "danger"}
                          leadsId={item.leadsId}
                          convertInd={item.convertInd}
                        />
                      </div>
                    </div>
                    
                      <div>
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            onClick={() => {
                              handleLeadsNotesDrawerModal(true);
                              handleRowData(item);
                            }}
                            className=" !text-base cursor-pointer text-green-800"
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
                              props.handleCETmodal(true);
                              handleRowData(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                   
  
                    
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
                            onConfirm={() => deleteLeadsData(item.leadsId)}
                          >
                          
                            <DeleteOutlined
                              type="delete"
                              className=" !text-base cursor-pointer text-[red]"
                            />
                       
                          </StyledPopconfirm>
                        </div>
                      )}
                      <div></div>
                  
                   
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
      </>
    );
  }

  return (
    <>
     <div className=' flex justify-center sticky top-28 z-auto'>
     <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[92%] p-2 bg-transparent font-bold sticky top-0 z-10">
      <div className=" md:w-[12.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" md:w-[9.1rem] max-xl:w-[11.1rem] max-lg:w-[11.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"></div>
        <div className=" md:w-[7.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Phone #</div>
        <div className="md:w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Country</div>
        <div className="md:w-[10.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Company</div>
        <div className="md:w-[8.8rem] max-xl:w-[4.81rem] max-lg:w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sector</div> 
        <div className="md:w-[8.8rem] max-xl:w-[4.81rem] max-lg:w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Source</div> 
        <div className="md:w-[6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned to</div>
        <div className="md:w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        {/* <div className="md:w-[3.3rem]">Qualify</div> */}
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfo.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllLeads?<div  class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
             { !fetchingAllLeads && allleadsInfo.length === 0 ?<NodataFoundPage />:allleadsInfo.map((item,index) =>  {
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
                className="flex rounded-xl  bg-white mt-2 h-[2.75rem] items-center p-3"
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
                           
                            <div class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-xs text-[tomato] font-bold"
                                  
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

                  <div class="flex flex-row items-center w-[6.5rem] max-sm:flex-row max-xl:w-[4.5rem] max-lg:w-[4.5rem] max-sm:justify-between">
                    <div>
                      
                    </div>
                    <ButtonGroup>
                        <RoleButton
                          type="Hot"
                          iconType="fas fa-mug-hot"
                         
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
                    <div>
                 
                      <ButtonGroup>
                        <RoleButton
                          type="Warm"
                          iconType="	fas fa-burn"
                     
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
                        <RoleButton
                          type="Cold"
                          iconType="far fa-snowflake"
                    
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
                  <div className=" flex font-medium flex-col  w-[9rem] max-sm:flex-row max-xl:w-[5.6rem] max-lg:w-[4.6rem] max-sm:justify-between ">
           
                    <div class=" text-xs text-cardBody font-poppins">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "Not Available"}
                     
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col w-[5rem] max-sm:flex-row  max-sm:justify-between max-xl:w-8 max-lg:w-8 ">
                   
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                    <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  w-[10rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[7rem] max-lg:w-[4rem] ">
                  
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.companyName || "Not Available"}
                    </div>
                  </div>
                  <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <div
                       
                       class="cursor-pointer"
                          onClick={() => {}}
                        >
                          {" "}
                          <a href={`https://www.${item.url}`} target="_blank">
                            <OpenInBrowserIcon
                               className=" !text-base cursor-pointer text-[green]"
                            />
                          </a>
                        </div>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex font-medium flex-col  w-[6.1rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[4rem] max-lg:w-[4rem] max-lg:max-w-[10ch] truncate">
                   
                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      {item.sector}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col  w-[10.1rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[4rem] max-lg:w-[4rem]">
                   
                   <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                     {item.source}
                   </div>
                 </div>
                </div>
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col w-[4.75rem] max-sm:flex-row  max-sm:justify-between max-xl:w-[3rem] max-lg:w-[2rem] ">
                  

                    <div class=" text-xs text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                      <div>
                        {item.assignedTo === null ? (
                          "None"
                        ) : (
                          <MultiAvatar
                            primaryTitle={item.assignedTo}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-16  max-sm:flex-row w-full max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[1.75rem]">
                   

                  <Tooltip title={item.ownerName}>
                      <MultiAvatar
                        primaryTitle={item.ownerName}
                        imageId={item.ownerImageId}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                      </Tooltip>
                  </div>
                  {/* <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                   

                    <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
                      <StatusCustomerToggle
                        type={props.convertInd ? "primary" : "danger"}
                        leadsId={item.leadsId}
                        convertInd={item.convertInd}
                      />
                    </div>
                  </div> */}
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                        className="!text-base cursor-pointer text-green-800"
                          onClick={() => {
                            handleLeadsNotesDrawerModal(true);
                            handleRowData(item);
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
                            props.handleCETmodal(true);
                            handleRowData(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  {/* <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
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
                          onConfirm={() => deleteLeadsData(item.leadsId)}
                        >
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
                  </div> */}
                  <div class="flex flex-col w-[4%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <div
                          
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
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
      <i className={`${iconType} text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem]`}  ></i>
      </Button>
    </Tooltip>
  );
}
