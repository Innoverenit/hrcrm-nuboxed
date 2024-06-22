import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { Tooltip, Select,  } from "antd";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
// import {getCustomerActivityTimeline} from "../../CustomerAction"

import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";
import moment from "moment";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorActivityJumpstartCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

//   useEffect(() => {
//     props.getCustomerActivityTimeline(props.customer.customerId);
   
// }, []);
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


  const {
    fetchingCusActivityTimelineStatus,
    customerActivityTimeline,
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

  if (fetchingCusActivityTimelineStatus) {
    return <BundleLoader />;
  }

  return (
    <>


   
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden  w-[92.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[12.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.7rem] max-lg:w-[9.31rem]">
              <FormattedMessage
                id="app.name"
                defaultMessage="Name"
              />
            </div>
            <div className=" w-[5.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem] max-lg:w-[3.32rem] ">
              <FormattedMessage
                id="app.category"
                defaultMessage="Category"
              />

            </div>
            <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.1rem] max-lg:w-[3.33rem]">
              <FormattedMessage
                id="app.endDate"
                defaultMessage="End Date"
              />

            </div>
            <div className=" w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
              <FormattedMessage
                id="app.creationDate"
                defaultMessage="Creation Date"
              />

            </div>
            <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.2rem]">
              <FormattedMessage
                id="app.status"
                defaultMessage="Status"
              />
              

            </div>
            <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.2rem]">
              <FormattedMessage
                id="app.ageing"
                defaultMessage="Ageing"
              />
              

            </div>
            <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[4.2rem]">
              <FormattedMessage
                id="app.assignedTo"
                defaultMessage="Assigned"
              />
              

            </div>
          
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              <FormattedMessage
                id="app.owner"
                defaultMessage="Owner"
              />
            </div>
      
            {/* <div className="w-[3.8rem]"></div> */}

          </div>
       

            {!fetchingCusActivityTimelineStatus && customerActivityTimeline.length === 0 ? <NodataFoundPage /> : customerActivityTimeline.map((item, index) => {
              const currentdate = dayjs().format("DD/MM/YYYY");
              const date = dayjs(item.creationDate).format("DD/MM/YYYY");
             
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
                  <div className="flex rounded-xl justify-between max-sm:flex-col  bg-white mt-[0.5rem] h-[2.75rem] max-sm:h-[9rem] items-center p-3 "
                  
                  >
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium flex-col w-[12rem] max-xl:w-[7rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                          
                        

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem] cursor-pointer" to={`customer/${item.customerId}`} title={item.name}>
                                    {item.activityType}
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
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[8.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                         {`${item.category} `}
                        </div>

                      </div>
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[6.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                        {moment.utc(item.endDate).format('DD/MM/YYYY')}
                        </div>

                      </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex font-medium max-sm:w-auto  items-center  w-[1.215rem] max-xl:w-[4rem] max-lg:w-[2.215rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                       
                          {moment.utc(item.creationDate).format('DD/MM/YYYY')}
                        </div>

                      </div>
                      {/* <div className=" flex font-medium max-sm:w-auto flex-col justify-center w-[5.1rem] max-xl:w-[3.1rem] max-lg:w-[3.1rem] max-sm:flex-row  max-sm:justify-between ">


                       
                        <div class=" text-sm text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          <CountryFlag1 countryCode={countryCode} />
                          &nbsp;
                          {countryCode}
                        </div>
                      </div> */}
                   

                
                    </div>

                    <div className=" flex font-medium  items-center max-sm:w-auto  w-[7.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
 {`${item.status} `}
</div>

</div>
<div className=" flex font-medium  items-center max-sm:w-auto  w-[7.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


<div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
 {`${item.ageing} `}
</div>

</div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
              
                    <div className=" flex font-medium items-center max-sm:w-auto  flex-col w-[3rem] max-xl:w-[8rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned</div> */}

                      <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                        <div>
                          {item.assignedTo === null ? (
                            <div class="text-xs text-cardBody font-poppins">No Data</div>
                          ) : (
                            <>
                              {/* {item.assignedTo === item.woner ? (

                                null
                              ) : ( */}
                                <MultiAvatar2
                                  primaryTitle={item.assignedTo}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              {/* )} */}
                            </>
                          )}
                        </div>

                      </div>
                    </div>
                    <div className=" flex font-medium items-center max-sm:w-auto flex-col w-[15rem] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                        <Tooltip title={item.woner}>
                          <div class="max-sm:flex justify-end">
                            <Tooltip title={item.woner}>
                              <MultiAvatar
                                primaryTitle={item.woner}
                                imageId={item.ownerImageId}
                                imgWidth={"1.9rem"}
                                imgHeight={"1.9rem"}
                              />
                            </Tooltip>
                          </div>
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
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
    customerActivityTimeline: customer.customerActivityTimeline,
    fetchingCusActivityTimelineStatus:customer.fetchingCusActivityTimelineStatus,
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
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getCustomerActivityTimeline
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorActivityJumpstartCardList);

