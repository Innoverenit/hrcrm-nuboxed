import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import { Spacer, StyledTextarea } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { addPaidOrder, getPaymentMode } from "../../../Account/AccountAction";
import * as Yup from "yup";
import moment from "moment";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { FormattedMessage } from "react-intl";
import { getCurrency } from "../../../../Auth/AuthAction";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";

function DistributorPaidForm(props) {
  const { userId } = props;

  const currencyOption = props.currencies.map((item) => {
    return {
      label: item.currencyName || "",
      value: item.currencyId,
    };
  });
  const payOption = props.paymentModee.map((item) => {
    return {
      label: item.currencyName || "",
      value: item.currencyId,
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
          date: moment(),
          paymentAmount: "",
          paymentMode: "",
          remarks: "",
          docId: "",
          userId: props.userId,
          orderPaymentType: "PhonePayment",
          transactionNumber: "",
          orderCurrencyId: "",
          paymentMode: "",
          approveByFinanceInd: false,
          orderId: props.particularRowData.orderId,
        }}

        onSubmit={(values, { resetForm }) => {
          let newEndDate = moment(values.date).format("YYYY-MM-DD");
          props.addPaidOrder(
            {
              ...values,
              date: `${newEndDate}T00:00:00Z`,
            },
            props.particularRowData.orderId,
            props.distributorId,
          );
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "31%" }}>
                    <Field
                      name="paymentAmount"
                      label="Amount"
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.paymentAmount}
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <FastField
                      name="orderCurrencyId"
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="currency"
                        />
                      }

                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(currencyOption) ? currencyOption : []}
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <Field
                      name="date"
                      label="Date "
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={DatePicker}
                      value={values.date}
                    // style={{
                    //   flexBasis: "83%",
                    //   marginTop: "0px",
                    //   width: "100px",
                    // }}
                    />
                  </div>

                </FlexContainer>

                <Spacer style={{ marginTop: "1em" }} />
                <FlexContainer justifyContent="space-between">
                  <div style={{ width: "47%" }}>
                    <Field
                      name="transactionNumber"
                      label="Transaction ID"
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      value={values.transactionNumber}
                    // style={{
                    //    flexBasis: "40%",
                    //   marginTop: "0px",
                    //   width: "114px",
                    // }}
                    />
                  </div>

                  <div style={{ width: "47%" }}>
                    <Field
                      name="paymentMode"
                      label="Mode"
                      isRequired
                      isColumn
                      inlineLabel
                      width={"100%"}
                      component={SelectComponent}
                      options={Array.isArray(payOption) ? payOption : []}
                      style={{
                        //   flexBasis: "83%",
                        //   marginTop: "0px",
                        //   width: "120px",
                        borderRight: "0.18em solid red",
                      }}
                    />
                  </div>
                </FlexContainer>
                <Spacer style={{ marginTop: "1em" }} />
                <FlexContainer justifyContent="space-between">

                  <div style={{ width: "47%" }}>
                    <Field
                      name="remarks"
                      label="Reason"
                      component={TextareaComponent}

                    />
                  </div>
                  <div style={{ width: "47%" }}>
                    <Field
                      name="docId"
                      label={
                        <FormattedMessage
                          id="app.documentId"
                          defaultMessage="Document Id"
                        />
                      }
                      isRequired
                      component={DragableUpload}
                    />
                  </div>
                </FlexContainer>

              </div>
            </div>
            <Spacer style={{ marginTop: "1.25em" }} />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingPaidByDistributorId}
              >
                Submit
              </Button>
            </FlexContainer>
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
