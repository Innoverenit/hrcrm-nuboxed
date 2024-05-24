
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Badge, Select ,Popconfirm} from "antd";
import dayjs from "dayjs";
import PaidIcon from '@mui/icons-material/Paid';
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import InfiniteScroll from "react-infinite-scroll-component";
import { handleOrderDetailsModal, handleLeadModal,
  //  getOrderById,
 
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
const { Option } = Select;

function OrderTableByUserID(props) {
  const [page, setPage] = useState(0);
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
    setPage(page + 1);
    props.getRepairHighOrderList(props.userId, page,"High");
    // props.getOrderById(props.currentUser ? props.currentUser : props.userId, page,
   
  }
  const handleLoadMoreMedium = () => {
    setPage(page + 1);
   
    props.getRepairMediumOrderList(props.userId, page,"Medium");
};
const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getRepairLowOrderList(props.userId, page,"Low");
};

  return (
    <>
      <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.54rem]">Urgent </div>
                        <div className=" md:w-[9.3rem]">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
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
          
          loader={props.fetchingRepairHighOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
         
          height={"19vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairHighCompleteOrder.length ?
                            <>
                                {props.repairHighCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                <div className="flex rounded-lg  mt-1 bg-white h-9 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium  md:w-[3.56rem] max-sm:w-full  ">
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
                        <div class="w-[11.03rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
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
                          </Badge>
                        </div>

                        <div class="max-sm:w-full md:w-[11.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[4.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex font-medium flex-col  md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <h4 class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </h4>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem]  max-sm:flex-row  max-sm:justify-between  ">

                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            style={{ cursor: "pointer", color: "green", fontSize: "1.25rem" }}
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>


                    </div>

                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-base cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>

                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId)}
                            >
                              <DeleteOutlined
                                className=" !text-base cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </h4>
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
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.54rem]">High </div>
                        <div className=" md:w-[9.3rem]">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
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
          loader={props.fetchingRepairMediumOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"19vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairMediumCompleteOrder.length ?
                            <>
                                {props.repairMediumCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                <div className="flex rounded-lg  mt-1 bg-white h-9 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium  md:w-[3.56rem] max-sm:w-full  ">
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
                        <div class="w-[11.03rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
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
                          </Badge>
                        </div>

                        <div class="max-sm:w-full md:w-[11.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[4.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex font-medium flex-col  md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>
                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <h4 class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </h4>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem]  max-sm:flex-row  max-sm:justify-between  ">

                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            style={{ cursor: "pointer", color: "green", fontSize: "1.25rem" }}
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>


                    </div>

                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-base cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>

                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId)}
                            >
                              <DeleteOutlined
                                className=" !text-base cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </h4>
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
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-2 p-2 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[93%]  bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[3.54rem]">Normal </div>
                        <div className=" md:w-[9.3rem]">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
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
          loader={props.fetchingRepairLowOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"19vh"}
          endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
        >
                        {props.repairLowCompleteOrder.length ?
                            <>
                                {props.repairLowCompleteOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                                    return (
                                      <div>
                <div className="flex rounded-lg  mt-1 bg-white h-9 items-center p-1">
                  <div class="flex">
                  <div className=" flex font-medium  md:w-[3.56rem] max-sm:w-full  ">
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
                        <div class="w-[11.03rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-sm"
                              onClick={() => {
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
                          </Badge>
                        </div>

                        <div class="max-sm:w-full md:w-[11.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-sm">
                              {item.distributorName}
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[4.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex font-medium flex-col  md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <h4 class="text-cardBody font-poppins text-sm">
                        {item.noOfPhones}
                      </h4>
                    </div>
                  </div>
                  <div class="flex flex-row items-center md:w-[4.03rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        <MultiAvatar2
                          primaryTitle={item.supervisorUserName}
                          imageURL={item.imageURL}
                          imgWidth={"1.8rem"}
                          imgHeight={"1.8rem"}
                        />

                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[4.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
                      </div>
                    </div>
                    <div class="flex flex-row items-center md:w-[5.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                      {item.orderType}
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <h4 class=" text-sm text-cardBody font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </h4>
                    </div>
                    <div class="rounded-full text-sm bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem]  max-sm:flex-row  max-sm:justify-between  ">

                      {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Notes">
                          <NoteAltIcon
                            style={{ cursor: "pointer", color: "green", fontSize: "1.25rem" }}
                            onClick={() => {

                              props.handleNotesModalInOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>


                    </div>

                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        {item.qcStartInd !== 0 && <Tooltip title="Add Lead">
                          <PersonAddAlt1
                            className="!text-base cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                            onClick={() => {
                              props.handleLeadModal(true)
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>}
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </h4>

                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                            style={{ cursor: "pointer", fontSize: "1.25rem" }}
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Collection">
                        <Popconfirm
                              title="Do you want to delete?"
                               onConfirm={() => props.deleteOrderRepairData(item.orderId)}
                            >
                              <DeleteOutlined
                                className=" !text-base cursor-pointer text-[red]"

                              />
                            </Popconfirm>
                        </Tooltip>

                      </h4>
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
