import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ActionIcon } from "../../../../../../Components/Utils";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import {  Tooltip, Select,Button } from "antd";
import { MultiAvatar2, SubTitle } from "../../../../../../Components/UI/Elements";
import {
  getContactListByCustomerId,
  setEditCustomerContact,
  handleUpdateCustomerContactModal,
  putCustomerContactToggle
} from "../../../../CustomerAction";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import ContactReportData from "./ContactReportData";
import { NotAccessibleOutlined } from "@mui/icons-material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
const EmptyPage = lazy(() => import("../../../../../Main/EmptyPage"));
const AddCustomerUpdateContactModal = lazy(() => import("./AddCustomerUpdateContactModal"));
const CustomerContactActiveToggle = lazy(() => import("./CustomerContactActiveToggle"));



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
  return (
    <>
      
     
      <div class="rounded m-1 p-1 w-[99%] h-[77vh] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[99%]  p-1 bg-transparent items-end font-bold font-poppins sticky !text-lm  z-10">
        <div className="font-bold font-poppins text-[#00A2E8] text-sm w-[15.2rem]  max-md:w-[16.5rem]">
        <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]}
          {/* Name */}
        </div>
        <div className="  w-[8.5rem] truncate  max-md:w-[9.1rem]">
        <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />
         {translatedMenuItems[1]}
{/* Email */}
        </div>
        <div className=" w-[7.1rem] truncate  max-md:w-[8.1rem]">
        <MobileFriendlyIcon className='!text-icon text-[#41ead4] '  /> {translatedMenuItems[2]}
          {/* Mobile */}
        </div>
        <div className=" w-[8.2rem]  truncate max-md:w-[8.2rem]">
        <ApartmentIcon className='!text-icon text-[#f0386b] '  />   {translatedMenuItems[3]}
          {/* Department */}
        </div>
                     <div className="  w-[7.2rem] truncate max-md:w-[7.2rem]">
                     <i className=" fab fa-artstation mr-1 text-[#b744b8]"></i>{translatedMenuItems[4]}
                      {/* Designation */}
                     </div>
                
        
        <div className="w-[4.21rem]"></div>
        <div className="truncate w-[7.21rem] max-md:w-[7.21rem]">
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
                                                  <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]"
                                                        onClick={() => {
                                                            handleItemHistory()
                                                            handleSetCurrentContact(item)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>    
                                <div className=" flex w-[19rem] max-md:w-[19rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
<div className="flex max-sm: items-center"> 
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
          <div class="max-sm:">
                                        <Tooltip>
                                          <div class=" flex max-sm: justify-between flex-row">
                                          
                                            <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`/contact/${item.contactId}`} title={item.fullName}>
      {item.fullName}
    </Link>                                
         {/* <Link
          toUrl={`contact/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link> */}
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs text-[tomato] font-bold"
          >
           {translatedMenuItems[6]} {/* New */}
          </span>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
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
                                <div className=" flex w-[1.3rem]  max-md:w-[1.3rem] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class=" text-xs flex  font-poppins text-center items-center justify-center h-8  bg-[#eef2f9]">
                                    <Tooltip title={translatedMenuItems[7]}>
              <span
                className=" !cursor-pointer "
            
                onClick={() => {
                  props.setEditCustomerContact(item);
                  props.handleUpdateCustomerContactModal(true);
                   handleIconClick(item.contactId);
                }}
              >
                <BorderColorIcon 
               className=" !text-icon cursor-pointer text-[tomato]"
                />
              </span>
              {/* )} */}
            </Tooltip>

                                    </div>
                                    <div class=" text-xs flex font-poppins text-center items-center justify-center h-8  bg-[#eef2f9]">
                                    <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={translatedMenuItems[8]}
             
            >
              <ActionIcon
               className=" !text-icon cursor-pointer text-[#fb8500]"
                //tooltipTitle="Detach Contact"
                tooltiptitle={translatedMenuItems[9]}
               
                iconType="api"
                onClick={null}
                size="1em"
              />
            </StyledPopconfirm>

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

                            </div>
                            <div>
                            {itemHistory && (currentContact.contactId === item.contactId)
                                            && <ContactReportData
                                            selectedLanguage={props.selectedLanguage}
                                            translateText={props.translateText}
                                            currentContact={currentContact} 
                                            
                                          

                                            />}
                                            </div>
                        </div>


                    )
                })}
                    
      </div>


      <AddCustomerUpdateContactModal
          addUpdateCustomerContactModal={addUpdateCustomerContactModal}
           contactId={contactId}
          defaultCustomers={props.defaultCustomers}
          customerId={props.uniqueId}
          handleUpdateCustomerContactModal={handleUpdateCustomerContactModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={translatedMenuItems}

        />
       
     
     
   
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
      putCustomerContactToggle
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkedContact);
















