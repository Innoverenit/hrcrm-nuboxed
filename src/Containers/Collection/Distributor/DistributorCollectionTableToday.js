import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { MultiAvatar } from "../../../Components/UI/Elements";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import {
  getTodayDistributor,
  DistributorCollectionReceivableToday,
  handleDistributorProductModal
} from "../CollectionAction";
import dayjs from "dayjs";
import DistributorPaymentToggle from "./DistributorPaymentToggle";
import DistributorProductHistory from "./DistributorProductHistory";
import { BundleLoader } from "../../../Components/Placeholder";

function DistributorColletcionArchive(props) {
  useEffect(() => {
    props.getTodayDistributor();
  }, []);

  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
         "938", //    Search by Payment Date,//0
          "154",  // "Submit",//1
          "248" , // "Customer",//2
           "660" ,// "Order #,//3
          "1169" , // " Invoice",//4
           "926", // "Transaction ",//5
          "71" , // "Type",//6
          "74" , // Date",//7
           "929" ,// "Amount",8
           "86", // "Mode"9
         "1085", //  Received10
         "1681", //  Paid By"11
           "194" // "Clear"12
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
          let newStartDate = dayjs(values.date).format("YYYY-MM-DD");

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
            <div class="flex justify-evenly h-full w-[52%] items-end max-sm:w-wk">
              <div class="w-[52%] max-sm:w-wk">
                <div class=" font-bold font-poppins text-xs flex flex-row">
                {translatedMenuItems[0]}   {/* Search by Payment Date */}

                  <Field
                    isRequired
                    name="date"
                    width={"100%"}
                    component={DatePicker}
                    value={values.date}
                  />
                </div>

              </div>
              <div class="md:w-[0%] mb-[0.35rem] font-bold font-poppins text-xs">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.DistributorCollectionReceivable}
                  disabled={values.date ? false : true}

                >
                 {translatedMenuItems[1]}   {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
                </Button>
              </div>
              <div class="font-bold font-poppins text-xs mb-[0.35rem]">
                <Button
                  type="primary"
                  disabled={values.date ? false : true}

                  onClick={() => {
                    setFieldValue("date", undefined);
                    handleClear();
                  }}
                >
                   {translatedMenuItems[12]} {/* <FormattedMessage id="app.clear" defaultMessage="Clear" /> */}
                </Button>
              </div>
            </div>



          </Form>
        )}
      </Formik>

      {props.fetchingTodayDistributor ? <BundleLoader /> : 
      <div className=' flex  sticky z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-y-auto  overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className="font-bold font-poppins text-xs w-[9.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[2]}   {/* <FormattedMessage id="app.customer" defaultMessage="Customer" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[3]} #
              {/* <FormattedMessage id="app.order" defaultMessage="Order #" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Invoice */} {translatedMenuItems[4]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">  {translatedMenuItems[5]} ID
              {/* <FormattedMessage id="app.transaction" defaultMessage="Transaction ID" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* /<FormattedMessage id="app.type" defaultMessage="Type" /> */} {translatedMenuItems[6]}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* <FormattedMessage id="app.date" defaultMessage="Date" /> */} {translatedMenuItems[7]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* <FormattedMessage id="app.amount" defaultMessage="Amount" /> */} {translatedMenuItems[8]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* <FormattedMessage id="app.mode" defaultMessage="Mode" /> */} {translatedMenuItems[9]}
              </div>
            <div className="font-bold font-poppins text-xs w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[10]}?
              {/* <FormattedMessage id="app.received" defaultMessage="Received ?" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* <FormattedMessage id="app.owner" defaultMessage="Owner" /> */} {translatedMenuItems[11]}
              </div>
          </div>
          <div className="overflow-scroll h-[67vh]">
      
            {props.todayDistributor.map((item) => {

              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium flex-col  w-[9.1rem] max-xl:w-[6.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.orderSourceName}
                        </div>

                      </div>

                      <div className=" flex font-medium flex-col  w-[8.1rem] max-xl:w-[5.1rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.newOrderNo}
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium flex-col w-[7.8rem] max-xl:w-[7.8rem] max-lg:w-[4.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.invoiceId}

                        </div>
                      </div>
                      <div className=" flex font-medium flex-col w-[7.15rem] max-xl:w-[2.15rem] max-lg:w-[3.15rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                        {item.transactionNumber}

                        </div>
                      </div>
                      <div className=" flex font-medium flex-col w-[9.36rem] max-xl:w-[8.36rem] max-lg:w-[5.86rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {` ${dayjs(item.date).format("DD-MM-YY")}`}

                        </div>
                      </div>
                    </div>



                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium flex-col  w-[9.2rem] max-xl:w-[5.9rem] max-lg:w-[4.5rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.paymentAmount} &nbsp; {item.orderCurrencyName}
                        </div>

                      </div>
                      <div className=" flex font-medium flex-col  w-[9.04rem] max-xl:w-[5.6rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.paymentModeName}
                        </div>

                      </div>
                      <div className=" flex font-medium flex-col  w-[7.03rem] max-xl:w-[4.2rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {user.collectionApproveInd === true && (
                            <DistributorPaymentToggle paymentId={item.paymentId} orderPaymentType={item.orderPaymentType} />
                          )}
                        </div>

                      </div>


                      <div className=" flex font-medium flex-col  w-[6.07rem] max-xl:w-[6.07rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">


                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
//       return <span>{` ${dayjs(item.date).format("DD-MM-YY")}`}</span>;
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
//       return <span>{` ${dayjs(item.paymentDate).format("ll")}`}</span>;
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