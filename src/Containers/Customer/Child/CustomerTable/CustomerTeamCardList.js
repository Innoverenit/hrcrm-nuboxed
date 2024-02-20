import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import dayjs from "dayjs";
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
} from "../../CustomerAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import ReactCountryFlag from 'react-country-flag';
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

function CustomerTeamCardList(props) {
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
    props.getTeamCustomer(props.userId, page,"creationdate");
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
   
      setPage(page + 1);
      props.getTeamCustomer(
        props.currentUser ? props.currentUser : props.userId,
        page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingTeamCustomer,
    teamCustomer,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
  console.log("ee");
 
  // if (fetchingTeamCustomer) {
  //   return <BundleLoader />;
  // }
  if (isMobile){
    return (
      <>
      
   
           <div className=' flex justify-end sticky top-28 z-auto'>
           <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <InfiniteScroll
          dataLength={teamCustomer.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingTeamCustomer?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
          height={"75vh"}
        >
        
        {teamCustomer.map((item) => { 
           const currentdate = dayjs().format("DD/MM/YYYY");
           const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
  
                        <div class="flex items-center" >
                        <Tooltip>
                                            <div >
                                              <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                  
           <Link
            toUrl={`customer/${item.customerId}`}
            title={`${item.name}`}
          >{item.name}</Link>&nbsp;&nbsp;
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
                                      
                                  <div className=" flex font-medium   ">
                             
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                      <div class=" text-xs text-cardBody font-poppins">   
                                      {item.sector}
                                      </div>
                                  
                                  </div> 
                                  <div className=" flex font-medium  ">
                                    
  
                                      {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                      <div class=" text-sm text-cardBody font-poppins">
                                      <ReactCountryFlag
                            countryCode={item.countryAlpha2Code}
                            svg
                            style={{
                              width: '1em',
                              height: '1em',
                            }}
                          />
                          &nbsp;
                         {item.address && item.address.length && item.address[0].country}
                                      </div>
                                  </div>
                                  </div>
                                  <div class="flex justify-between items-center w-wk ">
                                  <div className=" flex font-medium ">
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
                                  <div className=" flex font-medium ">
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</div> */}
  
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.weight}
  
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  ">
                                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}
  
                                      <div class=" text-xs text-cardBody font-poppins">
                                      
                                      <span>
                {item.assignedTo === null ? (
                  "None"
                ) : (
                  <MultiAvatar2
                    primaryTitle={item.assignedTo}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                )}
              </span>
               
                                      </div>
                                  </div>
                                  <div className=" flex font-medium ">
                         
                         {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</div> */}
  
                         <span>
                <MultiAvatar
                  primaryTitle={item.ownerName}
                  imageId={item.ownerImageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              </span>
                     </div>
                                  </div>
                                  <div class="flex justify-between items-center w-wk ">
                                
                    
                         
                         <div class=" text-sm text-cardBody font-poppins"></div>
                         <Popconfirm
    title="Change status to Account?"
    onConfirm={() => handleConfirm(item.customerId)}
    okText="Yes"
    cancelText="No"
  >
                         <Button type="primary">
                       <span class="text-sm" >Convert as Customer</span>
                          </Button>
                          </Popconfirm>
                   
                     
                    
                                  <div>
                                  <Tooltip title={item.url}>
                {item.url !== "" ? (
                  <span
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
                  </span>
                )
                :<div class=" w-3">
                        
                </div>
                }
              </Tooltip>
          
              </div>
                          <div>
                          <span  className=" !text-base cursor-pointer"
                
                onClick={() => {
                  props.getCustomerDetailsById(item.customerId);
                  props.getCustomerKeySkill(item.customerId);
                  //   this.props.getCustomerDocument(item.customerId );
  
                  props.handleCustomerDrawerModal(item, true);
                }}
              >
                {" "}
                {user.pulseAccessInd === true && <MonitorHeartIcon   className=" !text-base cursor-pointer text-[#df9697]"/>}
              </span> 
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
  
  <LocationOnIcon   className=" !text-base cursor-pointer text-[#960A0A]"/>
  
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
        <div className=" flex justify-between w-[94.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[14.1rem]">Name</div>
        <div className=" md:w-[6.12rem]">Sector</div>
        <div className=" md:w-[8.8rem] ">Country</div>
        <div className="md:w-[5.9rem]"># Opportunity</div>
        <div className="md:w-[8.81rem]">Pipeline</div>
        <div className="md:w-[6.9rem]">Weighted</div>
        <div className="md:w-[5.2rem]">Assigned to</div>
        <div className="md:w-[11.3rem]">Owner</div>
        <div className="w-[3.8rem]"></div>

      </div>
        <InfiniteScroll
        dataLength={teamCustomer.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamCustomer?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"75vh"}
      >
      
      {teamCustomer.map((item) => { 
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
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
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                   <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
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
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-xs text-cardBody font-poppins">   
                                    {item.sector}
                                    </div>
                                
                                </div> 
                                <div className=" flex font-medium flex-col md:w-28 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                    <div class=" text-sm text-cardBody font-poppins">
                                    <ReactCountryFlag
                          countryCode={item.countryAlpha2Code}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                        />
                        &nbsp;
                       {item.address && item.address.length && item.address[0].country}
                                    </div>
                                </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-full max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</div> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.oppNo}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</div> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div>
                                <div className=" flex font-medium items-center  flex-col md:w-72 max-sm:max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-xs text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
                                <div class="flex md:items-center"> 
                                <div className=" flex font-medium items-center flex-col md:w-28 max-sm:flex-row w-full max-sm:justify-between mb-2 ">
                       
                       {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
                   </div>
                   <div className=" flex font-medium justify-center flex-col max-sm:flex-row  ">
                       
                       <div class=" text-sm text-cardBody font-poppins"></div>
                       <Popconfirm
  title="Change status to Account?"
  onConfirm={() => handleConfirm(item.customerId)}
  okText="Yes"
  cancelText="No"
>
                       <Button type="primary">
                     <span class="text-sm" >Convert as Customer</span>
                        </Button>
                        </Popconfirm>
                   </div>
                   
                   <div class="flex flex-col w-[8%] max-sm:flex-row max-sm:w-[10%]">
                                <div>
                                <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span
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
                </span>
              )
              :<div class=" w-3">
                      
              </div>
              }
            </Tooltip>
        
            </div>
                        <div>
                        <span
              className=" !text-base cursor-pointer"
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
            </span> 
                        </div>
                        <div>
            

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
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  teamCustomer: customer.teamCustomer,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingTeamCustomer: customer.fetchingTeamCustomer,
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
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerTeamCardList);

