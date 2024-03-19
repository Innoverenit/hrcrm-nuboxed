
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { FlexContainer } from "./../../../../../../Components/UI/Layout";
import moment from "moment";
import * as Yup from "yup";
import { InputComponent } from "./../../../../../../Components/Forms/Formik/InputComponent";

const FormSchema = Yup.object().shape({
    startDate: Yup.string().required("Input required!"),
});

function StockUsedForm(props) {
    return (
        <div>
            <Formik initialValues={{ itu: "",itw:"" }}
                validationSchema={FormSchema}
                onSubmit={(values, { resetForm }) => {
                    

                    // props.addit
                    //     ({
                    //         ...values,
                            
                    //     });
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
                                                name="itu"
                                                label="Items Used"
                                                isRequired
                                                component={InputComponent}
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
                                        <div style={{ width: "100%", marginTop: "8px" }}>
                                            <Field
                                                name="itw"
                                                label="Items Wasted"
                                                isRequired
                                                component={InputComponent}
                                                isColumn
                                               
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
export default StockUsedForm;

