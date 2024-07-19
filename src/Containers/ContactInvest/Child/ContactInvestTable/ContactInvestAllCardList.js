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
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
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
import {getAllContactInvest,
  handleContactInvestNotesDrawerModal,
  emptyContactInvest,handleUpdateContactInvestModal,handleContactInvestPulseDrawerModal} from "../../ContactInvestAction";
import { FormattedMessage } from "react-intl";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import AddContactInvestPulseModal from "./AddContactInvestPulseModal";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddContactInvestNotesDrawerModal = lazy(() =>
  import("../AddContactInvestNotesDrawerModal")
);
const UpdateContactInvestModal = lazy(() =>
  import("../UpdateContactInvest/UpdateContactInvestModal")
);

function ContactInvestAllCardList(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
    props.getAllContactInvest(pageNo,"Investor");
    setPage(pageNo + 1);
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "Name",//0
           "Company",//1
           "Designation",//2
           "Department",//3
           "Deal",//4
           "Deal Value",//5
          "Source",//6
           "Owner",//7
          
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
            props.getAllContactInvest(props.currentUser?props.currentUser:pageNo,
              "Investor"
            )  ; 
            setPage(pageNo + 1);
  }
  const {
    user,
    fetchingAllContactInvest,
    newFiltersdata,
    contactByUserId,
    filterData,
    handleUpdateContactModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactInvestModal,
    addDrawerContactInvestNotesModal,
    handleUpdateContactInvestModal,
    handleContactInvestNotesDrawerModal,
    handleContactInvestPulseDrawerModal,
    addDrawerContactInvestPulseModal
  } = props;

//  if(fetchingContactsInvest){
//   return <BundleLoader/>
//  }

