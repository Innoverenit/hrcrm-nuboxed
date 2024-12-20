import React, { useEffect, useState } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import FWLogo1 from "../../../../../src/Assets/Images/smallLogo.png";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    getTeamLeadsHot,
  deleteLeadsData,
  setEditLeads,
  convertCustomerStatus,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  handleLeadsConfirmationModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Tooltip,Popconfirm,Checkbox } from "antd";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import OpenCETmodal from "./OpenCETmodal";
import AddLeadsNotesDrawerModal from "../AddLeadsNotesDrawerModal";
import AddConfirmLedsStatusModal from "./AddConfirmLedsStatusModal";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import EmptyPage from "../../../Main/EmptyPage";

const ButtonGroup = Button.Group;

const LeadsTeamHotcard = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    setPage(page + 1);
    props.getTeamLeadsHot(props.userId, page,"hot");
    
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
'1581',//20
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
    const callPageMapd = props.teamLeadsHot && props.teamLeadsHot.length &&props.teamLeadsHot[0].pageCount
    setTimeout(() => {
      const {
        getTeamLeadsHot,
        // userDetails: { employeeId },
      } = props;
      if  (props.teamLeadsHot)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getTeamLeadsHot(
      props.currentUser ? props.currentUser : props.userId,
      page, "hot"
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
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    fetchingTeamLeadsHot,
    teamLeadsHot,
    user,
  } = props;

   return (
    <div>
     
    <>
        <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex  w-[92%]  max-sm:hidden p-1 bg-transparent font-bold font-poppins !text-lm sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
        <div className="flex w-[6.1rem] truncate max-xl:w-[12.1rem] max-lg:w-[7.1rem]  text-white bg-red-600 truncate items-center justify-center "> {translatedMenuItems[0]}</div>
        <div className=" w-[2.12rem] max-xl:w-[11.1rem] max-lg:w-[13.1rem]"></div>
        <div className="  w-[21.1rem] text-[#00A2E8]  text-sm max-xl:w-[12.1rem] max-lg:w-[7.1rem]  truncate ">    <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}</div>
       
        <div className=" w-[9.2rem] max-xl:w-[7.2rem] max-lg:w-[5.2rem] truncate ">  <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[2]} #</div>
        {/* 333333 */}
        <div className=" w-[10.2rem] max-xl:w-[8.5rem] max-lg:w-[5.5rem]  truncate "> <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>{translatedMenuItems[4]}</div>
        <div className=" w-[9.8rem] max-xl:w-[7.81rem] max-lg:w-[3.81rem] truncate">  <FactoryIcon className="!text-icon  text-[#84a59d]"/> {translatedMenuItems[5]}</div> 
        <div className= " w-[9.4rem] max-xl:w-[4.8rem] max-lg:w-[4.8rem] truncate"> <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}</div> 
        <div className= " w-[7.3rem] max-xl:w-[7.82rem] max-lg:w-[8.8rem] truncate">{translatedMenuItems[7]}</div> 
        {props.user.aiInd && (
            <div className=" w-[4.81rem] max-xl:w-[3.81rem] truncate">
            <ScoreIcon className="!text-icon  text-[#f28482]"/>  {/* Score */}   {translatedMenuItems[20]}      
            </div>
            )}
        <div className=" w-[4.23rem] max-xl:w-[6.2rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[8]} </div>
        <div className=" w-[3.9rem] max-xl:w-[2.2rem] max-lg:w-[4.2rem] truncate">{translatedMenuItems[9]}</div>
        <div className=" w-[3.7rem] max-xl:w-[4.5rem] max-lg:w-[3.5rem] truncate"><AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[10]}</div>
        <div className=" w-[5.3rem] max-xl:w-[3.3rem] max-lg:w-[6.3rem] truncate"><ConnectWithoutContactIcon className="!text-icon cursor-pointer text-[blue]"/>{translatedMenuItems[11]}</div>
      
        {/* <div className="w-12"></div> */}

      </div>
      <InfiniteScroll
        dataLength={teamLeadsHot.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamLeadsHot?
          <div className="custom-loader">
          <div className="loader !block"> </div>
      <div className="custom-loader" ><img src={FWLogo1}   className="w-12 -mt-[5.5rem]"  alt="Loading..."  /></div>
    </div>:null}
        height={"24vh"}
        style={{ scrollbarWidth: "thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >
       { !fetchingTeamLeadsHot && teamLeadsHot.length === 0 ?<EmptyPage/>:teamLeadsHot.map((item,index) =>  {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");
          const countryCode = item.countryAlpha2Code
          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
        
          return (
            <div>
              <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap   max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-colscale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
              >
              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
              <div class=" text-xs  font-poppins max-sm:text-sm">
                        {props.showCheckboxes && (
                        <Checkbox
                onChange={() => props.handleCheckboxChange(item.leadsId)}
              checked={props.selectedDeals.includes(item.leadsId)}
              />
                        )}
                        </div>
               <div class="flex flex-row  items-center w-[6.2rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[4.5rem] max-lg:w-[4.5rem]">                
                    <div>
                      <ButtonGroup>
                        <RoleButton
                          className="!text-icon"
                          type="Hot"
                          iconType="fas fa-mug-hot"
                          tooltip="Hot"
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
                          tooltip="Warm"
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
                          tooltip="Cold"
                          role={item.type}
                            onClick={() => {
                            const typ = "Cold";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className=" flex w-[14.4rem] h-8 ml-gap bg-[#eef2f9] max-xl:w-[9.5rem] max-lg:w-[5rem] max-sm:w-auto">
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
                     
                      <div class="max-sm:w-full md:flex items-center ml-1">
                        <Tooltip>
                          <div class="max-sm:w-full justify-between flex md:flex-col">
                            <div class="text-xs flex  font-semibold  font-poppins cursor-pointer max-lg:max-w-[10ch] truncate max-sm:text-sm">
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
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                <div className=" flex w-[2.5rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-8 ">
                    <div class=" text-xs  font-poppins max-sm:text-sm">
                     
                       <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                     
                    </div>
                  </div>
                  <div className=" flex  w-[6.8rem]  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[5.6rem] max-lg:w-[4.6rem] ">
         
                    <div class=" text-xs  font-poppins max-sm:text-sm">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "None"}
                 
                    </div>
                  </div>
                 
                  <div className=" flex  w-[6rem] items-center  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[8rem] max-lg:w-[3.03rem] ">
                    <div class=" text-xs    font-poppins max-lg:max-w-[10ch] truncate max-sm:text-sm">
                      {item.companyName || "None"}
                    </div>
                  </div>
                </div>
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                 
                  <div class=" flex items-center  h-8 ml-gap bg-[#eef2f9] cursor-pointer w-8 justify-center">
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

                  <div className=" flex w-[7.35rem] justify-start items-center  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.01rem] max-lg:w-[3rem] max-lg:max-w-[10ch] truncate ">
           
                    <div class=" text-xs  font-poppins max-sm:text-sm">
                      {item.sector}
                    </div>
                  </div>
                  <div className=" flex  w-[7.5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3rem] max-lg:w-[3.01rem]">
           
           <div class=" text-xs  font-poppins max-sm:text-sm">
             {item.source}
           </div>
         </div>
         <div className=" flex w-[5.5rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[3.02rem] max-lg:w-[3.02rem]">
           
           <div class=" text-xs  font-poppins max-sm:text-sm">
             {item.lob}
           </div>
         </div>
               
                <div class="flex max-sm:justify-evenly max-sm:w-wk items-center">
                {props.user.aiInd && (
           <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[3.5rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
        {item.noteScoreInd}
          
            </div>
            )}
             </div>
             </div>
             <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                  <div className=" flex w-[3.02rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:w-auto max-sm:justify-between max-xl:w-[2.5rem] max-lg:w-[2rem] ">
                    <div class=" text-xs  font-poppins max-sm:text-sm">
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
                     <div className=" flex w-[3.03rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                      {item.assignedBy && (
                    <div>
                <div class="max-sm:flex justify-end">
              <MultiAvatar
                primaryTitle={item.assignedBy}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </div>
                    </div>
                    )}
                  </div>
                  <div className=" flex  w-[3.11rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2.75rem] max-lg:w-[2.75rem]">
                    <div>
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
       
                  <div className=" flex w-[4.7rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-sm:w-auto  max-sm:justify-between max-xl:w-[2rem] max-lg:w-[2rem] ">
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
                 
                  <div class="flex max-sm:justify-evenly max-sm:w-wk  items-center justify-center h-8 ml-gap bg-[#eef2f9]"> 
                 
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
                    <Tooltip title="Address">
                    <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleLeadsAddressDrawerModal(true);
            handleRowData(item);
          }}
          
        /> 
        </Tooltip>
                    <div >
                      <Tooltip
                        title={translatedMenuItems[16]}
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
                      <Tooltip title={translatedMenuItems[17]}>
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
                      title={translatedMenuItems[19]}
                      onConfirm={() => deleteLeadsData(item.leadsId,props.userId)}>
                 <Tooltip title="Delete">
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

      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      <OpenCETmodal
        rowdata={rowdata}
        openCETmodal={props.openCETmodal}
        handleCETmodal={props.handleCETmodal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      <AddLeadsNotesDrawerModal
        rowdata={rowdata}
        addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
        handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems} 
      />
          <AddConfirmLedsStatusModal
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
           />
    </div>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
    teamLeads: leads.teamLeads,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  countries: auth.countries,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingTeamLeads: leads.fetchingTeamLeads,
  openCETmodal: leads.openCETmodal,
  serachedData:leads.serachedData,
  fetchingTeamLeads: leads.fetchingTeamLeads,
  addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
  teamLeadsHot:leads.teamLeadsHot,
  teamLeadsWarm:leads.teamLeadsWarm,
  teamLeadsCold:leads.teamLeadsCold,
  fetchingTeamLeadsHot:leads.fetchingTeamLeadsHot,
  fetchingTeamLeadsWarm:leads.fetchingTeamLeadsWarm,
  fetchingTeamLeadsCold:leads.fetchingTeamLeadsCold,
  fetchingLeadsInputSearchData: leads.fetchingLeadsInputSearchData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadsConfirmationModal,
      deleteLeadsData,
      setEditLeads,
      convertCustomerStatus,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      updateTypeForLead,
      handleCETmodal,
      getTeamLeadsHot
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTeamHotcard);
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
        <i className={`${iconType} !text-icon`}  ></i>
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
        <i className={`${iconType} !text-icon`} ></i>
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
        <i className={`${iconType} !text-icon`} ></i>
      </Button>
    </Tooltip>
  );
}
