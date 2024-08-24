import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
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
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
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
         "Name ",//0
          "Email",//1
          "Mobile",//2      
          "Department",//3
          "Designation",//4
          "Portal",//5
         
         
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
    props.getContactListByCustomerId(props.customerId,);
    // setPage(page + 1);
  }, []);
  const [contactId, setContactId] = useState("");
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



  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
  }

  const handleIconClick = (contactId) => {
    debugger;
    setContactId(contactId);

    // Assuming this.props.getContactDocument(contactId) is a function passed as a prop
    // Uncomment the line below if you want to call the function
    // this.props.getContactDocument(contactId);
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
      
     
      <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[17.5rem]">{translatedMenuItems[0]}
          {/* Name */}
        </div>
        <div className=" md:w-[16.1rem]">{translatedMenuItems[1]}
{/* Email */}
        </div>
        <div className="md:w-[10.1rem]">{translatedMenuItems[2]}
          {/* Mobile */}
        </div>
        <div className="md:w-[14.2rem]">{translatedMenuItems[3]}
          {/* Department */}
        </div>
                     <div className="md:w-[7.2rem]">{translatedMenuItems[4]}
                      {/* Designation */}
                     </div>
                
        
        <div className="w-[4.21rem]"></div>
        <div className="md:w-[7.21rem]">{translatedMenuItems[5]}
{/* Portal */}
        </div>

      </div>
   
        
      { !fetchingCustomerContact && contactByCustomerId.length === 0 ?<NodataFoundPage />:contactByCustomerId.map((item,index) =>  {
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
                           <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                                     
                                <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
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
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                          
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
            New
          </span>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                                <div className=" flex  md:w-[11.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                    <div class="text-xs  font-poppins">
                                         {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex md:w-[9.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs  font-poppins">
                                  {item.countryDialCode} {item.mobileNumber}
                                  </div>
                              </div>
                              </div>
                              <div className="flex  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

  <div className="text-xs  font-poppins text-center">
    {item.department}
  </div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.designation}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

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
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

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
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <Tooltip title="Edit">
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
                                    <div class=" text-xs  font-poppins text-center">
                                    <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={
                <FormattedMessage
                  id="app.doyouwishtodetach?"
                  defaultMessage="Do you wish to detach?"
                />
              }
              //   onConfirm={() =>
              //     unlinkContactFromOpportunity(opportunityId, name)
              //   }
            >
              <ActionIcon
               className=" !text-xl cursor-pointer text-[#fb8500]"
                //tooltipTitle="Detach Contact"
                tooltiptitle={
                  <FormattedMessage
                    id="app.detachcontact"
                    defaultMessage="Detach Contact"
                  />
                }
                iconType="api"
                onClick={null}
                size="1em"
              />
            </StyledPopconfirm>

                                    </div>
                                   
                                </div>
                                <div className=" flex   md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">


{item.accessInd === 0 ? <div class=" text-xs  font-poppins">
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
    ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" /></Button>
</div> : item.accessInd === 2 ? <b>Login Applied</b> : <b style={{ color: "#32CD32" }}>Login Approved</b>

}

</div>
                            </div>
                        </div>


                    )
                })}
                    
      </div>


      <AddCustomerUpdateContactModal
          addUpdateCustomerContactModal={addUpdateCustomerContactModal}
           contactId={contactId}
          defaultCustomers={props.defaultCustomers}
          customerId={props.customerId}
          handleUpdateCustomerContactModal={handleUpdateCustomerContactModal}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}

        />
       
     
     
   
    </>
  );
}
const mapStateToProps = ({auth,
  customer, designations, departments, contact
}) => ({
  fetchingCustomerContact: customer.fetchingCustomerContact,
  fetchingCustomerContactError: customer.fetchingCustomerContactError,
  customerId: customer.customer.customerId,
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
















