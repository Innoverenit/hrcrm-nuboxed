import React, { useEffect, useState } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DeleteOutlined } from "@ant-design/icons";
// import { getCountries } from "../../../Auth/AuthAction";
import {
    getTeamLeads,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  handleLeadsConfirmationModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactCountryFlag from "react-country-flag";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import OpenCETmodal from "./OpenCETmodal";
import AddLeadsNotesDrawerModal from "../AddLeadsNotesDrawerModal";
import AddConfirmLedsStatusModal from "./AddConfirmLedsStatusModal";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ButtonGroup = Button.Group;

const LeadsTeamCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    props.getTeamLeads(props.userId, page,);
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
    props.getTeamLeads(
      props.currentUser ? props.currentUser : props.userId,
      page,
    );
};
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    updateLeadsModal,
    fetchingLeads,
    teamLeads,
    user,
  } = props;

 

   return (
    <>
     <div className=' flex justify-end sticky top-28 z-auto'>
     <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex  w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
      <div className=" md:w-[12.12rem]">Name</div>
        <div className=" md:w-[9.1rem]"></div>
        <div className=" md:w-[6.5rem] ">Phone #</div>
        <div className="md:w-[9.8rem]">Country</div>
        <div className="md:w-[10.5rem]">Company</div>
        <div className="md:w-[7.8rem]">Sector</div> 
        <div className="md:w-[7.81rem]">Assigned to</div>
        <div className="md:w-[5.5rem]">Owner</div>
        <div className="md:w-[3.3rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={teamLeads.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingLeads?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
       { !fetchingLeads && teamLeads.length === 0 ?<NodataFoundPage />:teamLeads.map((item,index) =>  {
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
                className="flex rounded-xl  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
              >
                <div class="flex ">
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

                      <div class="max-sm:w-full md:flex items-center">
                        <Tooltip>
                          <div class="max-sm:w-full justify-between flex md:flex-col">
                            {/* <div class=" text-sm text-cardBody  font-poppins max-sm:hidden">
                              Name
                            </div> */}
                            <div class="text-sm text-cardBody font-semibold flex  font-poppins cursor-pointer">
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs text-[tomato] mt-[0.4rem] font-bold"
                                  
                                >
                                  New
                                </span>
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
                        <RoleButton
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
                  <div className=" flex font-medium flex-col  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Phone #{" "}
                    </div> */}
                    <div class=" text-xs text-cardBody font-poppins">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "No Data"}
                      {/* {`${item.countryDialCode} ${item.phoneNumber}`} */}
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Country
                    </div> */}
                    <div class=" text-xs text-cardBody font-poppins">
                    <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Company{" "}
                    </div> */}
                    <div class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.companyName || "No Data"}
                    </div>
                  </div>
                  <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <span class="cursor-pointer"
                          //type="edit"
                      
                          onClick={() => {}}
                        >
                          {" "}
                          <a href={`https://www.${item.url}`} target="_blank">
                            <OpenInBrowserIcon
                              className=" !text-xl cursor-pointer text-[green]"
                            />
                          </a>
                        </span>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Sector{" "}
                    </div> */}
                    <div class=" text-xs text-cardBody font-poppins">
                      {item.sector}
                    </div>
                  </div>
                </div>
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-[7.6rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Assigned to
                    </div> */}

                    <div class=" text-xs text-cardBody font-poppins">
                      <span>
                        {item.assignedTo === null ? (
                          "None"
                        ) : (
                          <MultiAvatar
                            primaryTitle={item.assignedTo}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Owner
                    </div> */}

                    <span>
                      <MultiAvatar
                        primaryTitle={item.ownerName}
                        imageId={item.ownerImageId}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </span>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                  <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
                      <StatusCustomerToggle
                        type={props.convertInd ? "primary" : "danger"}
                        leadsId={item.leadsId}
                        convertInd={item.convertInd}
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                          onClick={() => {
                            handleLeadsNotesDrawerModal(true);
                            handleRowData(item);
                          }}
                          className=" !text-xl cursor-pointer text-[green]"
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
                          className=" !text-xl cursor-pointer "
                          onClick={() => {
                            props.handleCETmodal(true);
                            handleRowData(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                    {user.leadsUpdateInd === true && user.crmInd === true && (
                      <div>
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            className=" !text-xl cursor-pointer text-[gray]"
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
                          {/* {user.opportunityDeleteInd ===true && ( */}
                          <DeleteOutlined
                            type="delete"
                            className=" !text-xl cursor-pointer text-[red]"
                          />
                          </Tooltip>
                          {/* )} */}
                        </StyledPopconfirm>
                      </div>
                    )}
                    <div></div>
                  </div>
                  <div class="flex flex-col w-[4%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <span  className="  cursor-pointer "
                          
                        >
                          <LocationOnIcon
                            className=" !text-xl cursor-pointer"
                          />
                        </span>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title={item.email}>
                        <MailOutlineIcon
                          type="mail"
                          className=" !text-xl cursor-pointer "
                          onClick={() => {
                            handleSetCurrentLeadsId(item);
                            props.handleLeadsEmailDrawerModal(true);
                          }}
                        />
                      </Tooltip>{" "}
                    </div>
                  </div>
                  <div class="w-[2%]"></div>
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
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
    teamLeads: leads.teamLeads,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  countries: auth.countries,
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
        getTeamLeads,
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTeamCardList);
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
        <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i>
      </Button>
    </Tooltip>
  );
}
