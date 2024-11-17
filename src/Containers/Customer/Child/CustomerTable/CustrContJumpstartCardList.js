import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import {  Tooltip, Select } from "antd";
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";

import AddchartIcon from "@mui/icons-material/Addchart";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

 import {getContactListOfJumpstart} from "../../CustomerAction"
import { BundleLoader } from "../../../../Components/Placeholder";
const Option = Select;


function CustrContJumpstartCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    props.getContactListOfJumpstart(props.customer.customerId,);
    // setPage(page + 1);
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



  function handleSetCurrentContactId(item) {
    setCurrentContactId(item);
  }

 

  const {
    user,
    fetchingCustContactsJumpstart,
    newFiltersdata,
    contactOfCustJumpstart,
    filterData,
    addDrawerContactPulseModal,
    addDrawerContactNotesModal,
    handleUpdateContactModal,
    handleContactNotesDrawerModal,
    handleContactPulseDrawerModal,
    handleContactReactSpeechModal,
    addContactSpeechModal,
    updateContactModal,
    contactCETdrawer
  } = props;
  if (fetchingCustContactsJumpstart) {
    return <BundleLoader />;
  }
  return (
    <>
      
     
      <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[98%] max-sm:w-wk overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" max-sm:hidden flex justify-between w-[95%] max-lg:w-[89%] max-xl:w-[96%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.5rem] max-lg:w-[20.5rem]">
    Name</div>
        <div className=" w-[13.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[8.1rem]">Company
              </div>
        <div className=" md:w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.11rem]">Designation</div>
        <div className="md:w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.1rem] max-lg:w-[7.1rem]">
                Department</div>
        <div className="md:w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.2rem] max-lg:w-[10.2rem]">Quotation
               </div>
        <div className="md:w-[5.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.3rem] max-lg:w-[8.3rem]">Pipeline
               </div>
        <div className="w-[6.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.1rem] max-lg:w-[8.1rem]">Portal Acess
              </div>
        <div className="w-[2.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.12rem] max-lg:w-[3.12rem]">Owner"
               </div>
        <div className="w-[4.2rem]"></div>

      </div>
  
        
        { !fetchingCustContactsJumpstart && contactOfCustJumpstart.length === 0 ?<NodataFoundPage />:contactOfCustJumpstart.map((item,index) =>  {
        
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
                            <div className="flex rounded justify-between bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
                                >
                                     
                                <div className=" flex font-medium flex-col w-[14rem] max-sm:flex-row  max-sm:justify-between max-sm:w-wk  ">
<div className="flex max-sm:w-full md:items-center max-lg:w-[7.2rem] max-xl:w-[9rem]"> 
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
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                          
                                            <div class="text-sm flex text-blue-500  font-poppins  font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] text-[#042E8A] cursor-pointer"  to={`contact/${item.contactId}`} title={item.fullName}>
      {item.fullName}
    </Link>                                               
        
        &nbsp;&nbsp;
        {date === currentdate ? (
       <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                  
       >
            New
          </div>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk">

                                <div className=" flex font-medium flex-col max-sm:w-auto  w-[14.01rem] max-sm:flex-row max-xl:w-[5.5rem] max-lg:w-[4.8rem]  max-sm:justify-between ">
                                   
                                    <div class=" text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:max-w-[10ch] truncate">   
                                    {item.tagWithCompany}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col max-sm:w-auto w-[10.2rem] max-xl:w-[5.6rem] max-lg:w-[3.01rem] max-sm:flex-row  max-sm:justify-between ">
                                   
                                    <div class="text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                         {item.designation}
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col max-sm:w-auto w-[8.3rem] max-xl:w-[5.3rem] max-lg:w-[4.2rem]  max-sm:flex-row  max-sm:justify-between">
                                
                                  <div class="text-sm  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                       {item.department}
                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk">
                              <div className="flex font-medium flex-col w-32 max-xl:w-[3rem] max-sm:w-auto  max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">

  <div className="text-sm  font-poppins text-center max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
    {item.oppNo}
  </div>
</div>
<div className=" flex font-medium flex-col w-36 max-xl:w-[8rem] max-lg:w-[7rem] max-sm:w-auto max-lg:text-[6.21rem] max-sm:flex-row  max-sm:justify-between ">
                                    

                                    <div class=" text-sm  max-sm:text-sm font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className="flex font-medium flex-col w-[7.1rem]  max-xl:w-[3.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                
                                    <div class="text-sm  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                                    {item.thirdPartyAccessInd === true
    ?<Tooltip title="Provided"><AlarmOnIcon   className=" !text-base text-[green]"/></Tooltip> 
    :  <Tooltip title="Not Provided"> <DoNotDisturbOnTotalSilenceIcon  className=" !text-base text-[red]"/></Tooltip>}

                                    </div>
                                </div>
                                </div>
                                <div class="flex items-center max-sm:justify-between max-sm:w-wk">
                                <div className="flex font-medium  w-20 max-sm:w-wk  max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3.01rem]  max-sm:justify-between">
              <Tooltip title={item.ownerName}>
                <div class="max-sm:flex justify-end">
                <Tooltip title={item.ownerName}>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.9rem"}
                imgHeight={"1.9rem"}
              />
            </Tooltip>
            </div>
          </Tooltip>

                   </div>
                   <div class="flex flex-col w-6 max-sm:w-wk max-sm:justify-between max-sm:flex-row ">
                    <div>
                    <Tooltip title="Notes">
       <NoteAltIcon
                className=" !text-base cursor-pointer text-[#28a355]"
                onClick={() => {
                  handleContactNotesDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                
              />
           </Tooltip>
           </div>
 
<div>
                      <Tooltip
                        title="Activity"
                         
                      >
                        <AddchartIcon
                        className="!text-base cursor-pointer text-blue-500"
                          onClick={() => {
                            props.handleContactCETdrawer(true);
                            handleSetCurrentContact(item);
                          }}
                        />
                      </Tooltip>
                    </div>
            </div>
                                <div class="flex flex-col w-6 max-sm:w-wk max-sm:justify-between  max-sm:flex-row  items-center">
                    <div class="rounded-full w-5 h-5 cursor-pointer md:mt-4">
                    <Tooltip title={item.mobileNo} >
            {item.doNotCallInd !== true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
               <PhoneInTalkIcon     className=" !text-base cursor-pointer text-[blue]"/>
              </span>
            )}
            {item.doNotCallInd === true && (
              <span class=" mr-2 text-xs cursor-pointer"
                onClick={() => {
                  props.handleDonotCallModal(true);
                  handleSetCurrentContactId(item);
                }}
              >
                <PhoneDisabledIcon/>
              </span>
            )}
          </Tooltip>
                        </div>
                        <div class=" max-sm:flex justify-end mt-1 max-sm:w-full">
                        <Tooltip title={item.emailId}>
           
            <MailOutlineIcon
              type="mail"
              className=" !text-base cursor-pointer text-[red]"
              onClick={() => {
                props.getContactById(item.contactId);
                props.handleContactEmailDrawerModal(true);
              }}
            />
           </Tooltip>
                        </div>

                      &nbsp;&nbsp;
                        <div>
                        <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSetCurrentContactId(item);
                props.handleContactPulseDrawerModal(true);
              }}
            >{user.pulseAccessInd === true && (
              <MonitorHeartIcon  className=" !text-base cursor-pointer text-[#df9697]"/>
            )}
            </span>
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-6 max-sm:w-wk max-sm:justify-between max-sm:flex-row w-full  items-center">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   
            className=" !text-base cursor-pointer text-[#960A0A]"/>
            </span>
          </Tooltip>
          </div>
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
              {user.contactUpdateInd === true &&  user.crmInd === true && (
            <div>
           
            <Tooltip title="Edit">
              <BorderColorIcon
                className=" !text-base cursor-pointer text-[tomato]"
                // onClick={() => {
                //   props.setEditContact(item);
                //   handleUpdateContactModal(true);
                //   handleSetCurrentContactId(item);
                  
                // }}
              />
            </Tooltip>
      
            </div>
              )}
                      </div>  
                      <div>
           <Tooltip title="Pulse">
       <MonitorHeartIcon
       className=" !text-base cursor-pointer text-[#df9697]"
                onClick={() => {
                  handleContactPulseDrawerModal(true);
                  handleSetCurrentContact(item);
                }}
                
              />
           </Tooltip>

</div>
         
                      </div>
                            </div>
                        </div>


                    )
                })}
                    
      </div>


  
 
  

    </>
  );
}
const mapStateToProps = ({
  auth,
  contact,
  customer,
  designations,
  departments,
  opportunity,
}) => ({
    contactOfCustJumpstart:customer.contactOfCustJumpstart,
    fetchingCustContactsJumpstart:customer.fetchingCustContactsJumpstart,
  userId: auth.userDetails.userId,
  contactByUserId: contact.contactByUserId,
  sales: opportunity.sales,
  user: auth.userDetails,
  addDrawerContactPulseModal:contact.addDrawerContactPulseModal,
  fetchingContacts: contact.fetchingContacts,
  fetchingContactsError: contact.fetchingContactsError,
  updateContactModal: contact.updateContactModal,
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
        getContactListOfJumpstart
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustrContJumpstartCardList);
