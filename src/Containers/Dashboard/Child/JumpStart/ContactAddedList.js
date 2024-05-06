
import React, {  useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge } from "antd";
import moment from "moment";
import PaidIcon from '@mui/icons-material/Paid';
import {getContactAddedList} from "../../DashboardAction"
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


function ContactAddedList(props) {
 
//   useEffect(() => {
//     props.getAllOrderList(props.orgId, page);
//     setPage(page + 1);
//   }, []);
useEffect(()=>{
    if (props.timeRangeType === "today") {
    props.getContactAddedList(props.orgId,props.startDate,props.endDate)
    }else {
        props.getContactAddedList(props.orgId,props.startDate,props.endDate)
      }
   }, [props.orgId,props.startDate,props.endDate]);




  return (
    <>
   
   <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[12rem]">Order ID</div>
          <div className=" md:w-[10.4rem]">Customer</div>
          <div className=" md:w-[12.01rem] ">Contact</div>
          <div className="md:w-[8.12rem]">#Units</div>
          <div className="md:w-[4rem]">Owner</div>
          <div className="md:w-[7.1rem]">Creation Date</div>
          <div className="md:w-[37rem]">Revised</div>


        </div>
        {/* <InfiniteScroll
          dataLength={props.allCompleteOrder.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingAllOrderList ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        > */}
          {props.contactAddedList.length ?
            <>
              {props.contactAddedList.map((item) => {
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
                            <div class="w-[9.1rem]">
                              <Badge size="small" count={item.productNum}>
                                <span
                                  class="underline cursor-pointer text-[#1890ff]"
                                //   onClick={() => {
                                //     handleOrder(item.orderId);
                                //     handleSetParticularOrderData(item);
                                //     props.handleOrderDetailsModal(true);
                                //   }}

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
                           

                            <div class="max-sm:w-full md:w-[11.1rem]">
                              <Tooltip>
                                <div class="max-sm:w-full justify-between flex md:flex-col">
                                  {item.distributorName}

                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-row items-center md:w-[4.51rem] max-sm:flex-row w-full max-sm:justify-between">
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
                        <div className=" flex font-medium flex-col  md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">

                          <h4 class=" text-xs text-cardBody font-poppins">
                            {item.noOfPhones}
                          </h4>
                        </div>
                        <div className=" flex font-medium flex-col  md:w-[4.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <MultiAvatar2
                              primaryTitle={item.userName}
                              imageURL={item.imageURL}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </h4>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7.23rem] max-sm:flex-row w-full max-sm:justify-between ">

                          <span>{date}</span>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[7.8rem] max-sm:flex-row w-full max-sm:justify-between ">

<span>{item.payableOfferPrice}</span>
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
                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">

                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Notes">
                              <NoteAltIcon
                                style={{ cursor: "pointer", color: "green", fontSize: "1rem" }}
                                // onClick={() => {

                                //   props.handleNotesModalInOrder(true);
                                //   handleSetParticularOrderData(item);
                                // }}
                              />

                            </Tooltip>
                          </h4>


                        </div>


                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Status">
                              <EventRepeatIcon
                                style={{ cursor: "pointer", fontSize: "1rem", }}
                                // onClick={() => {
                                //   props.handleStatusOfOrder(true);
                                //   handleSetParticularOrderData(item);
                                // }}
                              />
                            </Tooltip>
                          </h4>
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}


                        </div>
                        <div className=" flex font-medium flex-col w-[2rem] md:w-[1rem] max-sm:flex-row  max-sm:justify-between  ">
                          <h4 class=" text-xs text-cardBody font-poppins">
                            <Tooltip title="Collection">
                              <PaidIcon
                                style={{ cursor: "pointer", fontSize: "1rem", }}
                                // onClick={() => {
                                //   props.handlePaidModal(true);
                                //   handleSetParticularOrderData(item);
                                // }} 
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
            !props.contactAddedList.length && !props.fetchingContactAddedList ? <NodataFoundPage /> 
            : null}
        {/* </InfiniteScroll> */}
      </div>
    </>
  );

}

const mapStateToProps = ({ order, auth,dashboard, distributor }) => ({
contactAddedList:dashboard.contactAddedList,
fetchingContactAddedList:dashboard.fetchingContactAddedList,
orgId: auth.userDetails.organizationId,
timeRangeType:dashboard.timeRangeType,
startDate: dashboard.startDate,
endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactAddedList
    //   getAllOrderList,
    //   handleNotesModalInOrder,
    //   handleStatusOfOrder,
    //   handlePaidModal,
    //   emptyOrders,
    //   handleOrderDetailsModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactAddedList);
