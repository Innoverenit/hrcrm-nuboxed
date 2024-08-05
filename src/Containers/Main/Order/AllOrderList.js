
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Badge,Select } from "antd";
import dayjs from "dayjs";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  // getAllOrderList,
  getAllHighOrderList,
  getAllMediumOrderList,
  getAllLowOrderList,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  emptyOrders,
  deleteOrderRepairData
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { PersonAddAlt1 } from "@mui/icons-material";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import AccountOrderDetailsModal from "../Account/AccountDetailsTab/AccountOrderTab/AccountOrderDetailsModal";
import { MultiAvatar2,MultiAvatar } from "../../../Components/UI/Elements";
import StatusOfOrderModal from "../Account/AccountDetailsTab/AccountOrderTab/StatusOfOrderModal";
import PaidButtonModal from "../Account/AccountDetailsTab/AccountOrderTab/PaidButtonModal";
const { Option } = Select;
function AllOrderList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [lead, setLead] = useState("")
  useEffect(() => {
    setPage(page + 1);
    // props.getAllOrderList(props.orgId, page);
    props.getAllHighOrderList(props.orgId,page,"High");
    props.getAllMediumOrderList(props.orgId,page,"Medium");
    props.getAllLowOrderList(props.orgId,page,"Low")
    
 
  }, []);

  const [show, setshow] = useState(false);
  const [orderId, setorderId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [particularRowData, setParticularRowData] = useState({});
  const [searchedColumn, setSearchedColumn] = useState("");

  function handleOrder(orderId) {
    setshow(true);
    setorderId(orderId);
  }
  function handleCancel() {
    setshow(false)
  }
  function handleLeadData(val) {
    setLead(val)
  }
  function handleShow() {
    setshow(true)
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllHighOrderList(props.orgId,page,"High")
    // props.getAllOrderList(props.orgId, props.currentUser ? props.currentUser : page);
  }

  const handleLoadMoreMedium = () => {
    setPage(page + 1);  
    props.getAllMediumOrderList(props.orgId,page,"Medium")
};
const handleLoadMoreLow = () => {
    setPage(page + 1);
  
    props.getAllLowOrderList(props.orgId,page,"Low")
};

  useEffect(() => {
    return () => props.emptyOrders();
  }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }


  return (
    <>
        <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
      <div className=" md:w-[3.25rem] text-[white] flex justify-center bg-[red]">Urgent </div>
          <div className=" md:w-[10.31rem] ml-2">Order ID</div>
          <div className=" md:w-[8.6rem]">Customer</div>
          <div className=" md:w-[4.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
        </div>
        <InfiniteScroll
          dataLength={props.allHighCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"23vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.allHighCompleteOrder.length ?
            <>
              {props.allHighCompleteOrder.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");

                const diff = Math.abs(
                  dayjs().diff(dayjs(item.lastRequirementOn), "days")
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
              <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" >
                  <div class="flex">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full ">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[#0f0e0d]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex  w-wk     max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]">
                        <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                          &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.21rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex  md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
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
                    <div class="flex flex-row items-center md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                  <div className=" flex text-xs md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs  font-poppins">
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

                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className=" flex max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                          className=" !text-icon cursor-pointer "
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                           className=" !text-icon cursor-pointer"
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>

                   


                  </div>

                </div>
              </div>
                );
              })}
            </> :
            !props.allHighCompleteOrder.length && !props.fetchingAllHighOrderList ? <NodataFoundPage /> : null}
        </InfiniteScroll>
      </div>
      </div>
      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
      <div className=" md:w-[3.25rem] text-[white] flex justify-center bg-[orange] ">High </div>
          <div className=" md:w-[10.31rem] ml-2">Order ID</div>
          <div className=" md:w-[8.6rem]">Customer</div>
          <div className=" md:w-[4.051rem] ">Contact</div>
          <div className="md:w-[5.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
        </div>
        <InfiniteScroll
          dataLength={props.allMediumCompleteOrder.length}
          next={handleLoadMoreMedium}
          hasMore={hasMore}
          loader={props.fetchingAllMediumOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"23vh"}
          style={{ scrollbarWidth:"thin"}}
          endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
        >
          {props.allMediumCompleteOrder.length ?
            <>
              {props.allMediumCompleteOrder.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");

                const diff = Math.abs(
                  dayjs().diff(dayjs(item.lastRequirementOn), "days")
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
                 <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div class="flex">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                    <div className=" flex w-wk   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] font-bold text-xs"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                             
                            </span>
                          </Badge>
                       
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                  New
                                </span>
                              ) : null}
                        </div>
                      

                        <div class="max-sm:w-full md:w-[9.02rem]">
                          <Tooltip>
                            <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                              {item.distributorName}

                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row items-center md:w-[3.21rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex  md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" font-poppins text-xs">
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
                    <div class="flex flex-row items-center md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                  <div className=" flex text-xs md:w-[11.912rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <span>{date}</span>
                  </div>
                  <div class="flex">
                    <div className=" flex  md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-semibold  font-poppins">
                        {item.noOfownerPhones}
                      </div>
                    </div>
                    <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                      {item.orderStatus}
                    </div>
                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" text-xs  font-poppins">
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

                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-icon cursor-pointer"
                            style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                            onClick={() => {
                              handleShow()
                              handleSetParticularOrderData(item)
                            }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Status">
                          <EventRepeatIcon
                              className=" !text-icon cursor-pointer "
                            onClick={() => {
                              props.handleStatusOfOrder(true);
                              handleSetParticularOrderData(item);
                            }}
                          />
                        </Tooltip>
                      </div>

                    </div>
                    <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        <Tooltip title="Collection">
                          <PaidIcon
                          className=" !text-icon cursor-pointer "
                            onClick={() => {
                              props.handlePaidModal(true);
                              handleSetParticularOrderData(item);
                            }}
                          // style={{ color: "blue" }}
                          />
                        </Tooltip>

                      </div>
                    </div>

                  


                  </div>

                </div>
              </div>
                );
              })}
            </> :
            !props.allMediumCompleteOrder.length && !props.fetchingAllMediumOrderList ? <NodataFoundPage /> : null}
        </InfiniteScroll>
      </div>
      </div>
      <div className=' flex justify-end sticky  z-auto'>
       <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
       <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
       <div className=" md:w-[3.25rem] flex justify-center text-[white] bg-[teal] ">Normal </div>
           <div className=" md:w-[10.3rem] ml-2">Order ID</div>
           <div className=" md:w-[8.6rem]">Customer</div>
           <div className=" md:w-[4.051rem] ">Contact</div>
           <div className="md:w-[5.014rem]">Units</div>
           <div className="md:w-[5.031rem]">Owner</div>
           <div className="md:w-[5.2rem]">Supervisor</div>
           <div className="md:w-[5.06rem]">Lead</div>
           <div className="md:w-[9.73rem]">Created</div>
           <div className="md:w-24"></div>
         </div>
         <InfiniteScroll
           dataLength={props.allLowCompleteOrder.length}
           next={handleLoadMoreLow}
           hasMore={hasMore}
           loader={props.fetchingAllLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
           height={"23vh"}
           style={{ scrollbarWidth:"thin"}}
           endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
         >
           {props.allLowCompleteOrder.length ?
             <>
               {props.allLowCompleteOrder.map((item) => {
                 const currentdate = dayjs().format("DD/MM/YYYY");
                 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
 
                 const diff = Math.abs(
                   dayjs().diff(dayjs(item.lastRequirementOn), "days")
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
                <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                   <div class="flex">
                   <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-6 w-6 bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-6 w-6 bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                     <div className=" flex items-center    max-sm:w-full">
                       <div className="flex  items-center max-sm:w-full">
                         <div class="w-[9.43rem]">
                           <Badge size="small" count={item.productNum}>
                             <span
                               class="underline font-bold cursor-pointer text-[#1890ff] text-xs"
                               onClick={() => {
                                 handleSetParticularOrderData(item);
                                 props.handleOrderDetailsModal(true);
                               }}
 
                             >{`${item.newOrderNo} `}
 
                               
                             </span>
                           </Badge>
                           &nbsp;&nbsp;
                               {date === currentdate ? (
                                 <span className=" text-[0.65rem] text-[tomato] font-bold" >
                                   New
                                 </span>
                               ) : null}
                         </div>
                       
 
                         <div class="max-sm:w-full md:w-[9.02rem]">
                           <Tooltip>
                             <div class="max-sm:w-full justify-between flex md:flex-col text-xs">
                               {item.distributorName}
 
                             </div>
                           </Tooltip>
                         </div>
                       </div>
                     </div>
 
                     <div class="flex flex-row items-center md:w-[3.21rem] max-sm:flex-row w-full max-sm:justify-between">
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
                     <div className=" flex  md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
                       <div class=" font-poppins text-xs">
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
                     <div class="flex flex-row items-center md:w-[6.023rem] max-sm:flex-row w-full max-sm:justify-between">
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
                   <div className=" flex text-xs  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between ">
                     <span>{date}</span>
                   </div>
                   <div class="flex">
                     <div className=" flex   md:w-[0.01rem] max-sm:flex-row w-full max-sm:justify-between ">
 
                       <div class=" text-xs  font-semibold  font-poppins">
                         {item.noOfownerPhones}
                       </div>
                     </div>
                     <div class="rounded-full text-xs bg-white  h-5 cursor-pointer w-8 justify-cente">
                       {item.orderStatus}
                     </div>
                     <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">
 
                       {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                       <div class=" text-xs  font-poppins">
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
 
                     <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                       <div class=" text-xs  font-poppins">
                         <Tooltip title="Add Supervisor">
                           <PersonAddAlt1
                             className="!text-icon cursor-pointer"
                             style={{ color: item.supervisorUserName ? "green" : "red", fontSize: "1.25rem" }}
                             onClick={() => {
                               handleShow()
                               handleSetParticularOrderData(item)
                             }} />
                         </Tooltip>
                       </div>
                     </div>
                     <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                       <div class=" text-xs  font-poppins">
                         <Tooltip title="Status">
                           <EventRepeatIcon
                              className=" !text-icon cursor-pointer "
                             onClick={() => {
                               props.handleStatusOfOrder(true);
                               handleSetParticularOrderData(item);
                             }}
                           />
                         </Tooltip>
                       </div>
 
                     </div>
                     <div className=" flex  max-sm:flex-row  max-sm:justify-between  ">
                       <div class=" text-xs  font-poppins">
                         <Tooltip title="Collection">
                           <PaidIcon
                             className=" !text-icon cursor-pointer"
                             onClick={() => {
                               props.handlePaidModal(true);
                               handleSetParticularOrderData(item);
                             }}
                           // style={{ color: "blue" }}
                           />
                         </Tooltip>
 
                       </div>
                     </div>
 
                  
 
 
                   </div>
 
                 </div>
               </div>
                 );
               })}
             </> :
             !props.allLowCompleteOrder.length && !props.fetchingAllLowOrderList ? <NodataFoundPage /> : null}
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
  );

}

const mapStateToProps = ({ order, auth, distributor }) => ({
  allCompleteOrder: order.allCompleteOrder,
  allHighCompleteOrder:order.allHighCompleteOrder,
  fetchingAllHighOrderList:order.fetchingAllHighOrderList,
  allMediumCompleteOrder:order.allMediumCompleteOrder,
  fetchingAllMediumOrderList:order.fetchingAllMediumOrderList,
  allLowCompleteOrder:order.allLowCompleteOrder,
  fetchingAllLowOrderList:order.fetchingAllLowOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  fetchingAllOrderList: order.fetchingAllOrderList,
  userId: auth.userDetails.userId,
  addOrderDetailsModal: distributor.addOrderDetailsModal,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getAllOrderList,
      getAllHighOrderList,
      getAllMediumOrderList,
      getAllLowOrderList,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal,
      emptyOrders,
      handleOrderDetailsModal,
      deleteOrderRepairData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderList);
