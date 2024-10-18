import React from "react";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { Button } from "antd";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import dayjs from "dayjs";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
    startDate: Yup.string().required("Input required!"),
});

function OneTimeSubscriptionForm(props) {
    return (
        <div>
            <Formik initialValues={{ startDate: "" }}
                validationSchema={FormSchema}
                onSubmit={(values, { resetForm }) => {
                    let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");

                    props.handleGenerateOrderInShipper
                        ({
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
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "100%", marginTop: "8px" }}>
                                            <Field
                                                name="startDate"
                                                label="Fulfillment By"
                                                isRequired
                                                component={DatePicker}
                                                isColumn
                                                value={values.startDate}
                                                // inlineLabel
                                                style={{
                                                    flexBasis: "100%",
                                                    width: "100%",
                                                    marginTop: "0px",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <FlexContainer justifyContent="flex-end">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ marginRight: "-194px" }}
                                        // loading={this.props.generatingOrderByShipperId}
                                        >
                                            Submit
                                    </Button>
                                    </FlexContainer>
                                </div>
                            </div>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}
export default OneTimeSubscriptionForm;

