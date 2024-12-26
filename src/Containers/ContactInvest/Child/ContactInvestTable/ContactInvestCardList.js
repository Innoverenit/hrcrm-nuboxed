import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {Input,  Tooltip } from "antd";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import {
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactEmailDrawerModal,
  getTeamUserList,
  updateContact
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
import { BundleLoader } from "../../../../Components/Placeholder";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ScoreIcon from '@mui/icons-material/Score';
import SourceIcon from '@mui/icons-material/Source';
import {getCustomerData} from "../../../Customer/CustomerAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";

const AddContactInvestPulseModal= lazy(() =>  import("./AddContactInvestPulseModal"));
const AddContactInvestAdressModal = lazy(() =>  import("./AddContactInvestAdressModal"));
const AddContactInvestDealModal = lazy(() =>  import("./AddContactInvestDealModal"));
const EmptyPage = lazy(() =>  import("../../../Main/EmptyPage"));
const AddContactInvestNotesDrawerModal = lazy(() =>  import("../AddContactInvestNotesDrawerModal"));


function ContactInvestCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState("");
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dtouched, setDTouched] = useState(false);

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
           "392",//Pulse
           "316",// Notes
           "185",//Adress
           "170",//Edit 10
           "1581",//score 11
                 
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
    addDrawerContactInvestNotesModal,
    handleUpdateContactInvestModal,
    addDrawerContactInvestPulseModal,
    handleContactInvestPulseDrawerModal,
    handleContactInvestNotesDrawerModal
  } = props;

  const handleEditRowField = (contactId, field, currentValue) => {
    setEditableField({ contactId, field });  
    setEditingValue(currentValue);  
  };
  const handleChangeRowItem = (e) => {
    setEditingValue(e.target.value);
  };
  const handleUpdateSubmit = async () => {
    const { contactId, field } = editableField;
    const updatedData = {};
    let mappedField = field;
    if (field === 'fullName') {
      mappedField = 'name'; 
    } else if (field === 'tagWithCompany') {
      mappedField = 'customerId';
    } else if (field === 'designation') {
      mappedField = 'designationTypeId';
    } else if (field === 'department') {
      mappedField = 'departmentId';
    }
    updatedData[mappedField] = editingValue;
    props.updateContact(updatedData,contactId)
    setEditableField(null);
      setEditingValue("");
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdateSubmit(); 
    }
  };
  const handleChangeRowSelectItem = async (value) => {
    setEditingValue(value);

      const { contactId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
    
     // Map the field to the correct key if needed
     if (field === 'fullName') {
      mappedField = 'name'; 
    } else if (field === 'tagWithCompany') {
      mappedField = 'customerId';
      } else if (field === 'designation') {
        mappedField = 'designationTypeId';
      } else if (field === 'department') {
        mappedField = 'departmentId';
      }
      updatedData[mappedField] = value; // Update the value with selected option
      props.updateContact(updatedData,contactId)
      setEditableField(null);
      setEditingValue("");
    
  };

  const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
      props.getDesignations();
      setTouchedCustomer(true);
    }
  };
  const handleSelectCustomerDataFocus = () => {
    if (!touched) {
      props.getCustomerData(props.userId)
      setTouched(true);
    }
  };
  const handleSelectDepartmentFocus = () => {
    if (!dtouched) {
      props.getDepartments()
      setDTouched(true);
    }
  };

  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>     
      <div class="rounded max-sm:m-1 m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex  justify-between max-sm:hidden w-[94%]  p-1 bg-transparent  font-poppins font-bold !text-lm sticky z-10">
          <div className=" flex justify-between items-end  w-[97%]">
        <div className="  w-[15.9rem] truncate text-[#00A2E8] text-sm max-md:w-[18.32rem]">
        <ContactEmergencyIcon className='!text-icon mr-1  text-[#00A2E8] '
              />{translatedMenuItems[0]}
        {/* name" */}         
                </div>
        <div className=" w-[15.72rem] truncate max-md:w-[13.72rem]">
        <ApartmentIcon className="!text-icon  text-[#f0386b]"/> {translatedMenuItems[1]}
        {/* company */}             
                </div>
        <div className=" w-[11.6rem] truncate max-md:w-[12.6rem] ">
        <i className="fab fa-artstation  text-[#b744b8]"></i> {translatedMenuItems[2]} 
        {/* designation */}             
                </div>

                    <div className=" w-[13.2rem] truncate max-md:w-[11.2rem]">
        <SourceIcon className="!text-icon  text-[#4b5043]"/> {translatedMenuItems[6]}
        {/* source" */}           
                </div>
        <div className=" w-[12.4rem] truncate max-md:w-[10.1rem]">
        <CurrencyExchangeIcon className='!text-icon  mr-1  text-[#84a59d]' />{translatedMenuItems[4]}
        {/* deals" */}           
                </div> 
                {props.user.aiInd && (
            <div className=" w-[9.81rem] truncate max-md:w-[5.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
               <ScoreIcon className="!text-icon  text-[#f28482]"/>
               {translatedMenuItems[11]}
                 {/* Score */}
          
            </div>
            )}
       {/* Action */}
      </div>
      </div>
          <InfiniteScroll
        dataLength={contactiNVESTbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContactsInvest?<div><BundleLoader/></div>:null}
        height={"83vh"}
        endMessage={<div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        style={{scrollbarWidth:"thin"}}
      >
       
       { !fetchingContactsInvest && filterData.length === 0 ?<EmptyPage />:filterData.map((item,index) =>  {
        
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
              className="flex rounded justify-between  py-ygap bg-white mt-1  items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-28 max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex  md:w-[15.1rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full max-sm:justify-between  ">
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
                                          <div class=" flex  max-sm:w-full w-[100%] justify-between  md:flex-col">
                                            
                                            <div class="text-xs flex text-blue-500 justify-between font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap text-xs text-[#042E8A] cursor-pointer"  to={`/contactinvest/${item.contactId}`} title={item.fullName}>
      {item.fullName}
  </Link>                                               
      
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-[tomato] text-[0.65rem]  font-bold"        
          >
            New
          </span>
        ) : null}    
         <div>
  {editableField?.contactId === item.contactId &&
editableField?.field === 'fullName' ? (
<Input
type="text"
className="h-7 w-[4rem] text-xs"
value={editingValue}
onChange={handleChangeRowItem}
onBlur={handleUpdateSubmit}
onKeyDown={handleKeyDown} 
autoFocus
/>
) : (
<div onClick={() => 
handleEditRowField(item.contactId, 'fullName', item.fullName)} 
className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100">
<BorderColorIcon  className=" !text-icon cursor-pointer"/>

</div> 
)}                 
  </div>
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>                     
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center items-center">
                                <div className=" flex max-sm:w-full max-sm:justify-between items-center  h-8 ml-gap bg-[#eef2f9] w-[15.01rem]">
                                   {/* Company  */}
                                    <div class=" text-xs  ml-gap font-poppins">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex max-sm:w-full max-sm:justify-between  h-8 ml-gap bg-[#eef2f9]  w-[12.5rem] items-center">
                               {/* Designation */}
                                    <div class="text-xs  ml-gap font-poppins">
                                         {item.designation}
                                    </div>
                                </div>
                                                 
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center items-center">
                              <div className="flex w-[12.81rem] max-sm:justify-between items-center justify-center h-8 ml-gap bg-[#eef2f9] max-md:w-[12.81rem] max-sm:w-full ">
                                     {/* Source */}

                                    <div class="text-xs  ml-gap font-poppins">

                                    </div>
                                </div>
                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[11.8rem] max-md:w-[12.22rem] max-sm:w-full  ">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.22rem] max-md:w-[7.22rem] max-sm:w-full  ">
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
                                <div className=" flex w-[7.05rem]  max-md:w-[7.05rem] max-sm:w-full items-center justify-center h-8 ml-gap bg-[#eef2f9] ">
                                   {/* Deal Value */}

                                    <div class=" text-xs  font-poppins">
                                     {item.totalProposalValue}
                                    </div>
                                </div>
                                </div>
                             
                                {props.user.aiInd && (
           <div className=" flex  justify-center  w-[9.12rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:  ">
            {item.noteScoreInd}
          
            </div>
            )}                           
                               
                   </div>
                 
      <div class=" flex  items-center marker:items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7rem] max-sm:flex   max-sm:w-full">                 
                  
                    <Tooltip title= {translatedMenuItems[7]}>
                  <MonitorHeartIcon className="flex !text-icon cursor-pointer text-[#df9697] max-sm:!text-xl"
                     onClick={() => {
                  handleContactInvestPulseDrawerModal(true);
                  handleCurrentContactIdata(item);
                }}
                    />
                   </Tooltip>
                   <Tooltip title={translatedMenuItems[8]}>
       <NoteAltIcon
                  onClick={() => {
                  props.handleContactInvestNotesDrawerModal(true);
                  handleCurrentContactIdata(item);
                }}
                className="flex text-green-800 cursor-pointer !text-icon max-sm:!text-xl "
              />
           </Tooltip> 
           <Tooltip title= {translatedMenuItems[9]}>
                   <AddLocationAltIcon
          className="flex !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-xl"
            onClick={() => {
            props.handleContactAddressDrawerModal(true);
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
               <PhoneInTalkIcon className="flex !text-icon cursor-pointer max-sm:!text-xl"/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-1 text-xs cursor-pointer"
                  onClick={() => {
                  props.handleDonotCallModal(true);
                  handleCurrentContactIdata(item);
                }}
              >
                <PhoneDisabledIcon className="flex !text-icon text-[gold] max-sm:!text-xl"/>
              </span>
            )}
          </Tooltip>                                             
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon className="flex !text-icon cursor-pointer text-green-800 max-sm:!text-xl"
              type="mail"
             
                onClick={() => {
                props.getContactById(item.contactId);
                props.handleCurrentContactIdata(true);
              }}
            />
           </Tooltip>
                                      
                      </div>                                         
            
            </div>
                            </div>                 
                    )
                })}
       </InfiniteScroll>
      </div>
      <Suspense fallback={<BundleLoader />}>
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
      </Suspense> 
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
      handleDealModal,
      getTeamUserList,
      updateContact,
      getCustomerData,
      getDepartments
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestCardList);
