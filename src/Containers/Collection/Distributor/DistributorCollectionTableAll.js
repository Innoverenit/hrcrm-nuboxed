import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { getAllDistributorsList } from "../CollectionAction";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { CurrencySymbol } from "../../../Components/Common";
import { Link } from "../../../Components/Common";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";

class AllDistributorList extends Component {

  state = {
    searchText: "",
    searchedColumn: "",
    page: 0,
    hasMore: true
  };

  componentDidMount() {
    this.setState({ page: this.state.page + 1 })
    this.props.getAllDistributorsList(this.state.page);
  }

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 })
    this.props.getAllDistributorsList(this.state.page);
  }

  render() {

    if (this.props.fetchingAllDistributorsError) {
      return <APIFailed />;
    }


    return (
      <>
        <div className='flex  sticky z-auto'>
          <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
            <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
              <div className=" md:w-[8.1rem]"><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
              <div className=" md:w-[5.1rem]"><FormattedMessage id="app.mobile" defaultMessage="Mobile" /></div>
              <div className=" md:w-[6.8rem] "><FormattedMessage id="app.website" defaultMessage="Website" /></div>
              <div className="md:w-[5.9rem]"><FormattedMessage id="app.address" defaultMessage="Address" /></div>
              <div className="md:w-[7.8rem]"><FormattedMessage id="app.pincode" defaultMessage="Pin Code" /></div>
              <div className="md:w-[7.9rem]"><FormattedMessage id="app.city" defaultMessage="City" /></div>
              <div className="md:w-[6.2rem]"><FormattedMessage id="app.owner" defaultMessage="Owner" /> </div>
              <div className="md:w-[11.3rem]"><FormattedMessage id="app.balance" defaultMessage="Balance" /></div>
              <div className="md:w-[11.3rem]"><FormattedMessage id="app.previous" defaultMessage="Previous" /></div>


            </div>
            <InfiniteScroll
              dataLength={this.props.allDistributors.length}
              next={this.handleLoadMore}
              hasMore={this.state.hasMore}
              loader={this.props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
            >

              {this.props.allDistributors.map((item) => {
                const currentdate = moment().format("DD/MM/YYYY");
                const date = moment(item.creationDate).format("DD/MM/YYYY");
                const diff = Math.abs(
                  moment().diff(moment(item.lastRequirementOn), "days")
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
                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "
                    // style={{
                    //     borderBottom: "3px dotted #515050"
                    // }}
                    >
                      <div class="flex">
                        <div className=" flex font-medium flex-col md:w-40 max-sm:w-full  ">


                          <Tooltip>
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              {/* <div class=" text-xs  font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                              <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <Link
                                  toUrl={`distributor/${item.distributorId}`}
                                  title={`${item.name}`}
                                >{item.name}</Link>&nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-xs"
                                    style={{
                                      color: "tomato",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    New
                                  </span>
                                ) : null}

                              </div>
                            </div>
                          </Tooltip>

                        </div>

                        <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">

                          {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                          <div class=" text-xs  font-poppins">
                            {item.phoneNo}
                          </div>

                        </div>

                      </div>
                      <div class="flex">
                        <div className=" flex font-medium flex-col md:w-full max-sm:flex-row w-full max-sm:justify-between ">
                          {/* <div class=" text-sm  font-poppins max-sm:hidden"># Opportunity</div> */}

                          <div class=" text-xs  font-poppins text-center">
                            {item.url}

                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                          {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                          <div class=" text-xs  font-poppins text-center">
                            {/* { `${item.addresses[0].address1 || ""} ${item.addresses[0]
                                      .address2 || ""} ${item.addresses[0].street || ""} 
                                          ${item.addresses[0].city || ""},
                                              `} */}

                          </div>
                        </div>
                      </div>
                      <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Weighted Value</div> */}

                        <div class=" text-xs  font-poppins text-center">
                          {/* {`${(item.addresses &&
                                    item.addresses.length &&
                                    item.addresses[0].city) ||
                                    ""} 
                                          `}  */}

                        </div>
                      </div>

                      <div class="flex md:items-center">
                        <div class="flex">
                          <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">

                            {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                            <div class=" text-xs  font-poppins">
                              <span>
                                <CurrencySymbol currencyType={"INR"} />
                                {item.totalPayableAmount.toFixed(2)}
                              </span>
                            </div>

                          </div>
                          <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">

                            {/* <div class=" text-sm  font-poppins max-sm:hidden"> Sector </div> */}
                            <div class=" text-xs  font-poppins">
                              <span>
                                <CurrencySymbol currencyType={"INR"} />
                                {item.totalPayablePrev.toFixed(2)}
                              </span>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>


                )
              })}
            </InfiniteScroll>
          </OnlyWrapCard>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ distributor, auth, leads }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  fetchingAllDistributorsError: distributor.fetchingAllDistributorsError,
  fetchingAllDistributorData: distributor.fetchingAllDistributorData,
  userId: auth.userDetails.userId,
  allSalesUsers: leads.allSalesUsers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllDistributorList);
// const columns = [
//   {
//     title: "Name",
//     width: "11%",
//     defaultSortOrder: "descend",
//     dataIndex: "name",
//     ...this.getColumnSearchProps("name"),
//     render: (name, item, i) => {
//       return (
//         <Link
//           toUrl={`distributor/${item.distributorId}`}
//           title={`${item.name}`}
//         />
//       );
//     },
//   },

//   {
//     title: "Mobile",
//     dataIndex: "phoneNo",
//     width: "9%",
//   },
//   {
//     title: "Website",
//     dataIndex: "url",
//     width: "12%",
//   },
//   {
//     title: "Address",
//     render: (name, item, i) => {
//       return `${item.addresses[0].address1 || ""} ${item.addresses[0]
//         .address2 || ""} ${item.addresses[0].street || ""}
//             ${item.addresses[0].city || ""},
//                 `;
//     },
//     width: "18%",
//   },
//   {
//     title: "Pin Code",
//     render: (name, item, i) => {
//       console.log(item);
//       return `${(item.addresses &&
//         item.addresses.length &&
//         item.addresses[0].pinCode) ||
//         ""}
//               `;
//     },
//     width: "6%",
//   },
//   {
//     title: "City",
//     render: (name, item, i) => {
//       console.log(item);
//       return `${(item.addresses &&
//         item.addresses.length &&
//         item.addresses[0].city) ||
//         ""}
//               `;
//     },
//     width: "9%",
//   },

//   {
//     title: "Owner",
//     dataIndex: "salesExecutive",
//     width: "12%",
//     // filters: salesOption,
//     onFilter: (value, record) => {
//       console.log(value, record);
//       return record.salesExecutive === value;
//     },
//     sorter: (a, b) => {
//       var nameA = a.salesExecutive.toLowerCase();
//       var nameB = b.salesExecutive.toLowerCase();
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//   },
//   {
//     title: "Balance",
//     width: "7%",
//     dataIndex: "totalPayableAmount",
//     render: (name, item, i) => {
//       return (
//         <span>
//           <CurrencySymbol currencyType={"INR"} />
//           {item.totalPayableAmount.toFixed(2)}
//         </span>
//       );
//     },
//     defaultSortOrder: "descend",
//     sorter: (a, b) => a.totalPayableAmount - b.totalPayableAmount,
//   },
//   {
//     title: "Previous",
//     dataIndex: "totalPayablePrev",
//     width: "10%",
//     render: (name, item, i) => {
//       return (
//         <span>
//           <CurrencySymbol currencyType={"INR"} />
//           {item.totalPayablePrev.toFixed(2)}
//         </span>
//       );
//     },
//     defaultSortOrder: "descend",
//     sorter: (a, b) => a.totalPayablePrev - b.totalPayablePrev,
//   },
//   {
//     title: "",
//     width: "2%",
//     render: (name, item, i) => {
//       return (
//         <>
//           <Tooltip title={item.salesExecutiveEmail}>
//             <span>
//               <i class="far fa-envelope"></i>
//             </span>
//           </Tooltip>
//         </>
//       );
//     },
//   },
// ];