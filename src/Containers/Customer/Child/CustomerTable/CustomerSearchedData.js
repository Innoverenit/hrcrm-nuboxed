import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
import { getCountries } from "../../../Auth/AuthAction";
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";

import { Link } from 'react-router-dom';
import {
    getTeamCustomer,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  handleCustomerNotesDrawerModal,
  getCustomerById,
  emptyCustomer,
  customerToAccount,
  handleCustomerPulseDrawerModal,
  handleCustomerContactDrawerModal,
  handleCustomerOpportunityDrawerModal
} from "../../CustomerAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import ContactsIcon from '@mui/icons-material/Contacts';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import CustomerContactDrawerModal from "./CustomerContactDrawerModal";
import CustomerOpportunityDrawerModal from "./CustomerOpportunityDrawerModal";
import EmptyPage from "../../../Main/EmptyPage";
const AddCustomerDrawerModal =lazy(()=> import("../../AddCustomerDrawerModal"));
const AddCustomerEmailDrawerModal =lazy(()=> import("../UpdateCustomer/AddCustomerEmailDrawerModal"));
const AddCustomerNotesDrawerModal =lazy(()=> import("../CustomerDetail/AddCustomerNotesDrawerModal"));
const CustomerPulseDrawerModal =lazy(()=> import("./CustomerPulseDrawerModal"));

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerSearchedData(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
 
  const [pageNo, setPageNo] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

   "110", // 'Name', // 0
   "378",// 'Work', // 1
   "278",// 'Sector', // 2
   "279",// 'Source', // 3
   "213",// 'Quotation', // 4
   "328",// 'PipeLine', // 5
   "76",// 'Assigned', // 6 
   "248",// 'Customer', // 7
    "100",   // new 8
    "1300" , //  Change status to Customer?"9
    "213" ,  // "Opportunity"10
    "392" ,  // Pulse 11
    "316" ,  // "Notes"12
    "170" ,  // "Edit" 13
   "73", // Contact 14
   "144" ,//In Progress 15
   "387",//  Convert 16
   "389",//   Converted 17
   "1581", //Score 18
   "185"//Address 19
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
   
    props.getTeamCustomer(props.userId, pageNo);
    setPageNo(pageNo + 1);
      props.getSectors();
    props.getCountries();
    props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyCustomer();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



const [rowdata, setrowdata] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const handleConfirm = (customerId) => {
    // Call the function to change the status to "Lost" here
    props.customerToAccount(customerId);
  };
  const handleLoadMore = () => {
   
      setPageNo(pageNo + 1);
      props.getTeamCustomer(
        props.currentUser ? props.currentUser : props.userId,
        pageNo,
      );
  };

  const {
    fetchingTeamCustomer,
    teamCustomer,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,

    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
    handleCustomerContactDrawerModal,
    addDrawerCustomerContactModal,
    handleCustomerOpportunityDrawerModal,
    addDrawerCustomerOpportunityModal
  } = props;
  console.log("ee");
 
  // if (fetchingTeamCustomer) {
  //   return <BundleLoader />;
  // }
 


  return (
    <>
    

         <div className=' flex sticky  z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
         <div className=" flex max-sm:hidden  w-[90%]  justify-between p-1 bg-transparent font-bold font-poppins !text-lm items-end sticky  max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
            <div className=" w-[14.4rem] truncate max-md:w-[17.9rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            <ApartmentIcon className="!text-icon  "/>        {translatedMenuItems[0]}   {/* Name */}
          
            </div>
            <div className=" w-[9.6rem] truncate max-md:w-[7.5rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            <WifiCalling3Icon className="!text-icon mr-1 text-[#4f5d75]"/>      {translatedMenuItems[1]}   {/* Work */}
          

            </div>
            <div className=" w-[2.5rem] truncate max-md:w-[4.8rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
             {/* Country */}
            </div>
            <div className=" w-[10.12rem] truncate max-md:w-[6.12rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            <FactoryIcon className="!text-icon mr-1 text-[#84a59d]"/>   {translatedMenuItems[2]}  {/* Sector */}
             

            </div>
            <div className=" w-[9.12rem] truncate max-md:w-[8.12rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            <SourceIcon className="!text-icon mr-1 text-[#094074]"/>     {translatedMenuItems[3]}        {/* Source */}
     

            </div>
           
            <div className="w-[9.9rem] truncate max-md:w-[12.9rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            <LightbulbIcon className="!text-icon text-[#84a59d]"/>  {translatedMenuItems[4]}    {/* Quotation */}
          

            </div>
         
           
            <div className="w-[5.2rem] truncate max-md:w-[6.2rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/>    {translatedMenuItems[6]}    {/* Assigned */}
            

            </div>
            <div className="w-[5.1rem] truncate max-md:w-[4.82rem] max-xl:w-[3.8rem] ">
            <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/>    
             Owner
            </div>
            <div className="w-[8.8rem] truncate max-md:w-[8.8rem] max-xl:w-[3.81rem]">
            <AcUnitIcon className="!text-icon  text-[#667761]"/>   {translatedMenuItems[7]}   {/* Customer */}
         
            </div>
            <div className="w-[9.13rem]"></div>

          </div>
        {/* <InfiniteScroll
        dataLength={teamCustomer.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamCustomer?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"80vh"}
      > */}
      
      { !props.fetchingCustomerInputSearchData && props.customerSearch.length === 0 ?<EmptyPage/>:props.customerSearch.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const countryCode = item.countryAlpha2Code
         const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
           Street : ${
             item.address && item.address.length && item.address[0].street
           }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                      <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1  items-center py-ygap  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium  w-[14rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div class="flex items-center  ml-gap justify-center">
                            {/* <Tooltip title={item.name}> */}
                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            {/* </Tooltip> */}
                          </div>
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-xs items-center text-blue-500  font-poppins font-bold ml-gap  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap  text-sm  text-[#042E8A] max-sm:text-sm cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs  text-[tomato] font-bold"
                                    >
                                       {translatedMenuItems[8]} {/* New */}
                                    </div>
                                  ) : null}
                           
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[9.54rem]  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm">
                        {
  (item.countryDialCode !== null && item.countryDialCode !== undefined) && 
  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?

  `${item.countryDialCode} ${item.phoneNumber}` :

  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?
  `${item.phoneNumber}` : 
  '' 
}
                        </div>
                      </div>
                      <div className=" flex  max-sm:w-auto   items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[2.5rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
<div class=" text-xs  font-poppins max-sm:text-sm">
  <CountryFlag1 countryCode={countryCode} />
  {/* &nbsp;
  {countryCode} */}
</div>
</div>
                      <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto  w-[10.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-sm:text-sm">
                          {item.sector}
                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex  max-sm:w-auto   items-center justify-center h-8 ml-gap bg-[#eef2f9]  w-[9.6rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-sm:text-sm">
                          {item.source}
                        </div>
                      </div>                   
                      </div>                                      
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto w-[10.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                    <div className=" flex items-center justify-center max-sm:w-auto w-[6.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}
                        <div class=" text-xs ml-gap font-poppins max-sm:text-sm text-center">
                          {item.oppNo}
                        </div>
                      </div>
                      <div className=" flex  items-center justify-center max-sm:w-auto w-[5.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                   
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center">
        {/* {`${item.userCurrency} ${item.totalProposalValue/1000}K`} */}
        {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div>
                      </div>
                  
                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto   w-[5.2rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins max-sm:text-sm">
                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">None</div>
                            ) : (
                              <>
                                {item.assignedTo === item.ownerName ? (
                                  null
                                ) : (
                                  <MultiAvatar2
                                    primaryTitle={item.assignedTo}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto w-[5rem] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">
                        <div class=" text-sm  font-poppins"></div>
                        <Popconfirm
                          title="Change status to Customer?"
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button type="primary"
                              style={{ width: "6.5rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}                         
                              >
                              <div class="text-xs flex justify-between items-center " >
                                {item.convertInd === 0 && "Convert"}
                                {item.convertInd === 1 && "In progress"}
                                {item.convertInd === 2 && "Converted"}
                                <NextPlanIcon  />
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>                  
                        <div class="flex  items-center justify-center h-8 ml-gap bg-[#eef2f9]">
                          <div>
                          <Tooltip title={item.url}>
                            {item.url !== "" ? (
                              <div
                                //type="edit"
                                style={{ cursor: "pointer" }}
                                onClick={() => { }}
                              >
                                {" "}
                                <a href={`https://${item.url}`} target="_blank">
                                  <ExploreIcon
                                    className=" !text-icon cursor-pointer text-[green]"
                                  />
                                </a>
                              </div>
                            )
                              : <div class=" w-3">
                              </div>
                            }
                          </Tooltip>
                        </div>
                        <div>
                          <div
                            style={{ fontSize: "0.8rem" }}
                            onClick={() => {
                              props.getCustomerDetailsById(item.customerId);
                              props.getCustomerKeySkill(item.customerId);
                              //   this.props.getCustomerDocument(item.customerId );

                              props.handleCustomerDrawerModal(item, true);
                            }}
                          >
                            {" "}
                            {user.pulseAccessInd === true && <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                            />}
                          </div>
                        </div>
                        <div>
                        </div>                                   
                        <div class="w-5">
                        <Tooltip title={translatedMenuItems[14]}>
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                              onClick={() => {
                                handleCustomerContactDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}
                            />
                          </Tooltip>
                        </div>
                        <div class="w-5">
                          <Tooltip title="Opportunity">
                            <LightbulbIcon
                              className=" !text-icon cursor-pointer text-[#AF5910]"
                              onClick={() => {
                                handleCustomerOpportunityDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}
                            />
                          </Tooltip>
                        </div>                                     
                        <div class="w-5">
                          <Tooltip title="Pulse">
                            <MonitorHeartIcon
                              className=" !text-icon cursor-pointer text-[#df9697]"
                              onClick={() => {
                                handleCustomerPulseDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}

                            />
                          </Tooltip>
                        </div>
                        <div class="w-5">
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#28a355]"
                              onClick={() => {
                                handleCustomerNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>
                        </div>                                        
                        <div class="w-5">
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
                            <LocationOnIcon
                              className=" !text-icon cursor-pointer text-[#960A0A]"
                            />
                          </Tooltip>
                        </div>
                 
                      </div>

                    </div>
                  </div>
                </div>
                    )
                })}
                {/* </InfiniteScroll> */}
      </div>
      </div>
 
  
      <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
         <CustomerPulseDrawerModal
    customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
<CustomerContactDrawerModal
        customer={currentCustomer}
        addDrawerCustomerContactModal={addDrawerCustomerContactModal}
        handleCustomerContactDrawerModal={handleCustomerContactDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
      
      <CustomerOpportunityDrawerModal
        customer={currentCustomer}
        addDrawerCustomerOpportunityModal={addDrawerCustomerOpportunityModal}
        handleCustomerOpportunityDrawerModal={handleCustomerOpportunityDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />

<AddCustomerNotesDrawerModal
        customer={currentCustomer}
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
  userId: auth.userDetails.userId,
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  teamCustomer: customer.teamCustomer,
  sales: opportunity.sales,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingTeamCustomer: customer.fetchingTeamCustomer,
  fetchingCustomersError: customer.fetchingCustomersError,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  customerSearch: customer.customerSearch,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamCustomer,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      getSectors,
      customerToAccount,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      handleCustomerNotesDrawerModal,
      getCustomerById,
      getCountries,
      getAllCustomerEmployeelist,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearchedData);

