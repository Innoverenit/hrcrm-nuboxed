import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import ContactsIcon from '@mui/icons-material/Contacts';
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import {
  MultiAvatar,
  MultiAvatar2,
 
} from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { Link } from 'react-router-dom';
import {
  getAllCustomerlIST,
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
  handleCustomerOpportunityDrawerModal,
} from "../../CustomerAction";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
const CustomerContactDrawerModal =lazy(()=> import("./CustomerContactDrawerModal"));
const CustomerOpportunityDrawerModal =lazy(()=> import("./CustomerOpportunityDrawerModal"));
const AddCustomerDrawerModal =lazy(()=> import("../../AddCustomerDrawerModal"));
const AddCustomerEmailDrawerModal =lazy(()=> import("../UpdateCustomer/AddCustomerEmailDrawerModal"));
const AddCustomerNotesDrawerModal =lazy(()=> import("../CustomerDetail/AddCustomerNotesDrawerModal"));
const CustomerPulseDrawerModal =lazy(()=> import("./CustomerPulseDrawerModal"));
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerAllCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [

    'Name', // 0
'Work', // 1
'Sector', // 2
'Source', // 3
'Quotation', // 4
'PipeLine', // 5
'Assigned', // 6
'Owner', // 7
'Customer', // 8

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
    setPage(page + 1);
    props.getAllCustomerlIST(page,props.filter?props.filter:"creationdate");
    //   props.getSectors();
    // props.getCountries();
    // props.getAllCustomerEmployeelist();
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
   
      setPage(page + 1);
      props.getAllCustomerlIST( page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingAllCustomerList,
    allCustomers,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    updateCustomerModal,
    fetchingAllCustomerListError,
    fetchingAllCustomers,
    handleCustomerContactDrawerModal,
    handleCustomerOpportunityDrawerModal,
    user,
    addDrawerCustomerContactModal,
    addDrawerCustomerOpportunityModal,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
 
  // if (fetchingAllCustomerList) {
  //   return <BundleLoader />;
  // }
  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
    
    {props.customerSearch.length > 0 ? (
    <CustomerSearchedData
    customerSearch={props.customerSearch}
    fetchingCustomerInputSearchData={props.fetchingCustomerInputSearchData}
    />
  ) : (
         <div className=' flex justify-end sticky  z-auto'>
         <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
       
            <div className=" w-[18.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.7rem] max-lg:w-[7.31rem]">
            {translatedMenuItems[0]}
              {/* <FormattedMessage
                id="app.name"
                defaultMessage="Name"
              /> */}
            </div> 
            <div className=" w-[4.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[1]}
              {/* <FormattedMessage
                id="app.work"
                defaultMessage="Work"
              /> */}

            </div>
            <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.33rem]">
            {translatedMenuItems[2]}
              {/* <FormattedMessage
                id="app.sector"
                defaultMessage="Sector"
              /> */}

            </div>
            <div className=" w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            {translatedMenuItems[3]}
              {/* <FormattedMessage
                id="app.source"
                defaultMessage="Source"
              /> */}

            </div>
            <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] max-lg:w-[3.35rem] ">
             
            </div>
            <div className="w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.36rem]">
            {translatedMenuItems[4]}
              {/* <FormattedMessage
                id="app.quotation"
                defaultMessage="Quotation"
              /> */}

            </div>
            <div className="w-[3.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.8rem]">
            {translatedMenuItems[5]}
              {/* <FormattedMessage
                id="app.pipeline"
                defaultMessage="Pipeline"
              /> */}

            </div>
           
            <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[3.2rem]">
            {translatedMenuItems[6]}
              {/* <FormattedMessage
                id="app.assignedTo"
                defaultMessage="Assigned"
              /> */}

            </div>
            <div className="w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.8rem] max-lg:w-[6.2rem]">
              {translatedMenuItems[7]}  
             {/* <FormattedMessage
                id="app.owner"
                defaultMessage="Owner"
              /> */}

            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[8]}
              {/* <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              /> */}
            </div>
            <div className="w-[3.8rem]"></div>

         

      </div>
        <InfiniteScroll
        dataLength={allCustomers.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllCustomerList?<div class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
        style={{ scrollbarWidth:"thin"}}
      >
      
      { !fetchingAllCustomerList && allCustomers.length === 0 ?<NodataFoundPage />:allCustomers.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         //const countryCode = item.countryAlpha2Code
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
                            <div className="flex rounded max-sm:flex-col justify-between bg-white mt-[0.5rem] h-8 max-sm:h-[9rem] items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                                >
                                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                   <div className=" flex  w-[18rem] max-xl:w-[7rem] max-lg:w-[7rem]  max-sm:w-auto">
                                   <div className="flex max-sm:w-full">
                      <div>
                        
                          <MultiAvatar
                            primaryTitle={item.name}
                            imageId={item.imageId}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                       
                      </div>
                      <div class="w-[4%]"></div>

                      <div class="max-sm:w-full md:flex items-center">
                      <Tooltip>
                                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                            <div class=" text-xs flex text-blue-500  font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
      {item.name}
    </Link>                                   
       
             
        {date === currentdate ? (
    <div class="text-xs text-[tomato] mt-[0.4rem] font-bold"
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
                                    <div className=" flex  max-sm:w-auto  items-center  w-[5.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">
                           
                                   
                                    <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   
                                    {item.phoneNumber}
                                    </div>
                                
                                </div> 
                                <div className=" flex  max-sm:w-auto items-center  w-[7.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex items-center  max-sm:w-auto w-[15.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs  max-sm:text-sm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  {item.source}
</div>

</div>
<div className=" flex justify-center w-[5.1rem] max-sm:w-auto max-xl:w-[3.1rem] max-lg:w-[2.1rem] max-sm:flex-row  max-sm:justify-between ">


{/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
<div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
  <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
  {item.countryAlpha2Code}
</div>
</div>
                                
                                <div className=" flex w-full max-xl:w-[2.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                   

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.oppNo}

                          </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex  w-[4.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                  

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.totalProposalValue}

                          </div>
                                </div>
                                <div className=" flex w-[1rem] max-sm:flex-row  max-sm:w-auto max-sm:justify-between ">
                                    

                                <div class=" text-xs  max-sm:text-sm font-poppins text-center">
                            {item.weight}

                          </div>
                                </div>
                                <div className=" flex items-center  flex-col w-[3rem] max-sm:w-auto max-sm:flex-row max-xl:w-[3rem] max-lg:w-[3rem] max-sm:justify-between ">
                                  

                                    <div class=" text-xs  font-poppins">
                                    
                                    <div>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              )}
            </div>
             
                                    </div>
                                </div>
                                <div className=" flex items-center flex-col w-[6rem] max-xl:w-[5rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between mb-2 ">
                       
                     

                       <Tooltip title={item.ownerName}>
       <MultiAvatar
         primaryTitle={item.ownerName}
         imageId={item.ownerImageId}
         imgWidth={"1.8rem"}
         imgHeight={"1.8rem"}
       />
     </Tooltip>
          </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      
                      <div className=" flex  justify-center w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title="Change status to Account?"
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button type="primary"
                              style={{ width: "8rem" }}>
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] " >
                               {item.convertInd===0 && "Convert"}
                               {item.convertInd===1 && "In progress"}
                               {item.convertInd===2 && "Converted"}
                               <NextPlanIcon className="!text-icon " />
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>

                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] ml-1 max-sm:flex-row max-sm:w-[10%]">
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
                      </div>

                      <div class="flex  w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                          <Tooltip title="Contact">
                            <ContactsIcon
                              className=" !text-icon cursor-pointer text-[#709ab3]"
                              onClick={() => {
                                handleCustomerContactDrawerModal(true);
                                handleSetCurrentCustomer(item);
                              }}

                            />
                          </Tooltip>
                        </div>
                        <div>
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
                      </div>
                      <div class="flex w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                        <div>
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
                        <div>
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className=" !text-icon cursor-pointer text-[#4bc076]"
                              onClick={() => {
                                handleCustomerNotesDrawerModal(true);
                                handleSetCurrentCustomer(item);
                                handleRowData(item);
                              }}

                            />
                          </Tooltip>

                        </div>
                      </div>

                      <div class="flex w-6 max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                        <div >
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

                            <LocationOnIcon
                              className=" !text-icon cursor-pointer text-[#960A0A]"

                            />

                          </Tooltip>
                        </div>
                        <div>
                          {props.user.customerUpdateInd === true && user.crmInd === true && (
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                className=" !text-icon cursor-pointer text-[tomato]"

                                onClick={() => {
                                  props.setEditCustomer(item);
                                  handleUpdateCustomerModal(true);
                                  handleSetCurrentCustomerId(item.customerId);

                                }}
                              />
                            </Tooltip>
                          )}
                          {/* <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> */}
                        </div>
                      </div>

                    </div>
                            </div>
                        </div>


                    )
                })}
                </InfiniteScroll>
      </div>
      </div>
        )}
  
      <AddCustomerDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />

      <UpdateCustomerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
      <CustomerContactDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        addDrawerCustomerContactModal={addDrawerCustomerContactModal}
        handleCustomerContactDrawerModal={handleCustomerContactDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <CustomerOpportunityDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        addDrawerCustomerOpportunityModal={addDrawerCustomerOpportunityModal}
        handleCustomerOpportunityDrawerModal={handleCustomerOpportunityDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
         <CustomerPulseDrawerModal
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
    customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <AddCustomerEmailDrawerModal
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
     translatedMenuItems={props.translatedMenuItems}
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      />

      
<AddCustomerNotesDrawerModal
 translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
        customer={currentCustomer}
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
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
  allCustomers: customer.allCustomers,
  sales: opportunity.sales,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingAllCustomerList: customer.fetchingAllCustomerList,
  fetchingAllCustomerListError: customer.fetchingAllCustomerListError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerlIST,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      // getSectors,
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
      // getAllCustomerEmployeelist,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerAllCardList);

