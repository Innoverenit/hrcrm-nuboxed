import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { Input, Tooltip, Select } from "antd";
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ScoreIcon from '@mui/icons-material/Score';
import {getCustomerData} from "../../../Customer/CustomerAction";
import {
  getContactListByUserId,
  handleUpdateContactModal,
  handleContactReactSpeechModal,
  setEditContact,
  updateOwnercontactById,
  getContactById,
  handleDonotCallModal,
  handleContactDrawerModal,
  handleContactAddressDrawerModal,
  handleContactEmailDrawerModal,
  handleContactNotesDrawerModal,
  emptyContact,
  handleContactPulseDrawerModal,
  handleContactCETdrawer,
  getTeamUserList,
  updateContact
} from "../../ContactAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddContactNotesDrawerModal from "../AddContactNotesDrawerModal";
import AddContactPulseDrawerModal from "./AddContactPulseDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddContactAddressDrawerModal from "../ContactTable/AddContactAddressDrawerModal"
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmptyPage from "../../../Main/EmptyPage";


const ContactCETdrawer =lazy(()=>import("./ContactCETdrawer"));
 
const Option = Select;


function ContactCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState("");
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dtouched, setDTouched] = useState(false);
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
    props.getTeamUserList(props.userId)
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
          "1581", // Score
         "100", // New
        "1592", // "Provided"
         "1593", // Not Provided
         "185", // Address"
         "316", // Notes
       "1165",   // Activity"
        "170",  // "Edit
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
    contactCETdrawer
  } = props;
  
  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
      
      
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" max-sm:hidden flex justify-between w-[96%]  max-lg:w-[89%] max-xl:w-[96%] p-1 bg-transparent font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]  font-bold sticky  z-10">
      <div class=" flex justify-between w-[100%] font-bold  font-poppins !text-lm items-end ">
        <div className=" w-[27.4rem] text-[#00A2E8] truncate max-md:w-[21.9rem]  text-sm max-xl:w-[21.5rem] max-lg:w-[20.5rem]">
        <ContactsIcon className="!text-icon mr-1 "/>
        {translatedMenuItems[0]}</div>
        <div className=" w-[30.1rem] truncate max-md:w-[29.1rem] max-xl:w-[6.1rem] max-lg:w-[8.1rem]">
        <ApartmentIcon className="!text-icon  "/> {translatedMenuItems[1]}</div>
         {/* Company */}
        <div className="w-[25.4rem] max-md:w-[24.1rem] truncate  max-xl:w-[10.11rem]">
        <i className="fab fa-artstation mr-1 text-[#b744b8]"></i>
        {translatedMenuItems[2]}</div>
        {/* Designation */}
        <div className="w-[26.7rem] truncate max-md:w-[24.1rem]  max-xl:w-[10.1rem] max-lg:w-[7.1rem]">
        <ApartmentIcon className="!text-icon text-[#f0386b] "/> {translatedMenuItems[3]}</div>
        {/* Department */}
        <div className="w-[15.2rem] max-md:w-[15.2rem] truncate max-xl:w-[7.2rem] max-lg:w-[10.2rem]">
        <LightbulbIcon className="!text-icon text-[#84a59d]"/> {translatedMenuItems[4]}</div>
         {/* Quotation */}
        {/* <div className=" md:w-[12.3rem]  max-xl:w-[5.3rem] max-lg:w-[8.3rem]">
        <FilterAltIcon className="!text-icon mr-1 text-[#ff66b3]"/> {translatedMenuItems[5]}</div> */}
        {/* Pipeline */}
        <div className=" w-[13.11rem] truncate max-md:w-[13.11rem] max-xl:w-[7.1rem] max-lg:w-[8.1rem]">
        <RadioButtonCheckedIcon className="!text-icon  text-[#f28482]"/> {translatedMenuItems[6]}</div>
           {/* Portal Access */}
        {props.user.aiInd && (
            <div className=" w-[8.81rem] truncate max-md:w-[13.81rem]  max-xl:w-[3.81rem]">
                     {/* Score */}      <ScoreIcon className="!text-icon  text-[#f28482]"/>  {translatedMenuItems[7]} 
          
            </div>
            )}   
        <div className="w-[7.2rem]"></div>
        </div>

      </div>
          <InfiniteScroll
        dataLength={contactByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingContacts?<div class="flex justify-center">Loading ...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
      >
        
        { !fetchingContacts && filterData.length === 0 ?<EmptyPage/>:filterData.map((item,index) =>  {
        
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
                     
          <div className="flex rounded justify-between  bg-white mt-1 items-center  max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                               
      <div className=" flex   w-[18rem] max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9] max-sm:justify-between max-sm:w-wk  ">
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
  
    <div class="max-sm:w-full flex items-center">
                                  <Tooltip>
                                    <div class=" flex max-sm:w-full justify-between  md:flex-col">
                                    
                                      <div class="text-xs flex items-center text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                      <Link class="overflow-ellipsis whitespace-nowrap h-8 flex  items-center text-xs p-1 max-sm:text-sm  text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>   

{date === currentdate ? (
 <div class="text-[0.65rem]   text-[tomato] font-bold"
                            
 >
      {/* New */}{translatedMenuItems[8]}
    </div>
  ) : null}                                            
<div>
                      {editableField?.contactId === item.contactId &&
   editableField?.field === 'fullName' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.contactId, 'fullName', item.fullName)} 
    className="cursor-pointer text-xs font-poppins flex items-center">
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
                          <div class="flex max-sm:justify-between max-sm:w-wk">

                          <div className=" flex  max-sm:w-auto items-center  h-8 ml-gap  w-[16.01rem] bg-[#eef2f9] max-sm:flex-row max-xl:w-[5.5rem] max-lg:w-[4.8rem]  max-sm:justify-between ">
                             
                              <div class=" text-xs ml-gap font-poppins max-sm:text-sm  max-lg:max-w-[10ch] truncate">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex  max-sm:w-auto items-center  h-8 ml-gap w-[13.2rem] bg-[#eef2f9]  max-xl:w-[5.6rem] max-lg:w-[3.01rem] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="text-xs  ml-gap font-poppins max-sm:text-sm ">
                                   {item.designation}
                              </div>
                          </div>
                          <div className=" flex   max-sm:w-auto items-center  w-[14.3rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[5.3rem] max-lg:w-[4.2rem]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-xs  ml-gap max-sm:text-sm font-poppins ">
                                 {item.department}
                            </div>
                        </div>
                        </div>
                        <div class="flex max-sm:justify-evenly max-sm:w-wk">
                        <div className=" flex items-center justify-center   w-[8.01rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                        <div className="flex items-center justify-center   w-[3.01rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">

<div className="text-xs font-poppins text-center max-sm:text-sm ">
{item.oppNo}
</div>
</div>
<div className=" flex items-center justify-center   w-[3.01rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                              

                              <div class=" text-xs  max-sm:text-sm font-poppins text-center ">
                              {item.totalProposalValue}

                              </div>
                          </div>
</div>
                          <div className="flex items-center justify-center   w-[7.1rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[3.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                          
                          <div class="flex items-center text-xs font-poppins w-wk h-8  max-sm:text-sm ">

                          {item.thirdPartyAccessInd === true
?<Tooltip title={translatedMenuItems[9]}>
  <div className="flex text-green-600 w-wk font-bold bg-green-100 justify-center   py-1 rounded max-h-max">
  Yes
  </div>
  {/* <AlarmOnIcon   className=" !text-xl text-[green]"/> */}
  </Tooltip> 
:  <Tooltip title={translatedMenuItems[10]}> 
  <div className="flex text-red-600 w-wk font-bold bg-red-100 justify-center   py-1 rounded max-h-max">
No
</div>
{/* <DoNotDisturbOnTotalSilenceIcon  className=" !text-xl text-[red]"/> */}
</Tooltip>}

                          </div>
                      </div>
                          {props.user.aiInd && (
           <div className=" flex   items-center justify-center   w-[5.12rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
           {item.noteScoreInd}
          
            </div>
            )}                   
                          </div>     
             <div class="flex  items-center justify-center max-sm:justify-between max-sm:w-wk">      
              <div class=" items-center justify-center bg-[#eef2f9] h-8  flex">
              <Tooltip title={translatedMenuItems[12]}>
 <NoteAltIcon
          className=" !text-icon cursor-pointer text-green-800"
            onClick={() => {
            handleContactNotesDrawerModal(true);
            handleSetCurrentContact(item);
          }}         
        />
     </Tooltip>
     </div>
     <div class=" items-center justify-center bg-[#eef2f9] h-8  flex">
              <Tooltip title={translatedMenuItems[11]}>
 <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleContactAddressDrawerModal(true);
            handleSetCurrentContact(item);
          }}        
        />
     </Tooltip>
     </div>
<div class=" items-center justify-center bg-[#eef2f9] h-8  flex">
                <Tooltip
                  title={translatedMenuItems[13]}
                >
                  <HourglassFullIcon
                 className="text-blue-500 cursor-pointer !text-icon"
                      onClick={() => {
                      props.handleContactCETdrawer(true);
                      handleSetCurrentContact(item);
                    }}
                  />
                </Tooltip>
              </div>                    
              <div class=" items-center justify-center bg-[#eef2f9] h-8  flex" >
              <Tooltip title={item.mobileNo} >
      {item.doNotCallInd !== true && (
        <span 
            onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
         <PhoneInTalkIcon     className=" !text-icon cursor-pointer text-[blue]"/>
        </span>
      )}
      {item.doNotCallInd === true && (
        <span
            onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
          <PhoneDisabledIcon  className=" !text-icon cursor-pointer text-[blue]"/>
        </span>
      )}
    </Tooltip>
                  </div>
               <div class=" items-center justify-center bg-[#eef2f9] h-8  flex">
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
                 
                </div>
                      </div>
                  </div>
                    )
                })}
                      </InfiniteScroll>
      </div>

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
      <ContactCETdrawer
        currentContact={currentContact}
        contact={currentContact.contactId}
        type="contact"
        contactCETdrawer={props.contactCETdrawer}
        handleContactCETdrawer={props.handleContactCETdrawer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
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
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  user: auth.userDetails,
  addDrawerContactAddressModal:contact.addDrawerContactAddressModal,
  addDrawerContactPulseModal:contact.addDrawerContactPulseModal,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
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
      handleContactCETdrawer,
      handleContactAddressDrawerModal,
      getCustomerData,
      getTeamUserList,
      updateContact,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCardList);
