import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../Components/UI/Layout";

import {
  linkRenewalOrder,
  getShipperOrderByShipperId,
} from "../../../../ShipperAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  noOfDays: Yup.string().required("Input required!"),
});

function ShipperRenewalForm(props) {
  function handleCallback(data) {
    if (data === "success") {
      props.getShipperOrderByShipperId(props.shipperShipperId);
    }
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          noOfDays: props.particularRowData.noOfDays || "",
          orderId: props.particularRowData.orderId,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.linkRenewalOrder(values);
          handleCallback();
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
            <FlexContainer justifyContent="space-between">
              <div style={{ width: "80%" }}>
                <Field
                  name="noOfDays"
                  label="Extend (days)"
                  isRequired
                  component={SelectComponent}
                  options={[
                    "7",
                    "15",
                    "30",
                    "45",
                    "60",
                    "90",
                    "120",
                    "180",
                    "365",
                  ]}
                  isColumn
                  inlineLabel
                  style={{
                    flexBasis: "80%",
                    marginTop: "0px",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                />
                <div class=" mt-3" />
              </div>

              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: "20px",
                    // marginLeft: "286px",
                  }}
                  loading={props.linkingRenewalByShipperId}
                >
                  Confirm
                </Button>
              </FlexContainer>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ shipper }) => ({
  shipperShipperId: distributor.distributorDetailsByShipperId.shipperId,
  linkingRenewalByShipperId: shipper.linkingRenewalByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkRenewalOrder,
      getShipperOrderByShipperId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperRenewalForm);
