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
import {
  handleContactInvestNotesDrawerModal,
  getContactInvestByUserId,
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

function ContactInvestCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    props.getContactInvestByUserId(props.userId,pageNo,"creationdate");
    setPage(pageNo + 1);
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
  // const handleLoadMore = () => {
  //           setPage(pageNo + 1);
  //       props.getContactInvestByUserId(props.currentUser?props.currentUser:props.userId,pageNo,"creationdate");
  
  // }
  const handleLoadMore = () => {

    const proPag = props.contactiNVESTbyId && props.contactiNVESTbyId.length && props.contactiNVESTbyId[0].pageCount
    setTimeout(() => {
      if (props.contactiNVESTbyId) {
        if (pageNo < proPag) {
          setPage(pageNo + 1);
          props.getContactInvestByUserId(props.currentUser?props.currentUser:props.userId,pageNo,"creationdate");
        }
        if (pageNo === proPag) {
          setHasMore(false)
        }
      }
    }, 100);
  };
  const {
    user,
    fetchingContactsInvest,
    contactiNVESTbyId,
    filterData,
    updateContactInvestModal,
    addDrawerContactInvestNotesModal,
    handleUpdateContactInvestModal,
    addDrawerContactInvestPulseModal,
    handleContactInvestPulseDrawerModal,
    handleContactInvestNotesDrawerModal
  } = props;

  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>     
      <div class="rounded max-sm:m-1 m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex  justify-between max-sm:hidden w-[99%] p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[15.32rem]">
        {translatedMenuItems[0]}
        {/* name" */}         
                </div>
        <div className=" md:w-[12.72rem]">
        {translatedMenuItems[1]}
        {/* company */}             
                </div>
        <div className=" md:w-[9.6rem] ">
        {translatedMenuItems[2]} 
        {/* designation */}             
                </div>
        <div className="md:w-[11.3rem]">
        {translatedMenuItems[3]} 
        {/* department */}               
                </div>
        <div className="md:w-[6.1rem]"># 
        {translatedMenuItems[4]}
        {/* deals" */}           
                </div>
        <div className="md:w-[7.21rem]"> 
        {translatedMenuItems[5]}
         {/* dealValue" */}              
                </div>
        <div className="md:w-[5.2rem]">
        {translatedMenuItems[6]}
        {/* source" */}           
                </div>
        <div className="md:w-[6.8rem]">
        {translatedMenuItems[7]} 
        {/* owner" */}
             
                </div>
       {/* Action */}
      </div>
          <InfiniteScroll
        dataLength={contactiNVESTbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContactsInvest?<div  class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        style={{scrollbarWidth:"thin"}}
      >
       
       { !fetchingContactsInvest && filterData.length === 0 ?<NodataFoundPage />:filterData.map((item,index) =>  {
        
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
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
                                            
                                            <div class="text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
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
                                   {/* Company  */}
                                    <div class=" text-xs  font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[10.5rem]">
                               {/* Designation */}
                                    <div class="text-xs  font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                <div class="flex">
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[12.2rem]">
                                {/* Department */}
                                  <div class="text-xs  font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                                <div className=" flex   md:w-[5.22rem] max-sm:flex-row w-full  ">
                                    {/* Deals */}
                                    <div class=" text-xs  font-poppins">
                                     {item.oppNo}
                                    </div>
                                </div>
                                <div className=" flex   md:w-[5.05rem] max-sm:flex-row w-full  ">
                                   {/* Deal Value */}

                                    <div class=" text-xs  font-poppins">
                                     {item.totalProposalValue}
                                    </div>
                                </div>
                                <div className="flex max-sm:justify-between  md:w-[6.81rem] max-sm:flex-row w-full ">
                                     {/* Source */}

                                    <div class="text-xs  font-poppins">

                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className="flex   md:w-[3.2rem]  max-sm:flex-row w-full max-sm:justify-between">
                                         {/* Owner */}               
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
      <div class=" flex  flex-row justify-end items-center w-[7rem] max-sm:flex   max-sm:w-full">                 
                  
                    <Tooltip title="Pulse">
                  <MonitorHeartIcon className=" !text-icon cursor-pointer text-[#df9697]"
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
           <Tooltip title="location" >
                     
                        <div >
                        <span class="cursor-pointer"
              
              onClick={() => {
                handleCurrentContactIdata(item);
                props.handleContactDrawerModal(true);
              }}
            >{user.pulseAccessInd === true && (
              <MonitorHeartIcon className=" !text-icon cursor-pointer text-[#df9697]"/>
            )}
            </span>
                        </div>
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
                    )
                })}
       </InfiniteScroll>
      </div>
      <UpdateContactInvestModal
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
        contactiData={contactiData}
        updateContactInvestModal={updateContactInvestModal}
        handleUpdateContactInvestModal={handleUpdateContactInvestModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />
<AddContactInvestPulseModal
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
 translatedMenuItems={props.translatedMenuItems}
        contactiData={contactiData}
        addDrawerContactInvestPulseModal={addDrawerContactInvestPulseModal}
        handleContactInvestPulseDrawerModal={handleContactInvestPulseDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />  
      <AddContactInvestNotesDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
       translatedMenuItems={props.translatedMenuItems}
        contactiData={contactiData}
        addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
        handleContactInvestPulseDrawerModal={handleContactInvestPulseDrawerModal}
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
  // contactiNVESTbyId: contact.contactiNVESTbyId,
  user: auth.userDetails,
  addDrawerContactInvestPulseModal:contactinvest.addDrawerContactInvestPulseModal,
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
      getContactInvestByUserId,
      handleContactEmailDrawerModal,
      emptyContactInvest,
      handleUpdateContactInvestModal,
      handleContactInvestPulseDrawerModal,
      handleContactInvestNotesDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestCardList);
