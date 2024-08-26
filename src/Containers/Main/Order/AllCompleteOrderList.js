
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select, Button, Badge } from "antd";
import dayjs from "dayjs";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  emptyCompleteOrders,
    getCompletedHighOrderList,
    getCompletedMediumOrderList,
    getCompletedLowOrderList,
    handleNotesModalInOrder,
    handleStatusOfOrder,
    handlePaidModal,
    deleteOrderData
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
const { Option } = Select;

function AllCompleteOrderList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    'Urgent', // 0
    'Order', // 1
    ' Customer', // 2
    'Contact', // 3
    ' Units', // 4
    'Owner', // 5
    ' Supervisor',
    'Lead',
   
    'Created',
    "High",
    "Normal"


          ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    useEffect(() => {
      
        props.getCompletedHighOrderList(props.userId, page,"High");
        props.getCompletedMediumOrderList(props.userId, page,"Medium");
        props.getCompletedLowOrderList(props.userId, page,"Low");
        
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
        props.getCompletedHighOrderList(props.userId, props.currentUser ? props.currentUser : page,"High");
    }

    const handleLoadMoreMedium = () => {
      setPage(page + 1);
      props.getCompletedMediumOrderList(props.userId, props.currentUser ? props.currentUser : page,"Medium");
  }

  
  const handleLoadMoreLow = () => {
    setPage(page + 1);
    props.getCompletedLowOrderList(props.userId, props.currentUser ? props.currentUser : page,"Low");
}

    function handleSetParticularOrderData(item, data) {
        console.log(item);
        setParticularRowData(item);
    }

    useEffect(() => {
        return () => props.emptyCompleteOrders();
    }, []);
    return (
        <>
              <div className=' flex sticky  z-auto'>
            <div class="rounded m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky  z-10">
                  
                <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[red]">{translatedMenuItems[0]} </div>
                        <div className=" md:w-[10.31rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className=" md:w-[8.6rem]">{translatedMenuItems[2]}</div>
          <div className=" md:w-[4.051rem] ">{translatedMenuItems[3]}</div>
          <div className="md:w-[5.018rem]">{translatedMenuItems[4]}</div>
          <div className="md:w-[5.031rem]">{translatedMenuItems[5]}</div>
          <div className="md:w-[5.2rem]">{translatedMenuItems[6]}</div>
          <div className="md:w-[5.06rem]">{translatedMenuItems[7]}</div>
          <div className="md:w-[9.73rem]">{translatedMenuItems[8]}</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.completedHighOrder.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingCompletedHighOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{scrollbarWidth:"thin"}}
                    >
                        {props.completedHighOrder.length ?
                            <>
                                {props.completedHighOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                  <div className=" flex items-center md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

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
                    <div className=" flex  items-center w-wk   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs font-bold"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span  className=" text-[0.65rem] text-[tomato] font-bold" 
                                >
                                  New
                                </span>
                              ) : null}
                            </span>
                          </Badge>
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

                    <div class="flex flex-row items-center md:w-[3.23rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex   md:w-[3.31rem] max-sm:flex-row w-full max-sm:justify-between ">
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
                    <div className=" flex    max-sm:flex-row  max-sm:justify-between  ">

                      {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                      <div class=" font-poppins">
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

                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">
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
                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">
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
                            !props.completedHighOrder.length && !props.fetchingCompletedHighOrderList ? <NodataFoundPage /> : null}


                    </InfiniteScroll>
                </div>
            </div>
          

            <div className=' flex  sticky  z-auto'>
            <div class="rounded  m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
              
                <div className=" flex justify-between w-full p-1 bg-transparent font-bold sticky z-10">
                  
                <div className=" md:w-[3.54rem] text-[white] flex justify-center bg-[teal]">{translatedMenuItems[10]} </div>
                        <div className=" md:w-[10.31rem] ml-2">{translatedMenuItems[1]} ID</div>
          <div className=" md:w-[8.6rem]">{translatedMenuItems[2]}</div>
          <div className=" md:w-[4.051rem] ">{translatedMenuItems[3]}</div>
          <div className="md:w-[5.018rem]">{translatedMenuItems[4]}</div>
          <div className="md:w-[5.031rem]">{translatedMenuItems[5]}</div>
          <div className="md:w-[5.2rem]">{translatedMenuItems[6]}</div>
          <div className="md:w-[5.06rem]">{translatedMenuItems[7]}</div>
          <div className="md:w-[9.73rem]">{translatedMenuItems[8]}</div>
          <div className="md:w-24"></div>
        </div>
                    <InfiniteScroll
                        dataLength={props.completedLowOrder.length}
                        next={handleLoadMoreLow}
                        hasMore={hasMore}
                        loader={props.fetchingCompletedLowOrderList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"38vh"}
                        style={{scrollbarWidth:"thin"}}
                        
                    >
                        {props.completedLowOrder.length ?
                            <>
                                {props.completedLowOrder.map((item) => {
                                    const currentdate = dayjs().format("DD/MM/YYYY");
                                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");


                                    return (
                                        <div>
                <div
                  className="flex rounded justify-between mt-1 bg-white h-8 items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                // style={{
                //   borderBottom: "3px dotted #515050",
                // }}
                >
                  <div class="flex">
                  <div className=" flex items-center  md:w-[4.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

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
                    <div className=" flex items-center w-wk   max-sm:w-full">
                      <div className="flex items-center max-sm:w-full">
                        <div class="w-[9.43rem]">
                          <Badge size="small" count={item.productNum}>
                            <span
                              class="underline cursor-pointer text-[#1890ff] text-xs font-bold"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleOrderDetailsModal(true);
                              }}

                            >{`${item.newOrderNo} `}

                            
                              {date === currentdate ? (
                                <span className=" text-[0.65rem] text-[tomato] font-bold"  >
                                  New
                                </span>
                              ) : null}
                            </span>
                          </Badge>
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

                    <div class="flex flex-row items-center md:w-[3.23rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div class="flex flex-row items-center md:w-[6.02rem] max-sm:flex-row w-full max-sm:justify-between">
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
                    <div className=" flex max-sm:flex-row  max-sm:justify-between  ">

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

                    <div className=" flex   max-sm:flex-row  max-sm:justify-between  ">
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
                            !props.completedLowOrder.length && !props.fetchingCompletedLowOrderList ? <NodataFoundPage /> : null}


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
  completedHighOrder: order.completedHighOrder,
  completedMediumOrder:order.completedMediumOrder,
  fetchingCompletedMediumOrderList:order.fetchingCompletedMediumOrderList,
  completedLowOrder:order.completedLowOrder,
  fetchingCompletedLowOrderList:order .fetchingCompletedLowOrderList,
  
    addPaidButtonModal: order.addPaidButtonModal,
    addStatusOfOrder: order.addStatusOfOrder,
    addNotesInOrder: order.addNotesInOrder,
    fetchingCompletedHighOrderList: order.fetchingCompletedHighOrderList,
    userId: auth.userDetails.userId,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getCompletedHighOrderList,
          getCompletedMediumOrderList,
          getCompletedLowOrderList,
            handleNotesModalInOrder,
            handleStatusOfOrder,
            handlePaidModal,
            handleOrderDetailsModal,
            emptyCompleteOrders,
            deleteOrderData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AllCompleteOrderList);
