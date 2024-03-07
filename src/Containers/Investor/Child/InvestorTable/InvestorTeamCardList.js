import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select } from "antd";

import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import { Link } from 'react-router-dom';
import {
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
} from "../../../Customer/CustomerAction";
import ReactCountryFlag from 'react-country-flag';
import {getTeamInvestor,handleInvestorNotesDrawerModal,emptyInvestor,handleUpdateInvestorModal} from "../../InvestorAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const AddInvestorNotesDrawerModal = lazy(() =>
  import("../InvestorDetail/AddInvestorNotesDrawerModal")
);
const UpdateInvestorModal = lazy(() =>
  import("../UpdateInvestor/UpdateInvestorModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorTeamCardList(props) {

  const [hasMore, setHasMore] = useState(true);
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
    props.getTeamInvestor(props.userId, page,"creationdate");
    setPage(page + 1);
  }, []);

  useEffect(() => {
    return () => props.emptyInvestor();
  }, []);

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {

      setPage(page + 1);
      props.getTeamInvestor(
        props.currentUser ? props.currentUser : props.userId,
        page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingTeamInvestor,
    teamInvestor,
    handleUpdateInvestorModal,
    updateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  // if (fetchingInvestors) {
  //   return <BundleLoader />;
  // }

  return (
    <>
  
  <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex  w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.4rem]">Name</div>
        <div className=" md:w-[13.1rem]">Sector</div>
        <div className=" md:w-[6.2rem] ">Country</div>
        <div className="md:w-[7.12rem]"># Deals</div>
        <div className="md:w-[8.2rem]">Pipeline Value</div>
        <div className="md:w-[7.3rem]">Assigned to</div>
        <div className="md:w-[8.21rem]">Owner</div>
        <div className="md:w-[6.34rem]">Source</div>
        {/* <div className="w-12">Action</div> */}

      </div>
        <InfiniteScroll
        dataLength={teamInvestor.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamInvestor?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
        
        { !fetchingTeamInvestor && teamInvestor.length === 0 ?<NodataFoundPage />:teamInvestor.map((item,index) =>  {
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
                            <div className="flex rounded-xl  mt-2 bg-white h-11 items-center p-3"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     <div class="flex">
                                <div className=" flex font-medium  md:w-[13rem] max-sm:flex-row w-full ">
                                <div>
<SubTitle>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">

                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`investor/${item.investorId}`} title={item.name}>
      {item.name}
  </Link>  
{/*                                                 
         <Link
          toUrl={`investor/${item.investorId}`}
          title={`${item.name}`}
        >{item.name}</Link> */}
        &nbsp;&nbsp;
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
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-sm text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-44 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</h4> */}
                                    <h4 class=" text-sm text-cardBody font-poppins">
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
                                    </h4>
                                </div>
                                </div>
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</h4> */}

                                    <div class=" text-sm justify-center text-cardBody font-poppins">
                                    {item.oppNo}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</h4> */}

                                    <div class=" text-sm text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "Not available"
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
                                <div className=" flex font-medium flex-col md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between ">
                       
                       {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</h4> */}

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
                   <div class="flex max-sm:justify-between">
                   <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Source</h4> */}

                                    <div class=" text-sm text-cardBody font-poppins">
                                    {item.source}
                                    </div>
                                </div>
                              
                                <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                   <div>
                   <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleInvestorNotesDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>
                   </div>
                   
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
                      style={{ cursor: "pointer", color: "green",fontSize: "1rem" }}
                    />
                  </a>
                </span>
              ):<div class=" w-3">
                      
              </div>}
            </Tooltip>
                        </div>
            </div>
                      &nbsp;&nbsp;
                        <div>
                        <span
              style={{ cursor: "pointer" ,fontSize: "1rem"}}
            //   onClick={() => {
            //     props.getCustomerDetailsById(item.customerId);
            //     props.getCustomerKeySkill(item.customerId);
            //     //   this.props.getCustomerDocument(item.customerId );

            //     props.handleCustomerDrawerModal(item, true);
            //   }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  style={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "#df9697"}}/>}
            </span> 
                        </div>
                        <div>
            

                    </div>
    
                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%] ">
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
                fontSize: "1rem"
              }}/>
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
            <div>
            {user.imInd === true  &&  user.inventoryUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ color: "grey",fontSize:"1rem",padding:"2px" }}
                onClick={() => {
                    handleUpdateInvestorModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            )}
            </div>
                      </div> 
          
                      </div>   
                            </div>
                        </div>


                    )
                })}
     </InfiniteScroll> 
     </div>
     

      <UpdateInvestorModal
        RowData={RowData}
        updateInvestorModal={updateInvestorModal}
        handleUpdateInvestorModal={handleUpdateInvestorModal}
        handleCurrentRowData={handleCurrentRowData}
      />
           <AddInvestorNotesDrawerModal
        RowData={RowData}
        addDrawerInvestorNotesModal={props.addDrawerInvestorNotesModal}
        handleInvestorNotesDrawerModal={props.handleInvestorNotesDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
      />
      {/* <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />
          <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      /> */}
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
  investor
}) => ({
  userId: auth.userDetails.userId,
  teamInvestor:investor.teamInvestor,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingTeamInvestor: investor.fetchingTeamInvestor,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamInvestor,
      handleUpdateInvestorModal,
      emptyInvestor,
      handleInvestorNotesDrawerModal,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorTeamCardList);

