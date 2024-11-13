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
import { handleInvoiceModal } from "../../Main/Account/AccountAction";
import InvoiceModal from "../../Main/Account/AccountDetailsTab/InvoiceModal";

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
            <div class="flex  h-full w-[52%]  items-center max-sm:w-wk">
              <div class="w-[52%] max-sm:w-wk">
                <div class=" font-bold font-poppins mb-2 text-xs  flex flex-row items-center">
                {translatedMenuItems[0]}   {/* Search by Payment Date */}
<div className="ml-2">
                  <Field
                    isRequired
                    name="date"
                    width={"100%"}
                    component={DatePicker}
                    value={values.date}
                  />
                  </div>
                </div>

              </div>
              <div class="md:mb-2 font-bold font-poppins text-xs">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.DistributorCollectionReceivable}
                  disabled={values.date ? false : true}

                >
                 {translatedMenuItems[1]}   {/* "Submit" /> */}
                </Button>
              </div>
              <div class="font-bold font-poppins text-xs mb-2">
                <Button
                  type="primary"
                  disabled={values.date ? false : true}

                  onClick={() => {
                    setFieldValue("date", undefined);
                    handleClear();
                  }}
                >
                   {translatedMenuItems[12]} {/*"Clear" /> */}
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
            <div className="font-bold font-poppins text-xs w-[13.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[2]}   {/* Customer" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[3]} #
              {/* Order #" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Invoice */} {translatedMenuItems[4]}
              </div>
            <div className="font-bold font-poppins text-xs w-[8.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">  {translatedMenuItems[5]} ID
              {/* Transaction ID" /> */}
              </div>
              <div className="font-bold font-poppins text-xs w-[6.12rem]  max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* "Date" /> */} {translatedMenuItems[7]}
              </div>
            <div className="font-bold font-poppins text-xs w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* "Type" /> */} {translatedMenuItems[6]}
              </div>
          
            <div className="font-bold font-poppins text-xs w-[8.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* "Amount" /> */} {translatedMenuItems[8]}
              </div>
            <div className="font-bold font-poppins text-xs w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Mode" /> */} {translatedMenuItems[9]}
              </div>
            <div className="font-bold font-poppins text-xs w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]"> {translatedMenuItems[10]}?
              {/*"Received ?" /> */}
              </div>
            <div className="font-bold font-poppins text-xs w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {/* Owner" /> */} {translatedMenuItems[11]}
              </div>
          </div>
          <div className="overflow-scroll h-[72vh]">
      
            {props.todayDistributor.map((item) => {

              return (
                <div>
                  <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex border-l-2 h-8 border-green-500 bg-[#eef2f9] items-center  w-[11.1rem] max-xl:w-[6.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins items-center ml-gap max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.orderSourceName}
                        </div>

                      </div>

                      <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[8.1rem] max-xl:w-[5.1rem] max-lg:w-[4.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs items-center ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                        <span
                                                                    class="underline cursor-pointer text-[#1890ff]"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleInvoiceModal(true);
                                                                    }}
                                                                >  {item.newOrderNo}</span>
                        </div>

                      </div>

                    </div>
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex w-[6.8rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.8rem] max-lg:w-[4.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                        <div class=" text-xs items-center ml-gap font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.invoiceId}

                        </div>
                      </div>
                      <div className=" flex w-[7.15rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-xl:w-[2.15rem] max-lg:w-[3.15rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins items-center ml-gap text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                        {item.transactionNumber}

                        </div>
                      </div>
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.36rem] max-xl:w-[8.36rem] max-lg:w-[5.86rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {` ${dayjs(item.date).format("DD-MM-YY")}`}

                        </div>
                      </div>
                      <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[9.36rem] max-xl:w-[8.36rem] max-lg:w-[5.86rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                              {item.paymentType}
{/* Type */}
                        </div>
                    </div>

                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[8.2rem] max-xl:w-[5.9rem] max-lg:w-[4.5rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                        {item.orderCurrencyName} &nbsp;  {item.paymentAmount} 
                        </div>

                      </div>
                      <div className=" flex items-center justify-start h-8 ml-gap bg-[#eef2f9] w-[8.04rem] max-xl:w-[5.6rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs items-center ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.paymentModeName}
                        </div>

                      </div>
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[9.03rem] max-xl:w-[4.2rem] max-lg:w-[3.7rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {user.collectionApproveInd === true && (
                            <DistributorPaymentToggle paymentId={item.paymentId} orderPaymentType={item.orderPaymentType} />
                          )}
                        </div>

                      </div>


                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.07rem] max-xl:w-[6.07rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">


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
                 <InvoiceModal
                    particularRowData={particularRowData}
                    handleInvoiceModal={props.handleInvoiceModal}
                    invoiceO={props.invoiceO}
                    selectedLanguage={props.selectedLanguage}
                            translateText={props.translateText}
                /> 
    </>
  );
}
const mapStateToProps = ({ collection, leads,distributor, auth }) => ({
  DistributorCollectionReceivable: collection.DistributorCollectionReceivable,
  todayDistributor: collection.todayDistributor,
  fetchingTodayDistributor: collection.fetchingTodayDistributor,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allSalesUsers: leads.allSalesUsers,
  collectionDistributorOrder: collection.collectionDistributorOrder,
  invoiceO: distributor.invoiceO,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTodayDistributor,
      DistributorCollectionReceivableToday,
      handleDistributorProductModal,
      handleInvoiceModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorColletcionArchive);