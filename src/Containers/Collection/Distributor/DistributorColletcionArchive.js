import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar } from "../../../Components/UI/Elements";
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

      <div className=' flex justify-end sticky  z-auto'>
      <div class="rounded-lg m-1 max-sm:m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[9.1rem] max-xl:w-[13.1rem]"><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className=" w-[8.2rem] max-xl:w-[9.2rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" w-[7.32rem] max-xl:w-[6.32rem] "><FormattedMessage id="app.transaction" defaultMessage="Transaction ID" /></div>
            <div className="w-[6.023rem]"><FormattedMessage id="app.type" defaultMessage="Type" /></div>
            <div className="w-[6.12rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
            <div className="w-[7.12rem] max-xl:w-[5.12rem]"><FormattedMessage id="app.amount" defaultMessage="Amount" /></div>
            <div className="w-[7.21rem]"><FormattedMessage id="app.mode" defaultMessage="Mode" /></div>
            <div className="w-[6rem] max-xl:w-[3rem]"><FormattedMessage id="app.owner" defaultMessage="Owner" /></div>
          </div>


          {props.todayDisArchive.map((item) => {
            return (
              <div>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium   w-[12.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderSourceName}
                      </div>

                    </div>

                    <div className=" flex font-medium   w-[10.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                      <div class=" text-xs  font-poppins">
                        {item.orderId}
                      </div>

                    </div>

                  </div>
                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[10.11rem] max-xl:w-[5.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.transactionNumber}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[9.02rem] max-xl:w-[5.02rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                      <div class=" text-xs  font-poppins text-center">
                        {item.paymentType}

                      </div>
                    </div>
                    <div className=" flex font-medium  w-[8.01rem]  max-xl:w-[6.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      {` ${moment(item.date).format("DD-MM-YY")}`}

                    </div>
                  </div>
                  </div>
                 

                  <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   
                      <div className=" flex font-medium   w-[10.03rem] max-xl:w-[4.03rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex font-medium   w-[11.04rem] max-xl:w-[8.54rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.paymentModeName}
                        </div>

                      </div>
                   

                    
                      <div className=" flex font-medium   w-[7.05rem] max-xl:w-[3.85rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins">
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
            )
          })}

        </div>
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
