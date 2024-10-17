import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { Button, Radio } from "antd";
import {
  FlexContainer,
  BorderBox,
} from "../../../../../../Components/UI/Layout";
import dayjs from "dayjs";
import * as Yup from "yup";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";

const FormSchema = Yup.object().shape({
  frequency: Yup.string().required("Input required!"),
  startDate: Yup.string().required("Input required!"),
});

class SubscriptionForm extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            frequency: "",
            startDate: "",
            alterDays: "",
          }}
          validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");

            this.props.handleGenerateOrderInShipper({
              ...values,
              startDate: `${newStartDate}T00:00:00Z`,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "24%",
                  }}
                >
                  <div class=" mt-3" style={{ marginTop: "25px" }} />
                  <Field
                    isRequired
                    inlineLabel
                    name="frequency"
                    label="Valid upto (in days)"
                    placeholder={"Frequency"}
                    component={SelectComponent}
                    isColumn
                    options={["7", "15", "30", "45", "60", "90", "180", "365"]}
                 
                    style={{ flexBasis: "60%", borderRight: "2px solid red" }}
                  />

                  <div class=" mt-3" />
                  {/* <FlexContainer justifyContent="space-between"> */}

                  <Field
                    name="startDate"
                    label="Start Date"
                    isRequired
                    component={DatePicker}
                    isColumn
                    value={values.startDate}
                    style={{
                      flexBasis: "80%",
                      width: "100%",
                      marginTop: "0px",
                      borderRight: "0.18em solid red",
                    }}
                  />
                </div>

                <div
                  style={{
                    height: "50%",
                    width: "45%",
                  }}
                >
                  <div class=" mt-3" />
                  <FlexContainer>
                    <BorderBox>
                      <div
                        style={{
                          height: 130,
                          overflow: "auto",
                          padding: "0.5rem",
                        }}
                      >
                        <div class=" text-xs font-bold font-poppins text-black">Frequency of Delivery</div>
                        <div>
                          <Radio.Group
                            onChange={this.props.onChangeCustom}
                            value={this.props.dailyCustomInd}
                          >
                            <Radio value={1}>Daily</Radio>
                            <Radio value={2}>Custom</Radio>
                          </Radio.Group>
                          <div class=" mt-3" />
                          {this.props.dailyCustomInd === 1 ? null : (
                            <>
                              <div style={{ width: "100%" }}>
                                <FlexContainer>
                                  <div
                                    style={{ width: "35%", marginTop: "11%" }}
                                  >
                                    Deliver every
                                  </div>
                                  <div style={{ width: "35%" }}>
                                    <Field
                                      name="alterDays"
                                      isRequired
                                      component={InputComponent}
                                      isColumn
                                      style={{
                                        flexBasis: "80%",
                                        width: "80%",
                                        marginButton: "4px",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      width: "15%",
                                      marginTop: "11%",
                                      marginLeft: "-11px",
                                    }}
                                  >
                                    days
                                  </div>
                                </FlexContainer>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </BorderBox>
                  </FlexContainer>
                </div>
              </div>

              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // style={{ marginRight: "-194px" }}
                  // loading={props.generatingOrderByDistributorId}
                >
                  Submit
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SubscriptionForm;
