import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {  Tooltip, Select,Button,Input } from "antd";
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";
import {
  getContactListByCustomerId,
  setEditCustomerContact,
  handleUpdateCustomerContactModal,
  putCustomerContactToggle,updateCustomerContact
} from "../../../../CustomerAction";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const EmptyPage = lazy(() => import("../../../../../Main/EmptyPage"));
const ContactReportData = lazy(() => import("./ContactReportData"));



const Option = Select;



function LinkedContact(props) {
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       "110", //  "Name ",//0
       "140", //   "Email",//1
       "546", //   "Mobile",//2      
       "326", //   "Department",//3
       "325", //   "Designation",//4
       "1350", //   "Portal",//5
       "100", // New 6
       "170", // "Edit"7
       "1345", //  "Do you wish to detach?"8
       "1346", //  "Detach Contact"9
       "1347", //  Login Applied10
       "1348", //  Login Approved11
       "1349", // Apply For Login12
     "1440" //  Update Contact13
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props.getContactListByCustomerId(props.uniqueId,props.type);
    // setPage(page + 1);
  }, []);
  const [contactId, setContactId] = useState("");
  const [currentContactId, setCurrentContactId] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const [itemHistory, setItemHistory] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dtouched, setDTouched] = useState(false);
  const [editableField, setEditableField] = useState(null); 

  const handleItemHistory = () => {
      setItemHistory(!itemHistory)
  }
  function handleSetCurrentContactId(contactId) {
    setCurrentContactId(contactId);
    console.log(contactId);
  }
  function handleSetCurrentContact(item) {
    setCurrentContact(item);
    console.log(item);
  }



  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
  }

  const handleIconClick = (contactId) => {
    debugger;
    setContactId(contactId);

  };

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
      props.updateCustomerContact(updatedData,props.uniqueId)
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
        props.updateCustomerContact(updatedData,props.uniqueId)
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
    //   opportunity: { opportunityId },
    fetchingCustomerContact,
    fetchingCustomerContactError,
    contactByCustomerId,
    unlinkContactFromOpportunity,
    setContactRoleForOpportunity,
    handleUpdateCustomerContactModal,
    addUpdateCustomerContactModal,
  } = props;

  if (fetchingCustomerContact) return <BundleLoader/>;
  console.log(props.uniqueId)
  return (
    <>
      
     
      <div class="rounded m-1 p-1 w-[99%] h-[77vh] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[99%]  p-1 bg-transparent items-end font-bold font-poppins sticky !text-lm  z-10">
            <div class="w-[2.1rem]"></div>
        <div className="font-bold font-poppins text-[#00A2E8] text-sm w-[13.6rem]  max-md:w-[16.5rem]">
        <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]}
          {/* Name */}
        </div>
        <div className="  w-[8.7rem] truncate  max-md:w-[9.1rem]">
        <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />
         {translatedMenuItems[1]}
{/* Email */}
        </div>
        <div className=" w-[7.1rem] truncate  max-md:w-[8.1rem]">
        <MobileFriendlyIcon className='!text-icon mr-1 text-[#41ead4] '  /> {translatedMenuItems[2]}
          {/* Mobile */}
        </div>
        <div className=" w-[8.8rem]  truncate max-md:w-[8.2rem]">
        <ApartmentIcon className='!text-icon text-[#f0386b] '  />   {translatedMenuItems[3]}
          {/* Department */}
        </div>
                     <div className="  w-[7.7rem] truncate max-md:w-[7.2rem]">
                     <i className=" fab fa-artstation mr-1 text-[#b744b8]"></i>{translatedMenuItems[4]}
                      {/* Designation */}
                     </div>
      
        <div className="truncate w-[11.1rem] max-md:w-[7.21rem]">
        <RadioButtonCheckedIcon className="!text-icon mr-1 text-[#f28482]"/>   {translatedMenuItems[5]}
{/* Portal */}
        </div>

      </div>
   
        
      { !fetchingCustomerContact && contactByCustomerId.length === 0 ?<EmptyPage/>:contactByCustomerId.map((item,index) =>  {
         const dataLoc = ` Address : ${
          item.address && item.address.length && item.address[0].address1
        } 
         Street : ${
           item.address && item.address.length && item.address[0].street
         }   
        State : ${
          item.address && item.address.length && item.address[0].state
        }
       Country : ${
         (item.address && item.address.length && item.address[0].country) ||
         ""
       } 
         PostalCode : ${
           item.address && item.address.length && item.address[0].postalCode
         } `;
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
        
                    return (
                        <div>
                           <div className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                  <div class="flex">
                                            <div className=" flex justify-center w-[2.1rem] max-md:w-[2.1rem] max-sm:  ">
                                                <div class="flex justify-center  text-xs  font-semibold  font-poppins ">
                                                  {item.reportsToId !== null &&
                                                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                                                        onClick={() => {
                                                            handleItemHistory()
                                                            handleSetCurrentContact(item)
                                                        }}
                                                    />
                                                      }
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="flex max-sm: items-center">   
                                <div className=" flex items-center w-[19rem] max-md:w-[19rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
 

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

                                        <Tooltip>
                                        <div class=" flex max-sm:w-full w-[100%] flex-row md:flex-col ml-1">                                                                    
                                            <div class=" flex items-center justify-between  text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">
                                            <Link class="flex items-center overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`/contact/${item.contactId}`} title={item.fullName}>
      {item.fullName}
    </Link>                                
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs text-[tomato] font-bold"
          >
           {translatedMenuItems[6]} {/* New */}
          </span>
        ) : null}
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
                                        </Tooltip>
                          
                                        </div>
                                </div>
                                <div class="flex">

                             
                                <div className=" flex w-[9.2rem] max-md:w-[9.2rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                                   
                                    <div class="flex text-xs  items-center ml-gap font-poppins">
                                         {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex w-[7.4rem] max-md:w-[7.3rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between">
                                
                                  <div class="flex items-center text-xs  font-poppins">
                                  {item.countryDialCode} {item.mobileNumber}
                                  </div>
                              </div>
                              </div>
                              <div className="flex w-[12.1rem]  max-md:w-[13rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">

  <div className="text-xs flex items-center ml-gap  font-poppins text-center">
    {item.department}
  </div>
</div>
<div className=" flex w-[11rem] max-md:w-[11rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class=" text-xs flex items-center ml-gap  font-poppins text-center">
                                    {item.designation}

                                    </div>
                                </div>
                                <div className=" flex  w-[11.45rem] max-md:w-[11.45rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">


{item.accessInd === 0 ? <div class=" text-xs font-bold  font-poppins">
    <Button
        type="primary"
        //loading={currentSupplierId.contactPersonId === item.contactPersonId && props.applyingForLoginInContact}
        onClick={() => {
          //  handleChangeRow(item)
          //   props.setEditSupplierContact(item);
            props.putCustomerContactToggle(
                
                item.contactId,
                props.userId,
                "Prospect Contact To User",
                // props.supplier.supplierId,
                // props.distributorId,
              
            )
        }}
    >
     {translatedMenuItems[12]} 
      </Button>
</div> : item.accessInd === 2 ? <b class=" font-bold font-poppins text-xs">{translatedMenuItems[10]}</b> : <b class="text-[#32CD32] font-bold font-poppins text-xs">{translatedMenuItems[11]}</b>

}

</div>
                                <div className=" flex w-[2.1rem]  max-md:w-[2.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span
              className=" !cursor-pointer "
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>

                                    </div>
                                </div>
                                <div className=" flex w-[2rem] max-md:w-[2rem] items-center justify-center h-8  bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                                    {/* <NotAccessibleOutlined/> */}

                                    <div class=" text-xs  font-poppins text-center">
                                    <Tooltip title="LinkedIn">
              <span
                 className=" !cursor-pointer "
                onClick={() => {}}
              >
                {" "}
                <a href={`https://www.linkedin.com`} target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </span>
            </Tooltip>

                                    </div>
                                </div>
                           


                            </div>
                            <div>
                            {itemHistory && (currentContact.contactId === item.contactId)
                                            && <Suspense><ContactReportData
                                            selectedLanguage={props.selectedLanguage}
                                            translateText={props.translateText}
                                            currentContact={currentContact} 
                                            reportsToId={item.reportsToId}
                                          

                                            /></Suspense>}
                                            </div>
                        </div>

                    )
                })}
                    
      </div>

<Suspense>  
       </Suspense>
     
   
    </>
  );
}
const mapStateToProps = ({auth,
  customer, designations, departments, contact
}) => ({
  fetchingCustomerContact: customer.fetchingCustomerContact,
  fetchingCustomerContactError: customer.fetchingCustomerContactError,
  //customerId: customer.customer.customerId,
  userId:auth.userDetails.userId,
  designations: designations.designations,
  contactByCustomerId: customer.contactByCustomerId,
  departments: departments.departments,
  addUpdateCustomerContactModal: customer.addUpdateCustomerContactModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactListByCustomerId,
      setEditCustomerContact,
      handleUpdateCustomerContactModal,
      putCustomerContactToggle,
      updateCustomerContact
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);
















