import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
    getProductionHistoryOrder,
    handleNotesModalInOrder,
  handlePaidModal
} from "../Order/OrderAction";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import dayjs from "dayjs";
import { base_url2 } from "../../../Config/Auth";
import { BundleLoader } from "../../../Components/Placeholder";
const AddNotesOrderDrawer=lazy(()=>import("./AddNotesOrderDrawer"));
const AccountOrderDetailsModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal"));
const NodataFoundPage=lazy(()=>import("../../../Helpers/ErrorBoundary/NodataFoundPage"));
const PaidButtonModal = lazy(() => import("../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal"));
function ProductionHistoryCardList(props) {
  const [particularRowData, setParticularRowData] = useState({});
    const [page, setPage] = useState(0);
    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    useEffect(() => {
      props.getProductionHistoryOrder(props.userId, page);
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
        props.getProductionHistoryOrder(props.currentUser ? props.currentUser : props.userId, page,);}

  const {
    fetchingProductionHistoryOrder,
    productionHistoryOrder,
    fetchingCustomerPagination,
  } = props;

  return (
    <>
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[100%] !text-lm font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] justify-between p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[24.1rem]  text-sm text-[#00A2E8] truncate max-md:w-[4.7rem]   max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
             {/* Order */}
             {props.translatedMenuItems[14]}
            </div>
            <div className="  w-[27.5rem] max-md:w-[9.5rem]  max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
                  {/* Created(Name & Date) */}
                  {props.translatedMenuItems[15]}
            </div>
            <div className=" w-[33.1rem] max-md:w-[23.1rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
             {/* Status */}
               {props.translatedMenuItems[16]}
            </div>
          </div>
          <InfiniteScroll
            dataLength={productionHistoryOrder.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={fetchingProductionHistoryOrder || fetchingCustomerPagination ? <div class="flex justify-center"><BundleLoader/></div> : null}
            height={"83vh"}
          >

            {!fetchingProductionHistoryOrder && productionHistoryOrder.length === 0 ? <NodataFoundPage /> : productionHistoryOrder.map((item, index) => {
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
                  <div className="flex rounded justify-between max-sm:flex-col  bg-white mt-[0.5rem]  max-sm:h-[9rem] items-center py-ygap  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"

                  >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                      <div className=" flex w-[24rem] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                        <div className="flex  items-center max-sm:w-auto">
                    
                          <div class="w-[4%]"></div>

                          <div class="max-sm:w-full md:flex items-center">
                            <Tooltip>
                              <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                <div class="flex items-center justify-center text-xs text-blue-500  font-poppins  cursor-pointer">

                                <span
                              class="flex underline cursor-pointer text-[#1890ff] font-bold"
                              onClick={() => {
                                handleOrder(item.orderId);
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class=" text-[0.65rem] text-[tomato] font-bold "
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bold",
                                  }}
                                >
                                                 {props.translatedMenuItems[25]}
                                </span>
                              ) : null}
                            </span>
                                </div>
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                      <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:w-auto  w-[27.24rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  ml-gap font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {` ${item.userName} ${dayjs(item.creationDate).format('DD/MM/YYYY')}`}
                        </div>

                      </div>
                      <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:w-auto  w-[29.6rem] max-xl:w-[4.5rem] max-lg:w-[3.21rem] max-sm:flex-row  max-sm:justify-between  ">              
                        <div class=" text-xs  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                          {item.status}
                        </div>

                      </div>
                    </div>
                  <div class=" flex">
                  <div class="w-6">
                  <a
              href={`${base_url2}/customer/pdf/${item.orderId}`}
            target="_blank"
            >
            <PictureAsPdfIcon className="!text-icon text-red-600"/>
                           </a>
          </div>        
                    <div className=" flex w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                          {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                          <div class=" text-xs  font-poppins">
                            <Tooltip title={props.translatedMenuItems[27]}>
                              <NoteAltIcon className=" cursor-pointer text-green-600 !text-icon"
                                onClick={() => {

                                  props.handleNotesModalInOrder(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />

                            </Tooltip>
                          </div>
                        </div>                                                   
                        <div className=" flex w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title={props.translatedMenuItems[28]}>
                              <PaidIcon
                               className=" cursor-pointer !text-icon text-[#e5625e]"
                                onClick={() => {
                                  props.handlePaidModal(true);
                                  handleSetParticularOrderData(item);
                                }}
                              />
                           </Tooltip>
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
      <suspense>
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
                    translatedMenuItems={props.translatedMenuItems}
                    modalTitleKey={14}
                />
                      <AccountOrderDetailsModal
        particularRowData={particularRowData}
        handleOrderDetailsModal={props.handleOrderDetailsModal}
        addOrderDetailsModal={props.addOrderDetailsModal} />
  </suspense>
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
    productionHistoryOrder:order.productionHistoryOrder,
    userId: auth.userDetails.userId,
    fetchingProductionHistoryOrder:order.fetchingProductionHistoryOrder,
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
        getProductionHistoryOrder,
        handleNotesModalInOrder,
        handlePaidModal,
        handleOrderDetailsModal
    
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductionHistoryCardList);

