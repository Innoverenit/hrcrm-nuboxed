import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { deleteShipperOrderData } from "../../../../ShipperAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  description: Yup.string().required("Input required!"),
});
function ShipperDeleteOrderForm(props) {
  const { userId } = props;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          description: "",
          shipperId: props.particularRowData.shipperShipperId,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.deleteShipperOrderData(
            {
              ...values,
              ...props.particularRowData,
            },
            props.particularRowData.orderId
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
            <div style={{ width: "100%" }}>
              <Field
                name="description"
                label="Reason"
                isColumn
                isRequired
                width={"100%"}
                component={TextareaComponent}
                inlineLabel
                // style={{
                //   flexBasis: "80%",
                //   height: "80px",
                //   marginTop: "0px",
                // }}
              />
            </div>
            <div class=" mt-3" style={{ marginBottom: "1.25em" }} />
            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={message}
                // style={{
                //   marginTop: "20px",
                //   marginLeft: "286px",
                // }}
                loading={props.deletingShipperOrderData}
              >
                Submit
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ shipper, auth }) => ({
  shipperShipperId: shipper.shipperDetailsByShipperId.shipperId,
  deletingShipperOrderData: shipper.deletingShipperOrderData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteShipperOrderData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDeleteOrderForm);
