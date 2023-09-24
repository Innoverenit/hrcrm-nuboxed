import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import moment from "moment";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select } from "antd";

import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "../../../../Components/Common";
import {
  getCustomerListByUserId,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
  emptyCustomer,
} from "../../CustomerAction";
import AddCustomerDrawerModal from "../../AddCustomerDrawerModal";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import AddCustomerEmailDrawerModal from "../UpdateCustomer/AddCustomerEmailDrawerModal";
import ReactCountryFlag from 'react-country-flag';

const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


 
  const [page, setPage] = useState(0);
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
    props.getCustomerListByUserId(props.userId, page);
    setPage(page + 1);
    props.getSectors();
    props.getCountries();
    props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyCustomer();
  }, []);

  const [currentCustomerId, setCurrentCustomerId] = useState("");

  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getCustomerListByUserId(
        props.currentUser ? props.currentUser : props.userId,
        page
      );
    }, 100);
  };

  const {
    fetchingCustomers,
    customerByUserId,
    handleUpdateCustomerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  if (fetchingCustomersError) {
    return <APIFailed />;
  }
 
  return (
    <>
  <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={true}
        // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
        <OnlyWrapCard>
      {customerByUserId.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const date = moment(item.creationDate).format("DD/MM/YYYY");
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-52 ">

                                   
                                        <Tooltip>
                                            <h4 class=" text-base text-cardBody font-poppins">
                                            Name
                                            </h4>
                                            <h4 class=" text-base text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
         <Link
          toUrl={`customer/${item.customerId}`}
          title={`${item.name}`}
        >{item.name}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null}
       
                                            </h4>

                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  w-52 ">
                           
                                    <h4 class=" text-base text-cardBody font-poppins"> Sector </h4>
                                    <h4 class=" text-base text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-36 ">
                                  

                                    <h4 class=" text-base text-cardBody font-poppins">Country</h4>
                                    <h4 class=" text-base text-cardBody font-poppins">
                                    {/* <ReactCountryFlag countryCode="NL" svg /> */}
                                    {/* <ReactCountryFlag
                          countryCode={item.country}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                          title={item.country}
                        /> */}
                        &nbsp;
                       {item.country}
                                    </h4>
                                </div>
                             
                                <div className=" flex font-medium flex-col w-32 ">
                                    <h4 class=" text-base text-cardBody font-poppins"># Opportunity</h4>

                                    <div class=" text-base text-cardBody font-poppins">

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-32 ">
                                    <h4 class=" text-base text-cardBody font-poppins">Assigned to</h4>

                                    <div class=" text-base text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-20 ">
                       
                       <h4 class=" text-base text-cardBody font-poppins">Owner</h4>

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
              />
            </span>
                   </div>
                                <div class="flex flex-col w-[3%]">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
                    <Tooltip title={item.url}>
              {item.url !== "" && (
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" }}
                    />
                  </a>
                </span>
              )}
            </Tooltip>
                        </div>
                      &nbsp;&nbsp;
                        <div>
                        <span
              style={{ cursor: "pointer" ,fontSize: "0.8rem"}}
              onClick={() => {
                props.getCustomerDetailsById(item.customerId);
                props.getCustomerKeySkill(item.customerId);
                //   this.props.getCustomerDocument(item.customerId );

                props.handleCustomerDrawerModal(item, true);
              }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  style={{
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#df9697"}}/>}
            </span> 
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col w-[2%]">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
          </div>
          {/* <div><Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> </div> */}
            <div>
            {props.user.customerUpdateInd === true && (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
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
      </OnlyWrapCard>
      </InfiniteScroll>
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
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
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
  customerByUserId: customer.customerByUserId,
  sales: opportunity.sales,
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
      setEditCustomer,
      getSectors,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      getCountries,
      getAllCustomerEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerCardList);

