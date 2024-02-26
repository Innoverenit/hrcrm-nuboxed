import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip } from "antd";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { MultiAvatar, MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
} from "../../../Contact/ContactAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  handleContactInvestNotesDrawerModal,
  emptyContactInvest,handleUpdateContactInvestModal} from "../../ContactInvestAction";
import { FormattedMessage } from "react-intl";
const AddContactInvestNotesDrawerModal = lazy(() =>
  import("../AddContactInvestNotesDrawerModal")
);
const UpdateContactInvestModal = lazy(() =>
  import("../UpdateContactInvest/UpdateContactInvestModal")
);

function ContactInvestCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPage] = useState(0);
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
  }, []);

  useEffect(()=>{
    return()=>props.emptyContactInvest();
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
  const [contactiData, setContactiData] = useState("");

  function handleCurrentContactIdata(dta) {
    setContactiData(dta);
  }

  const handleLoadMore = () => {
            setPage(pageNo + 1);
        props.getContactInvestByUserId(props.currentUser?props.currentUser:props.userId,pageNo);
  
  }
  const {
    user,
    fetchingContactsInvest,
    contactByUserId,
    filterData,
    updateContactInvestModal,
    addDrawerContactInvestNotesModal,
    handleUpdateContactInvestModal,
    handleContactInvestNotesDrawerModal
  } = props;

  if (isMobile){
    return (
      <>
        
  
        <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         
            <InfiniteScroll
          dataLength={contactByUserId.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingContactsInvest?<div  class="flex justify-center">Loading...</div>:null}
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[8rem]  p-3"
                >
                                       <div class="flex justify-between">
                                  
  <div className="flex items-center max-sm:w-full"> 
  <div>
                                  <SubTitle>
              <MultiAvatar2
                primaryTitle={item.firstName}
                imageId={item.imageId}
                imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            </SubTitle></div>
            &nbsp;
            <div class="max-sm:w-full md:w-[12.1rem]">
                                          <Tooltip>
                                            <div class=" flex  max-sm:w-full justify-between flex-row md:flex-col">
                                              {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                              Name
                                              </div> */}
                                              <div class="text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                              <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`contactinvest/${item.contactId}`} title={item.fullName}>
        {item.fullName}
    </Link>                                               
             {/* <Link
            toUrl={`contactinvest/${item.contactId}`}
            title={`${item.fullName}`}
          >{item.fullName}</Link> */}
          &nbsp;&nbsp;
          {date === currentdate ? (
            <span class="text-[tomato] font-bold"
             
            >
              New
            </span>
          ) : null}
         
                                              </div>
                                              </div>
                                          </Tooltip>
                                          </div>
                                          </div>
                                 
                                 
                                      {/* <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Company </div> */}
                                      <div class=" text-[0.82rem] text-cardBody font-poppins">   
                                      {item.tagWithCompany}
                                      </div>
                                  
                                 
                                  </div>
                                  <div class="flex justify-between">
                                 
                                      {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Designation</div> */}
                                      <div class="text-[0.82rem] text-cardBody font-poppins">
                                           {item.designation}
                                      </div>
                                  
                                  
                                    {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Department</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                         {item.department}
                                    </div>
                                
                                  
                                      {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"># Deals</div> */}
  
                                      <div class=" text-[0.82rem] text-cardBody font-poppins">
                                       {item.oppNo}
                                      </div>
                                  
                                  
                                      {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Deal Value</div> */}
  
                                      <div class=" text-[0.82rem] text-cardBody font-poppins">
                                       {item.totalProposalValue}
                                      </div>
                                 
                                  
                                      {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Source</div> */}
  
                                      <div class="text-[0.82rem] text-cardBody font-poppins">
  
                                      </div>
                                  
                                  </div>
                                  <div class="flex justify-between items-center">
                                 
                         
                         {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}
  
                     
                <Tooltip title={item.ownerName}>
                  <div class="max-sm:flex justify-end mt-1">
              
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              
              </div>
            </Tooltip>
  
                    
                                  
                      <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
                      <Tooltip title={item.mobileNo} >
              {item.doNotCallInd !== true && (
                <span class=" mr-2 text-xs cursor-pointer"
                  onClick={() => {
                    props.handleDonotCallModal(true);
                    handleCurrentContactIdata(item);
                  }}
                >
                 <PhoneInTalkIcon className="!text-base text-[gold]"/>
                </span>
              )}
              {item.doNotCallInd === true && (
                <span class=" mr-2 text-xs cursor-pointer"
                  onClick={() => {
                    props.handleDonotCallModal(true);
                    handleCurrentContactIdata(item);
                  }}
                >
                  <PhoneDisabledIcon className="!text-base text-[gold]"/>
                </span>
              )}
            </Tooltip>
                          </div>
                          
                          <Tooltip title={item.emailId}>
             
              <MailOutlineIcon  className="!text-base cursor-pointer text-green-400"
                type="mail"
               
                onClick={() => {
                  props.getContactById(item.contactId);
                  props.handleCurrentContactIdata(true);
                }}
              />
             </Tooltip>
                         
                       
                          <div >
                          <span class="cursor-pointer"
                
                onClick={() => {
                  handleCurrentContactIdata(item);
                  props.handleContactDrawerModal(true);
                }}
              >{user.pulseAccessInd === true && (
                <MonitorHeartIcon className=" !text-base cursor-pointer text-[#df9697]"/>
              )}
              </span>
                          </div>
                         
                      
                      
                        <div>
                      <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span class="cursor-pointer"
               
              >
              <LocationOnIcon  className="!text-base cursor-pointer text-[#960a0a]"/>
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
              <div>
              {user.imInd === true  && user.investorContactUpdateInd === true &&  (
              <Tooltip title="Edit">
                <BorderColorIcon
                  className="!text-base cursor-pointer text-[tomato]"
                  onClick={() => {
                    handleUpdateContactInvestModal(true);
                    handleCurrentContactIdata(item);
                    
                  }}
                />
              </Tooltip>
              )}
              </div>
                        
              
                      <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    props.handleContactInvestNotesDrawerModal(true);
                    handleCurrentContactIdata(item);
                  }}
                  className="text-green-500 cursor-pointer !text-base"
                />
             </Tooltip>
  
             
                        </div>  
                       
                              </div>
                          </div>
  
  
                      )
                  })}
         </InfiniteScroll>
        </div>
       
  
        <UpdateContactInvestModal
          contactiData={contactiData}
          updateContactInvestModal={updateContactInvestModal}
          handleUpdateContactInvestModal={handleUpdateContactInvestModal}
          handleCurrentContactIdata={handleCurrentContactIdata}
        />
        
        <AddContactInvestNotesDrawerModal
          contactiData={contactiData}
          addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
          handleContactInvestNotesDrawerModal={handleContactInvestNotesDrawerModal}
          handleCurrentContactIdata={handleCurrentContactIdata}
        />
      
      </>
    ); 
  }


  return (
    <>
      

      <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex  justify-between w-[93%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[15.12rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[12.1rem]"><FormattedMessage
                  id="app.company"
                  defaultMessage="company"
                /></div>
        <div className=" md:w-[8.6rem] "><FormattedMessage
                  id="app.designation"
                  defaultMessage="designation"
                /></div>
        <div className="md:w-[10.3rem]"><FormattedMessage
                  id="app.department"
                  defaultMessage="department"
                /></div>
        <div className="md:w-[7.1rem]"># <FormattedMessage
                  id="app.deals"
                  defaultMessage="deals"
                /></div>
        <div className="md:w-[7.2rem]"> <FormattedMessage
                  id="app.dealValue"
                  defaultMessage="dealValue"
                /></div>
        <div className="md:w-[5.2rem]"><FormattedMessage
                  id="app.source"
                  defaultMessage="source"
                /></div>
        <div className="md:w-[6.2rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        {/* <div className="w-12">Action</div> */}

      </div>
          <InfiniteScroll
        dataLength={contactByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContactsInvest?<div  class="flex justify-center">Loading...</div>:null}
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
                            <div className="flex rounded-xl justify-between  mt-2 bg-white h-11 items-center p-3"
                               
                                >
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex items-center max-sm:w-full"> 
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
          <div class="max-sm:w-full md:w-[12.1rem]">
                                        <Tooltip>
                                          <div class=" flex  max-sm:w-full justify-between flex-row md:flex-col">
                                            
                                            <div class="text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`contactinvest/${item.contactId}`} title={item.fullName}>
      {item.fullName}
  </Link>                                               
           {/* <Link
          toUrl={`contactinvest/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link> */}
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-[tomato] font-bold"
           
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
                     
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-48">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-[0.875rem] font-poppins max-sm:hidden"> Company </div> */}
                                    <div class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-[9.5rem]">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Designation</div> */}
                                    <div class="text-[0.82rem] text-cardBody font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                <div class="flex">
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row md:flex-col w-[12.2rem]">
                                  {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Department</div> */}
                                  <div class="text-[0.82rem] text-cardBody font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                                <div className=" flex font-medium flex-col md:w-[7.2rem] max-sm:flex-row w-full  ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                     {item.oppNo}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[5.05rem] max-sm:flex-row w-full  ">
                                    {/* <div class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Deal Value</div> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                     {item.totalProposalValue}
                                    </div>
                                </div>
                                <div className="flex font-medium max-sm:justify-between flex-col md:w-[6.2rem] max-sm:flex-row w-full ">
                                    {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Source</div> */}

                                    <div class="text-[0.82rem] text-cardBody font-poppins">

                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className="flex font-medium  flex-col md:w-[5.2rem]  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <div class="text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                   
              <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end mt-1">
            
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
           
            </div>
          </Tooltip>

                   </div>
                                <div class="flex flex-col md:w-6 max-sm:flex-row w-full max-sm:justify-evenly items-center">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
               <PhoneInTalkIcon className=" !text-base cursor-pointer"/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
                <PhoneDisabledIcon className="!text-base text-[gold]"/>
              </span>
            )}
          </Tooltip>
                        </div>
                        <div class=" max-sm:flex justify-end max-sm:w-full">
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon className="!text-base cursor-pointer text-green-400"
              type="mail"
             
              onClick={() => {
                props.getContactById(item.contactId);
                props.handleCurrentContactIdata(true);
              }}
            />
           </Tooltip>
                        </div>
                     
                        <div >
                        <span class="cursor-pointer"
              
              onClick={() => {
                handleCurrentContactIdata(item);
                props.handleContactDrawerModal(true);
              }}
            >{user.pulseAccessInd === true && (
              <MonitorHeartIcon className=" !text-base cursor-pointer text-[#df9697]"/>
            )}
            </span>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-6 max-sm:flex-row w-full max-sm:justify-evenly items-center">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span class="cursor-pointer"
             
            >
            <LocationOnIcon  className="!text-base cursor-pointer text-[#960a0a]"/>
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
            <div>
            {user.imInd === true  && user.investorContactUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon
                className="!text-base cursor-pointer text-[tomato]"
                onClick={() => {
                  handleUpdateContactInvestModal(true);
                  handleCurrentContactIdata(item);
                  
                }}
              />
            </Tooltip>
            )}
            </div>
                      </div>  
                    
                      </div>  
                      <div class="flex flex-col w-4 justify-evenly  ">
                    <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleContactInvestNotesDrawerModal(true);
                  handleCurrentContactIdata(item);
                }}
                className="text-green-500 cursor-pointer !text-base"
              />
           </Tooltip>

            </div>
                            </div>
                        </div>


                    )
                })}
       </InfiniteScroll>
      </div>
     

      <UpdateContactInvestModal
        contactiData={contactiData}
        updateContactInvestModal={updateContactInvestModal}
        handleUpdateContactInvestModal={handleUpdateContactInvestModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />
      
      <AddContactInvestNotesDrawerModal
        contactiData={contactiData}
        addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
        handleContactInvestNotesDrawerModal={handleContactInvestNotesDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
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
  contactinvest
}) => ({
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  user: auth.userDetails,
  addDrawerContactInvestNotesModal:contactinvest.addDrawerContactInvestNotesModal,
  fetchingContactsInvest: contactinvest.fetchingContactsInvest,
  fetchingContactsInvestError: contactinvest.fetchingContactsInvestError,
  updateContactInvestModal: contactinvest.updateContactInvestModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  contactiNVESTbyId: contactinvest.contactiNVESTbyId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateContactModal,
      handleDonotCallModal,
      setEditContact,
      getDesignations,
      updateOwnercontactById,
      handleContactReactSpeechModal,
      handleContactDrawerModal,
      getContactById,
      handleContactEmailDrawerModal,
      emptyContactInvest,
      handleUpdateContactInvestModal,
      handleContactInvestNotesDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestCardList);
