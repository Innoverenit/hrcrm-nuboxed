import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,Popconfirm } from "antd";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  getQuotationRepairOrder,
  getQuotationProcureOrder,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal,
  quotationToOrder
} from "../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import AccountProcureDetailsModal from "../AccountDetailsTab/AccountProcureDetailsModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

function LinkedOpportunityTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    // props.getProcureRecords(props.distributorData.distributorId,"Quotation");
    props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair",);
    props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",);
  

    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  // useEffect(() => {
  //   return () => props.emptyOrders();
  // }, []);
  const [hasMore, setHasMore] = useState(true);
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);


}
const handleLoadMore = () => {
  setPage(page + 1);
  
  props.getQuotationRepairOrder(props.distributorData.distributorId, page, "Repair")
};

const handleLoadMoreMedium = () => {
  setPage(page + 1);
  
  props.getQuotationProcureOrder(props.distributorData.distributorId, page, "Procure",)
};

const handleConfirm = (quotationId) => {
  // Call the function to change the status to "Lost" here
  props.quotationToOrder(quotationId,props.userId);
};

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
                        <div class=" w-[8.5rem]">Repair</div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.quotationid" defaultMessage="Quotation ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.payment" defaultMessage="Payment"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.Status" defaultMessage="Status"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.toOrder" defaultMessage="To Order"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationRepairOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationRepairOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                    >
                        {props.quotationRepairOrder.length ?
                            <>
                                {props.quotationRepairOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex font-medium flex-col w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex font-medium items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
                                                                                          {item.priority === "High" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                                          )}
                                                                                          {item.priority === "Medium" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                                          {item.priority === "Low" && (
                                                                                              <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                                      </div>
                                                                                  </div>
                                                                              </Tooltip>
                                                                          </div>
                      
                                              <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                                                <Tooltip>
                                                  <div class="max-sm:w-full  justify-between flex md:flex flex-row text-sm">
                                                  <span
                                                                                          class="underline cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              handleSetParticularOrderData(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-xs text-[tomato] font-bold">
                                            New
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                          </div>
                      
                                          <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                                            {` ${dayjs(item.deliveryDate).format("ll")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex font-medium flex-col  md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-sm">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.9rem"}
                                                      imgHeight={"1.9rem"}
                                                    />
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {item.paymentInTerms}
                                            </div>
                                        </div>
                                        
                  <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-sm">
                  <Popconfirm
                          title="Change status to Order?"
                          onConfirm={() => handleConfirm(item.quotationId,props.userId)}
                          okText="Yes"
                          cancelText="No"
                        >
                  <Button type="primary">Convert</Button>
                  </Popconfirm>
                      </div>
                  </div>
                                     
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.quotationRepairOrder.length && !props.fetchingQuotationRepairOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      <div class="rounded m-1 mt-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
<div class=" w-[8.5rem]">Procure</div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.quotationid" defaultMessage="Quotation ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.payment" defaultMessage="Payment"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.Status" defaultMessage="Status"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.toOrder" defaultMessage="To Order"/></div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.quotationProcureOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingQuotationProcureOrder ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                    >
                        {props.quotationProcureOrder.length ?
                            <>
                                {props.quotationProcureOrder.map((item) => {
                                 const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex font-medium flex-col w-wk items-center   max-sm:w-full">
                                            <div className="flex items-center max-sm:w-full">
                                            <div className=" flex font-medium items-center  md:w-[8.56rem] max-sm:w-full  ">
                                                                              <Tooltip>
                                                                                  <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                                      <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                      
                                                                                          {item.priority === "High" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                                          )}
                                                                                          {item.priority === "Medium" && (
                                                                                              <div
                                                                                                  class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                                          {item.priority === "Low" && (
                                                                                              <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                                      </div>
                                                                                  </div>
                                                                              </Tooltip>
                                                                          </div>
                      
                                              <div class="max-sm:w-full items-center  md:w-[10.02rem]">
                                                <Tooltip>
                                                  <div class="max-sm:w-full  justify-between flex md:flex flex-row text-sm">
                                                  <span
                                                                                          class="underline cursor-pointer text-[#1890ff]"
                                                                                          onClick={() => {
                                                                                              handleSetParticularOrderData(item);
                                                                                              props.handleProcureDetailsModal(true);
                                                                                          }}
                                                                                      >{item.newOrderNo}</span>
                                                                                       <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                                          <span className="text-xs text-[tomato] font-bold">
                                            New
                                          </span>
                                        ) : null} </span>
                                                   
                                                  </div>
                                                </Tooltip>
                                              </div>
                                            </div>
                                          </div>
                      
                                          <div class="flex flex-row items-center md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                                        
                                            
                                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                                            {` ${dayjs(item.deliveryDate).format("ll")}`}
                                                  </div>
                      
                                         
                                          </div>
                                        </div>
                                        <div class="flex">
                                          <div className=" flex font-medium flex-col  md:w-[21.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <div class=" font-poppins text-sm">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </div>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {item.budget}
                                            </div>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.9rem"}
                                                      imgHeight={"1.9rem"}
                                                    />
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <div class=" font-poppins text-sm">
                                              {item.paymentInTerms}
                                            </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div class=" font-poppins text-sm">
                  <Popconfirm
                          title="Change status to Order?"
                          onConfirm={() => handleConfirm(item.quotationId,props.userId)}
                          okText="Yes"
                          cancelText="No"
                        >
                  <Button type="primary">Convert</Button>
                  </Popconfirm>
                      </div>
                  </div>
                                       
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.quotationProcureOrder.length && !props.fetchingQuotationProcureOrder ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      

                <AccountProcureDetailsModal
                particularRowData={particularRowData}
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />
    </>
  );



}

const mapStateToProps = ({ distributor,auth }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  userId: auth.userDetails.userId,
  quotationRepairOrder:distributor.quotationRepairOrder,
  fetchingQuotationRepairOrder:distributor.fetchingQuotationRepairOrder,
  quotationProcureOrder:distributor.quotationProcureOrder,
    fetchingQuotationProcureOrder:distributor.fetchingQuotationProcureOrder,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getQuotationRepairOrder,
      getQuotationProcureOrder,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal,
      quotationToOrder
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedOpportunityTable);
