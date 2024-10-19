import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip, Select } from "antd";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AddchartIcon from "@mui/icons-material/Addchart";
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import {
    getTeamContact,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
  handleContactNotesDrawerModal,
  emptyContact,
  handleContactPulseDrawerModal,
  handleHospitalUploadModal,
  handleContactAddressDrawerModal
} from "../../ContactAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddContactNotesDrawerModal from "../AddContactNotesDrawerModal";
import AddContactPulseDrawerModal from "./AddContactPulseDrawerModal";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import DocumentUpload from "./DocumentUpload";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddContactAddressDrawerModal from "./AddContactAddressDrawerModal";
import relativeTime from 'dayjs/plugin/relativeTime';

const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);
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
function ContactTeamCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
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
    props.getTeamContact(props.userId, pageNo);
    setPageNo(pageNo + 1);
  }, []);

  useEffect(()=>{
    return()=>props.emptyContact();
  },[] );
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [currentContactId, setCurrentContactId] = useState("");
  const [currentContact, setCurrentContact] = useState("");

  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }
  function handleSetCurrentContact(item) {
    setCurrentContact(item);
    console.log(item);
  }

  // const handleLoadMore = () => {
  //   setPageNo(pageNo + 1);
  //           props.getTeamContact(props.currentUser?props.currentUser:props.userId,pageNo,         
  //             );
  // }
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '110', // 0 
'277', // 1
'325', // 2
'326', // 3
'213', // 4
'328', // 5
'329', // 6
'77', // 7
"1581", // Score
"100", // New
"1592", // "Provided"
"1593", // Not Provided
"185", // Address"
"316", // Notes
"1165",   // Activity"
"170",  // "Edit
"1325"// Upload Document"
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
  const handleLoadMore = () => {
    const callPageMapd = props.teamContact && props.teamContact.length &&props.teamContact[0].pageCount
    setTimeout(() => {  
      if  (props.teamContact)
      {
        if (pageNo < callPageMapd) {    
          setPageNo(pageNo + 1);
            props.getTeamContact(props.currentUser?props.currentUser:props.userId,pageNo,
              );
            }
              if (pageNo === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  }
  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
    // console.log("Current2", item);
  }
  const {
    //contact: { contactId, firstName, middleName, lastName },
    contactId,
    user,
    fetchingContacts,
    newFiltersdata,
    teamContact,
    filterData,
    addDrawerContactPulseModal,
    addDrawerContactNotesModal,
    handleUpdateContactModal,
    handleContactNotesDrawerModal,
    handleContactPulseDrawerModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
    fetchingTeamContact,
    hospitalUploadModal,
    handleHospitalUploadModal
  } = props;

//  if(fetchingContacts){
//   return <BundleLoader/>
//  }

if (loading) {
  return <div><BundleLoader/></div>;
}
  return (
    <>
       
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" max-sm:hidden flex justify-between w-[100%]  max-lg:w-[89%] max-xl:w-[96%] p-1 bg-transparent  sticky  z-10">
        <div class=" flex justify-between w-[89%] font-bold  font-poppins text-xs  ">
        <div className=" w-[41.9rem] text-[#00A2E8] text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.5rem] max-lg:w-[20.5rem]">
        {translatedMenuItems[0]}</div>
        <div className=" w-[33.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[8.1rem]">
        {translatedMenuItems[1]}</div>
        <div className=" md:w-[22.1rem] w-[24.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.11rem]">
        {translatedMenuItems[2]}</div>
        <div className="  md:w-[18.1rem] w-[17.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.1rem] max-lg:w-[7.1rem]">
        {translatedMenuItems[3]}</div>
        <div className=" md:w-[17.2rem] w-[15.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem] max-lg:w-[10.2rem]">
        {translatedMenuItems[4]}</div>
        <div className=" md:w-[14.3rem]  w-[13.3rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.3rem] max-lg:w-[8.3rem]">
        {translatedMenuItems[5]}</div>
        <div className=" w-[22.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.1rem] max-lg:w-[8.1rem]">
        {translatedMenuItems[6]}</div>
        {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
         {translatedMenuItems[8]}   {/* Score */}
          
            </div>
            )}
               <div className="w-[5rem]"></div>
        <div className=" w-[14.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.12rem] max-lg:w-[3.12rem]">
        {translatedMenuItems[7]}</div>
      
        <div className="w-[4.2rem]"></div>
        </div>
      </div>
          <InfiniteScroll
        dataLength={teamContact.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamContact?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
      >
        
        { !fetchingTeamContact && teamContact.length === 0 ?<NodataFoundPage />:teamContact.map((item,index) =>  {
        
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${item.address &&
            item.address.length &&
            item.address[0].address1} 
           Street : ${item.address &&
            item.address.length &&
            item.address[0].street}   
          State : ${item.address && item.address.length && item.address[0].state}
          City : ${item.address && item.address.length && item.address[0].city}
         Country : ${(item.address &&
              item.address.length &&
              item.address[0].country) ||
            ""} 
           PostalCode : ${item.address &&
            item.address.length &&
            item.address[0].postalCode} `;
                    return (
                      <div>
                      <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                               
                          <div className=" flex font-medium  w-[14rem] max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9]  max-sm:justify-between max-sm:w-wk  ">
<div className="flex max-sm:w-full md:items-center max-lg:w-[7.2rem] max-xl:w-[9rem]"> 
<div>
                         
      <MultiAvatar2
        primaryTitle={item.firstName}
        imageId={item.imageId}
        imageURL={item.imageURL}
        imgWidth={"1.8rem"}
        imgHeight={"1.8rem"}
      />
    </div>
    &nbsp;
    <div class="max-sm:w-full">
                                  <Tooltip>
                                    <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                    
                                      <div class="text-xs flex text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                      <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>                                               
  
  {date === currentdate ? (
 <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                            
 >
    {translatedMenuItems[9]}  {/* New */}
    </div>
  ) : null}
 
                                      </div>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk">

                          <div className=" flex  max-sm:w-auto  w-[14.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-xl:w-[5.5rem] max-lg:w-[4.8rem]  max-sm:justify-between ">
                             
                              <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-auto w-[10.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.6rem] max-lg:w-[3.01rem] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                   {item.designation}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-auto w-[8.3rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.3rem] max-lg:w-[4.2rem]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                 {item.department}
                            </div>
                        </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk">
                        <div className="flex  w-[6.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">

<div className="text-xs  font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{item.oppNo}
</div>
</div>
<div className=" flex  w-[5.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                              

                              <div class=" text-xs  max-sm:text-sm font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.totalProposalValue}

                              </div>
                          </div>
                          <div className="flex  w-[5.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-xl:w-[3.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                          
                              <div class="text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                              {item.thirdPartyAccessInd === true
?<Tooltip title={translatedMenuItems[10]}><AlarmOnIcon   className=" !text-icon text-[green]"/></Tooltip> 
:  <Tooltip title={translatedMenuItems[11]}> <DoNotDisturbOnTotalSilenceIcon  className=" !text-icon text-[red]"/></Tooltip>}

                              </div>
                          </div>
                          </div>
                          <div class="flex items-center max-sm:justify-between max-sm:w-wk">
                          {props.user.aiInd && (
           <div className=" flex  justify-center  text-xs w-[7.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}
                      

                          <div className="flex w-[3.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-wk  max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3.01rem]  max-sm:justify-between">
        <Tooltip title={item.ownerName}>
          <div class="max-sm:flex justify-end">
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

             </div>
             <div className=" flex items-center w-[5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] mr-1 max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
          
               </div>

               <div class="flex max-sm:justify-between max-sm:w-wk items-center">  
          
               <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
              <Tooltip title={translatedMenuItems[13]}>
 <NoteAltIcon
          className=" !text-icon cursor-pointer text-green-800"
          onClick={() => {
            handleContactNotesDrawerModal(true);
            handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>
     </div>
     <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
              <Tooltip title={translatedMenuItems[12]}>
 <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleContactAddressDrawerModal(true);
            handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>
     </div>
  
     <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                <Tooltip
                  title={translatedMenuItems[14]}
                >
                  <HourglassFullIcon
                  className="!text-icon cursor-pointer text-blue-500"
                    onClick={() => {
                      props.handleContactCETdrawer(true);
                      handleSetCurrentContact(item);
                    }}
                  />
                </Tooltip>
              </div>
     
                        
              <div class="rounded-full  cursor-pointer items-center justify-center  bg-[#eef2f9] h-8  flex">
              <Tooltip title={item.mobileNo} >
      {item.doNotCallInd !== true && (
        <span class="  text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
         <PhoneInTalkIcon     className=" !text-icon cursor-pointer text-[blue]"/>
        </span>
      )}
      {item.doNotCallInd === true && (
        <span class=" text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
          <PhoneDisabledIcon   className=" !text-icon"/>
        </span>
      )}
    </Tooltip>
                  </div>
             <div class=" items-center justify-center  bg-[#eef2f9] h-8  flex">
                  <Tooltip title={item.emailId}>
     
      <MailOutlineIcon
        type="mail"
        className=" !text-icon cursor-pointer text-[red]"
        onClick={() => {
          props.getContactById(item.contactId);
          props.handleContactEmailDrawerModal(true);
        }}
      />
     </Tooltip>
     </div>
                  <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleSetCurrentContactId(item);
          props.handleContactPulseDrawerModal(true);
        }}
      >{user.pulseAccessInd === true && (
        <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697]"/>
      )}
      </span>
                                                   

      <div class=" items-center justify-center  bg-[#eef2f9] h-8  flex">
        <PlusOutlined
                        type="plus"
                        // tooltipTitle="Upload Document"
                        tooltiptitle={translatedMenuItems[16]}
                        onClick={() => {
                          handleSetCurrentContactId(item);
                          handleHospitalUploadModal(true)}}
                        size="14px"
                        style={{ marginLeft: "0.25em", verticalAlign: "center" }}
                      /></div>
        {user.contactUpdateInd === true &&  user.crmInd === true && (
      <div class=" items-center justify-center  bg-[#eef2f9] h-8  flex">
     
      <Tooltip title={translatedMenuItems[15]}>
        <BorderColorIcon
          className=" !text-icon cursor-pointer text-[tomato]"
          onClick={() => {
            props.setEditContact(item);
            handleUpdateContactModal(true);
            handleSetCurrentContactId(item);
            
          }}
        />
      </Tooltip>

      </div>
        )}             
                </div>
                      </div>
                  </div>


                    )
                })}
                      </InfiniteScroll>
      </div>


      <UpdateContactModal
        contactData={currentContactId}
        // fullName={currentContactId}
        updateContactModal={updateContactModal}
        handleUpdateContactModal={handleUpdateContactModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
       <AddContactNotesDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactNotesModal={addDrawerContactNotesModal}
        handleContactNotesDrawerModal={handleContactNotesDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
      />
       <DocumentUpload
            hospitalUploadModal={hospitalUploadModal}
            handleHospitalUploadModal={handleHospitalUploadModal}
            currentContactId={currentContactId }
          />
         <AddContactPulseDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactPulseModal={addDrawerContactPulseModal}
        handleContactPulseDrawerModal={handleContactPulseDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
      />
      <AddContactEmailDrawerModal
        // item={currentContactId}
        contactData={currentContactId}
        addDrawerContactEmailModal={props.addDrawerContactEmailModal}
        handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
      />
      <ReactContactSpeechModal
        // item={currentContactId}
        contactData={currentContactId}
        handleContactReactSpeechModal={handleContactReactSpeechModal}
        addContactSpeechModal={addContactSpeechModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
      />
      {/* <AddDonotCallModal
        addDonotCallModal={props.addDonotCallModal}
        contactId={currentContactId}
        handleDonotCallModal={props.handleDonotCallModal}
      /> */}
      <AddContactDrawerModal
        item={currentContactId}
        addDrawerContactModal={props.addDrawerContactModal}
        handleContactDrawerModal={props.handleContactDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
      />
      <AddContactAddressDrawerModal
        item={currentContact}
        type="Contact"
        addDrawerContactAddressModal={props.addDrawerContactAddressModal}
        handleContactAddressDrawerModal={props.handleContactAddressDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  account,
  designations,
  departments,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  teamContact: contact.teamContact,
  user: auth.userDetails,
  addDrawerContactPulseModal:contact.addDrawerContactPulseModal,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
  addDrawerContactNotesModal:contact.addDrawerContactNotesModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  fetchingTeamContact:contact.fetchingTeamContact,
  hospitalUploadModal: contact.hospitalUploadModal,
  addDrawerContactAddressModal:contact.addDrawerContactAddressModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamContact,
      handleUpdateContactModal,
      handleDonotCallModal,
      setEditContact,
      getDesignations,
      updateOwnercontactById,
      handleContactReactSpeechModal,
      handleContactDrawerModal,
      getContactById,
      handleContactNotesDrawerModal,
      handleContactPulseDrawerModal,
      handleContactEmailDrawerModal,
      emptyContact,
      handleHospitalUploadModal,
      handleContactAddressDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTeamCardList);
