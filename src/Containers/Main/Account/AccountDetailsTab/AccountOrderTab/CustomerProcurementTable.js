import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  // getOrderProcurement,
  getDistributorOrderOfHigh,
  getDistributorOrderOfMedium,
  getDistributorOrderOfLow,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords,
  handleProcureDetailsModal
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import UpdateProcureModal from "./UpdateProcureModal";
import AccountProcureDetailsModal from "../AccountProcureDetailsModal";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../../Helpers/ErrorBoundary/NodataFoundPage";

function CustomerProcurementTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getProcureRecords(props.distributorId,"procure");
    props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High");
    props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium");
    props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
    // props.getOrderProcurement(props.distributorId, page,"procure");
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
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfHigh(props.distributorId, page, "procure","High")
};

const handleLoadMoreMedium = () => {
  setPage(page + 1);
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfMedium(props.distributorId, page, "procure","Medium")
};
const handleLoadMoreLow = () => {
  setPage(page + 1);
  // props.getDistributorOrderByDistributorId(props.distributorId, page, "repair")
  props.getDistributorOrderOfLow(props.distributorId, page, "procure","Low")
};
  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //   props.getOrderProcurement(props.currentUser ? props.currentUser : props.distributorId, page,"procure"
  //   );
  // }
  //  if (props.fetchingOrderProcurement) {
  //   return <BundleLoader />;
  // }

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">Urgent </div>
                        <div className=" md:w-[7.4rem] ml-2"><FormattedMessage id="app.orderid" defaultMessage="Order ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.payment" defaultMessage="Payment"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.Status" defaultMessage="Status"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.highDistributorOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfHigh ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                    >
                        {props.highDistributorOrder.length ?
                            <>
                                {props.highDistributorOrder.map((item) => {
                                   const currentDate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                        <div class="flex">
                                          <div className=" flex font-medium  flex-col w-wk items-center   max-sm:w-full">
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
                                            <h4 class=" font-poppins text-sm">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </h4>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {item.budget}
                                            </h4>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.9rem"}
                                                      imgHeight={"1.9rem"}
                                                    />
                                            </h4>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {item.paymentInTerms}
                                            </h4>
                                        </div>
                                     
                                        <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                                              <div>
                                                                              <Tooltip title={<FormattedMessage
                                                                                 id="app.edit"
                                                                                     defaultMessage="Edit"
                                                                                    />}>
                                                                                   <BorderColorIcon
                                                                                          className=" !text-icon cursor-pointer text-[tomato]"
                                                                                          onClick={() => {
                                                                                              props.setEditProcure(item)
                                                                                              props.handleUpdateProcureDetailModal(true)
                                                                                              handleSetParticularOrderData(item)
                                                                                          }}
                                                                                      />
                                                                            </Tooltip>
                                                                              </div>
                                                                           
                      
                                                                          </div>
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.highDistributorOrder.length && !props.fetchingDistributorOfHigh ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[orange] ">High </div>
                        <div className=" md:w-[7.4rem] ml-2"><FormattedMessage id="app.orderid" defaultMessage="Order ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.payment" defaultMessage="Payment"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.Status" defaultMessage="Status"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.mediumDistributorOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfMedium ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                    >
                        {props.mediumDistributorOrder.length ?
                            <>
                                {props.mediumDistributorOrder.map((item) => {
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
                                            <h4 class=" font-poppins text-sm">
                      
                                            {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
                               
                              `}
                                            </h4>
                                          </div>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {item.budget}
                                            </h4>
                                        </div>
                                     
                                        <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {/* {item.contactPersonName} */}
                                              <MultiAvatar
                                                      primaryTitle={item.contactPersonName}
                                                  
                                                      imgWidth={"1.9rem"}
                                                      imgHeight={"1.9rem"}
                                                    />
                                            </h4>
                                        </div>
                                        <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                                        <h4 class=" font-poppins text-sm">
                                              {item.paymentInTerms}
                                            </h4>
                                        </div>
                                     
                                        <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                                              <div>
                                                                              <Tooltip title={<FormattedMessage
                                                                id="app.edit"
                                                                defaultMessage="Edit"
                                                            />}>
                                                                                      <BorderColorIcon
                                                                                          className=" !text-icon cursor-pointer text-[tomato]"
                                                                                          onClick={() => {
                                                                                              props.setEditProcure(item)
                                                                                              props.handleUpdateProcureDetailModal(true)
                                                                                              handleSetParticularOrderData(item)
                                                                                          }}
                                                                                      />
                                                                            </Tooltip>
                                                                              </div>
                                                                           
                      
                                                                          </div>
                                      </div>
                                    </div>


                                    )
                                })}
                            </> : !props.mediumDistributorOrder.length && !props.fetchingDistributorOfMedium ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
        <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">Normal </div>
                        <div className=" md:w-[7.4rem] ml-2"><FormattedMessage id="app.orderid" defaultMessage="Order ID"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.contact" defaultMessage="Contact"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.payment" defaultMessage="Payment"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.Status" defaultMessage="Status"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
                    <InfiniteScroll
                        dataLength={props.lowDistributorOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDistributorOfLow ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                    >
                        {props.lowDistributorOrder.length ?
                            <>
                                {props.lowDistributorOrder.map((item) => {
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
                      <h4 class=" font-poppins text-sm">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <h4 class=" font-poppins text-sm">
                        {item.budget}
                      </h4>
                  </div>
               
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <h4 class=" font-poppins text-sm">
                        {/* {item.contactPersonName} */}
                        <MultiAvatar
                                primaryTitle={item.contactPersonName}
                            
                                imgWidth={"1.9rem"}
                                imgHeight={"1.9rem"}
                              />
                      </h4>
                  </div>
                  <div class="flex flex-row items-center md:w-[13.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <h4 class=" font-poppins text-sm">
                        {item.paymentInTerms}
                      </h4>
                  </div>
               
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                        <Tooltip title={<FormattedMessage
                                                                id="app.edit"
                                                                defaultMessage="Edit"
                                                            />}>
                                                                <BorderColorIcon 
                                                                    className=" !text-icon cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditProcure(item)
                                                                        props.handleUpdateProcureDetailModal(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                                </Tooltip>
                                                      
                                                        </div>
                                                     

                                                    </div>
                </div>
              </div>


                                    )
                                })}
                            </> : !props.lowDistributorOrder.length && !props.fetchingDistributorOfLow ? <NodataFoundPage /> : null}
                    </InfiniteScroll>
      </div>
      <UpdateProcureModal
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateProcureDetailModal={props.handleUpdateProcureDetailModal}
                    updateProcureDetailModal={props.updateProcureDetailModal}
                />

                <AccountProcureDetailsModal
                particularRowData={particularRowData}
                handleProcureDetailsModal={props.handleProcureDetailsModal}
                addProcureDetailsModal={props.addProcureDetailsModal} />
    </>
  );



}

const mapStateToProps = ({ distributor }) => ({
  addProcureDetailsModal:distributor.addProcureDetailsModal,
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,
  highDistributorOrder:distributor.highDistributorOrder,
    fetchingDistributorOfHigh:distributor.fetchingDistributorOfHigh,
    mediumDistributorOrder:distributor.mediumDistributorOrder,
    fetchingDistributorOfMedium:distributor.fetchingDistributorOfMedium,
    lowDistributorOrder:distributor.lowDistributorOrder,
    fetchingDistributorOfLow:distributor.fetchingDistributorOfLow,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDistributorOrderOfHigh,
      getDistributorOrderOfMedium,
      getDistributorOrderOfLow,
      // getOrderProcurement,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords,
      handleProcureDetailsModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
