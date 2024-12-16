import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import dayjs from "dayjs";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ContactsIcon from '@mui/icons-material/Contacts';
import ScoreIcon from '@mui/icons-material/Score';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
  // getAllCustomerlIST,
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
  handleContactCETdrawer,
  emptyContact,
  handleHospitalUploadModal,
  handleContactPulseDrawerModal,
  handleContactAddressDrawerModal,
  getTeamUserList,
  updateContact
} from "../../ContactAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import ReactContactSpeechModal from "../ContactDetail/ReactContactSpeechModal";
import AddContactDrawerModal from "../UpdateContact/AddContactDrawerModal";
import AddContactEmailDrawerModal from "../UpdateContact/AddContactEmailDrawerModal";
import AddContactNotesDrawerModal from "../AddContactNotesDrawerModal";
import AddContactPulseDrawerModal from "./AddContactPulseDrawerModal";
import { Input, Tooltip, Select } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddContactAddressDrawerModal from "./AddContactAddressDrawerModal";
import relativeTime from 'dayjs/plugin/relativeTime';
import EmptyPage from "../../../Main/EmptyPage";
import ContactCETdrawer from "./ContactCETdrawer";
import {getCustomerData} from "../../../Customer/CustomerAction";

const Option = Select;

dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); 
    }
};
function ContactAllCardList(props) {

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
    props.getAllContact(page,"Customer");
    setPage(page + 1);
    props.getTeamUserList(props.userId)
    // props.getAllCustomerlIST(page,props.filter?props.filter:"creationdate");
  }, []);

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
          '77', // 7
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
        //       props.getAllCustomerlIST( page,
        // props.filter?props.filter:"creationdate"
            props.getAllContact(page,
              "Customer"
              );
  }

  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
  }

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
    fetchingAllContacts,
    allContacts,
    handleHospitalUploadModal
  } = props;

