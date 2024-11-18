import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import dayjs from "dayjs";
import ArticleIcon from '@mui/icons-material/Article';
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
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import ReactCountryFlag from 'react-country-flag';
import {getInvestorsbyId,
  handleInvestorContModal,
  handleUpdateInvestorModal,
  handleInvestorPulseDrawerModal,
  handleInvestorDocumentModal,
  handleInvestorNotesDrawerModal,emptyInvestor,
  deleteInvestorData,
  handleInvestorPriceDrawer
} from "../../InvestorAction";

import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import InvestorPulseDrawerModal from "./InvestorPulseDrawerModal";
import InventoryPriceDrawer from "./InventoryPriceDrawer";
import InvestorDocumentDrawerModal from "./InvestorDocumentDrawerModal";
const AddInvestorNotesDrawerModal = lazy(() => import("../InvestorDetail/AddInvestorNotesDrawerModal"));
const ContactsInvestorModal = lazy(() => import("./ContactsInvestorModal"));
const UpdateInvestorModal = lazy(() =>
  import("../UpdateInvestor/UpdateInvestorModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorSearchedData(props) {

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
  useEffect(() => {
    return () => props.emptyInvestor();
  }, []);

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

 

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    handleInvestorContModal,
    handleInvestorPulseDrawerModal,
    handleInvestorDocumentModal,
    addDrawerInvestorPulseModal,
    addDrawerInvestorDocumentModal,
    addDrawerInvestorContactModal,
    updateInvestorModal,
    investor,
    priceInvestorDrawer,
    deleteInvestorData,
    handleInvestorPriceDrawer,
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
  
  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" w-[11.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.4rem] ">"Name</div>
        <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.1rem] max-lg:w-[18.1rem]">Sector</div>
        <div className=" w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.2rem] max-lg:w-[8.2rem] "></div>
        <div className="w-[3.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.12rem] max-lg:w-[8.12rem]"># Deals
             </div>
        <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
      In Progress
          </div>
          <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
     Signed
          </div>
          <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
       Category
          </div>
          <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
      First Meeting
          </div>
          <div className="w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
       Shares #
          </div>
         
          <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        Value
          </div>
          <div className="w-[3.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
        Club
          </div>
        <div className="w-[4.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[10.3rem]">
        Assigned
         </div>
        <div className="w-[2.813rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.21rem]">owner"
               </div>
        <div className="w-[5.34rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.34rem] max-lg:w-[12.34rem]">
        "Source
           
          </div>
        {/* <div className="w-12">Action</div> */}

      </div>
        {/* <InfiniteScroll
        dataLength={investorsbyId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingInvestors?<div  class="flex justify-center">Loading...</div>:null}
        height={"80vh"}
      > */}
        
        { !props.fetchingInvestorSearchData && props.investorSerachedData.length === 0 ?<NodataFoundPage />:props.investorSerachedData.map((item,index) =>  {
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
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex font-medium  w-[13.5rem] max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto ">
                                <div>

                                                   <MultiAvatar
                                                      primaryTitle={item.name}
                                                      imageId={item.imageId}
                                                      imageURL={item.imageURL}
                                                      imgWidth={"1.8rem"}
                                                      imgHeight={"1.8rem"}
                                                    />
                                                  
                                        </div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500 flex  font-poppins font-semibold cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"  to={`investor/${item.investorId}`} title={item.name}>
                                            {item.name}
                                        </Link>                                
                                              {/* <Link
                                                toUrl={`investor/${item.investorId}`}
                                                title={`${item.name}`}
                                              >{item.name}</Link> */}
                                              &nbsp;&nbsp;
                                              {date === currentdate ? (
                                                <span class="text-[tomato] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
       
                                            </div>
                                            </ div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium items-center  w-[10.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                    {item.sector}
                                    </div>
                                </div>
                                </div>
                               
                                
                                
                                <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                <div className=" flex font-medium items-center w-8 max-xl:w-[6.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  

                                  {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                                  <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                              <ReactCountryFlag
                                    countryCode={item.countryAlpha2Code}
                                    svg
                                    style={{
                                      width: '1rem',
                                      height: '1rem',
                                    }}
                                  />
                                  &nbsp;
                                {item.countryAlpha2Code}
                                              </div>
                                          </div>
                                <div className=" flex font-medium items-center w-[3.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.oppNo}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium items-center w-[6.124rem] max-xl:w-[6.124rem] max-lg:w-[5.124rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    {item.totalProposalValue && (
      <div class="text-xs  font-poppins max-sm:text-sm text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
        {`${item.userCurrency} ${Math.floor(item.totalProposalValue / 1000)}K`}
      </div>
    )}
                                </div>
                                <div className=" flex font-medium items-center w-[5.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.signed}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[6.11rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.category}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[5.181rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   
                                    {item.firstMeetingDate ? dayjs(item.firstMeetingDate).format("DD/MM/YYYY") : "None"}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[4.117rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm text-[blue] cursor-pointer justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <div  onClick={() => {
                              props.handleInvestorPriceDrawer(true);
                              handleCurrentRowData(item);
                            }}>{item.allTotalQuantityOfShare}</div>
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[3.118rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   {item.allTotalAmountOfShare}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[3.118rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                   {item.club}
                                    </div>
                                </div>
                                <div className=" flex font-medium items-center w-[4.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
                  <Tooltip title={item.assignedTo}> 
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
                   </Tooltip>
                )}
                </>
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col w-[2.12rem] max-xl:w-[2.1rem] max-lg:w-[3.1rem] max-sm:flex-row max-sm:w-auto mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs  font-poppins max-sm:hidden">Owner</div> */}

                       <span>
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
            </span>
                   </div>
                   </div>
                   <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                   <div className=" flex font-medium items-center  w-[8.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* <div class=" text-xs  font-poppins max-sm:hidden">Source</div> */}

                                    <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                    {item.source}
                                    </div>
                                </div>
                                <div class="flex items-center cursor-pointer justify-between">  
                                  <div>
                                  <Tooltip title="Document">
                                    <ArticleIcon
                                  onClick={() => {
                                    handleInvestorDocumentModal(true);
                                    handleCurrentRowData(item);
                                  }}
                                  />
                                  </Tooltip>
                                  </div>          
                                <div >
                          <Tooltip title="Pulse">
         <MonitorHeartIcon
                  onClick={() => {
                    handleInvestorPulseDrawerModal(true);
                    handleCurrentRowData(item);
                  }}
                  className=" !text-icon cursor-pointer text-[#df9697]"
                />
             </Tooltip>
                          </div>
                         
          
                   
                               
                          <div >
                   <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  props.handleInvestorNotesDrawerModal(true);
                  handleCurrentRowData(item);
                }}
                className=" !text-icon cursor-pointer text-green-800"
              />
           </Tooltip>
                   </div>
                   
                   <div >
                    <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span class="cursor-pointer"
                  //type="edit"
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      className=" !text-icon cursor-pointer text-green-800"
                    />
                  </a>
                </span>
              ):<div class=" w-3">
                      
              </div>}
            </Tooltip>
                        </div>                   
                    
                    <div >
                        <span 
              className=" !text-icon cursor-pointer"
            //   onClick={() => {
            //     props.getCustomerDetailsById(item.customerId);
            //     props.getCustomerKeySkill(item.customerId);
            //     //   this.props.getCustomerDocument(item.customerId );

            //     props.handleCustomerDrawerModal(item, true);
            //   }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  className=" !text-icon cursor-pointer text-[#df9697]" />}
            </span> 
                        </div>
        
                        <div >
          
            <Tooltip title="Investor Contact">
              <LocationCityIcon
              className=" !text-icon cursor-pointer p-1 text-blue-500 "
                onClick={() => {
                  handleInvestorContModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
 
            </div>
                      
                    
    
                    
            <div >
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span class="cursor-pointer">
            <LocationOnIcon   className=" !text-icon cursor-pointer text-[#960a0a]"/>
            </span>
          </Tooltip>
          </div>
            <div >
            {user.imInd === true  &&  user.investorUpdateInd === true &&  (
            <Tooltip title="Edit">
              <BorderColorIcon className=" !text-icon cursor-pointer text-[tomato]"
                onClick={() => {
                    handleUpdateInvestorModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
           )} 
            </div>
            <div >
            <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteInvestorData(item.investorId,props.userId)
                        }
                      >
                         <Tooltip title="Delete">
                       
                          <DeleteOutlineIcon
                            type="delete"
                            className="!text-icon text-[red] cursor-pointer"
                          />
                       
                        </Tooltip>
                      </StyledPopconfirm>        
                  </div>
                  </div>
                      </div>   
                            </div>
                        </div>


                    )
                })}

     {/* </InfiniteScroll>  */}
     </div>
  

      <UpdateInvestorModal
        RowData={RowData}
        updateInvestorModal={updateInvestorModal}
        handleUpdateInvestorModal={handleUpdateInvestorModal}
        handleCurrentRowData={handleCurrentRowData}
      />

<ContactsInvestorModal
        RowData={RowData}
        addDrawerInvestorContactModal={addDrawerInvestorContactModal}
        handleInvestorContModal={handleInvestorContModal}
        handleCurrentRowData={handleCurrentRowData}
      />

<InvestorPulseDrawerModal
        RowData={RowData}
        addDrawerInvestorPulseModal={addDrawerInvestorPulseModal}
        handleInvestorPulseDrawerModal={handleInvestorPulseDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
      />

<InvestorDocumentDrawerModal
        RowData={RowData}
        addDrawerInvestorDocumentModal={addDrawerInvestorDocumentModal}
        handleInvestorDocumentModal={handleInvestorDocumentModal}
        handleCurrentRowData={handleCurrentRowData}
      />
           <AddInvestorNotesDrawerModal
        RowData={RowData}
        addDrawerInvestorNotesModal={props.addDrawerInvestorNotesModal}
        handleInvestorNotesDrawerModal={props.handleInvestorNotesDrawerModal}
        handleCurrentRowData={handleCurrentRowData}
      />
      <InventoryPriceDrawer
          RowData={RowData}
          handleInvestorPriceDrawer={handleInvestorPriceDrawer}
          priceInvestorDrawer={priceInvestorDrawer}
          key={priceInvestorDrawer ? 'open' : 'closed'}
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
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  investorsbyId:investor.investorsbyId,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  priceInvestorDrawer: investor.priceInvestorDrawer,
  employees: employee.employees,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
  addDrawerInvestorDocumentModal: investor.addDrawerInvestorDocumentModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorsbyId,
      deleteInvestorData,
      handleUpdateInvestorModal,
      handleInvestorContModal,
      emptyInvestor,
      handleInvestorPulseDrawerModal,
      handleInvestorDocumentModal,
      handleInvestorNotesDrawerModal,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      handleInvestorPriceDrawer

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorSearchedData);

