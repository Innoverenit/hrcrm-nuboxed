import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { addCarDetails } from "../../AccountAction"
import DraggableUpload1 from "../../../../../Components/Forms/Formik/DraggableUpload1";
import { FormattedMessage } from 'react-intl';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";

function AddPhoneExcel(props) {

    return (
        <>
            <Formik
                initialValues={{
                    orderPhoneId: props.orderDetailsId.orderId,
                    excelId: "",
                    userId: props.userId,
                    distributorId: props.distributorId,
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.addCarDetails(

                        {
                            ...values,
                            type: "Non-Catalogue"
                        },
                        props.distributorId
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
                    <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
                        <Form class="form-background">
                            <div class="justify-between flex mt-3">
                                <div class="h-full w-[45%]">
                                    <div class="mt-3">
                                        <Field
                                            name="excelId"
                                            isRequired
                                            component={DraggableUpload1}
                                        />
                                    </div>
                                </div>
                                <div class="h-full w-[45%]">
                                    <div class="mt-3">
                                        <Field
                                            label="AWB No"
                                            name="awbNo"
                                            component={InputComponent}
                                            inlineLabel
                                            width={"100%"}
                                            isColumn
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="justify-end flex mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingCar}
                                >
                                    <FormattedMessage
                                        id="app.finish"
                                        defaultMessage="Finish"
                                    />
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ auth, distributor }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
    addingCar: distributor.addingCar
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addCarDetails
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPhoneExcel);

