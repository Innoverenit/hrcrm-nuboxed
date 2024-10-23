import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";

import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { linkPauseOrder } from "../../../../ShipperAction";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  pauseNoOfDays: Yup.string().required("Input required!"),
  pauseDate: Yup.string().required("Input required!"),
});

function ShipperPauseForm(props) {
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          pauseNoOfDays: "",
          pauseDate: "",
          orderId: props.particularRowData.orderId,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          props.linkPauseOrder({
            ...values,
          });
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
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>
            <div style={{ width: "50%" }}>
              <Field
                name="pauseDate"
                label="When ?"
                isRequired
                component={DatePicker}
                isColumn
                inlineLabel
                value={values.pauseDate}
                style={{
                  flexBasis: "40%",
                  marginTop: "0px",
                  width: "120px",
                  borderRight: "0.18em solid red",
                }}
              />

              <div class=" mt-3" />
              <Field
                name="pauseNoOfDays"
                label="#Days"
                isRequired
                component={InputComponent}
                isColumn
                inlineLabel
                style={{
                  flexBasis: "40%",
                  marginTop: "0px",
                  width: "120px",
                }}
              />
            </div>

            <FlexContainer justifyContent="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={message}
                style={{
                  marginTop: "20px",
                  marginLeft: "286px",
                }}
                loading={props.linkingPauseByShipperId}
              >
                Confirm
              </Button>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ teams, shipper }) => ({
  //   onlySalesUsers: teams.onlySalesUsers,
  //   linkingSalesUserToTeam: teams.linkingSalesUserToTeam,
  //   teamId: teams.teamByTeamId.teamId,
  linkingPauseByShipperId: shipper.linkingPauseByShipperId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkPauseOrder,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperPauseForm);
