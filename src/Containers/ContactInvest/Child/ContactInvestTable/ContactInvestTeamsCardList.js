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
  getTeamUserList
} from "../../../Contact/ContactAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ScoreIcon from '@mui/icons-material/Score';
import SourceIcon from '@mui/icons-material/Source';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {getTeamsContactInvest,
  handleContactInvestNotesDrawerModal,
  handleDealModal,
  emptyContactInvest,handleUpdateContactInvestModal,handleContactAddressDrawerModal,handleContactInvestPulseDrawerModal} from "../../ContactInvestAction";
import AddContactInvestPulseModal from "./AddContactInvestPulseModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddContactInvestAdressModal from "./AddContactInvestAdressModal";
import AddContactInvestDealModal from "./AddContactInvestDealModal";
import EmptyPage from "../../../Main/EmptyPage";
const AddContactInvestNotesDrawerModal = lazy(() =>
  import("../AddContactInvestNotesDrawerModal")
);
const UpdateContactInvestModal = lazy(() =>
  import("../UpdateContactInvest/UpdateContactInvestModal")
);

function ContactInvestTeamsCardList(props) {

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
    props.getTeamsContactInvest(props.userId,pageNo);
    setPage(pageNo + 1);
    props.getTeamUserList(props.userId)
  }, []);

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
          "279",// 6 Source
           "77",//7 Owner    
           "1581",// Score 8
           "392",//Pulse 9
           "316",// Notes 10
           "185",//Adress 11 
           "170",//Edit 12
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

    const proPag = props.teamsContactInvestData && props.teamsContactInvestData.length && props.teamsContactInvestData[0].pageCount
    setTimeout(() => {
      if (props.teamsContactInvestData) {
        if (pageNo < proPag) {
          setPage(pageNo + 1);
          props.getTeamsContactInvest(props.userId,pageNo);
        }
        if (pageNo === proPag) {
          setHasMore(false)
        }
      }
    }, 100);
  };
  // const handleLoadMore = () => {
  //           setPage(pageNo + 1);
  //           props.getTeamsContactInvest(props.currentUser?props.currentUser:pageNo,
  //           )  ; 
  //           setPage(pageNo + 1);
  // }
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

