import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { Tooltip, } from "antd";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import InfiniteScroll from "react-infinite-scroll-component";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
    getProductionAllOrder,
    handleNotesModalInOrder,
  handlePaidModal
} from "../Order/OrderAction";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";

function ProductionAllCardList(props) {
  const [particularRowData, setParticularRowData] = useState({});
    const [page, setPage] = useState(0);
    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    useEffect(() => {
      props.getProductionAllOrder(props.orgId, page);
      setPage(page + 1);
    }, []);

    function handleSetParticularOrderData(item, data) {
      console.log(item);
      setParticularRowData(item);
    }
    function handleOrder(orderId) {
      setshow(true);
      setorderId(orderId);
    }
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setPage(page + 1);
        props.getProductionAllOrder(props.currentUser ? props.currentUser : props.orgId, page,
    
    
        );
      }

  const {
    fetchingProductionAllOrder,
    productionAllOrder,
    fetchingCustomerPagination,
  
  } = props;
  console.log("ee");

//   if (fetchingProductionAllOrder) {
//     return <BundleLoader />;
//   }
console.log(page)
  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden  w-[92.5%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[4.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
              <FormattedMessage
                id="app.order#"
                defaultMessage="Order#"
              />
            </div>
            <div className=" w-[9.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
              <FormattedMessage
                id="app.created(name & date)"
                defaultMessage="Created(Name & Date)"
              />

            </div>
            <div className=" w-[23.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
              <FormattedMessage
                id="app.status"
                defaultMessage="Status"
              />

            </div>
            <div className="w-[3.8rem]"></div>

          </div>
          <InfiniteScroll
            dataLength={productionAllOrder.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProductionAllOrder? <div class="flex justify-center">Loading...</div> : null}
            height={"75vh"}
          >

            {!fetchingProductionAllOrder && productionAllOrder.length === 0 ? <NodataFoundPage /> : productionAllOrder.map((item, index) => {
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
                      <div className=" flex font-medium flex-col w-[16rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex max-sm:w-auto">
                    
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                <span
                              class="underline cursor-pointer text-[#1890ff]"
                              onClick={() => {
                                handleOrder(item.orderId);
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

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
                            </span>

                                  &nbsp;&nbsp;
                                  {date === currentdate ? (
                                    <div class="text-xs mt-[0.4rem] text-[tomato] font-bold"
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
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[18.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {` ${item.userName} ${moment(item.creationDate).format('DD/MM/YYYY')}`}
                        </div>

                      </div>
                      <div className=" flex font-medium  items-center max-sm:w-auto  w-[6.21rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">

                        {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                        <div class=" text-xs text-cardBody font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.status}
                        </div>

                      </div>
                    </div>
                  <div class=" flex">
                    <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Notes">
                              <NoteAltIcon
                                style={{ cursor: "pointer", color: "green", fontSize: "1rem" }}
                                onClick={() => {

                                  props.handleNotesModalInOrder(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />

                            </Tooltip>
                          </h4>


                        </div>


                        {/* <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Status">
                              <EventRepeatIcon
                                style={{ cursor: "pointer", fontSize: "1rem", }}
                                onClick={() => {
                                  props.handleStatusOfOrder(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />
                            </Tooltip>
                          </h4>
                        


                        </div> */}
                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Collection">
                              <PaidIcon
                                style={{ cursor: "pointer", fontSize: "1rem", }}
                                onClick={() => {
                                  props.handlePaidModal(true);
                                  handleSetParticularOrderData(item);
                                }}
                              // style={{ color: "blue" }}
                              />
                            </Tooltip>

                          </h4>
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}


                        </div>
                        </div>
                  </div>
                </div>


              )
            })}
          </InfiniteScroll>
        </div>
      </div>

      <AddNotesOrderDrawer
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
       <PaidButtonModal
                    type={props.type}
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={particularRowData}
                />
                      <AccountOrderDetailsModal
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal} />
  
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  order,
  distributor,
  sector,
  opportunity,
  employee,
}) => ({
    productionAllOrder:order.productionAllOrder,
    orgId: auth.userDetails.organizationId,
    fetchingProductionAllOrder:order.fetchingProductionAllOrder,
    allOrderList: order.allOrderList,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingOrderByIdError: order.fetchingOrderByIdError,
    fetchingOrderById: order.fetchingOrderById,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orderShowById: order.orderShowById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProductionAllOrder,
        handleNotesModalInOrder,
        handlePaidModal,
        handleOrderDetailsModal
    
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductionAllCardList);

