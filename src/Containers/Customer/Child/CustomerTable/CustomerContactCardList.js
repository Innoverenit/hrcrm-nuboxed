import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from "../../../../Components/Common";
import { ActionIcon } from "../../../../Components/Utils";
import {
  StyledPopconfirm,
} from "../../../../Components/UI/Antd";
import {  Tooltip, Select } from "antd";
import {  MultiAvatar2, SubTitle } from "../../../../Components/UI/Elements";
import {
  getContactListByCustomerId,
  setEditCustomerContact,
  handleUpdateCustomerContactModal,
} from "../../CustomerAction";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
const Option = Select;
const CustomerContactActiveToggle = lazy(() =>
  import("../CustomerDetail/CustomerTab/ContactTab/CustomerContactActiveToggle")
);
const AddCustomerUpdateContactModal = lazy(() =>
  import("../../Child/CustomerDetail/CustomerTab/ContactTab/AddCustomerUpdateContactModal")
);


function CustomerContactCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getContactListByCustomerId(props.customer.customerId,);
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


  return (
    <>
      
     
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
        <div className=" md:w-[8.1rem]"><FormattedMessage
                  id="app.Email"
                  defaultMessage="Email"
                /></div>
        <div className="md:w-[10.1rem]"><FormattedMessage
                  id="app.mobileNumber"
                  defaultMessage="Mobile Number"
                /></div>
        <div className="md:w-[7.2rem]"><FormattedMessage
                  id="app.Department"
                  defaultMessage="Department"
                /></div>
                     <div className="md:w-[7.2rem]"><FormattedMessage
                  id="app.Designation"
                  defaultMessage="Designation"
                /></div>
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {contactByCustomerId.map((item) => { 
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
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
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
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`contact/${item.contactId}`}
          title={`${item.fullName}`}
        >{item.fullName}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span class="text-xs mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
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

                             
                                <div className=" flex font-medium flex-col md:w-[13.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                    <div class="text-sm  font-poppins">
                                         {item.emailId}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm  font-poppins">
                                  {item.countryDialCode} {item.mobileNumber}
                                  </div>
                              </div>
                              </div>
                              <div className="flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

  <div className="text-sm  font-poppins text-center">
    {item.department}
  </div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    {item.designation}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span
                style={{
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
            </Tooltip>

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip title="LinkedIn">
              <span
                //type="edit"
                style={{ cursor: "pointer" }}
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
                                    

                                    <div class=" text-sm  font-poppins text-center">
                                    <Tooltip title="Edit">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setEditCustomerContact(item);
                  props.handleUpdateCustomerContactModal(true);
                   handleIconClick(item.contactId);
                }}
              >
                <BorderColorIcon style={{ fontSize: "0.8rem", }} />
              </span>
              {/* )} */}
            </Tooltip>

                                    </div>
                                    <div class=" text-sm  font-poppins text-center">
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
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>

                                    </div>
                                   
                                </div>
                                <div class=" text-sm  font-poppins text-center">
                                    <span>
              {item.thirdPartyAccessInd === true && (
                <CustomerContactActiveToggle
                  accessInd={item.accessInd}
                  contactId={item.contactId}
                  emailId={item.emailId}
                  thirdPartyAccessInd={item.thirdPartyAccessInd}
                />
              )}
            </span>

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
        />
       
     
     
   
    </>
  );
}
const mapStateToProps = ({
  customer, designations, departments, contact
}) => ({
  fetchingCustomerContact: customer.fetchingCustomerContact,
  fetchingCustomerContactError: customer.fetchingCustomerContactError,
  customerId: customer.customer.customerId,
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
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerContactCardList);
