import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { MultiAvatar, MultiAvatar2 } from "../../../../../Components/UI/Elements";
import {
  getOrderProcurement,
} from "../../AccountAction";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { FormattedMessage } from "react-intl";

function CustomerProcurementTable(props) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getOrderProcurement(props.distributorId, page,"procure");
    setPage(page + 1);
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  // useEffect(() => {
  //   return () => props.emptyOrders();
  // }, []);
  function handleSetParticularOrderData(item, data) {
    console.log(item);
    setParticularRowData(item);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getOrderProcurement(props.currentUser ? props.currentUser : props.distributorId, page,"procure"
    );
  }

  return (
    <>
    <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        {/* <div className="md:w-[3.8rem]"><FormattedMessage id="app.priority" defaultMessage="Priority"/></div> */}
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.orderNo" defaultMessage="Order No"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.deliveryDate" defaultMessage="Delivery Date"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>

                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
    
        <InfiniteScroll
          dataLength={props.procurementOrder.length}
          next={handleLoadMore}
          loader={props.fetchingOrderProcurement ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}
          height={"75vh"}
        >
          {props.procurementOrder.map((item) => {
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
                      <div className=" flex font-medium  md:w-[1.56rem] max-sm:w-full  ">
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
                        {item.teamLeadUserName && <MultiAvatar2
                          primaryTitle={item.teamLeadUserName}
                          imgWidth={"2.1em"}
                          imgHeight={"2.1em"}
                        />}
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
                  

                  </div>

                </div>
              </div>
              // </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );



}

const mapStateToProps = ({ distributor }) => ({
  procurementOrder: distributor.procurementOrder,
  fetchingOrderProcurement: distributor.fetchingOrderProcurement,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderProcurement,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
