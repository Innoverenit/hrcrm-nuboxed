

import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { sendToWonCard } from "../../DealAction";

function WonForm(props) {
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

  const [text, setText] = useState("");

  const {
    startDate,
    endDate,
    sendingCardWon,
  } = props;

  return (
    <>
      <Formik
        initialValues={{
          paymentReceived: "",
          paymentReceivedDate: endDate || null,
          wonInd: true,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);

          let timeZoneFirst = "GMT+05:30";
          let mytimeZone = timeZoneFirst.substring(4, 10);
          var a = mytimeZone.split(":");
          var timeZoneminutes = +a[0] * 60 + +a[1];
          
          if (!values.paymentReceivedDate) {
            values.paymentReceivedDate = values.startDate;
          }

          let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
          let newEndDate = dayjs(values.paymentReceivedDate).format("YYYY-MM-DD");

          let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
          let firstStartHours = newStartTime.substring(0, 5);
          let timeEndPart = newStartTime.substring(5, 13);
          var firstStartTimeSplit = firstStartHours.split(":");
          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
          var firstStartTimeminutes = minutes - timeZoneminutes;
          let h = Math.floor(firstStartTimeminutes / 60);
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;

          props.sendToWonCard(
            {
              ...values,
              paymentReceived: values.paymentReceived,
              paymentReceivedDate: `${newEndDate}T20:00:00Z`,
              wonInd: true,
              invOpportunityId: props.currentItem.invOpportunityId,
            },
            props.currentItem.invOpportunityId,
            props.userId,
            resetForm()
          );
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
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex  max-sm:flex-col">
                <div class=" h-full w-wk">
                 
                <div class=" w-w47.5.5 max-sm:w-wk">
                <Field
                  isRequired
                  name="paymentReceived"
                  type="number"
                  

                  label="Price"
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                //   validate={value => {
                //     if (!value) {
                //       return 'This field is required';
                //     }
                //     if (isNaN(value)) {
                //       return 'Please enter a valid number';
                //     }
                //     if (!/^\d+$/.test(value)) {
                //       return 'Please enter only digits';
                //     }
                //     return undefined;
                //   }}
                  inlineLabel
                />
               </div>
                  <div class=" w-w47.5.5 max-sm:w-wk">
                    <Field
                      name="paymentReceivedDate"
                      label="Date"
                      component={DatePicker}
                      value={values.paymentReceivedDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute  mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={sendingCardWon}
                >
                  create
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, deal }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  sendingCardWon: deal.sendingCardWon,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendToWonCard,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WonForm);