if (loading) {
  return <div><BundleLoader/></div>;
}

  return (
    <>
    <div className=" flex">
       <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[#eaedf1] mt-1  items-center shadow-[#a3abb980] ">
       <div> Search team Member</div>
        </div>
        <div class="flex flex-col rounded w-[92%]  p-1 h-[73vh] box-content border bg-[#eaedf1] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.teamUserList.map((item,index) =>{
           return (
             <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center flex-no-wrap h-16">
          <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
            <MultiAvatar
                  primaryTitle={item.empName}
                  imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex basis-[100%] overflow-hidden">
          
          <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >
        
          {item.empName}

        </div> 
        </div>
          
       
        </div>
        <div className="flex flex-col max-sm:justify-between ">
          
              <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
              {item.emailId}        </div>
            
          <div>
          <div class="font-medium text-xs ">
       
              <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
              {item.dailCode1} {item.mobileNo}
              </div>
           
            
          </div>
          </div>
          </div>
          
      
       
      </div>
  )
})}
        </div>
        </div>
      <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex  justify-between max-sm:hidden w-[94%]  p-1 bg-transparent font-bold sticky items-end  z-10">
     
      <div className=" font-bold font-poppins w-[20.32rem] text-[#00A2E8] text-base  md:w-[21.32rem]">
        <ContactEmergencyIcon className='!text-base mr-1  '
              />{translatedMenuItems[0]}
        {/* name" */}         
                </div>
        <div className="font-bold font-poppins text-xs w-[12.72rem] md:w-[13.72rem]">
        <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}
        {/* company */}             
                </div>
        <div className="font-bold font-poppins text-xs w-[12.6rem] md:w-[12.6rem] ">
        <i className="fab fa-artstation "></i> {translatedMenuItems[2]} 
        {/* designation */}             
                </div>
        {/* <div className=" font-bold font-poppins text-xs w-[11.3rem] md:w-[11.3rem]">
        <ApartmentIcon className="!text-icon mr-1 "/> {translatedMenuItems[3]} 
        department               
                </div> */}
                  <div className="font-bold font-poppins text-xs w-[5.2rem] md:w-[11.2rem]">
        <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}
        {/* source" */}           
                </div>
        <div className="font-bold font-poppins text-xs w-[10.1rem] md:w-[10.1rem]">
        <CurrencyExchangeIcon className='!text-icon  mr-1  text-[#e4eb2f]' />{translatedMenuItems[4]}
        {/* deals" */}           
                </div>
        {/* <div className="font-bold font-poppins text-xs w-[7.21rem] md:w-[11.21rem]"> 
        {translatedMenuItems[5]}
         dealValue"              
                </div> */}
      
                {props.user.aiInd && (
            <div className="font-poppins font-bold text-xs w-[5.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.81rem]">
               <ScoreIcon className="!text-icon  text-[#f28482]"/>  Score
          
            </div>
            )}
        <div className=" font-bold font-poppins text-xs md:w-[9.8rem]">
        <AccountCircleIcon className="!text-icon   text-[#d64933]"/>    {translatedMenuItems[7]}
        {/* owner             */}
                </div>
          
        {/* <div className="w-12">Action</div> */}

    
      </div>
          <InfiniteScroll
        dataLength={props.teamsContactInvestData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingTeamsContactInvest?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
      >     
       { !props.fetchingTeamsContactInvest && props.teamsContactInvestData.length === 0 ?<EmptyPage />:props.teamsContactInvestData.map((item,index) =>  {
        
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
                      <div className="flex rounded justify-between  bg-white mt-1  py-ygap  items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                              <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                          <div className=" flex   md:w-[15.1rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full max-sm:justify-between  ">
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
                                    <div class=" flex  max-sm:w-full justify-between  md:flex-col">
                                      
                                      <div class="text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                      <Link class="overflow-ellipsis whitespace-nowrap  text-[#042E8A] cursor-pointer"  to={`contactinvest/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>                                               
  &nbsp;&nbsp;
  {date === currentdate ? (
    <span class="text-[tomato]  font-bold text-[0.65rem]">  New </span>
  ) : null} 
                                      </div>
                                      </div>
                                  </Tooltip>
                                  </div>
                                  </div>
                          </div>       
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center items-center">
                          <div className=" flex max-sm:w-full max-sm:justify-between   items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[12.01rem]">
                              {/* Company  */}
                              <div class=" text-xs ml-gap font-poppins">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-full max-sm:justify-between    w-[7.5rem] items-center justify-start h-8 ml-gap bg-[#eef2f9]">
                            {/* Designation */}
                              <div class="text-xs ml-gap font-poppins">
                                   {item.designation}
                              </div>
                          </div>         
                          <div className=" flex max-sm:w-full max-sm:justify-between    w-[8.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9]">
                          {/* Department */}
                            <div class="text-xs ml-gap font-poppins">
                                 {item.department}
                            </div>
                        </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center items-center">
                    
                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[10.22rem] max-sm:w-full  ">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[7.22rem] max-sm:w-full  ">
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
                                <div className=" flex   md:w-[7.05rem] max-sm:w-full items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                                   {/* Deal Value */}

                                    <div class=" text-xs  font-poppins">
                                     {item.totalProposalValue}
                                    </div>
                                </div>
                                </div>
                        
                          {/* Score */}
                          {props.user.aiInd && (
           <div className=" flex    items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.12rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:  ">
            {item.noteScoreInd}
          
            </div>
            )}                   
                          <div className="flex items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[4rem]  max-sm:w-full max-sm:justify-between">             
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
             </div>   
                           
                  <div class=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9] w-wk  max-sm:flex   max-sm:w-full">
                  <div>
     <Tooltip title=     {translatedMenuItems[9]}>
 <MonitorHeartIcon
 className=" !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl"
            onClick={() => {
            handleContactInvestPulseDrawerModal(true);
            handleCurrentContactIdata(item);
          }}        
        />
     </Tooltip>
     </div>
                                            
                <div>
              <Tooltip title=     {translatedMenuItems[10]}>
 <NoteAltIcon
            onClick={() => {
            props.handleContactInvestNotesDrawerModal(true);
            handleCurrentContactIdata(item);
          }}
          className="text-green-800 cursor-pointer !text-icon max-sm:!text-xl"
        />
     </Tooltip>
     </div>
     <Tooltip title=     {translatedMenuItems[11]}>
     <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
            onClick={() => {
            props.handleContactAddressDrawerModal(true);
            handleCurrentContactIdata(item);
          }}
          
        />
        </Tooltip>
                    <div>
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
    </div>
    <div>
                  <Tooltip title={item.emailId}>
     
      <MailOutlineIcon className="!text-icon cursor-pointer text-green-800 max-sm:!text-xl"
        type="mail" 
       
          onClick={() => {
          props.getContactById(item.contactId);
          props.handleCurrentContactIdata(true);
        }}
      />
     </Tooltip>
     </div>      
   
     
     <div>
      {user.imInd === true  && user.investorContactUpdateInd === true &&  (
      <Tooltip title=     {translatedMenuItems[12]}>
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
                  </div>
                    )
                })}
       </InfiniteScroll>
      </div>
</div>
      <UpdateContactInvestModal
        contactiData={contactiData}
        updateContactInvestModal={updateContactInvestModal}
        handleUpdateContactInvestModal={handleUpdateContactInvestModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
      />   
      <AddContactInvestNotesDrawerModal
        contactiData={contactiData}
        addDrawerContactInvestNotesModal={addDrawerContactInvestNotesModal}
        handleContactInvestNotesDrawerModal={handleContactInvestNotesDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AddContactInvestPulseModal
        contactiData={contactiData}
        addDrawerContactInvestPulseModal={addDrawerContactInvestPulseModal}
        handleContactInvestPulseDrawerModal={handleContactInvestPulseDrawerModal}
        handleCurrentContactIdata={handleCurrentContactIdata}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
      />
      <AddContactInvestAdressModal     
        item={contactiData}
         type="contact"
        addContactAddressModal={props.addContactAddressModal}
        handleContactAddressDrawerModal={props.handleContactAddressDrawerModal}
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
  contactinvest,
  customer
}) => ({
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  user: auth.userDetails,
  addDrawerContactInvestNotesModal:contactinvest.addDrawerContactInvestNotesModal,
  fetchingTeamsContactInvest: contactinvest.fetchingTeamsContactInvest,
  fetchingContactsInvestError: contactinvest.fetchingContactsInvestError,
  updateContactInvestModal: contactinvest.updateContactInvestModal,
  designations: designations.designations,
  departments: departments.departments,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  contactiNVESTbyId: contactinvest.contactiNVESTbyId,
  allContactInvestData:contactinvest.allContactInvestData,
  teamsContactInvestData:contactinvest.teamsContactInvestData,
  addContactAddressModal:contactinvest.addContactAddressModal,
  addDrawerDealModal: contactinvest.addDrawerDealModal,
  addDrawerContactInvestPulseModal:contactinvest.addDrawerContactInvestPulseModal,
  teamUserList:customer.teamUserList
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
      getTeamsContactInvest,
      handleUpdateContactInvestModal,
      handleContactInvestNotesDrawerModal,
      handleContactInvestPulseDrawerModal,
      handleContactAddressDrawerModal,
      handleDealModal,
      getTeamUserList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestTeamsCardList);
