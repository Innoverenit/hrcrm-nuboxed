import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  getOrderProcurement,
  handleUpdateProcureDetailModal,
  setEditProcure,
  getProcureRecords
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import UpdateProcureModal from "./UpdateProcureModal";

function CustomerProcurementTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getProcureRecords(props.distributorId,"procure");
    props.getOrderProcurement(props.distributorId, page,"procure");
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  // useEffect(() => {
  //   return () => props.emptyOrders();
  // }, []);
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getOrderProcurement(props.currentUser ? props.currentUser : props.distributorId, page,"procure"
    );
  }

  return (
    <>
    <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
<div class=" w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.order#" defaultMessage="Order #"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
        <InfiniteScroll
          dataLength={props.procurementOrder.length}
          next={handleLoadMore}
          loader={props.fetchingOrderProcurement ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        >
          {props.procurementOrder.map((item) => {
                const currentDate = moment().format("DD/MM/YYYY");

            const diff = Math.abs(
              moment().diff(moment(item.lastRequirementOn), "days")
            );
            const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
              } 
                   Street : ${item.address && item.address.length && item.address[0].street
              }   
                  State : ${item.address && item.address.length && item.address[0].state
              }
                 Country : ${(item.address &&
                item.address.length &&
                item.address[0].country) ||
              ""
              } 
                   PostalCode : ${item.address &&
              item.address.length &&
              item.address[0].postalCode
              } `;
            return (
              <div>
                <div
                  className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                    <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                      <div className="flex max-sm:w-full">
                      <div className=" flex font-medium  md:w-[8.56rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

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

                        <div class="max-sm:w-full md:w-[14.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.newOrderNo} &nbsp;&nbsp; <span> {currentDate === moment(item.creationDate).format("DD/MM/YYYY") ? (
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
                      {` ${moment(item.deliveryDate).format("ll")}`}
                            </div>

                   
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[23.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">

                      {`${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].state) || ""},${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].city) || ""}, ${(item.loadingAddress && item.loadingAddress.length && item.loadingAddress[0].country) || ""}
         
        `}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
                  <h4 class="text-cardBody font-poppins text-sm">
                        {item.budget}
                      </h4>
                  </div>
               
                  <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                        <div>
                                                          
                                                                <BorderColorIcon
                                                                    className=" !text-base cursor-pointer text-[tomato]"
                                                                    onClick={() => {
                                                                        props.setEditProcure(item)
                                                                        props.handleUpdateProcureDetailModal(true)
                                                                        handleSetParticularOrderData(item)
                                                                    }}
                                                                />
                                                      
                                                        </div>
                                                     

                                                    </div>
                </div>
              </div>
              // </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <UpdateProcureModal
                    particularRowData={particularRowData}
                    distributorId={props.distributorId}
                    handleUpdateProcureDetailModal={props.handleUpdateProcureDetailModal}
                    updateProcureDetailModal={props.updateProcureDetailModal}
                />
    </>
  );



}

const mapStateToProps = ({ distributor }) => ({
  procurementOrder: distributor.procurementOrder,
  updateProcureDetailModal:distributor.updateProcureDetailModal,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,
  procureRecordData:distributor.procureRecordData,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderProcurement,
      handleUpdateProcureDetailModal,
      setEditProcure,
      getProcureRecords
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
