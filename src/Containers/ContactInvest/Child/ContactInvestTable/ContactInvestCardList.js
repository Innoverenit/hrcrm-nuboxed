import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip } from "antd";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
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
  handleDealModal,
  getContactInvestByUserId,
  emptyContactInvest,handleUpdateContactInvestModal,handleContactInvestPulseDrawerModal,handleContactAddressDrawerModal} from "../../ContactInvestAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import AddContactInvestPulseModal from "./AddContactInvestPulseModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddContactInvestAdressModal from "./AddContactInvestAdressModal";
import AddContactInvestDealModal from "./AddContactInvestDealModal";
const AddContactInvestNotesDrawerModal = lazy(() =>  import("../AddContactInvestNotesDrawerModal"));
const UpdateContactInvestModal = lazy(() => import("../UpdateContactInvest/UpdateContactInvestModal"));

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
          "110",//0 Name
          "277",//1 Company
           "325",//2Designation
          "326",//3Department
           "1160",//4 Deal
           "526",//5 Deal Value
           "279",// Source
                 
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
      <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex  justify-between max-sm:hidden w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className=" font-bold font-poppins text-xs md:w-[15.32rem]">
        {translatedMenuItems[0]}
        {/* name" */}         
                </div>
        <div className="font-bold font-poppins text-xs md:w-[12.72rem]">
        {translatedMenuItems[1]}
        {/* company */}             
                </div>
        <div className="font-bold font-poppins text-xs md:w-[9.6rem] ">
        {translatedMenuItems[2]} 
        {/* designation */}             
                </div>
        <div className=" font-bold font-poppins text-xs md:w-[11.3rem]">
        {translatedMenuItems[3]} 
        {/* department */}               
                </div>
        <div className="font-bold font-poppins text-xs md:w-[6.1rem]">
        {translatedMenuItems[4]}
        {/* deals" */}           
                </div>
        <div className="font-bold font-poppins text-xs md:w-[7.21rem]"> 
        {translatedMenuItems[5]}
         {/* dealValue" */}              
                </div>
        <div className="font-bold font-poppins text-xs md:w-[5.2rem]">
        {translatedMenuItems[6]}
        {/* source" */}           
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-28 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
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
                                            <Link class="overflow-ellipsis whitespace-nowrap text-[#042E8A] cursor-pointer"  to={`contactinvest/${item.contactId}`} title={item.fullName}>
      {item.fullName}
  </Link>                                               
      
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold"        
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
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center items-center">
                                <div className=" flex max-sm:w-full max-sm:justify-between items-center flex-row  w-[14.01rem]">
                                   {/* Company  */}
                                    <div class=" text-xs  font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[10.5rem] items-center">
                               {/* Designation */}
                                    <div class="text-xs  font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                           
                                <div className=" flex max-sm:w-full max-sm:justify-between  flex-row  w-[12.2rem] items-center">
                                {/* Department */}
                                  <div class="text-xs  font-poppins">
                                       {item.department}
                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center items-center">
                                <div className=" flex   md:w-[5.22rem] max-sm:flex-row w-full  ">
                                    {/* Deals */}
                                    <div class=" text-xs text-blue-500 cursor-pointer  font-poppins"
                                      onClick={() => {
                                        props.handleDealModal(true);
                                        handleCurrentContactIdata(item);
                                      }}
                                    >
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
      <div class=" flex  flex-row justify-evenly items-center w-[7rem] max-sm:flex   max-sm:w-full">                 
                  
                    <Tooltip title="Pulse">
                  <MonitorHeartIcon className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl"
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
               <PhoneInTalkIcon className=" !text-icon cursor-pointer max-sm:!text-xl"/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-1 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
                <PhoneDisabledIcon className="!text-icon text-[gold] max-sm:!text-xl"/>
              </span>
            )}
          </Tooltip>                                             
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon className="!text-icon cursor-pointer text-green-400 max-sm:!text-xl"
              type="mail"
             
              onClick={() => {
                props.getContactById(item.contactId);
                props.handleCurrentContactIdata(true);
              }}
            />
           </Tooltip>
           <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
          onClick={() => {
            props.handleContactAddressDrawerModal(true);
            handleCurrentContactIdata(item);
          }}
          
        /> 
                                                                           
            <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleContactInvestNotesDrawerModal(true);
                  handleCurrentContactIdata(item);
                }}
                className="text-green-500 cursor-pointer !text-icon max-sm:!text-xl "
              />
           </Tooltip>                  
            {user.imInd === true  && user.investorContactUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon
                className="!text-icon cursor-pointer text-[tomato] max-sm:!text-xl"
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
      <AddContactInvestAdressModal      
        item={contactiData}
         type="contact"
        addContactAddressModal={props.addContactAddressModal}
        handleContactAddressDrawerModal={props.handleContactAddressDrawerModal}
      /> 
      <AddContactInvestNotesDrawerModal
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
        contactiData={contactiData}
        addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
        handleContactInvestNotesDrawerModal={handleContactInvestNotesDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
      />  
       <AddContactInvestDealModal
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
        contactiData={contactiData}
        addDrawerDealModal={props.addDrawerDealModal}
        handleDealModal={props.handleDealModal}
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
  addContactAddressModal:contactinvest.addContactAddressModal,
  addDrawerDealModal: contactinvest.addDrawerDealModal
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
      handleContactInvestNotesDrawerModal,
      handleContactAddressDrawerModal,
      handleDealModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestCardList);
