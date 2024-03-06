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
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [hasMore, setHasMore] = useState(true);
 
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
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
    props.getCustomerListByUserId(props.userId, page,"creationdate");
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
      props.getCustomerListByUserId(
        props.currentUser ? props.currentUser : props.userId,
        page,
        props.filter?props.filter:"creationdate"
      );
  };

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
  if (isMobile){
    return (
      <>
      
   
           <div className=' flex justify-end sticky top-28 z-auto'>
           <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          
          <InfiniteScroll
          dataLength={customerByUserId.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingCustomers?<div class="flex justify-center">Loading...</div>:null}
          height={"75vh"}
        >
        
        {customerByUserId.map((item) => { 
           const currentdate = dayjs().format("DD/MM/YYYY");
           const date = dayjs(item.creationDate).format("DD/MM/YYYY");
           const countryCode = item.address[0].countryAlpha2Code
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                >
                                   <div class="flex justify-between items-center w-wk ">
                                     <div className=" flex font-medium ">
                                     <div className="flex ">
                        <div>
                        
                            <MultiAvatar
                              primaryTitle={item.name}
                              imageId={item.imageId}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                         
                        </div>
                      
                        <div class="w-full flex items-center">
                        <Tooltip>
                                            <div >
                                              <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                  
           <Link
            toUrl={`customer/${item.customerId}`}
            title={`${item.name}`}
          >{item.name}</Link>&nbsp;&nbsp;
          {date === currentdate ? (
            <div class="text-xs text-[tomato] font-bold"
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
                                  <div className=" flex font-medium    ">
                             
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                      <div class=" text-xs text-cardBody font-poppins">   
                                      {item.sector}
                                      </div>
                                  
                                  </div> 
                                  <div className=" flex font-medium ">
                                    
  
                                      {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                      <div class=" text-sm text-cardBody font-poppins">
                                      <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                      </div>
                                  </div>
                                  </div>
                                  <div class="flex justify-between items-center w-wk ">
                                  <div className=" flex font-medium  ">
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</div> */}
  
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.oppNo}
  
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  ">
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}
  
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.totalProposalValue}
  
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  ">
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</div> */}
  
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.weight}
  
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  ">
                                      
  
                                      <div class=" text-xs text-cardBody font-poppins">
                                      
                                      <div>
                                    {item.assignedTo === null ? (
                "Not available"
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
                                  <div className=" flex font-medium  ">
                         
                         {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</div> */}
  
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
                     <div class="flex justify-between items-center w-wk ">
                         
                     <div className=" flex font-medium  ">
                         
                         <div class=" text-sm text-cardBody font-poppins"></div>
                         <Popconfirm
    title="Change status to Account?"
    onConfirm={() => handleConfirm(item.customerId)}
    okText="Yes"
    cancelText="No"
  >
                         <Button type="primary">
                       <div class="text-sm" >
                       <FormattedMessage
                          id="app.convertAsCustomer"
                          defaultMessage="Convert as Customer"
                        />
                       
                        
                        </div>
                          </Button>
                          </Popconfirm>
                     </div>
                     
                    
                                  <div>
                                  <Tooltip title={item.url}>
                {item.url !== "" ? (
                  <div
                    //type="edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => {}}
                  >
                    {" "}
                    <a href={`https://${item.url}`} target="_blank">
                      <ExploreIcon
                       className=" !text-base cursor-pointer text-[green]"
                      />
                    </a>
                  </div>
                )
                :<div class=" w-3">
                        
                </div>
                }
              </Tooltip>
          
              </div>
                          <div>
                          <div
                style={{ cursor: "pointer" ,fontSize: "0.8rem"}}
                onClick={() => {
                  props.getCustomerDetailsById(item.customerId);
                  props.getCustomerKeySkill(item.customerId);
                  //   this.props.getCustomerDocument(item.customerId );
  
                  props.handleCustomerDrawerModal(item, true);
                }}
              >
                {" "}
                {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-base cursor-pointer text-[#df9697]"/>}
              </div> 
                          </div>
                          <div>
              
  
                      </div>
                      
                    
                          <div>
                          <Tooltip title="Pulse">
         <MonitorHeartIcon
                  onClick={() => {
                    handleCustomerPulseDrawerModal(true);
                    handleSetCurrentCustomer(item);
                  }}
                  className=" !text-base cursor-pointer text-[#df9697]"
                />
             </Tooltip>
                          </div>
                          <div>
                          <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    handleCustomerNotesDrawerModal(true);
                    handleSetCurrentCustomer(item);
                    handleRowData(item);
                  }}
                  className=" !text-base cursor-pointer text-[#4bc076]"
                />
             </Tooltip>
  
                      </div>
                     
                
                    
                      <div >
                      <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
  
  <LocationOnIcon    className=" !text-base cursor-pointer text-[red]"/>
  
  </Tooltip>
  </div>
  <div>
  {props.user.customerUpdateInd === true && user.crmInd === true && (
              <Tooltip title="Edit">
                <BorderColorIcon
                 className=" !text-base cursor-pointer text-[tomato]"
                  onClick={() => {
                      props.setEditCustomer(item);
                      handleUpdateCustomerModal(true);
                      handleSetCurrentCustomerId(item.customerId);
                    
                  }}
                />
              </Tooltip>
              )}
  
  </div>
             
  
                        </div>
                              </div>
                          </div>
  
  
                      )
                  })}
                  </InfiniteScroll>
        </div>
        </div>
        
    
        <AddCustomerDrawerModal
          addDrawerCustomerModal={props.addDrawerCustomerModal}
          handleCustomerDrawerModal={props.handleCustomerDrawerModal}
        />
  
        <UpdateCustomerModal
          customerId={currentCustomerId}
          updateCustomerModal={updateCustomerModal}
          handleUpdateCustomerModal={handleUpdateCustomerModal}
          handleSetCurrentCustomerId={handleSetCurrentCustomerId}
        />
           <CustomerPulseDrawerModal
      customer={currentCustomer}
          addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
          handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
          handleSetCurrentCustomer={handleSetCurrentCustomer}
        />
        <AddCustomerEmailDrawerModal
          // contactById={props.contactById}
          addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
          handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
        />
  
        
  <AddCustomerNotesDrawerModal
          customer={currentCustomer}
          rowdata={rowdata}
          addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
          handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
          handleSetCurrentCustomer={handleSetCurrentCustomer}
        />
      </>
    );
  }



  return (
    <>
    
 
         <div className=' flex justify-end sticky top-28 z-auto'>
         <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex  w-[92.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[18.7rem]"> 
         <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                      </div>
                      <div className=" md:w-[4.5rem]">
        <FormattedMessage
                        id="app.work"
                        defaultMessage="Work"
                      />
          
          </div>
        <div className=" md:w-[6.1rem]">
        <FormattedMessage
                        id="app.sector"
                        defaultMessage="Sector"
                      />
          
          </div>
          <div className=" md:w-[6.12rem]">
        <FormattedMessage
                        id="app.source"
                        defaultMessage="Source"
                      />
          
          </div>
        <div className=" md:w-[5.8rem] ">
        <FormattedMessage
                        id="app.country"
                        defaultMessage="Country"
                      />
          
          </div>
        <div className="md:w-[6.9rem]">
        <FormattedMessage
                        id="app.opportunity"
                        defaultMessage="Opportunity"
                      />

          </div>
        <div className="md:w-[3.8rem]">
        <FormattedMessage
                        id="app.pipeline"
                        defaultMessage="Pipeline"
                      />
          
          </div>
        {/* <div className="md:w-[3.9rem]">
        <FormattedMessage
                        id="app.weighted"
                        defaultMessage="Weighted"
                      />
          
          </div> */}
        <div className="md:w-[5.2rem]">
        <FormattedMessage
                        id="app.assignedTo"
                        defaultMessage="Assigned to"
                      />
   
          </div>
        <div className="md:w-[10.8rem]">
        <FormattedMessage
                        id="app.owner"
                        defaultMessage="Owner"
                      />
          
          </div>
        <div className="w-[3.8rem]"></div>

      </div>
        <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers || fetchingCustomerPagination?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
      
      { !fetchingCustomers && customerByUserId.length === 0 ?<NodataFoundPage />:customerByUserId.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const countryCode = item.address[0].countryAlpha2Code
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
                            <div className="flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                   <div className=" flex font-medium flex-col w-[18rem]   max-sm:w-full">
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
                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`customer/${item.customerId}`} title={item.name}>
      {item.name}
    </Link>
        
        &nbsp;&nbsp;
        {date === currentdate ? (
    <div class="text-xs text-[tomato] font-bold"
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
                                    <div className=" flex font-medium  items-center  md:w-[5.24rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           

                           <div class=" text-xs text-cardBody font-poppins">   
                           {item.phoneNumber}
                           </div>
                       
                       </div>
                                <div className=" flex font-medium  items-center  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-xs text-cardBody font-poppins">   
                                    {item.sector}
                                    </div>
                                
                                </div> 

                                <div className=" flex font-medium  items-center  md:w-[6.215rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                         
                           <div class=" text-xs text-cardBody font-poppins">   
                           {item.source}
                           </div>
                       
                       </div> 
                                <div className=" flex font-medium flex-col justify-center md:w-[5.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                    <div class=" text-sm text-cardBody font-poppins">
                                    <CountryFlag1 countryCode={countryCode} />
                      &nbsp;
                      {countryCode}
                                    </div>
                                </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-[4.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.oppNo}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[5.82rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                {/* <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                                

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div> */}
                                <div className=" flex font-medium items-center  flex-col md:w-[3rem] max-sm:max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-xs text-cardBody font-poppins">
                                    
                                    <div>
                                    {item.assignedTo === null ? (
                "Not available"
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
                                <div class="flex md:items-center"> 
                                <div className=" flex font-medium items-center flex-col md:w-24 max-sm:flex-row w-full max-sm:justify-between max-sm:mb-2 ">
                       
                       {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                       {/* <Tooltip title={item.ownerName}> */}
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              {/* </Tooltip> */}
                   </div>
                   <div className=" flex font-medium justify-center flex-col w-[9.1rem] max-sm:flex-row  ">
                       
                       <div class=" text-sm text-cardBody font-poppins"></div>
                       <Popconfirm
  title="Change status to Account?"
  onConfirm={() => handleConfirm(item.customerId)}
  okText="Yes"
  cancelText="No"
>
{ user.erpInd === true && (
                       <Button type="primary"
                       style={{width:"8rem"}}>
                     <div class="text-xs" >
                     <FormattedMessage
                        id="app.addascustomer"
                        defaultMessage="Add as Customer"
                      />
                     
                      
                      </div>
                        </Button>
                          )}
                        </Popconfirm>
                   </div>
                   
                   <div class="flex flex-col w-6 ml-1 max-sm:flex-row max-sm:w-[10%]">
                                <div>
                                <Tooltip title={item.url}>
              {item.url !== "" ? (
                <div
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                                   className=" !text-base cursor-pointer text-[green]"

                    />
                  </a>
                </div>
              )
              :<div class=" w-3">
                      
              </div>
              }
            </Tooltip>
        
            </div>
                        <div>
                        <div
              style={{ fontSize: "0.8rem"}}
              onClick={() => {
                props.getCustomerDetailsById(item.customerId);
                props.getCustomerKeySkill(item.customerId);
                //   this.props.getCustomerDocument(item.customerId );

                props.handleCustomerDrawerModal(item, true);
              }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  
               className=" !text-base cursor-pointer text-[#df9697]"
                />}
            </div> 
                        </div>
                        <div>
            

                    </div>
                    </div>

                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                        <Tooltip title="Contact">
       <ContactsIcon
               className=" !text-base cursor-pointer text-[#709ab3]"
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
        className=" !text-base cursor-pointer text-[#AF5910]"
                onClick={() => {
                  handleCustomerOpportunityDrawerModal(true);
                  handleSetCurrentCustomer(item);
                  handleRowData(item);
                }}
               
              />
           </Tooltip>

                    </div>
                    </div>
                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%] ">
                        <div>
                        <Tooltip title="Pulse">
       <MonitorHeartIcon
               className=" !text-base cursor-pointer text-[#df9697]"
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
         className=" !text-base cursor-pointer text-[#4bc076]"
                onClick={() => {
                  handleCustomerNotesDrawerModal(true);
                  handleSetCurrentCustomer(item);
                  handleRowData(item);
                }}
               
              />
           </Tooltip>

                    </div>
                    </div>
              
                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                    <div >
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

<LocationOnIcon  
className=" !text-base cursor-pointer text-[#960A0A]"

/>

</Tooltip>
</div>
<div>
{props.user.customerUpdateInd === true && user.crmInd === true && (
            <Tooltip title="Edit">
              <BorderColorIcon
               className=" !text-base cursor-pointer text-[tomato]"
               
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
      
  
      <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
         <CustomerPulseDrawerModal
    customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <CustomerContactDrawerModal
      customer={currentCustomer}
      addDrawerCustomerContactModal={addDrawerCustomerContactModal}
          handleCustomerContactDrawerModal={handleCustomerContactDrawerModal}
          handleSetCurrentCustomer={handleSetCurrentCustomer}
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
      />

      
<AddCustomerNotesDrawerModal
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
  addDrawerCustomerContactModal:customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal:customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  customerByUserId: customer.customerByUserId,
  fetchingCustomerPagination:customer.fetchingCustomerPagination,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
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

