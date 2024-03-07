// import React, { Component, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
// import { EditOutlined, SearchOutlined } from "@ant-design/icons";
// import Highlighter from "react-highlight-words";
// import moment from "moment";
// import { Spacer } from "../../../Components/UI/Elements";
// import {
//     getAllOrderList,
// } from "./OrderAction";
// // import OrderDetailsTable from "../../Customer/Child/CustomerDetail/CustomerDetailsTab/OrderDetailsTable";
// import { CurrencySymbol } from "../../../Components/Common";

// function AllOrderList(props) {
//     useEffect(() => {
//         props.getAllOrderList();
//     }, []);

//     const [show, setshow] = useState(false);
//     const [orderId, setorderId] = useState("");
//     const [searchText, setSearchText] = useState("");
//     const [particularRowData, setParticularRowData] = useState({});
//     const [searchedColumn, setSearchedColumn] = useState("");

//     function handleOrder(orderId) {
//         setshow(true);
//         setorderId(orderId);
//     }

//     function handleSetParticularOrderData(item, data) {
//         console.log(item);
//         setParticularRowData(item);
//     }

//     function getColumnSearchProps(dataIndex) {
//         return {
//             filterDropdown: ({
//                 setSelectedKeys,
//                 selectedKeys,
//                 confirm,
//                 clearFilters,
//             }) => (
//                 <div style={{ padding: 8 }}>
//                     <Input
//                         // ref={node => {
//                         //   this.searchInput = node;
//                         // }}
//                         placeholder={`Search ${dataIndex}`}
//                         value={selectedKeys[0]}
//                         onChange={(e) =>
//                             setSelectedKeys(e.target.value ? [e.target.value] : [])
//                         }
//                         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         style={{ width: 240, marginBottom: 8, display: "block" }}
//                     />
//                     <Space>
//                         <Button
//                             type="primary"
//                             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                             icon={<SearchOutlined />}
//                             size="small"
//                             style={{ width: 90 }}
//                         >
//                             Search
//                         </Button>
//                         <Button
//                             onClick={() => handleReset(clearFilters)}
//                             size="small"
//                             style={{ width: 90 }}
//                         >
//                             Reset
//                         </Button>
//                         <Button
//                             type="link"
//                             size="small"
//                             onClick={() => {
//                                 confirm({ closeDropdown: false });
//                                 setSearchText(selectedKeys[0]);
//                                 setSearchedColumn(dataIndex);
//                             }}
//                         >
//                             Filter
//                         </Button>
//                     </Space>
//                 </div>
//             ),
//             filterIcon: (filtered) => (
//                 <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//             ),
//             onFilter: (value, record) =>
//                 record[dataIndex]
//                     .toString()
//                     .toLowerCase()
//                     .includes(value.toLowerCase()),
//             onFilterDropdownVisibleChange: (visible) => {
//                 if (visible) {
//                     // setTimeout(() => this.searchInput.select());
//                 }
//             },
//             render: (text) =>
//                 searchedColumn === dataIndex ? (
//                     <Highlighter
//                         highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//                         searchWords={[searchText]}
//                         autoEscape
//                         textToHighlight={text.toString()}
//                     />
//                 ) : (
//                     text
//                 ),
//         };
//     }

//     function handleSearch(selectedKeys, confirm, dataIndex) {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     }

//     function handleReset(clearFilters) {
//         clearFilters();
//         setSearchText("");
//     }


//     const columns = [
//         {
//             title: "",
//             width: "2%",
//             // render: (name, item, i) => {
//             //     return {
//             //         props: {
//             //             style: {
//             //                 background:
//             //                     show && orderId === item.orderId
//             //                         ? "rgb(158 183 223)"
//             //                         : null,
//             //             },
//             //         },

//             //         children: <span></span>,
//             //     };
//             // },
//         },
//         {
//             title: "Order Id",
//             width: "22%",
//             dataIndex: "newOrderNo",
//             defaultSortOrder: "descend",
//             ...getColumnSearchProps("newOrderNo"),
//             render: (text, item) => {
//                 const currentdate = moment().format("DD/MM/YYYY");
//                 const date = moment(item.creationDate).format("DD/MM/YYYY");
//                 return {

//                     children: (
//                         <Badge size="small" count={item.productNum}>
//                             <span
//                                 onClick={() => {
//                                     handleOrder(item.orderId);
//                                     handleSetParticularOrderData(item);
//                                 }}

//                             >{`${item.newOrderNo} `}

//                                 &nbsp;&nbsp;
//                                 {date === currentdate ? (
//                                     <span
//                                         style={{
//                                             color: "tomato",
//                                             fontWeight: "bold",
//                                         }}
//                                     >
//                                         New
//                                     </span>
//                                 ) : null}
//                             </span>
//                         </Badge>
//                     ),
//                 };
//             },
//         },
//         {
//             title: "Client",
//             dataIndex: "distributorName",
//             defaultSortOrder: "descend",
//             ...getColumnSearchProps("distributorName"),
//             width: "18%",
//         },
//         {
//             title: "Contact",
//             dataIndex: "contactPersonName",
//             defaultSortOrder: "descend",
//             ...getColumnSearchProps("contactPersonName"),
//             width: "18%",
//         },
//         {
//             title: "#Phone",
//             dataIndex: "noOfPhones",
//             defaultSortOrder: "descend",
//             ...getColumnSearchProps("noOfPhones"),
//             width: "18%",
//         },
//         {
//             title: "Creation Date",
//             width: "18%",
//             defaultSortOrder: "descend",
//             sorter: (a, b) => {
//                 var nameA = a.creationDate.toLowerCase(); // ignore upper and lowercase
//                 var nameB = b.creationDate.toLowerCase(); // ignore upper and lowercase
//                 if (nameA < nameB) {
//                     return -1;
//                 }
//                 if (nameA > nameB) {
//                     return 1;
//                 }

