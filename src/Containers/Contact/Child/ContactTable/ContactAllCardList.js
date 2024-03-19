import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Link } from 'react-router-dom';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import dayjs from "dayjs";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import {
  getAllContact,
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
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import AddContactNotesDrawerModal from "../AddContactNotesDrawerModal";
import AddContactPulseDrawerModal from "./AddContactPulseDrawerModal";
import {  Tooltip, Select } from "antd";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactAllCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
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
    props.getAllContact(page,"creationdate");
    setPage(page + 1);
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

  useEffect(()=>{
    return()=>props.emptyContact();
  },[] );
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

  const handleLoadMore = () => {
            setPage(page + 1);
            props.getAllContact(page,
              props.filter?props.filter:"creationdate"
              );
  }

  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
  }

 

  const {
    user,
    fetchingContacts,
    newFiltersdata,
    contactByUserId,
    filterData,
    addDrawerContactPulseModal,
    addDrawerContactNotesModal,
    handleUpdateContactModal,
    handleContactNotesDrawerModal,
    handleContactPulseDrawerModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
    fetchingAllContacts,
    allContacts
  } = props;

//  if(fetchingContacts){
//   return <BundleLoader/>
//  }
if (isMobile) {
return (
  <>
    
   
    <div class="rounded-lg  p-2 w-full overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      
        <InfiniteScroll
      dataLength={allContacts.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={fetchingAllContacts?<div class="flex justify-center">Loading...</div>:null}
      height={"75vh"}
    >
      
    {allContacts.map((item) => { 
      
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
              className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
            >
                                   
                              <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full"> 
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
                                          <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                              
       <Link
        toUrl={`contact/${item.contactId}`}
        title={`${item.fullName}`}
      >{item.fullName}</Link>&nbsp;&nbsp;
      {date === currentdate ? (
        <span class="text-xs "
          style={{
            color: "tomato",
            fontWeight: "bold",
          }}
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
                              <div class="flex">

                              <div className=" flex font-medium flex-col  md:w-48 max-sm:flex-row w-full max-sm:justify-between ">
                                  
                                  <div class=" text-sm text-cardBody font-poppins">   
                                  {item.tagWithCompany}
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                             
                                  <div class="text-sm text-cardBody font-poppins">
                                       {item.designation}
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col md:w-36  max-sm:flex-row w-full max-sm:justify-between">
                              
                                <div class="text-sm text-cardBody font-poppins">
                                     {item.department}
                                </div>
                            </div>
                            </div>
                            <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

<div className="text-sm text-cardBody font-poppins text-center">
  {item.oppNo}
</div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                    

                                  <div class=" text-sm text-cardBody font-poppins text-center">
                                  {item.totalProposalValue}

                                  </div>
                              </div>
                              <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
             

                                  <div class="text-sm text-cardBody font-poppins">

                                  {item.thirdPartyAccessInd 
  ? `${item.thirdPartyAccessInd}`
  : 'Not Provided'}

                                  </div>
                              </div>
                              <div class="flex md:items-center">
                              <div className="flex font-medium  md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                     


                 
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
                 <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                  <div>
                  <Tooltip title="Notes">
     <NoteAltIcon
              onClick={() => {
                handleContactNotesDrawerModal(true);
                handleSetCurrentContact(item);
              }}
              style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
            />
         </Tooltip>
         </div>
         <div>
         <Tooltip title="Pulse">
     <MonitorHeartIcon
              onClick={() => {
                handleContactPulseDrawerModal(true);
                handleSetCurrentContact(item);
              }}
              style={{ fontSize: "0.8rem", color: "#df9697" }}
            />
         </Tooltip>

</div>
          </div>
                              <div class="flex flex-col  max-sm:flex-row w-[40%] max-sm:justify-evenly items-center">
                  <div class="rounded-full bg-white w-5 h-5 cursor-pointer md:mt-4">
                  <Tooltip title={item.mobileNo} >
          {item.doNotCallInd !== true && (
            <span class=" mr-2 text-xs cursor-pointer"
              onClick={() => {
                props.handleDonotCallModal(true);
                handleSetCurrentContactId(item);
              }}
            >
             <PhoneInTalkIcon style={{fontSize:"0.8rem"}}/>
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
                      <div class=" max-sm:flex justify-end max-sm:w-full">
                      <Tooltip title={item.emailId}>
         
          <MailOutlineIcon
            type="mail"
            style={{ cursor: "pointer",fontSize:"0.8rem" }}
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
            <MonitorHeartIcon style={{fontSize:"0.8rem" ,color: "#df9697"}}/>
          )}
          </span>
                      </div>
                      <div>
          

                  </div>
                  </div>
                  <div class="flex flex-col md:w-[2%] max-sm:flex-row w-full max-sm:justify-evenly items-center">
                    <div>
                  <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
          <span
            style={{

              cursor: "pointer",
            }}
          >
          <LocationOnIcon   style={{
              cursor: "pointer",
              fontSize: "0.8rem"
            }}/>
          </span>
        </Tooltip>
        </div>
  
            {user.contactUpdateInd === true &&  user.crmInd === true && (
          <div>
         
          <Tooltip title="Edit">
            <BorderColorIcon
              style={{ cursor: "pointer",fontSize: "0.8rem", color: "grey", }}
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
                   <div class="w-[1%]"></div>
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

  return (
    <>
      
     
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[98%] max-xl:w-[96%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Name</div>
        <div className=" w-40 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Company</div>
        <div className=" w-28 max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Designation</div>
        <div className="w-36 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Department</div>
        <div className="w-28 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Quotation</div>
        <div className="w-28 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Pipeline</div>
        <div className="w-20 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Portal Acess</div>
        <div className="w-16 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Owner</div>
        <div className="w-12"></div>

      </div>
          <InfiniteScroll
        dataLength={allContacts.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllContacts?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
        
        { !fetchingAllContacts && allContacts.length === 0 ?<NodataFoundPage />:allContacts.map((item,index) =>  {
        
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
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                <div className=" flex font-medium flex-col w-52 max-sm:flex-row max-xl:w-[16rem]   max-sm:justify-between  ">
<div className="flex max-sm:w-full"> 
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
                                            <div class="text-sm flex text-blue-500 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`contact/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
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
                                <div class="flex">

                                <div className=" flex font-medium flex-col  w-48 max-sm:flex-row max-xl:w-[7rem]   max-sm:justify-between ">
                                    
                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-36 max-sm:flex-row max-xl:w-[8rem]   max-sm:justify-between ">
                               
                                    <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                         {item.designation}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-36  max-sm:flex-row max-xl:w-[5rem]   max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                       {item.department}
                                  </div>
                              </div>
                              </div>
                              <div className="flex font-medium flex-col w-32 max-sm:flex-row   max-sm:justify-between ">

  <div className="text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
    {item.oppNo}
  </div>
</div>
<div className=" flex font-medium flex-col w-36  max-sm:flex-row  max-sm:justify-between ">
                      

                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-32 max-sm:flex-row  max-sm:justify-between ">
               

                                    <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                                    {item.thirdPartyAccessInd 
    ? `${item.thirdPartyAccessInd}`
    : 'Not Provided'}

                                    </div>
                                </div>
                                <div class="flex md:items-center">
                                <div className="flex font-medium  w-20 max-xl:w-[3rem]   max-sm:flex-row  max-sm:justify-between">
                       


                   
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
                   <div class="flex flex-col w-[5%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleContactNotesDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>
           </div>
           <div>
           <Tooltip title="Pulse">
       <MonitorHeartIcon
                onClick={() => {
                  handleContactPulseDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                style={{ fontSize: "0.8rem", color: "#df9697" }}
              />
           </Tooltip>

</div>
            </div>
                                <div class="flex flex-col  max-sm:flex-row w-[40%] max-sm:justify-evenly items-center">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer md:mt-4">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
               <PhoneInTalkIcon style={{fontSize:"0.8rem"}}/>
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
                        <div class=" max-sm:flex justify-end max-sm:w-full">
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon
              type="mail"
              style={{ cursor: "pointer",fontSize:"0.8rem" }}
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
              <MonitorHeartIcon style={{fontSize:"0.8rem" ,color: "#df9697"}}/>
            )}
            </span>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-[2%] max-sm:flex-row w-full max-sm:justify-evenly items-center">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{

                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
          </div>
    
              {/* {user.contactUpdateInd === true &&  user.crmInd === true && (
            <div>
           
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem", color: "grey", }}
                onClick={() => {
                  props.setEditContact(item);
                  handleUpdateContactModal(true);
                  handleSetCurrentContactId(item);
                  
                }}
              />
            </Tooltip>
      
            </div>
              )} */}
                      </div>    
                     <div class="w-[1%]"></div>
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
  designations,
  departments,
  opportunity,
}) => ({
  userId: auth.userDetails.userId,
  allContacts: contact.allContacts,
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
  fetchingAllContacts:contact.fetchingAllContacts
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllContact,
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactAllCardList);
