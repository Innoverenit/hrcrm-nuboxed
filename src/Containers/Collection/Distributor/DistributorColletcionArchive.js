import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { DistributorCollectionArchiveToday } from "../CollectionAction";
import moment from "moment";
import { BundleLoader } from "../../../Components/Placeholder";
import { FormattedMessage } from "react-intl";
const DistributorColletcionArchiveForm = lazy(() => import("./DistributorColletcionArchiveForm"));

function DistributorColletcionArchive(props) {

  return (
    <>
      <Suspense fallback={<BundleLoader />}>
        <DistributorColletcionArchiveForm />
      </Suspense>

      <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[9.1rem]"><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className=" md:w-[8.2rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" md:w-[7rem] "><FormattedMessage id="app.transaction" defaultMessage="Transaction ID" /></div>
            <div className="md:w-[6rem]"><FormattedMessage id="app.type" defaultMessage="Type" /></div>
            <div className="md:w-[6rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
            <div className="md:w-[7rem]"><FormattedMessage id="app.amount" defaultMessage="Amount" /></div>
            <div className="md:w-[7rem]"><FormattedMessage id="app.mode" defaultMessage="Mode" /></div>
            <div className="w-[6rem]"><FormattedMessage id="app.owner" defaultMessage="Owner" /></div>
          </div>


          {props.todayDisArchive.map((item) => {
            return (
              <div>
                <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 ">
                  <div class="flex">
                    <div className=" flex font-medium flex-col  md:w-[9.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex font-medium flex-col  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                      <div class=" text-xs text-cardBody font-poppins">
                        {item.orderId}
                      </div>

                    </div>

                  </div>
                  <div class="flex">
                    <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                      <div class=" text-xs text-cardBody font-poppins text-center">
                        {item.paymentType}

                      </div>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins text-center">
                      {` ${moment(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>

                  <div class="flex md:items-center">
                    <div class="flex">
                      <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                    </div>

                    <div class="flex">
                      <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">


                        <div class=" text-xs text-cardBody font-poppins">
                          <span>
                            <MultiAvatar
                              primaryTitle={item.salesExecutive}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </span>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )
          })}

        </OnlyWrapCard>
      </div>
    </>
  );
}
const mapStateToProps = ({ collection, leads }) => ({
  todayDisArchive: collection.todayDisArchive,
  DistributorCollectionArchive: collection.DistributorCollectionArchive,
  allSalesUsers: leads.allSalesUsers,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      DistributorCollectionArchiveToday,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);

// const columns = [
//   {
//     title: "Name",
//     defaultSortOrder: "descend",
//     ...getColumnSearchProps("orderSourceName"),
//     dataIndex: "orderSourceName",
//     width: "12%",
//   },
//   {
//     title: "Order#",
//     dataIndex: "orderId",
//     ...getColumnSearchProps("orderId"),
//     width: "14%",
//     // render: (text, item) => {
//     //   return (
//     //     <>
//     //       <span>
//     //         {item.orderId}
//     //       </span>
//     //     </>
//     //   )
//     // }
//   },
//   {
//     title: "Transaction ID",
//     dataIndex: "transactionNumber",
//     width: "14%",
//     ...getColumnSearchProps("transactionNumber"),
//   },
//   {
//     title: "Type",
//     dataIndex: "paymentType",
//     width: "6%",
//     filters: [
//       { text: "Part", value: "Part" },
//       { text: "Complete", value: "Complete" },
//     ],
//     onFilter: (value, record) => {
//       return record.paymentType === value;
//     },
//   },
//   {
//     title: "Date",
//     dataIndex: "paymentDate",
//     width: "8%",
//     render: (name, item, i) => {
//       return <span>{` ${moment(item.paymentDate).format("DD-MM-YY")}`}</span>;
//     },
//     sorter: (a, b) => {
//       var nameA = a.paymentDate;
//       var nameB = b.paymentDate;
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
//     title: "Amount",
//     align: 'right',
//     dataIndex: "paymentAmount",
//     width: "7%",
//     render: (name, item, i) => {
//       return (
//         <span>
//           <CurrencySymbol currencyType={"INR"} />
//           {item.paymentAmount.toFixed(2)}
//         </span>
//       );
//     },
//     sorter: (a, b) => {
//       var nameA = a.paymentAmount;
//       var nameB = b.paymentAmount;
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
//     width: "1%"
//   },
//   {
//     title: "Mode",
//     dataIndex: "paymentMode",
//     align: 'center',
//     width: "9%",
//     filters: [
//       { text: "Cash", value: "Cash" },
//       { text: "Credit-Card", value: "Credit-Card" },
//       { text: "Net Banking", value: "Net Banking" },
//       { text: "UPI", value: "UPI" },
//     ],
//     onFilter: (value, record) => {
//       return record.paymentMode === value;
//     },
//   },

//   {
//     title: "Received?",
//     dataIndex: "approveByFinanceInd",
//     width: "7%",
//   },
//   {
//     title: "Owner",
//     dataIndex: "salesExecutive",
//     width: "15%",
//     filters: salesOption,
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
//     title: "",
//     dataIndex: "remarks",
//     width: "3%",
//     render: (text, item, i) => {
//       return (
//         <>
//           {item.remarks ?
//             <Tooltip title={item.remarks}>
//               <span>
//                 <i className="fa fa-sticky-note"></i>
//               </span>
//             </Tooltip>
//             : null}
//         </>

//       )
//     },
//   }
// ];