//                 return 0;
//             },
//             render: (name, item, i) => {
//                 const date = moment(item.creationDate).format("DD/MM/YYYY");
//                 return {
//                     props: {
//                         // style: {
//                         //     background:
//                         //         show && orderId === item.orderId
//                         //             ? "rgb(158 183 223)"
//                         //             : null,
//                         // },
//                     },

//                     children: <span>{date}</span>,
//                 };
//             },
//         },

//         {
//             title: "Status",
//             width: "18%",
//             dataIndex: "orderStatus",
//             filters: [
//                 { text: "Pending", value: "Pending" },
//                 { text: "Complete", value: "Complete" },
//             ],
//             onFilter: (value, record) => {
//                 return record.orderStatus === value;
//             },
//             render: (name, item, i) => {
//                 return {
//                     props: {
//                         // style: {
//                         //     background:
//                         //         show && orderId === item.orderId
//                         //             ? "rgb(158 183 223)"
//                         //             : null,
//                         // },
//                     },

//                     children: <span>{item.orderStatus}</span>,
//                 };
//             },
//         },

//     ];
//     //   if (props.fetchingDistributorsByUserIdError) {
//     //     return <APIFailed />
//     //   }

//     const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight - 200;

//     return (
//         <>
//             <StyledTable
//                 rowKey="orderId"
//                 columns={columns}
//                 dataSource={props.allOrderList}
//                 loading={props.fetchingAllOrderList}
//                 scroll={{ y: tableHeight }}
//                 pagination={false}
//                 rowSelection={props.rowSelection}
//             />

//             <Spacer />
//         </>
//     );
// }

// const mapStateToProps = ({ order, auth }) => ({
//     allOrderList: order.allOrderList,
//     fetchingAllOrderList: order.fetchingAllOrderList,
//     userId: auth.userDetails.userId,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getAllOrderList,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(AllOrderList);


import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import AddNotesOrderDrawer from "./AddNotesOrderDrawer";
import StatusOfOrderDrawer from "./StatusOfOrderDrawer";
import PaidButtonDrawer from "./PaidButtonDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getAllOrderList,
  handleNotesModalInOrder,
  handleStatusOfOrder,
  handlePaidModal
} from "./OrderAction";
import PaidIcon from '@mui/icons-material/Paid';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
// import OrderDetailsTable from "../../Customer/Child/CustomerDetail/CustomerDetailsTab/OrderDetailsTable";
import { CurrencySymbol } from "../../../Components/Common";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

function AllOrderList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllOrderList(page);
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
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllOrderList(props.currentUser ? props.currentUser : page,


    );
  }

  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }





  return (
    <>
      <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[12rem]">Order ID</div>
          <div className=" md:w-28">Customer</div>
          <div className=" md:w-28 ">Contact</div>
          <div className="md:w-32">#Phone</div>
          <div className="md:w-[16rem]">Creation Date</div>
          <div className="md:w-24"></div>


        </div>
        <InfiniteScroll
          dataLength={props.allOrderList.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        >
          {props.allOrderList.length ?
            <>
              {props.allOrderList.map((item) => {
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
                            <div class="w-60">
                              <Badge size="small" count={item.productNum}>
                                <span
                                  onClick={() => {
                                    handleOrder(item.orderId);
                                    handleSetParticularOrderData(item);
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
                            <div class="w-[4%]"></div>

                            <div class="max-sm:w-full md:w-44">
                              <Tooltip>
                                <div class="max-sm:w-full justify-between flex md:flex-col">
                                  {item.distributorName}

                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-row items-center md:w-44 max-sm:flex-row w-full max-sm:justify-between">
                          <div>
                            {item.contactPersonName}
                          </div>



                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex font-medium flex-col  md:w-48 max-sm:flex-row w-full max-sm:justify-between ">

                          <h4 class=" text-xs text-cardBody font-poppins">
                            {item.noOfPhones}
                          </h4>
                        </div>
                        <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">

                          <span>{date}</span>
                        </div>
                      </div>
                      <div class="flex">
                        <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">

                          <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                            {item.noOfownerPhones}
                          </h4>
                        </div>
                        <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                          {item.orderStatus}
                        </div>
                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

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


                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}


                        </div>
                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                  // </div>
                );
              })}
            </> :
            !props.allOrderList.length && !props.fetchingAllOrderList ? <NodataFoundPage /> : null}
        </InfiniteScroll>
      </OnlyWrapCard>
      <AddNotesOrderDrawer
        particularRowData={particularRowData}
        addNotesInOrder={props.addNotesInOrder}
        handleNotesModalInOrder={props.handleNotesModalInOrder}
      />
      <StatusOfOrderDrawer
        handleStatusOfOrder={props.handleStatusOfOrder}
        addStatusOfOrder={props.addStatusOfOrder}
        particularRowData={particularRowData}
      />
      <PaidButtonDrawer
        addPaidButtonModal={props.addPaidButtonModal}
        handlePaidModal={props.handlePaidModal}
        particularRowData={particularRowData}
      />
    </>
  );

}

const mapStateToProps = ({ order, auth }) => ({
  allOrderList: order.allOrderList,
  addPaidButtonModal: order.addPaidButtonModal,
  addStatusOfOrder: order.addStatusOfOrder,
  addNotesInOrder: order.addNotesInOrder,
  fetchingAllOrderList: order.fetchingAllOrderList,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllOrderList,
      handleNotesModalInOrder,
      handleStatusOfOrder,
      handlePaidModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllOrderList);
