
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select, Button, Badge } from "antd";
import dayjs from "dayjs";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  emptyMOrders,
    getDeletedHighOrderList,
    getDeletedMediumOrderList,
    getDeletedLowOrderList,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { handleOrderDetailsModal } from "../Account/AccountAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar2,MultiAvatar } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
import { PersonAddAlt1 } from "@mui/icons-material";
import ReInstateOrderToggle from "./ReInstateOrderToggle";
const { Option } = Select;

function DeletedOrderList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.getDeletedHighOrderList(props.userId, page,"High");
        props.getDeletedMediumOrderList(props.userId, page,"Medium");
        props.getDeletedLowOrderList(props.userId, page,"Low");
        
        
        setPage(page + 1);
    }, []);

    const [show, setshow] = useState(false);
    const [orderId, setorderId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [particularRowData, setParticularRowData] = useState({});
    const [searchedColumn, setSearchedColumn] = useState("");
    const [lead, setLead] = useState("")

    function handleOrder(orderId) {
        setshow(true);
        setorderId(orderId);
    }
    function handleCancel() {
        setshow(false)
      }
      function handleShow() {
        setshow(true)
      }
      function handleLeadData(val) {
        setLead(val)
      }
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getDeletedHighOrderList(props.userId, props.currentUser ? props.currentUser : page,"High");
    }

    const handleLoadMoreMedium = () => {
      setPage(page + 1);
      props.getDeletedMediumOrderList(props.userId, props.currentUser ? props.currentUser : page,"Medium");
  }
  const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getDeletedLowOrderList(props.userId, props.currentUser ? props.currentUser : page,"Low");
}
  

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    useEffect(() => {
        return () => props.emptyMOrders();
    }, []);
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
                <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">Urgent </div>
          <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[7.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="w-[7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">Reinstate</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.deletedHighOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingDeletedHighOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                        height={"22vh"}
                    >
                        {props.deletedHighOrder.length ?
                            <>
                                {props.deletedHighOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex ">
                  <div className=" flex font-medium  md:w-[4.26rem]  items-center max-sm:w-full  ">
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
                      

                        <div class="max-sm:w-full md:w-[14.02rem]">
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
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {show && (particularRowData.orderId === item.orderId) ?
                          <div class=" flex justify-between">
                            <Select
                              className="w-[350px]"
                              value={lead}
                              onChange={(value) => handleLeadData(value)}
                            >
                              {props.departmentUser.map((a) => {
                                return <Option value={a.employeeId}>{a.empName}</Option>;
                              })}
                            </Select>
                            <Button
                              type="primary"
                            >
                              Add
                            </Button>
                            <Button onClick={handleCancel}>
                              Cancel
                            </Button>
                          </div>
                          :
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        }
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div className=" flex font-medium flex-col  w-[5.5rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<ReInstateOrderToggle item={item} />

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
                             className=" !text-xl cursor-pointer text-green-800"
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
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-xl cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                                  className=" !text-xl cursor-pointer "
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
                                  className=" !text-xl cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>


                  </div>

                </div>
              </div>

                                    );
                                })}
                            </> :
                            !props.deletedHighOrder.length && !props.fetchingDeletedHighOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>

            <div className=' flex justify-end sticky z-auto'>
            <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
                <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[orange] ">High </div>
          <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[7.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="w-[7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">Reinstate</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.deletedMediumOrder.length}
                        next={handleLoadMoreMedium}
                        hasMore={hasMore}
                        loader={props.fetchingDeletedMediumOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                        height={"22vh"}
                    >
                        {props.deletedMediumOrder.length ?
                            <>
                                {props.deletedMediumOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                  <div className=" flex font-medium  md:w-[4.26rem] items-center  max-sm:w-full  ">
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
                      

                        <div class="max-sm:w-full md:w-[14.02rem]">
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
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {show && (particularRowData.orderId === item.orderId) ?
                          <div class=" flex justify-between">
                            <Select
                              className="w-[350px]"
                              value={lead}
                              onChange={(value) => handleLeadData(value)}
                            >
                              {props.departmentUser.map((a) => {
                                return <Option value={a.employeeId}>{a.empName}</Option>;
                              })}
                            </Select>
                            <Button
                              type="primary"
                            >
                              Add
                            </Button>
                            <Button onClick={handleCancel}>
                              Cancel
                            </Button>
                          </div>
                          :
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        }
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div className=" flex font-medium flex-col  w-[5.5rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<ReInstateOrderToggle item={item} />

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
                            className=" !text-xl cursor-pointer text-green-800"
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
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-xl cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                              className=" !text-xl cursor-pointer "
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
                                className=" !text-xl cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>
  


                  </div>

                </div>
              </div>

                                    );
                                })}
                            </> :
                            !props.deletedMediumOrder.length && !props.fetchingDeletedMediumOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>
            <div className=' flex justify-end sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
                <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">Normal </div>
          <div className=" md:w-[9.3rem] ml-2">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[7.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="w-[7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[1.22rem] max-lg:w-[3.22rem]">Reinstate</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.deletedLowOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingDeletedLowOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
                        height={"22vh"}
                    >
                        {props.deletedLowOrder.length ?
                            <>
                                {props.deletedLowOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                  <div className=" flex font-medium   md:w-[4.26rem] items-center max-sm:w-full  ">
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
                      

                        <div class="max-sm:w-full md:w-[14.02rem]">
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
                    <div class="flex flex-row items-center md:w-[3.02rem] max-sm:flex-row w-full max-sm:justify-between">
                      <div>
                        {show && (particularRowData.orderId === item.orderId) ?
                          <div class=" flex justify-between">
                            <Select
                              className="w-[350px]"
                              value={lead}
                              onChange={(value) => handleLeadData(value)}
                            >
                              {props.departmentUser.map((a) => {
                                return <Option value={a.employeeId}>{a.empName}</Option>;
                              })}
                            </Select>
                            <Button
                              type="primary"
                            >
                              Add
                            </Button>
                            <Button onClick={handleCancel}>
                              Cancel
                            </Button>
                          </div>
                          :
                          <MultiAvatar2
                            primaryTitle={item.lead}
                            imageURL={item.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />


                        }
                      </div>
                    </div>

                  </div>
                  <div className=" flex text-sm font-medium flex-col md:w-[5.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  
                  <div className=" flex font-medium flex-col  w-[5.5rem] max-xl:w-[6.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">

<ReInstateOrderToggle item={item} />

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
                           className=" !text-xl cursor-pointer text-green-800"
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
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-xl cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </h4>
                    </div>
                    <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                      <h4 class=" text-xs text-cardBody font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                             className=" !text-xl cursor-pointer "
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
                             className=" !text-xl cursor-pointer "
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </h4>
                    </div>



                  </div>

                </div>
              </div>

                                    );
                                })}
                            </> :
                            !props.deletedLowOrder.length && !props.fetchingDeletedLowOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>
            <AddNotesOrderDrawer
                particularRowData={particularRowData}
                addNotesInOrder={props.addNotesInOrder}
                handleNotesModalInOrder={props.handleNotesModalInOrder}
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
    )
}

const mapStateToProps = ({ order, auth, distributor }) => ({
  deletedHighOrder: order.deletedHighOrder,
  deletedMediumOrder:order.deletedMediumOrder,
  fetchingDeletedMediumOrderList:order.fetchingDeletedMediumOrderList,
  deletedLowOrder:order.deletedLowOrder,
  fetchingDeletedLowOrderList:order.fetchingDeletedLowOrderList,
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingDeletedHighOrderList: order.fetchingDeletedHighOrderList,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getDeletedHighOrderList,
          getDeletedMediumOrderList,
          getDeletedLowOrderList,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyMOrders
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DeletedOrderList);
