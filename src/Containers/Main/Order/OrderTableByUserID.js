
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Select ,Popconfirm} from "antd";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal, handleLeadModal,
 
   } from "../Account/AccountAction";
import {

  emptyOrders,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  deleteOrderRepairData,
  getRepairHighOrderList,
  getRepairMediumOrderList,
  getRepairLowOrderList
} from "./OrderAction";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
import { PersonAddAlt1 } from "@mui/icons-material";
import AddLeadModal from "./AddLeadModal";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
const { Option } = Select;

function OrderTableByUserID(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    
    props.getRepairHighOrderList(props.userId, page,"High");
    props.getRepairMediumOrderList(props.userId, page,"Medium");
    props.getRepairLowOrderList(props.userId, page,"Low");
    // props.getOrderById(props.userId, page);
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  useEffect(() => {
    return () => props.emptyOrders();
  }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }
  // props.getOrderById(props.userId,page);
 
  const handleLoadMore = () => {
    const callPageMapd = props.repairHighCompleteOrder && props.repairHighCompleteOrder.length &&props.repairHighCompleteOrder[0].pageCount
    setTimeout(() => {
      const {
        getRepairHighOrderList,
       
      } = props;
      if  (props.repairHighCompleteOrder)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getRepairHighOrderList(
            props.userId, page,"High"
          );
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
//   const handleLoadMoreMedium = () => {
//     setPage(page + 1);
   
//     props.getRepairMediumOrderList(props.userId, page,"Medium");
// };
const handleLoadMoreMedium = () => {
  const callPageMapd = props.repairMediumCompleteOrder && props.repairMediumCompleteOrder.length &&props.repairMediumCompleteOrder[0].pageCount
  setTimeout(() => {
    const {
      getRepairMediumOrderList,
     
    } = props;
    if  (props.repairMediumCompleteOrder)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getRepairMediumOrderList(
          props.userId, page,"Medium"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};
// const handleLoadMoreLow = () => {
//     setPage(page + 1);
//     props.getRepairLowOrderList(props.userId, page,"Low");
// };
const handleLoadMoreLow = () => {
  const callPageMapd = props.repairLowCompleteOrder && props.repairLowCompleteOrder.length &&props.repairLowCompleteOrder[0].pageCount
  setTimeout(() => {
    const {
      getRepairLowOrderList,
     
    } = props;
    if  (props.repairLowCompleteOrder)
    {
      if (page < callPageMapd) {
        setPage(page + 1);
        getRepairLowOrderList(
          props.userId, page,"Low"
        );
    }
    if (page === callPageMapd){
      setHasMore(false)
    }
  }
  }, 100);
};

  return (
    <>
      <div className=' flex  sticky  z-auto'>
                <div class="rounded-lg m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[99%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">Urgent </div>
                        <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.018rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[5.06rem]">Type</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                   
                    <InfiniteScroll
          dataLength={props.repairHighCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingRepairHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
         
          height={"22vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairHighCompleteOrder.length ?
                            <>
                                {props.repairHighCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");

                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      
                                      <div>
                                         
                <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium items-center  md:w-[4.26rem] max-sm:w-full  ">
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
                    <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                      <div className="flex max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
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
                        </div>

                        <div class="max-sm:w-full md:w-[10.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[5.023rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[4.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  <div class=" flex">
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex justify-end items-center">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xl text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                             className=" !text-icon cursor-pointer text-green-800"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>

                 
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                             className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                             className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId,props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </div>
                    </div>


                  </div>

                </div>
                                
              </div>


                                    )
                                })}
                            </> : !props.repairHighCompleteOrder.length && !props.fetchingRepairHighOrderList ? <NodataFoundPage /> : null}
                    </InfiniteScroll>

                    {/* </div> */}

                </div>
            </div >
            <div className=' flex  sticky  z-auto'>
                <div class="rounded-lg m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[99%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[orange] ">High </div>
                        <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.012rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[5.06rem]">Type</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                   
                    <InfiniteScroll
          dataLength={props.repairMediumCompleteOrder.length}
          next={handleLoadMoreMedium}
          hasMore={hasMore}
          loader={props.fetchingRepairMediumOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"22vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairMediumCompleteOrder.length ?
                            <>
                                {props.repairMediumCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                        
                <div className="flex justify-between  rounded  mt-1 bg-white h-8 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium  items-center md:w-[4.26rem] max-sm:w-full  ">
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
                    <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                      <div className="flex max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
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
                        </div>

                        <div class="max-sm:w-full md:w-[10.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[5.023rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[4.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  <div class=" flex">
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>
                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex justify-end items-center">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                                className=" !text-icon cursor-pointer text-green-800"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>

                 
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                           className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                            className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId,props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </div>
                    </div>


                  </div>

                </div>
                              
              </div>


                                    )
                                })}
                            </> : !props.repairMediumCompleteOrder.length && !props.fetchingRepairMediumOrderList ? <NodataFoundPage /> : null}
                    </InfiniteScroll>

                    {/* </div> */}
                              
                </div>
            </div >
            <div className=' flex  sticky  z-auto'>
                <div class="rounded-lg m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[99%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">Normal </div>
                        <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.014rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[5.06rem]">Type</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
                    </div>

                    {/* <div class="overflow-x-auto h-[64vh]"> */}
                   
                    <InfiniteScroll
          dataLength={props.repairLowCompleteOrder.length}
          next={handleLoadMoreLow}
          hasMore={hasMore}
          loader={props.fetchingRepairLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"22vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairLowCompleteOrder.length ?
                            <>
                                {props.repairLowCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                                       
                <div className="flex rounded justify-between   mt-1 bg-white h-8 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium  items-center md:w-[4.26rem] max-sm:w-full  ">
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
                    <div className=" flex font-medium flex-col w-wk   max-sm:w-full">
                      <div className="flex max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
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
                        </div>

                        <div class="max-sm:w-full md:w-[10.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[5.023rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.contactPersonName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[4.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[5.03rem] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <MultiAvatar
                        primaryTitle={item.userName}
                        imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </div>
                  </div>
                  <div class=" flex">
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex justify-end">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-xl cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            className=" !text-icon cursor-pointer text-green-800"
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>


                    </div>

                  
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                            className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                            className="!text-icon cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col   max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId,props.userId)}
                            >
                              <DeleteOutlined
                                className=" !text-icon cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </div>
                    </div>


                  </div>

                </div>
                             
              </div>


                                    )
                                })}
                            </> : !props.repairLowCompleteOrder.length && !props.fetchingRepairLowOrderList ? <NodataFoundPage /> : null}
                    </InfiniteScroll>

                    {/* </div> */}

                </div>
            </div >
      <AddNotesOrderDrawer
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
      <AddLeadModal
        particularRowData={particularRowData}
        addLeadInOrder={props.addLeadInOrder}
        handleLeadModal={props.handleLeadModal}
      />
      <StatusOfOrderModal
        handleStatusOfOrder={props.handleStatusOfOrder}
        addStatusOfOrder={props.addStatusOfOrder}
        particularRowData={particularRowData}
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

const mapStateToProps = ({ order, auth, distributor }) => ({
  allOrderList: order.allOrderList,
  repairHighCompleteOrder:order.repairHighCompleteOrder,
  fetchingRepairHighOrderList:order.fetchingRepairHighOrderList,
  repairMediumCompleteOrder:order.repairMediumCompleteOrder,
  fetchingRepairMediumOrderList:order.fetchingRepairMediumOrderList,
  repairLowCompleteOrder:order.repairLowCompleteOrder,
  fetchingRepairLowOrderList:order.fetchingRepairLowOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  departmentUser: distributor.departmentUser,
  fetchingOrderByIdError: distributor.fetchingOrderByIdError,
  fetchingOrderById: distributor.fetchingOrderById,
  userId: auth.userDetails.userId,

  addLeadInOrder: distributor.addLeadInOrder,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  orderShowById: distributor.orderShowById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getOrderById,
      getRepairHighOrderList,
      getRepairMediumOrderList,
      getRepairLowOrderList,
      emptyOrders,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      handleOrderDetailsModal,
      handleLeadModal,
      deleteOrderRepairData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableByUserID);
