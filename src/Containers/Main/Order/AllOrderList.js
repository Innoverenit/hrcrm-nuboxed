
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Badge,Select,Popconfirm } from "antd";
import moment from "moment";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllOrderList,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal,
  emptyOrders,
  deleteOrderRepairData
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { PersonAddAlt1 } from "@mui/icons-material";
import { handleOrderDetailsModal } from "../Account/AccountAction";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
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
    props.getAllOrderList(props.orgId, page);
    setPage(page + 1);
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
    props.getAllOrderList(props.orgId, props.currentUser ? props.currentUser : page);
  }

  useEffect(() => {
    return () => props.emptyOrders();
  }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }


  return (
    <>
       <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[9.3rem]">Order ID</div>
          <div className=" md:w-[11.6rem]">Customer</div>
          <div className=" md:w-[5.051rem] ">Contact</div>
          <div className="md:w-[7.01rem]">Units</div>
          <div className="md:w-[5.031rem]">Owner</div>
          <div className="md:w-[5.2rem]">Supervisor</div>
          <div className="md:w-[5.06rem]">Lead</div>
          <div className="md:w-[9.73rem]">Created</div>
          <div className="md:w-24"></div>
        </div>
        <InfiniteScroll
          dataLength={props.allCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        >
          {props.allCompleteOrder.length ?
            <>
              {props.allCompleteOrder.map((item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");

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
                        <Tooltip title="Add Supervisor">
                          <PersonAddAlt1
                            className="!text-base cursor-pointer"
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
                );
              })}
            </> :
            !props.allCompleteOrder.length && !props.fetchingAllOrderList ? <NodataFoundPage /> : null}
        </InfiniteScroll>
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
      getAllOrderList,
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
