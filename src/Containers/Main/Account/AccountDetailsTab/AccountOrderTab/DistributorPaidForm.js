import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { Button } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { addPaidOrder,addPaidRepairOrder, getPaymentMode } from "../../../Account/AccountAction";
import dayjs from "dayjs";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";

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

  // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   const fetchMenuTranslations = async () => {
  //     try {
  //       setLoading(true); 
  //       const itemsToTranslate = [
  //       "929",  // Amount 0
  //       "241",   // "currency" 1
  //       "74",  // Date 2
  //       "1422",  // Reason 3
  //       "926",   // Transaction ID 4
  //       "1169",   // Invoice Id 5
  //       "86",   // "Mode" 6
  //       "138",   // "Document Id" 7 
  //       "154",   // "Submit" 8
      
  //       ];

  //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
  //       setTranslatedMenuItems(translations);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error translating menu items:', error);
  //     }
  //   };

  //   fetchMenuTranslations();
  // }, [props.selectedLanguage]);


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
          orderPaymentType: props.activeTab === "11" ? "Procure":"Repair",
          remainingTotalValue:props.particularRowData.remainingTotalValue || 0,
      
        }}
        validationSchema={DistributorSchema}
      
        onSubmit={(values, { resetForm }) => {
          console.log('entryAmount:', values.entryAmount, typeof values.entryAmount);
console.log('remainingTotalValue:', props.particularRowData.remainingTotalValue, typeof props.particularRowData.remainingTotalValue);

if (props.activeTab === "11") {
if  (Number(values.entryAmount) <= Number(props.particularRowData.remainingTotalValue) 
  && Number(values.entryAmount) >= 0 ) {
          props.addPaidOrder(
            {
              ...values,
              // date: `${newEndDate}T00:00:00Z`,
            },
            props.particularRowData.procureOrderInvoiceId, 
            props.distributorId,
          ); 
        }
          else {
            Swal.fire({
              title: 'Validation Error!',
              text: 'Amount can not exceed remaining total value or be less than 0!',
              icon: 'error',
              confirmButtonText: 'OK',
              showConfirmButton: false,
              timer: 1500,
            });
          }}
          else if (props.activeTab === "3") {
            props.addPaidRepairOrder(
              {
                ...values,
              },
              props.particularRowData.orderPhoneId ? props.particularRowData.orderPhoneId:props.particularRowData.procureOrderInvoiceId,
              props.distributorId,
            ); 
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
            <div class="max-sm:flex-col">
              <div class=" h-full w-wk max-sm:w-wk">
                <div class="flex justify-between">
                  <div class="w-[40%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[66]}</div>
                    <Field
                      name="entryAmount"
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.entryAmount}
                    />
                  </div>
                
                  <div class="w-[40%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[116]}</div>
                    <Field
                      name="orderCurrencyId"
                      isRequired
                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(currencyOption) ? currencyOption : []}
                    />
                  </div>
                </div>
                <div class="flex justify-between">
                <div class="w-[40%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[65]}</div>
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
                  <div class="w-[40%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[64]} ID</div>
                    <Field
                      name="transactionNumber"
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.transactionNumber}

                    />
                  </div>
                  </div>
                  <div class="flex justify-between">
                  
                  <div class="w-[42%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[10]} ID</div>
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
                  <div class="w-[42%]">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[67]}</div>
                    <Field
                      isRequired
                      name="paymentMode"
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={SelectComponent}
                      options={Array.isArray(payOption) ? payOption : []}

                    />
                  </div>
                  
                </div>
                <div class="flex justify-between ">
                <div class="w-[47.5%]">
                <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[117]}</div>
                  <Field
                    name="remarks"
                    component={TextareaComponent}
                     style={{height:"3rem",width:"16em"}}
                  />
               
                
                </div>
               
                </div>
                <div class=" ">
                  <div class="mt-1 justify-end">
                  <div class="text-xs font-poppins font-bold">{props.translatedMenuItems[6]}</div>
                  <Field
                    name="docId"
                    isRequired
                    component={DragableUpload}
                    // style={{height:"3rem",width:"27rem"}}
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
              {props.translatedMenuItems[84]} 
              </Button>
            </div>
          </Form>
        )}
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
      addPaidRepairOrder,
      getCurrency,
      getPaymentMode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorPaidForm);