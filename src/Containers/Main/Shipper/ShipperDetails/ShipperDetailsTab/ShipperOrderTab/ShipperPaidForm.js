import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { addPaidOrder } from "../../../../DistributorAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  paymentAmount: Yup.string().required("Input required!"),
  paymentMode: Yup.string().required("Input required!"),
});

function ShipperPaidForm(props) {

  const { userId } = props;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          paymentAmount: "",
          paymentMode: "",
          userId: "",
          approveByFinanceInd: false,
          orderId: props.particularRowData.orderId,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(Number(props.particularRowData.payableAmount));
          console.log(Number(values.paymentAmount));
          console.log(
            props.particularRowData.payableAmount < values.paymentAmount
          );

          if (
            Number(props.particularRowData.payableAmount) <
            Number(values.paymentAmount)
          ) {
            message.error("Amount more than balance payment");
          } else {
            props.addPaidOrder(
              {
                ...values,
                userId,
              },
              props.orderId
            );
          }
          // handleCallback();
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
            <div>
              <Field
                name="paymentAmount"
                label="Amount"
                isRequired
                component={InputComponent}
                value={values.paymentAmount}
                style={{
                  flexBasis: "40%",
                  marginTop: "0px",
                  width: "120px",
                }}
              />
            </div>

            <Spacer />
            <div>
              <Field
                name="paymentMode"
                label="Mode"
                isRequired
                component={SelectComponent}
                options={["Cash", " Credit-Card", "Net Banking", "UPI"]}
                style={{
                  flexBasis: "40%",
                  marginTop: "8px",
                  width: "120px",
                }}
              />
            </div>

            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={message}
                style={{
                  marginTop: "20px",
                  marginLeft: "286px",
                }}
                loading={props.addingPaidByShipperId}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, shipper }) => ({
  userId: auth.userDetails.userId,
  addingPaidByShipperId: shipper.addingPaidByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPaidOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPaidForm);