if (loading) {
  return <div><BundleLoader/></div>;
}
  return (
    <>
      <div className=" flex">
      <div className=' flex flex-col rounded w-[13%] h-[85vh]  border border-[#0000001f] items-center justify-center  '>
      <div class="flex  rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
      <div className="w-[14vw]"  > Search team Member</div>
        </div>
        <div class="flex flex-col rounded w-[11vw] p-1 h-[73vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.crmAllData.map((item,index) =>{
           return (
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] mt-1 max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center  h-16">
          <div class=" flex  mr-[0.2rem] h-15" >
            <MultiAvatar
              // primaryTitle={item.opportunityName}
              // imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex overflow-hidden">        
          <div class="font-semibold font-poppins text-[#337df4] text-lm truncate  cursor-pointer  " >
          {item.empName}
        </div> 
        </div>            
        </div>
        <div className="flex flex-col max-sm:justify-between ">      
              <div class="overflow-hidden font-poppins text-ellipsis text-lm truncate  cursor-pointer flex items-center">
                  </div>
                  {item.email} 
          <div>
          <div class="font-medium text-xs ">   
              <div class="overflow-hidden font-poppins  text-ellipsis text-lm truncate cursor-pointer  flex items-center">
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
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" max-sm:hidden flex justify-between w-[94%]  max-lg:w-[89%] max-xl:w-[96%] p-1 bg-transparent   sticky  z-10">
        <div class=" flex justify-between w-[95%] font-bold font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm items-end ">
        <div className=" w-[36.1rem] truncate text-[#00A2E8] text-sm  max-xl:w-[21.5rem] max-lg:w-[20.5rem]">
        <ContactsIcon className="!text-icon mr-1 "/>{translatedMenuItems[0]}</div>
        <div className=" w-[22.7rem] truncate  max-xl:w-[6.1rem] max-lg:w-[8.1rem]">
        <ApartmentIcon className="!text-icon "/> {translatedMenuItems[1]}</div>
        <div className=" max-md:w-[10.1rem] truncate w-[17.1rem]  max-xl:w-[10.11rem]">
        <DesignServicesIcon className="!text-icon mr-1 text-[#b744b8]"/>
            {translatedMenuItems[2]}</div>
        <div className="  max-md:w-[9.1rem]  truncate w-[17.2rem]  max-xl:w-[10.1rem] max-lg:w-[7.1rem]">
        <ApartmentIcon className="!text-icon text-[#f0386b] "/>  {translatedMenuItems[3]}</div>
        <div className=" max-md:w-[10.2rem] truncate w-[15.2rem]  max-xl:w-[7.2rem] max-lg:w-[10.2rem]">
        <LightbulbIcon className="!text-icon truncate  text-[#84a59d]"/> {translatedMenuItems[4]}</div> 
        <div className=" w-[14.11rem] max-md:w-[8.11rem] truncate  max-xl:w-[7.1rem] max-lg:w-[8.1rem]">
        <RadioButtonCheckedIcon className="!text-icon  text-[#f28482]"/>   {translatedMenuItems[6]}</div>
        {props.user.aiInd && (
            <div className=" truncate  w-[11.81rem] max-md:w-[5.81rem] max-xl:w-[3.81rem]">
             <ScoreIcon className="!text-icon mr-1 text-[#f28482]"/>{translatedMenuItems[8]}   {/* Score */}        
            </div>
            )}            
               <div className=" w-[8.1rem] max-md: w-[6.1rem] max-xl:w-[6.12rem] max-lg:w-[3.12rem]">
               <AccountCircleIcon className="!text-icon truncate  text-[#f28482]"/> {translatedMenuItems[7]} </div>     
        <div className="w-[4.2rem]"></div>
        </div>
      </div>
          <InfiniteScroll
        dataLength={allContacts.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllContacts?<div class="flex justify-center">Loading...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
      >      
        { !fetchingAllContacts && allContacts.length === 0 ?<EmptyPage/>:allContacts.map((item,index) =>  {     
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
                className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >                              
                          <div className=" flex   w-[18rem] max-sm:flex-row border-l-2 border-green-500 bg-[#eef2f9]  max-sm:justify-between max-sm:w-wk  ">
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
    &nbsp;
    <div class="max-sm:w-full  flex items-center">
                                  <Tooltip>
                                  <div class=" flex max-sm:w-full justify-between w-full md:flex-col">                                  
                                      <div class="flex items-center text-xs  text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                      <Link class="flex  items-center overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 max-sm:text-sm  text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
{item.fullName}
</Link>                                               
  
  {date === currentdate ? (
 <div class="text-[0.65rem]  text-[tomato] font-bold"                          
 >
    {translatedMenuItems[9]}  {/* New */}
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
                          <div class="flex max-sm:justify-between max-sm:w-wk">
                          <div className=" flex  max-sm:w-auto  w-[11.01rem] items-center  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-xl:w-[5.5rem] max-lg:w-[4.8rem]  max-sm:justify-between ">                  
                              <div class=" text-xs ml-gap font-poppins max-sm:text-sm  max-lg:max-w-[10ch] truncate">   
                              {item.tagWithCompany}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-auto w-[8.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.6rem] max-lg:w-[3.01rem] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="text-xs ml-gap font-poppins max-sm:text-sm ">
                                   {item.designation}
                              </div>
                          </div>
                          <div className=" flex max-sm:w-auto w-[8.3rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.3rem] max-lg:w-[4.2rem]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-xs ml-gap max-sm:text-sm font-poppins ">
                                 {item.department}
                            </div>
                        </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk">
                        <div className="flex  w-[7.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
                        <div className="flex  w-[3.01rem] items-center justify-center h-8 ml-gap max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">
<div className="text-xs  font-poppins text-center max-sm:text-sm ">
{item.oppNo}
</div>
</div>
<div className=" flex  w-[3.01rem] items-center justify-center h-8 ml-gap  max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                              

                              <div class=" text-xs  max-sm:text-sm font-poppins text-center ">
                              {item.totalProposalValue}

                              </div>
                          </div>
                          </div>
                          <div className="flex items-center justify-center   w-[6.5rem] ml-gap bg-[#eef2f9] h-8 max-xl:w-[3.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                          
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
                          </div>
                          <div class="flex items-center max-sm:justify-between max-sm:w-wk">
                          {props.user.aiInd && (
           <div className=" flex    text-xs w-[5.12rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
            {item.noteScoreInd}
          
            </div>
            )}                   
                          <div className="flex w-[3.01rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-wk  max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3.01rem]  max-sm:justify-between">
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
             <div className=" flex items-center w-[5rem]  justify-center h-8 ml-gap bg-[#eef2f9] mr-1 max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>       
               </div>

               <div class="flex max-sm:justify-between max-sm:w-wk items-center">        
               <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
              <Tooltip title={translatedMenuItems[13]}>
       <NoteAltIcon
            className=" !text-icon cursor-pointer text-green-800"
               onClick={() => {
               handleContactNotesDrawerModal(true);
               handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>
     </div>
     <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
              <Tooltip title={translatedMenuItems[12]}>
 <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
            onClick={() => {
            props.handleContactAddressDrawerModal(true);
            handleSetCurrentContact(item);
          }}
          
        />
     </Tooltip>
     </div> 
     <div className="bg-[#eef2f9] h-8  items-center justify-center flex">
                <Tooltip
                  title={translatedMenuItems[14]}
                >
                  <HourglassFullIcon
                  className="!text-icon cursor-pointer text-blue-500"
                      onClick={() => {
                      props.handleContactCETdrawer(true);
                      handleSetCurrentContact(item);
                    }}
                  />
                </Tooltip>
              </div>                    
              <div class="rounded-full  cursor-pointer items-center justify-center  bg-[#eef2f9] h-8  flex">
              <Tooltip title={item.mobileNo} >
      {item.doNotCallInd !== true && (
        <span class="  text-xs cursor-pointer"
            onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
         <PhoneInTalkIcon     className=" !text-icon cursor-pointer text-[blue]"/>
        </span>
      )}
      {item.doNotCallInd === true && (
        <span class=" text-xs cursor-pointer"
            onClick={() => {
            props.handleDonotCallModal(true);
            handleSetCurrentContactId(item);
          }}
        >
          <PhoneDisabledIcon   className=" !text-icon"/>
        </span>
      )}
    </Tooltip>
                  </div>
             <div class=" items-center justify-center  bg-[#eef2f9] h-8  flex">
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
      {/* <div class=" items-center justify-center  bg-[#eef2f9] h-8  flex">
         <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                     
                        tooltiptitle={translatedMenuItems[16]}
                          onClick={() => {
                          handleSetCurrentContactId(item);
                          handleHospitalUploadModal(true)}}                          
                      /></div>            */}
                </div>
                      </div>
                  </div>
                    )
                })}
                      </InfiniteScroll>
      </div>
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
    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  designations,
  departments,
  opportunity,
  leads
}) => ({
  crmAllData:leads.crmAllData,
  userId: auth.userDetails.userId,
  allContacts: contact.allContacts,
  user: auth.userDetails,
  addDrawerContactAddressModal:contact.addDrawerContactAddressModal,
  addDrawerContactPulseModal:contact.addDrawerContactPulseModal,
   fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  addDrawerContactNotesModal:contact.addDrawerContactNotesModal,
  designations: designations.designations,
  departments: departments.departments,
  contactCETdrawer:contact.contactCETdrawer,
  addDrawerContactEmailModal: contact.addDrawerContactEmailModal,
  addContactSpeechModal: contact.addContactSpeechModal,
  addDrawerContactModal: contact.addDrawerContactModal,
  fetchingAllContacts:contact.fetchingAllContacts
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAllCustomerlIST,
      getAllContact,
      handleContactCETdrawer,
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
      handleContactAddressDrawerModal,
      handleHospitalUploadModal,
      getCustomerData,
      getTeamUserList,
      updateContact,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactAllCardList);
