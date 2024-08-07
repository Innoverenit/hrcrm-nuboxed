import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select, Button, Popconfirm } from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import {
  getCustomerListByUserId,
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
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { FormattedMessage } from "react-intl";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import CustomerSearchedData from "./CustomerSearchedData";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddCustomerDrawerModal = lazy(() =>
  import("../../AddCustomerDrawerModal")
);
const AddCustomerEmailDrawerModal = lazy(() =>
  import("../UpdateCustomer/AddCustomerEmailDrawerModal")
);
const AddCustomerNotesDrawerModal = lazy(() =>
  import("../CustomerDetail/AddCustomerNotesDrawerModal")
);
const CustomerPulseDrawerModal = lazy(() =>
  import("./CustomerPulseDrawerModal")
);
const CustomerContactDrawerModal = lazy(() =>
  import("./CustomerContactDrawerModal")
);
const CustomerOpportunityDrawerModal = lazy(() =>
  import("./CustomerOpportunityDrawerModal")
);
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerCardList(props) {


  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  // const [page1, setPage1] = useState(0);
  // const [page2, setPage2] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(props.viewType)

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
    
      props.emptyCustomer()
      props.getCustomerListByUserId(props.userId, page, "creationdate");
   
  }, [props.viewType]);
  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     props.emptyCustomer()
  //     props.getCustomerListByUserId(props.userId, page, "creationdate");
  //   } else if (props.viewType === "teams") { 
  //     props.emptyCustomer()
  //     props.getCustomerListByUserId(props.viewType, page1, "creationdate");
  //   } else {     
  //     props.emptyCustomer()
  //     props.getCustomerListByUserId(props.viewType, page2, "creationdate");
  //   }
  // }, [props.viewType,page,page1,page2]);


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
    //setPage(page + 1);
    // props.getCustomerListByUserId(props.userId, page, "creationdate");
    //   props.getSectors();
    // props.getCountries();
    //props.getAllCustomerEmployeelist();
    // if (props.viewType === "table") {
    //   props.emptyCustomer()
    //   props.getCustomerListByUserId(props.userId, page, "creationdate");
    // } else if (props.viewType === "teams") {
    //   props.emptyCustomer()
    //   props.getCustomerListByUserId(props.viewType, page1, "creationdate");
    // } else {
    //   props.emptyCustomer()
    //   props.getCustomerListByUserId(props.viewType, page2, "creationdate");
    // }

  }, []);

  const [JsonData, setJsonData] = useState(props.customerByUserId);

  console.log(JsonData)
  useEffect(() => {
    setJsonData(props.customerByUserId)
  }, [props.customerByUserId]);

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
    const callPageMapd = props.customerByUserId && props.customerByUserId.length &&props.customerByUserId[0].pageCount
    setTimeout(() => {

      if  (props.customerByUserId)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          props.getCustomerListByUserId(props.userId, page, "creationdate");
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  // const handleLoadMore = () => {
  
  //   if(props.viewType==="table"){
  //     // setPage(page + 1)
  //     setPage(prevPage => prevPage + 1)
  //     props.getCustomerListByUserId(props.userId, page+1, "creationdate");
  //   }else if (props.viewType==="teams"){
  //     // setPage1(page1 + 1)
  //     setPage1(prevPage => prevPage + 1)
  //   props.getCustomerListByUserId(props.viewType, page1+1, "creationdate");
  //   }else if (props.viewType==="all"){
  //     // setPage2(page2 + 1)
  //     setPage2(prevPage => prevPage + 1)
  //   props.getCustomerListByUserId(props.viewType, page2+1, "creationdate");
  //   }
     
  //   //  setPage(page + 1);
  //   // setPage(prevPage => prevPage + 1);
  //   //   props.getCustomerListByUserId(props.viewType === "table"?props.userId:props.viewType, page+1, "creationdate");
    
  // };


  // const handleLoadMore = () => {
  //   if (props.viewType === "table") {
  //     setPage(prevPage => {
  //       console.log("Previous page (table):", prevPage);
  //       return prevPage + 1;
  //     });
  //     props.getCustomerListByUserId(props.userId, page + 1, "creationdate");
  //   } else if (props.viewType === "teams") {
  //     setPage1(prevPage => {
  //       console.log("Previous page (teams):", prevPage);
  //       return prevPage + 1;
  //     });
  //     props.getCustomerListByUserId(props.viewType, page1 + 1, "creationdate");
  //   } else if (props.viewType === "all") {
  //     setPage2(prevPage => {
  //       console.log("Previous page (all):", prevPage);
  //       return prevPage + 1;
  //     });
  //     props.getCustomerListByUserId(props.viewType, page2 + 1, "creationdate");
  //   }
  // };
  
  

  const {
    fetchingCustomers,
    customerByUserId,
    fetchingCustomerPagination,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    addDrawerCustomerContactModal,
    addDrawerCustomerOpportunityModal,
    handleCustomerPulseDrawerModal,
    handleCustomerContactDrawerModal,
    handleCustomerOpportunityDrawerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
  console.log("ee");

  // if (fetchingCustomers) {
  //   return <BundleLoader />;
  // }
console.log(page)
console.log(props.userId)
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
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[99%] justify-between p-1 bg-transparent font-bold sticky z-10">
            <div></div>
            <div className=" w-[12.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            {translatedMenuItems[0]}
              {/* <FormattedMessage
                id="app.name"
                defaultMessage="Name"
              /> */}
            </div>
            <div className=" w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {translatedMenuItems[1]}
              {/* <FormattedMessage
                id="app.work"
                defaultMessage="Work"
              /> */}

            </div>
            <div className=" w-[8.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
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
            <div className=" w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[3.35rem] ">
              

            </div>
            <div className="w-[5.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            {translatedMenuItems[4]}
              {/* <FormattedMessage
                id="app.quotation"
                defaultMessage="Quotation"
              /> */}

            </div>
            <div className="w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
            {translatedMenuItems[5]}
              {/* <FormattedMessage
                id="app.pipeline"
                defaultMessage="Pipeline"
              /> */}

            </div>
            {/* <div className="md:w-[3.9rem]">
        <FormattedMessage
                        id="app.weighted"
                        defaultMessage="Weighted"
                      />
          
          </div> */}
            <div className="w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            {translatedMenuItems[6]}
              {/* <FormattedMessage
                id="app.assigned"
                defaultMessage="Assigned"
              /> */}

            </div>
            <div className="w-[4.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] ">
            {translatedMenuItems[7]}
              {/* <FormattedMessage
                id="app.owner"
                defaultMessage="Owner"
              /> */}
            </div>
            <div className="w-[9.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {translatedMenuItems[8]}
              {/* <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              /> */}
            </div>
            <div className="w-[4.12rem]"></div>

          </div>
          <InfiniteScroll
            dataLength={customerByUserId.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingCustomers || fetchingCustomerPagination ? <div class="flex justify-center">Loading...</div> : null}
            height={"80vh"}
            style={{ scrollbarWidth:"thin"}}
          >

            {!fetchingCustomers && customerByUserId.length === 0 ? <NodataFoundPage /> : customerByUserId.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
              const countryCode = item.countryAlpha2Code
              const diff = Math.abs(
                dayjs().diff(dayjs(item.lastRequirementOn), "days")
              );
              const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                } 
           Street : ${item.address && item.address.length && item.address[0].street
                }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address && item.address.length && item.address[0].country) || ""
                } 
           PostalCode : ${item.address && item.address.length && item.address[0].postalCode
                } `;
              return (
                <div>
                  <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex  w-[13rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          <div>
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
                                <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.name}
                                  </Link>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
                                    >
                                      New
                                    </div>
                                  ) : null}
                                  {/* <a class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[blue] cursor-pointer" 
                            href={`customer/${item.customerId}`}>{item.name} </a>
                              &nbsp;&nbsp;
        {date === currentdate ? (
          <div class="text-xs"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </div>
        ) : null}
        */}
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[7.54rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {
  
  (item.countryDialCode !== null && item.countryDialCode !== undefined) && 
  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?

 
  `${item.countryDialCode} ${item.phoneNumber}` :

  
  (item.phoneNumber !== null && item.phoneNumber !== undefined) ?
  `${item.phoneNumber}` : 
  '' 
}

                          {/* {
                          `${item.countryDialCode} ${item.phoneNumber}`
                          } */}
                        </div>

                      </div>
                      <div className=" flex  items-center max-sm:w-auto  w-[9.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.sector}
                        </div>

                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex max-sm:w-auto  items-center  w-[8.215rem] max-xl:w-[5rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.source}
                        </div>

                      </div>
                      <div className=" flex max-sm:w-auto  items-center  w-[5.1rem] max-xl:w-[4.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">


                        {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                          {/* &nbsp;
                          {countryCode} */}
                        </div>
                      </div>


                      <div className=" flex items-center  max-sm:w-auto w-[6.1rem] max-xl:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.oppNo}

                        </div>
                      </div>
                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex max-sm:w-auto w-[4.82rem] max-xl:w-[4.82rem] max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        {/* {item.totalProposalValue > 0 && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${item.totalProposalValue}`}
      </div>
    )} */}
                            {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
      {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                      </div>
                      {/* <div className=" flex font-medium flex-Nonew-96 max-sm:flex-row w-full max-sm:justify-between ">
                                

                                    <div class=" text-xs  font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div> */}
                      <div className=" flex items-center max-sm:w-auto   w-[4rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Assigned</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">No Data</div>
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
                      <div className=" flex f items-center max-sm:w-auto w-[2rem] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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

                      <div className=" flex  justify-center  w-[9.1rem] max-xl:w-[8.1rem] max-lg:w-[8.1rem] max-sm:flex-row  ">

                        <div class=" text-xs  font-poppins"></div>
                        <Popconfirm
                          title="Change status to Customer?"
                          onConfirm={() => handleConfirm(item.customerId)}
                          okText="Yes"
                          cancelText="No"
                        >
                          {user.erpInd === true && (
                            <Button type="primary"
                              style={{ width: "8rem", background: "linear-gradient(to right, #2BBCCF, #38C98D)" }}>
                              <div class="text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem] " >
                                {item.convertInd === 0 && "Convert"}
                                {item.convertInd === 1 && "In progress"}
                                {item.convertInd === 2 && "Converted"}
                                <NextPlanIcon  className="!text-icon "/>
                              </div>
                            </Button>
                          )}
                        </Popconfirm>
                      </div>

                     
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
                     

                     
                        <div >
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
                        <div >
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
                     
                     
                        <div >
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
                        <div >
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
                     

                      
                        <div >
                          <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

                            <LocationOnIcon
                              className=" !text-icon cursor-pointer text-[#960A0A]"

                            />

                          </Tooltip>
                        </div>
                        <div >
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


              )
            })}
          </InfiniteScroll>
        </div>
      </div>
  )}

      <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
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
      />
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
      translatedMenuItems={props.translatedMenuItems}
      />


      <AddCustomerNotesDrawerModal
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
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerNotesModal: customer.addDrawerCustomerNotesModal,
  customerByUserId: customer.customerByUserId,
  fetchingCustomerPagination: customer.fetchingCustomerPagination,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal: customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  // viewType: customer.viewType,
  customerSearch: customer.customerSearch,
  fetchingCustomerInputSearchData: customer.fetchingCustomerInputSearchData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerListByUserId,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      handleCustomerContactDrawerModal,
      handleCustomerOpportunityDrawerModal,
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
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardList);

