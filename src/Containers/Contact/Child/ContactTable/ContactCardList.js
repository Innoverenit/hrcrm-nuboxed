import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip, Select } from "antd";
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import {
  getContactListByUserId,
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
  handleContactCETdrawer
} from "../../ContactAction";
import AddchartIcon from "@mui/icons-material/Addchart";
import { FormattedMessage } from "react-intl";
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
const ContactCETdrawer =lazy(()=>import("./ContactCETdrawer"));
 
const Option = Select;
const UpdateContactModal = lazy(() =>
  import("../UpdateContact/UpdateContactModal")
);

function ContactCardList(props) {
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
    props.getContactListByUserId(props.userId, page,"creationdate");
    setPage(page + 1);
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

  const handleLoadMore = () => {
    const callPageMapd = props.contactByUserId && props.contactByUserId.length &&props.contactByUserId[0].pageCount
    setTimeout(() => {  
      if  (props.contactByUserId)
      {
        if (page < callPageMapd) {    
    setPage(page + 1);
            props.getContactListByUserId(props.currentUser?props.currentUser:props.userId,page,
              props.filter?props.filter:"creationdate"
              );
            }
              if (page === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
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
    contactCETdrawer
  } = props;

  if (isMobile) {

    return (
      <>
        
       
        <div class="rounded-lg  p-2 w-full overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            
            <InfiniteScroll
          dataLength={contactByUserId.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingContacts?<div class="flex justify-center">Loading...</div>:null}
          height={"75vh"}
        >
          
        {filterData.map((item) => { 
          
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
                                       
                                  <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
  <div className="flex max-sm:w-full items-center"> 
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
                                              {/* <div class="text-xs text-cardBody font-poppins max-sm:hidden">
                                              Name
                                              </div> */}
                                              <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                  
           <Link
            toUrl={`contact/${item.contactId}`}
            title={`${item.fullName}`}
          >{item.fullName}</Link>&nbsp;&nbsp;
          {date === currentdate ? (
            <span class="text-xs"
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
                                  <div class="flex justify-between items-center w-wk ">
  
                                  <div className=" flex font-medium  ">
                                    
                                      <div class=" text-sm text-cardBody font-poppins">   
                                      {item.tagWithCompany}
                                      </div>
                                  </div>
                                  <div className=" flex font-medium ">
                                     
                                      <div class="text-sm text-cardBody font-poppins">
                                           {item.designation}
                                      </div>
                                  </div>
                                  <div className=" flex font-medium ">
                                   
                                    <div class="text-sm text-cardBody font-poppins">
                                         {item.department}
                                    </div>
                                </div>
                                </div>
                                <div class="flex justify-between items-center w-wk ">
                                <div className="flex font-medium  ">
  
    <div className="text-sm text-cardBody font-poppins text-center">
      {item.oppNo}
    </div>
  </div>
  <div className=" flex font-medium ">
                                      <div class=" text-sm text-cardBody font-poppins text-center">
                                      {item.totalProposalValue}
  
                                      </div>
                                  </div>
                                  <div className="flex font-medium  ">
                                      <div class="text-sm text-cardBody font-poppins">
  
                                      {item.thirdPartyAccessInd 
      ? `${item.thirdPartyAccessInd}`
      : 'Not Provided'}
  
                                      </div>
                                  </div>
                                  </div>
                                  <div class="flex justify-between items-center w-wk ">
                                  <div className="flex font-medium ">                 
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
                    
                      <div>
                      <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    handleContactNotesDrawerModal(true);
                    handleSetCurrentContact(item);
                  }}
                  className="!text-base cursor-pointer text-[green]"
                 
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
                  className="!text-base cursor-pointer text-[#df9697]"
                 
                />
             </Tooltip>
  
  </div>           
                      <div class="rounded-full w-5 h-5 cursor-pointer md:mt-4">
                      <Tooltip title={item.mobileNo} >
              {item.doNotCallInd !== true && (
                <span class=" mr-2 text-xs cursor-pointer"
                  onClick={() => {
                    props.handleDonotCallModal(true);
                    handleSetCurrentContactId(item);
                  }}
                >
                 <PhoneInTalkIcon className="!text-base cursor-pointer"/>
                </span>
              )}
              {item.doNotCallInd === true && (
                <span class=" mr-2 text-xs cursor-pointer"
                  onClick={() => {
                    props.handleDonotCallModal(true);
                    handleSetCurrentContactId(item);
                  }}
                >
                  <PhoneDisabledIcon className="!text-base cursor-pointer"/>
                </span>
              )}
            </Tooltip>
                          </div>
                          <div >
                          <Tooltip title={item.emailId}>
             
              <MailOutlineIcon
                type="mail"
                className="!text-base cursor-pointer"
                onClick={() => {
                  props.getContactById(item.contactId);
                  props.handleContactEmailDrawerModal(true);
                }}
              />
             </Tooltip>
                          </div>
                        <div>
                      <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
              <LocationOnIcon  className="!text-base cursor-pointer"/>
              </span>
            </Tooltip>
            </div>  
                {user.contactUpdateInd === true &&  user.crmInd === true && (
              <div>
             
              <Tooltip title="Edit">
                <BorderColorIcon
                 className="!text-base cursor-pointer"
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
          updateContactModal={updateContactModal}
          handleUpdateContactModal={handleUpdateContactModal}
          handleSetCurrentContactId={handleSetCurrentContactId}
        />
         <AddContactNotesDrawerModal
          contactData={currentContact}
          addDrawerContactNotesModal={addDrawerContactNotesModal}
          handleContactNotesDrawerModal={handleContactNotesDrawerModal}
          handleSetCurrentContact={handleSetCurrentContact}
        />
           <AddContactPulseDrawerModal
          contactData={currentContact}
          addDrawerContactPulseModal={addDrawerContactPulseModal}
          handleContactPulseDrawerModal={handleContactPulseDrawerModal}
          handleSetCurrentContact={handleSetCurrentContact}
        />
        <AddContactEmailDrawerModal
          contactData={currentContactId}
          addDrawerContactEmailModal={props.addDrawerContactEmailModal}
          handleContactEmailDrawerModal={props.handleContactEmailDrawerModal}
        />
        <ReactContactSpeechModal
          contactData={currentContactId}
          handleContactReactSpeechModal={handleContactReactSpeechModal}
          addContactSpeechModal={addContactSpeechModal}
          handleSetCurrentContactId={handleSetCurrentContactId}
        /> 
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
          <div className=" flex justify-between w-[95%] max-lg:w-[89%] max-xl:w-[93%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" md:w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.company"
                  defaultMessage="Company"
                /></div>
        <div className=" md:w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.designation"
                  defaultMessage="Designation"
                /></div>
        <div className="md:w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.department"
                  defaultMessage="Department"
                /></div>
        <div className="md:w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.quotation"
                  defaultMessage="Quotation"
                /></div>
        <div className="md:w-[5.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.pipeline"
                  defaultMessage="Pipeline"
                /></div>
        <div className="md:w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.portalacess"
                  defaultMessage="Portal Acess"
                /></div>
        <div className="md:w-[2.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="Owner"
                /></div>
        <div className="w-[4.2rem]"></div>

      </div>
          <InfiniteScroll
        dataLength={contactByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContacts?<div class="flex justify-center">Loading ...</div>:null}
        height={"75vh"}
        endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
        
        { !fetchingContacts && filterData.length === 0 ?<NodataFoundPage />:filterData.map((item,index) =>  {
        
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
                                     
                                <div className=" flex font-medium flex-col w-[14rem] max-sm:flex-row  max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center max-lg:w-[7.2rem] max-xl:w-[9rem]"> 
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
                                          
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins  font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
      {item.fullName}
    </Link>                                               
        
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs"
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

                                <div className=" flex font-medium flex-col  w-[14.01rem] max-sm:flex-row max-xl:w-[9.5rem] max-lg:w-[6.8rem]  max-sm:justify-between ">
                                   
                                    <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[10.2rem] max-xl:w-[6.6rem] max-lg:w-[5.01rem] max-sm:flex-row  max-sm:justify-between ">
                                   
                                    <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                         {item.designation}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[8.3rem] max-xl:w-[6.3rem] max-lg:w-[5.2rem]  max-sm:flex-row  max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                       {item.department}
                                  </div>
                              </div>
                              </div>
                              <div className="flex font-medium flex-col w-32 max-xl:w-[11rem] max-lg:w-[6.1rem] max-sm:flex-row  max-sm:justify-between ">

  <div className="text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
    {item.oppNo}
  </div>
</div>
<div className=" flex font-medium flex-col w-36 max-xl:w-[16rem] max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                
                                    <div class="text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                                    {item.thirdPartyAccessInd === true
    ?<Tooltip title="Provided"><AlarmOnIcon   className=" !text-base text-[green]"/></Tooltip> 
    :  <Tooltip title="Not Provided"> <DoNotDisturbOnTotalSilenceIcon  className=" !text-base text-[red]"/></Tooltip>}

                                    </div>
                                </div>
                                <div class="flex md:items-center">
                                <div className="flex font-medium  w-20  max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3.01rem]  max-sm:justify-between">
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
                   <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                className=" !text-base cursor-pointer text-[#4bc076]"
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
       className=" !text-base cursor-pointer text-[#df9697]"
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
                        className="!text-base cursor-pointer text-blue-500"
                          onClick={() => {
                            props.handleContactCETdrawer(true);
                            handleSetCurrentContact(item);
                          }}
                        />
                      </Tooltip>
                    </div>
            </div>
                                <div class="flex flex-col w-6  max-sm:flex-row max-sm:justify-evenly items-center">
                    <div class="rounded-full w-5 h-5 cursor-pointer md:mt-4">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
               <PhoneInTalkIcon     className=" !text-base cursor-pointer text-[blue]"/>
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
              className=" !text-base cursor-pointer text-[red]"
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
              <MonitorHeartIcon  className=" !text-base cursor-pointer text-[#df9697]"/>
            )}
            </span>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-6 max-sm:flex-row w-full max-sm:justify-evenly items-center">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   
            className=" !text-base cursor-pointer text-[#960A0A]"/>
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
                className=" !text-base cursor-pointer text-[tomato]"
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
      <ContactCETdrawer
        currentContact={currentContact}
        contactCETdrawer={props.contactCETdrawer}
        handleContactCETdrawer={props.handleContactCETdrawer}
      />
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
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
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
  contactCETdrawer:contact.contactCETdrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByUserId,
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
      handleContactCETdrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCardList);
