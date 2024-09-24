import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { addPaidOrder, getPaymentMode } from "../../../Account/AccountAction";
import dayjs from "dayjs";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { FormattedMessage } from "react-intl";
import { getCurrency } from "../../../../Auth/AuthAction";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";
import Swal from 'sweetalert2';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const DistributorSchema = Yup.object().shape({
  paymentMode: Yup.string().required("Input required"),
  entryAmount: Yup.string().required("Input required"),
  date: Yup.string().required("Input required"),
  orderCurrencyId:Yup.string().required("Input required"),
  
});
function DistributorPaidForm(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "929",  // Amount 0
        "241",   // "currency" 1
        "74",  // Date 2
        "1422",  // Reason 3
        "926",   // Transaction ID 4
        "1169",   // Invoice Id 5
        "86",   // "Mode" 6
        "138",   // "Document Id" 7 
        "154",   // "Submit" 8
      
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


  const currencyOption = props.currencies.map((item) => {
    return {
      label: item.currency_name || "",
      value: item.currency_id,
    };
  });
  const payOption = props.paymentModee.map((item) => {
    return {
      label: item.name || "",
      value: item.paymentCatagoryId,
    };
  });
  useEffect(() => {
    props.getCurrency();
    props.getPaymentMode(props.orgId)
  }, [])

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          date: "",
          entryAmount: "",
          invoiceId:props.particularRowData.invoiceId || "",
          paymentMode: "",
          remarks: "",
          docId: "",
          userId: props.userId,
          distributorId:props.distributorId,
          orderPhoneId: props.particularRowData.orderId,
          active: true,
          transactionNumber: "",
          orderCurrencyId: props.particularRowData.orderCurrencyName || "",
          orgId: props.orgId,
          approveByFinanceInd: false,
          orderPaymentType:"Procure",
          remainingTotalValue:props.particularRowData.remainingTotalValue || 0,
      
        }}
        validationSchema={DistributorSchema}
      
        onSubmit={(values, { resetForm }) => {
if  (Number(values.entryAmount) <= Number(props.particularRowData.remainingTotalValue) 
  && Number(values.entryAmount) >= 0 ) {
          props.addPaidOrder(
            {
              ...values,
              // date: `${newEndDate}T00:00:00Z`,
            },
            props.particularRowData.procureOrderInvoiceId,
            props.particularRowData.orderId ? props.particularRowData.orderId:props.particularRowData.orderPhoneId,
            props.distributorId,
          ); 
        }
          else {
            Swal.fire({
              title: 'Validation Error!',
              text: 'Amount can not exceed remaining total value or be less than 0!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }

          resetForm();
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
            <div class="flex justify-around max-sm:flex-col">
              <div class=" h-full w-w47.5 max-sm:w-wk">
                <div class="flex justify-evenly">
                  <div class="w-[31%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[0]}</div>
                    <Field
                      name="entryAmount"
                      // label={
                      //   <FormattedMessage
                      //     id="app.amount"
                      //     defaultMessage="Amount"
                      //   />}
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.entryAmount}
                    />
                  </div>
                
                  <div class="w-[31%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[1]}</div>
                    <Field
                      name="orderCurrencyId"
                      // label={
                      //   <FormattedMessage
                      //     id="app.currency"
                      //     defaultMessage="currency"
                      //   />
                      // }
                      isRequired
                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(currencyOption) ? currencyOption : []}
                    />
                  </div>
                  <div class="w-[31%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[2]}</div>
                    <Field
                      isRequired
                      name="date"
                      // label="Date "
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={DatePicker}
                      value={values.date}

                    />

                  </div>
                </div>
                <div class="flex justify-between ">
                <div class="w-[47.5%]">
                <div class="text-xs font-poppins font-bold">{translatedMenuItems[3]}</div>
                  <Field
                    name="remarks"
                    // label={
                    //   <FormattedMessage
                    //     id="app.reason"
                    //     defaultMessage="Reason"
                    //   />}
                    component={TextareaComponent}
                     style={{height:"9rem"}}
                  />
                </div>
               
                </div>
              </div>
              <div class=" h-full w-w47.5 max-sm:w-wk">
                <div class="flex justify-evenly">
                  <div class="w-[30%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[4]} ID</div>
                    <Field
                      isRequired
                      name="transactionNumber"
                      // label={
                      //   <FormattedMessage
                      //     id="app.transactionid"
                      //     defaultMessage="Transaction ID"
                      //   />}
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.transactionNumber}

                    />
                  </div>
                  <div class="w-[30%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[5]} ID</div>
                    <Field
                      name="invoiceId"
                      // label="Invoice Id"
                      disabled
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.invoiceId}
                    />
                  </div>
                  <div class="w-[30%]">
                  <div class="text-xs font-poppins font-bold">{translatedMenuItems[6]}</div>
                    <Field
                      isRequired
                      name="paymentMode"
                      // label={
                      //   <FormattedMessage
                      //     id="app.mode"
                      //     defaultMessage="Mode"
                      //   />}
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={SelectComponent}
                      options={Array.isArray(payOption) ? payOption : []}

                    />
                  </div>
                  
                </div>
                <div class="flex justify-between ">
                  <div class="w-[47.5%] mt-4  flex justify-end">
                    <div class="text-xs font-poppins font-bold">{translatedMenuItems[7]}</div>
                  <Field
                    name="docId"
                    // label={
                    //   <FormattedMessage
                    //     id="app.documentId"
                    //     defaultMessage="Document Id"
                    //   />
                    // }
                    isRequired
                    component={DragableUpload}
                  />
                </div>
                </div>
              </div>
            </div>


            <div class="flex justify-end mt-3">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingPaidByDistributorId}
              >
              {translatedMenuItems[8]}  {/* <FormattedMessage
                  id="app.submit"
                  defaultMessage="Submit"
                /> */}

              </Button>
            </div>
          </Form>
        )}
        {/*  */}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, distributor }) => ({
  userId: auth.userDetails.userId,
  paymentModee: distributor.paymentModee,
  distributorId: distributor.distributorDetailsByDistributorId.distributorId,
  addingPaidByDistributorId: distributor.addingPaidByDistributorId,
  currencies: auth.currencies,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPaidOrder,
      getCurrency,
      getPaymentMode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorPaidForm);