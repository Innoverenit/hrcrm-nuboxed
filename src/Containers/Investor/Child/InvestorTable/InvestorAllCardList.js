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
import { Tooltip, Select, } from "antd";

import {
  MultiAvatar,
  MultiAvatar2,
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
import {getAllInvestorsbyId,handleInvestorNotesDrawerModal,emptyInvestor,handleUpdateInvestorModal} from "../../InvestorAction";
import AddInvestorNotesDrawerModal from "../InvestorDetail/AddInvestorNotesDrawerModal";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateInvestorModal = lazy(() =>
  import("../UpdateInvestor/UpdateInvestorModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorAllCardList(props) {

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
    props.getAllInvestorsbyId( page,"creationdate");
    setPage(page + 1);
  }, []);

  useEffect(() => {
    return () => props.emptyInvestor();
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
  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {

      setPage(page + 1);
      props.getAllInvestorsbyId(
        props.currentUser ? props.currentUser :
        page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingAllInvestors,
    allInvestorsbyId,
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
  if (isMobile){
    return (
      <>
    
    <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          
          <InfiniteScroll
          dataLength={allInvestorsbyId.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={fetchingAllInvestors?<div class="flex items-center">Loading...</div>:null}
          height={"75vh"}
        >
          
        {allInvestorsbyId.map((item) => { 
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
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem]  p-3"
                >
                                       <div class="flex justify-between items-center">
                                 
                                  <div>
  
              <MultiAvatar
                primaryTitle={item.name}
                imageId={item.imageId}
                imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            
  </div>
                                    
                                     
                                          <Tooltip>
                                          <div class=" flex   flex-row md:flex-col">
                                              {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                              Name
                                              </div> */}
                                              <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                              <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`investor/${item.investorId}`} title={item.name}>
        {item.name}
    </Link>                                                
           {/* <Link
            toUrl={`investor/${item.investorId}`}
            title={`${item.name}`}
          >{item.name}</Link> */}
          &nbsp;&nbsp;
          {date === currentdate ? (
            <span class="cursor-pointer text-[tomato]" 
              
            >
              New
            </span>
          ) : null}
         
                                              </div>
  </div>
                                          </Tooltip>
                                
                                 
  
                                  
                             
                                     
                                      <div class=" text-sm text-cardBody font-poppins">   
                                      {item.sector}
                                      </div>
                                  
                                 
                                 
                                    
  
                                      
                                     
                                 
                                  </div>
                                  <div class="flex justify-between items-center">
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
                                 
                                      
                                      <div class=" text-sm justify-center text-cardBody font-poppins">
                                      {item.oppNo}
                                      </div>
                                 
                               
                                  
                                     
                                      <div class=" text-sm text-cardBody font-poppins text-center">
                                      {item.totalProposalValue}
  
                                      </div>
                                  
                                 
                                     
  
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
                     <div class="flex justify-between items-center">
                    
                                    
  
                                      <div class=" text-sm text-cardBody font-poppins">
                                      {item.source}
                                      </div>
                                  
                                
                                 
                     <div>
                     <Tooltip title="Notes">
         <NoteAltIcon
                  onClick={() => {
                    props.handleInvestorNotesDrawerModal(true);
                    handleCurrentRowData(item);
                  }}
                  className=" !text-base cursor-pointer text-[green]"
                
                />
             </Tooltip>
                     </div>
                     
                     <div>
                      <Tooltip title={item.url}>
                {item.url !== "" ? (
                  <span
                  className=" cursor-pointer"
                    onClick={() => {}}
                  >
                    {" "}
                    <a href={`https://${item.url}`} target="_blank">
                      <ExploreIcon
                        className=" !text-base cursor-pointer text-[green]"
                      />
                    </a>
                  </span>
                ):<div class=" w-3">
                        
                </div>}
              </Tooltip>
                          </div>
            
                        &nbsp;&nbsp;
                          <div>
                          <span
                 className=" !text-base cursor-pointer"
              //   onClick={() => {
              //     props.getCustomerDetailsById(item.customerId);
              //     props.getCustomerKeySkill(item.customerId);
              //     //   this.props.getCustomerDocument(item.customerId );
  
              //     props.handleCustomerDrawerModal(item, true);
              //   }}
              >
                {" "}
                {user.pulseAccessInd === true && <MonitorHeartIcon
                 className=" !text-base cursor-pointer text-[#df9697]"
              />}
              </span> 
                          </div>
                          <div>
              
  
                      </div>
      
                     
                        <div>
                      <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
              <span className="  cursor-pointer"
                
              >
              <LocationOnIcon   className=" !text-base cursor-pointer text-[#960a0a]"/>
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
                 className=" !text-base cursor-pointer text-[tomato]"
                 
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
    
      </>
    );
  }

  return (
    <>
  
  <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between  w-[91%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.4rem]">Name</div>
        <div className=" md:w-[12.12rem]">Sector</div>
        <div className=" md:w-[9.2rem] ">Country</div>
        <div className="md:w-[7.12rem]"># Deals</div>
        <div className="md:w-[8.2rem]">Pipeline Value</div>
        <div className="md:w-[7.3rem]">Assigned to</div>
        <div className="md:w-[9.21rem]">Owner</div>
        <div className="md:w-[6.34rem]">Source</div>
        {/* <div className="w-12">Action</div> */}

      </div>
        <InfiniteScroll
        dataLength={allInvestorsbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllInvestors?<div class="flex items-center">Loading...</div>:null}
        height={"75vh"}
      >
        
        { !fetchingAllInvestors && allInvestorsbyId.length === 0 ?<NodataFoundPage />:allInvestorsbyId.map((item,index) =>  {
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
                            <div className="flex justify-between rounded-xl  mt-2 bg-white h-11 items-center p-3"
                                
                                >
                                     <div class="flex">
                                <div className=" flex font-medium  md:w-[12.8rem] max-sm:flex-row w-full ">
                                <div>

            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`investor/${item.investorId}`} title={item.name}>
      {item.name}
  </Link>                                                
         {/* <Link
          toUrl={`investor/${item.investorId}`}
          title={`${item.name}`}
        >{item.name}</Link> */}
        &nbsp;&nbsp;
        {date === currentdate ? (
          <span class="cursor-pointer text-[tomato]" 
            
          >
            New
          </span>
        ) : null}
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-[12.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm text-cardBody font-poppins">   
                                    {item.sector}
                                    </div>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-[9.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

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
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[3.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center text-cardBody font-poppins">
                                    {item.oppNo}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-[12.124rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-sm text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "Not available"
              ) : (
                <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                </Tooltip>
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[8.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

                       <span>
                       <Tooltip title={item.ownerName}> 
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
                   </Tooltip>
            </span>
                   </div>
                   </div>
                   <div class="flex max-sm:justify-between">
                   <div className=" flex font-medium flex-col md:w-[9.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Source</div> */}

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
                className=" !text-base cursor-pointer text-[green]"
              
              />
           </Tooltip>
                   </div>
                   
                   <div>
                    <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span
                className=" cursor-pointer"
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      className=" !text-base cursor-pointer text-[green]"
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
               className=" !text-base cursor-pointer"
            //   onClick={() => {
            //     props.getCustomerDetailsById(item.customerId);
            //     props.getCustomerKeySkill(item.customerId);
            //     //   this.props.getCustomerDocument(item.customerId );

            //     props.handleCustomerDrawerModal(item, true);
            //   }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon
               className=" !text-base cursor-pointer text-[#df9697]"
            />}
            </span> 
                        </div>
                        <div>
            

                    </div>
    
                    <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%] ">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span className="  cursor-pointer"
              
            >
            <LocationOnIcon   className=" !text-base cursor-pointer text-[#960a0a]"/>
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
            {/* {user.imInd === true  &&  user.investorUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon
               className=" !text-base cursor-pointer text-[tomato]"
               
                onClick={() => {
                    handleUpdateInvestorModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            )} */}
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
  allInvestorsbyId:investor.allInvestorsbyId,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingAllInvestors: investor.fetchingAllInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllInvestorsbyId,
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
export default connect(mapStateToProps, mapDispatchToProps)(InvestorAllCardList);

