import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import { Formik, Form, Field } from "formik";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import {
  getTodayDistributor,
  DistributorCollectionReceivableToday,
  handleDistributorProductModal
} from "../CollectionAction";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import DistributorPaymentToggle from "./DistributorPaymentToggle";
import DistributorProductHistory from "./DistributorProductHistory";
import { BundleLoader } from "../../../Components/Placeholder";

function DistributorColletcionArchive(props) {
  useEffect(() => {
    props.getTodayDistributor();
  }, []);

  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }

  function handleClear() {
    props.getTodayDistributor();
  }

  const { user } = props;


  return (
    <>

      <Formik
        initialValues={{
          date: undefined,
          type: "Distributor",
        }}
        onSubmit={(values, { resetForm }) => {
          props.handleClearCheck();
          let newStartDate = moment(values.date).format("YYYY-MM-DD");

          props.DistributorCollectionReceivableToday({
            ...values,
            date: `${newStartDate}T00:00:00Z`,
          });
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form>
            <div class="flex justify-evenly h-full w-[30%] items-end">
              <div class="w-[35%]">
                <Field
                  isRequired
                  name="date"
                  width={"100%"}
                  label={<FormattedMessage id="app.paymentdate" defaultMessage="Payment Date" />}
                  component={DatePicker}
                  value={values.date}
                  inlineLabel
                  isColumn

                />
              </div>
              <div class="w-[25%]">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.DistributorCollectionReceivable}
                  disabled={values.date ? false : true}

                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </div>
              <div class="w-[15%]">
                <Button
                  type="primary"
                  disabled={values.date ? false : true}

                  onClick={() => {
                    setFieldValue("date", undefined);
                    handleClear();
                  }}
                >
                  <FormattedMessage id="app.clear" defaultMessage="Clear" />
                </Button>
              </div>
            </div>



          </Form>
        )}
      </Formik>

      {props.fetchingTodayDistributor ? <BundleLoader /> : <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[9.1rem]"><FormattedMessage id="app.customer" defaultMessage="Customer" /></div>
            <div className=" md:w-[8.2rem]"><FormattedMessage id="app.order" defaultMessage="Order #" /></div>
            <div className=" md:w-[7rem] "><FormattedMessage id="app.transaction" defaultMessage="Transaction ID" /></div>
            <div className="md:w-[6rem]"><FormattedMessage id="app.type" defaultMessage="Type" /></div>
            <div className="md:w-[6rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
            <div className="md:w-[7rem]"><FormattedMessage id="app.amount" defaultMessage="Amount" /></div>
            <div className="md:w-[7rem]"><FormattedMessage id="app.mode" defaultMessage="Mode" /></div>
            <div className="w-[4.8rem]"><FormattedMessage id="app.received" defaultMessage="Received ?" /></div>
            <div className="w-[6rem]"><FormattedMessage id="app.owner" defaultMessage="Owner" /></div>
          </div>
          {props.todayDistributor.map((item) => {

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
                      <div className=" flex font-medium flex-col  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs text-cardBody font-poppins">
                          {user.collectionApproveInd === true && (
                            <DistributorPaymentToggle paymentId={item.paymentId} orderPaymentType={item.orderPaymentType} />
                          )}
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
      </div>}
      <DistributorProductHistory
        handleDistributorProductModal={props.handleDistributorProductModal}
        collectionDistributorOrder={props.collectionDistributorOrder}
        particularRowData={particularRowData}
      />

    </>
  );
}
const mapStateToProps = ({ collection, leads, auth }) => ({
  DistributorCollectionReceivable: collection.DistributorCollectionReceivable,
  todayDistributor: collection.todayDistributor,
  fetchingTodayDistributor: collection.fetchingTodayDistributor,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allSalesUsers: leads.allSalesUsers,
  collectionDistributorOrder: collection.collectionDistributorOrder
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTodayDistributor,
      DistributorCollectionReceivableToday,
      handleDistributorProductModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);


// const columns = [
//   {
//     title: "",
//     width: "1%",
//     render: (name, item) => {
//       return {
//         props: {
//           style: {
//             backgroundColor: item.color,
//           },
//           children: <span></span>,
//         },
//       };
//     },
//   },
//   {
//     title: "Name",
//     defaultSortOrder: "descend",
//     ...getColumnSearchProps("orderSourceName"),
//     dataIndex: "orderSourceName",
//     width: "16%",
//   },
//   {
//     title: "Order#",
//     dataIndex: "orderId",
//     ...getColumnSearchProps("orderId"),
//     width: "18%",
//     render: (text, item) => {
//       return (
//         <>
//           <span
//             style={{
//               textDecoration: "underline",
//               color: "#1890ff",
//               // fontWeight: item.orderStatus === "Completed" ? "bold" : null,
//               cursor: "pointer",
//             }}
//             onClick={() => {
//               props.handleDistributorProductModal(true)
//               handleSetParticularOrderData(item);
//             }}
//           >
//             {item.orderId}
//           </span>
//         </>
//       )
//     }
//   },
//   {
//     title: "Transaction ID",
//     dataIndex: "transactionNumber",
//     width: "14%",
//     ...getColumnSearchProps("transactionNumber"),
//     render: (text, item, i) => {
//       return (
//         <>
//           {item.transactionNumber === "Nill" ? "" : item.transactionNumber}
//         </>
//       )
//     },
//   },
//   {
//     title: "Type",
//     dataIndex: "paymentType",
//     width: "8%",
//     filters: [
//       { text: "Part", value: "Part" },
//       { text: "Complete", value: "Complete" },
//     ],
//     onFilter: (value, record) => {
//       return record.paymentType === value;
//     },
//   },
//   {
//     title: "Payment",
//     dataIndex: "date",
//     width: "6%",
//     sorter: (a, b) => {
//       var nameA = a.date;
//       var nameB = b.date;
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }
//       return 0;
//     },
//     render: (name, item, i) => {
//       return <span>{` ${moment(item.date).format("DD-MM-YY")}`}</span>;
//     },
//   },
//   {
//     title: "Entry",
//     dataIndex: "paymentDate",
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
//     width: "8%",
//     render: (name, item, i) => {
//       return <span>{` ${moment(item.paymentDate).format("ll")}`}</span>;
//     },
//   },
//   ,
//   {
//     title: "Amount",
//     dataIndex: "paymentAmount",
//     align: "left",
//     width: "7%",
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
//     render: (name, item, i) => {
//       return (
//         <span>
//           <CurrencySymbol currencyType={"INR"} />
//           {item.paymentAmount.toFixed(2)}
//         </span>
//       );
//     },
//   },
//   // {
//   //   width: "1%",
//   // },
//   {
//     title: "Mode",
//     align: "left",
//     dataIndex: "paymentMode",
//     width: "7%",
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
//     render(name, item) {
//       return (
//         <>
//           {user.designation === "Manager" &&
//             user.functionName === "Sales" ? null : (
//              <DistributorPaymentToggle paymentId={item.paymentId} />
//           )}
//         </>
//       );
//     },
//     width: "7%",
//   },
//   {
//     title: "Owner",
//     dataIndex: "salesExecutive",
//     width: "16%",
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
//     width: "2%",
//     render: (text, item, i) => {
//       return (
//         <>
//           {item.remarks ? (
//             <Tooltip title={item.remarks}>
//               <span>
//                 <i className="fa fa-sticky-note"></i>
//               </span>
//             </Tooltip>
//           ) : null}
//         </>
//       );
//     },
//   },
// ];