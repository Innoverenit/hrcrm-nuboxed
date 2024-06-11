import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip, Select } from "antd";
import { FormattedMessage } from "react-intl";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AddchartIcon from "@mui/icons-material/Addchart";
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
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
  handleContactPulseDrawerModal
} from "../../ContactAction";
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

const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactTeamCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
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
    fetchingTeamContact
  } = props;

//  if(fetchingContacts){
//   return <BundleLoader/>
//  }



  return (
    <>
      
     
      <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] max-sm:w-wk overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" max-sm:hidden flex justify-between w-[95%] max-lg:w-[89%] max-xl:w-[96%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[13.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.5rem] max-lg:w-[20.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[8.1rem]"><FormattedMessage
                  id="app.company"
                  defaultMessage="Company"
                /></div>
        <div className=" md:w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.11rem]"><FormattedMessage
                  id="app.designation"
                  defaultMessage="Designation"
                /></div>
        <div className="md:w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.1rem] max-lg:w-[7.1rem]"><FormattedMessage
                  id="app.department"
                  defaultMessage="Department"
                /></div>
        <div className="md:w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem] max-lg:w-[10.2rem]"><FormattedMessage
                  id="app.quotation"
                  defaultMessage="Quotation"
                /></div>
        <div className="md:w-[3.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.3rem] max-lg:w-[8.3rem]"><FormattedMessage
                  id="app.pipeline"
                  defaultMessage="Pipeline"
                /></div>
        <div className="w-[6.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.1rem] max-lg:w-[8.1rem]"><FormattedMessage
                  id="app.portalacess"
                  defaultMessage="Portal Acess"
                /></div>
        <div className="w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.12rem] max-lg:w-[3.12rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="Owner"
                /></div>
        <div className="w-[4.2rem]"></div>

      </div>
          <InfiniteScroll
        dataLength={teamContact.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamContact?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"75vh"}
      >
        
        { !fetchingTeamContact && teamContact.length === 0 ?<NodataFoundPage />:teamContact.map((item,index) =>  {
        
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
              >
                               
                          <div className=" flex font-medium  w-[14rem] max-sm:flex-row  max-sm:justify-between max-sm:w-wk  ">
<div className="flex max-sm:w-full md:items-center max-lg:w-[7.2rem] max-xl:w-[9rem]"> 
<div>
                         
      <MultiAvatar2
        primaryTitle={item.firstName}
        imageId={item.imageId}
        imageURL={item.imageURL}
        imgWidth={"1.8em"}
        imgHeight={"1.8em"}
      />
    </div>
    &nbsp;
    <div class="max-sm:w-full">
                                  <Tooltip>
                                    <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                    
                                      <div class="text-sm flex text-blue-500 text-cardBody font-poppins  font-semibold  cursor-pointer">
                                      <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>                                               
  
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
                          <div class="flex max-sm:justify-between max-sm:w-wk">

                          <div className=" flex font-medium  max-sm:w-auto  w-[14.01rem] max-sm:flex-row max-xl:w-[5.5rem] max-lg:w-[4.8rem]  max-sm:justify-between ">
                             
                              <div class=" text-sm text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex font-medium  max-sm:w-auto w-[10.2rem] max-xl:w-[5.6rem] max-lg:w-[3.01rem] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="text-sm text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                   {item.designation}
                              </div>
                          </div>
                          <div className=" flex font-medium  max-sm:w-auto w-[8.3rem] max-xl:w-[5.3rem] max-lg:w-[4.2rem]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-sm text-cardBody max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                 {item.department}
                            </div>
                        </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk">
                        <div className="flex font-medium  w-[6.01rem] max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">

<div className="text-sm text-cardBody font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
{item.oppNo}
</div>
</div>
<div className=" flex font-medium  w-[5.01rem] max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                              

                              <div class=" text-sm text-cardBody max-sm:text-sm font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              {item.totalProposalValue}

                              </div>
                          </div>
                          <div className="flex font-medium  w-[5.1rem]  max-xl:w-[3.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                          
                              <div class="text-sm text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                              {item.thirdPartyAccessInd === true
?<Tooltip title="Provided"><AlarmOnIcon   className=" !text-icon text-[green]"/></Tooltip> 
:  <Tooltip title="Not Provided"> <DoNotDisturbOnTotalSilenceIcon  className=" !text-icon text-[red]"/></Tooltip>}

                              </div>
                          </div>
                          </div>
                          <div class="flex items-center max-sm:justify-between max-sm:w-wk">
                          <div className="flex font-medium  w-[3.01rem] max-sm:w-wk  max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3.01rem]  max-sm:justify-between">
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
           
              <div>
              <Tooltip title="Notes">
 <NoteAltIcon
          className=" !text-icon cursor-pointer text-[#4bc076]"
          onClick={() => {
            handleContactNotesDrawerModal(true);
            handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>
     </div>
     {/* <div>
     <Tooltip title="Pulse">
 <MonitorHeartIcon
 className=" !text-xl cursor-pointer text-[#df9697]"
          onClick={() => {
            handleContactPulseDrawerModal(true);
            handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>

</div> */}
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
                  className="!text-icon cursor-pointer text-blue-500"
                    onClick={() => {
                      props.handleContactCETdrawer(true);
                      handleSetCurrentContact(item);
                    }}
                  />
                </Tooltip>
              </div>
     
                        
              <div class="rounded-full w-5 h-5 cursor-pointer ">
              <Tooltip title={item.mobileNo} >
      {item.doNotCallInd !== true && (
        <span class=" mr-2 text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
         <PhoneInTalkIcon     className=" !text-icon cursor-pointer text-[blue]"/>
        </span>
      )}
      {item.doNotCallInd === true && (
        <span class=" mr-2 text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
          <PhoneDisabledIcon/>
        </span>
      )}
    </Tooltip>
                  </div>
                  <div class=" max-sm:flex justify-end mt-1 max-sm:w-full">
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

                &nbsp;&nbsp;
                  <div>
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
                  </div>
                  
             
              
                <div>
              <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
      <span
        style={{
          cursor: "pointer",
        }}
      >
      <LocationOnIcon   
      className=" !text-icon cursor-pointer text-[#960A0A]"/>
      </span>
    </Tooltip>
    </div>
    {/* <div><Tooltip title={item.email}>
        <MailOutlineIcon
          type="mail"
          style={{ cursor: "pointer",fontSize: "1rem" }}
          onClick={() => {
            props.getCustomerById(item.customerId);
            props.handleCustomerEmailDrawerModal(true);
          }}
        />
      </Tooltip> </div> */}
        {user.contactUpdateInd === true &&  user.crmInd === true && (
      <div>
     
      <Tooltip title="Edit">
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
      />
       <AddContactNotesDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactNotesModal={addDrawerContactNotesModal}
        handleContactNotesDrawerModal={handleContactNotesDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
      />
         <AddContactPulseDrawerModal
        contactData={currentContact}
        // fullName={currentContactId}
        addDrawerContactPulseModal={addDrawerContactPulseModal}
        handleContactPulseDrawerModal={handleContactPulseDrawerModal}
        handleSetCurrentContact={handleSetCurrentContact}
      />
      <AddContactEmailDrawerModal
        // item={currentContactId}
        contactData={currentContactId}
        addDrawerContactEmailModal={props.addDrawerContactEmailModal}
        handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
      />
      <ReactContactSpeechModal
        // item={currentContactId}
        contactData={currentContactId}
        handleContactReactSpeechModal={handleContactReactSpeechModal}
        addContactSpeechModal={addContactSpeechModal}
        handleSetCurrentContactId={handleSetCurrentContactId}
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
  fetchingTeamContact:contact.fetchingTeamContact
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
      emptyContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactTeamCardList);