if (loading) {
  return <div><BundleLoader/></div>;
}


  return (
    <>
      

      <div class="rounded max-sm:m-1 m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[15.32rem]">
        {translatedMenuItems[0]}  {/* <FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /> */}
                </div>
        <div className=" md:w-[12.72rem]">
        {translatedMenuItems[1]}{/* <FormattedMessage
                  id="app.company"
                  defaultMessage="company"
                /> */}
                </div>
        <div className=" md:w-[9.6rem] ">
        {translatedMenuItems[2]} {/* <FormattedMessage
                  id="app.designation"
                  defaultMessage="designation"
                /> */}
                </div>
        <div className="md:w-[11.3rem]">
        {translatedMenuItems[3]} {/* <FormattedMessage
                  id="app.department"
                  defaultMessage="department"
                /> */}
                </div>
        <div className="md:w-[6.1rem]"># 
        {translatedMenuItems[4]} {/* <FormattedMessage
                  id="app.deals"
                  defaultMessage="deals"
                /> */}
                </div>
        <div className="md:w-[7.21rem]"> 
        {translatedMenuItems[5]} {/* <FormattedMessage
                  id="app.dealValue"
                  defaultMessage="dealValue"
                /> */}
                </div>
        <div className="md:w-[5.2rem]">
        {translatedMenuItems[6]} {/* <FormattedMessage
                  id="app.source"
                  defaultMessage="source"
                /> */}
                </div>
        <div className="md:w-[6.8rem]">
        {translatedMenuItems[7]} {/* <FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /> */}
                </div>
        {/* <div className="w-12">Action</div> */}

      </div>
          <InfiniteScroll
        dataLength={props.allContactInvestData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllContactInvest?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"80vh"}
      >
       
       { !fetchingAllContactInvest && props.allContactInvestData.length === 0 ?<NodataFoundPage />:props.allContactInvestData.map((item,index) =>  {
        
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
        className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                              <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                          <div className=" flex font-medium  md:w-[15.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                                      
                                      <div class="text-[0.82rem] flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                      <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`contactinvest/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>                                               
     {/* <Link
    toUrl={`contactinvest/${item.contactId}`}
    title={`${item.fullName}`}
  >{item.fullName}</Link> */}
  &nbsp;&nbsp;
  {date === currentdate ? (
    <span class="text-[tomato] mt-[0.4rem] font-bold"
     
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
                          <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[14.01rem]">
                              {/* <div class=" text-[0.875rem]  font-[0.875rem] font-poppins max-sm:hidden"> Company </div> */}
                              <div class=" text-[0.82rem]  font-poppins">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[10.5rem]">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Designation</div> */}
                              <div class="text-[0.82rem]  font-poppins">
                                   {item.designation}
                              </div>
                          </div>
                          <div class="flex">
                          <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[12.2rem]">
                            {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden">Department</div> */}
                            <div class="text-[0.82rem]  font-poppins">
                                 {item.department}
                            </div>
                        </div>
                          <div className=" flex font-medium  md:w-[5.22rem] max-sm:flex-row w-full  ">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden"># Deals</div> */}

                              <div class=" text-[0.82rem]  font-poppins">
                               {item.oppNo}
                              </div>
                          </div>
                          <div className=" flex font-medium  md:w-[5.05rem] max-sm:flex-row w-full  ">
                              {/* <div class=" text-[0.875rem]  font-poppins max-sm:hidden">Deal Value</div> */}

                              <div class=" text-[0.82rem]  font-poppins">
                               {item.totalProposalValue}
                              </div>
                          </div>
                          <div className="flex font-medium max-sm:justify-between  md:w-[6.81rem] max-sm:flex-row w-full ">
                              {/* <div class="text-[0.875rem]  font-poppins max-sm:hidden"> Source</div> */}

                              <div class="text-[0.82rem]  font-poppins">

                              </div>
                          </div>
                          </div>
                          <div class="flex">
        <div className="flex font-medium   md:w-[3.2rem]  max-sm:flex-row w-full max-sm:justify-between">

             
        <Tooltip title={item.ownerName}>
          <div class="max-sm:flex justify-end mt-1">
      
        <MultiAvatar
          primaryTitle={item.ownerName}
          imageId={item.ownerImageId}
          imgWidth={"1.8rem"}
          imgHeight={"1.8rem"}
        />
     
      </div>
    </Tooltip>

             </div>
             <div class=" flex justify-end items-center w-[7rem] max-sm:flex   max-sm:w-full">   
             <Tooltip title="Pulse">
 <MonitorHeartIcon
 className=" !text-icon cursor-pointer text-[#df9697]"
          onClick={() => {
            handleContactInvestPulseDrawerModal(true);
            handleCurrentContactIdata(item);
          }}
          
        />
     </Tooltip>
              <Tooltip title={item.mobileNo} >
      {item.doNotCallInd !== true && (
        <span class=" mr-1 text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleCurrentContactIdata(item);
          }}
        >
         <PhoneInTalkIcon className=" !text-icon cursor-pointer"/>
        </span>
      )}
      {item.doNotCallInd === true && (
        <span class=" mr-1 text-xs cursor-pointer"
          onClick={() => {
            props.handleDonotCallModal(true);
            handleCurrentContactIdata(item);
          }}
        >
          <PhoneDisabledIcon className="!text-icon text-[gold]"/>
        </span>
      )}
    </Tooltip>
                 
                 
                  <Tooltip title={item.emailId}>
     
      <MailOutlineIcon className="!text-icon cursor-pointer text-green-400"
        type="mail"
       
        onClick={() => {
          props.getContactById(item.contactId);
          props.handleCurrentContactIdata(true);
        }}
      />
     </Tooltip>
               
     <Tooltip>
                  <span class="cursor-pointer"
                
                onClick={() => {
                  handleCurrentContactIdata(item);
                  props.handleContactDrawerModal(true);
                }}
              >{user.pulseAccessInd === true && (
                <MonitorHeartIcon className=" !text-icon cursor-pointer text-[#df9697]"/>
              )}
              </span>
     </Tooltip>
              <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
      <span class="cursor-pointer"
       
      >
      <LocationOnIcon  className="!text-icon cursor-pointer text-[#960a0a]"/>
      </span>
    </Tooltip>
    
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
      
               
              
               
                
              <Tooltip title="Notes">
 <NoteAltIcon
          onClick={() => {
            props.handleContactInvestNotesDrawerModal(true);
            handleCurrentContactIdata(item);
          }}
          className="text-green-500 cursor-pointer !text-icon"
        />
     </Tooltip>
    
     <div>
      {user.imInd === true  && user.investorContactUpdateInd === true &&  (
      <Tooltip title="Edit">
        <BorderColorIcon
          className="!text-icon cursor-pointer text-[tomato]"
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
      <AddContactInvestPulseModal
        contactiData={contactiData}
        addDrawerContactInvestPulseModal={addDrawerContactInvestPulseModal}
        handleContactInvestPulseDrawerModal={handleContactInvestPulseDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />
      {/* <AddContactEmailDrawerModal
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
      /> */}
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
  fetchingAllContactInvest: contactinvest.fetchingAllContactInvest,
  fetchingContactsInvestError: contactinvest.fetchingContactsInvestError,
  updateContactInvestModal: contactinvest.updateContactInvestModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  contactiNVESTbyId: contactinvest.contactiNVESTbyId,
  allContactInvestData:contactinvest.allContactInvestData,
  addDrawerContactInvestPulseModal:contactinvest.addDrawerContactInvestPulseModal
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
      getAllContactInvest,
      handleUpdateContactInvestModal,
      handleContactInvestNotesDrawerModal,
      handleContactInvestPulseDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestAllCardList);
