import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateValidationInReceive } from "../../../InventoryAction"
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import moment from 'moment';

function ReceivedPhoneList(props) {
    console.log(props.setEdittingPhone)

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    receivePhoneInd: true,
                    orderPhoneId: props.orderPhoneId,
                    receiveCompany: props.setEdittingPhone.receiveCompany,
                    // === null ?
                    // props.setEdittingPhone.company : props.setEdittingPhone.receiveCompany,

                    receiveModel: props.setEdittingPhone.receiveModel,
                    //  === null ?
                    //     props.setEdittingPhone.model : props.setEdittingPhone.receiveModel,

                    receiveIMEI: props.setEdittingPhone.receiveIMEI,
                    // === null ?
                    // props.setEdittingPhone.imei : props.setEdittingPhone.receiveIMEI,

                    receiveGB: props.setEdittingPhone.receiveGB,
                    //  === null ?
                    //     props.setEdittingPhone.gb : props.setEdittingPhone.receiveGB,

                    receiveColor: props.setEdittingPhone.receiveColor,
                    //  === null ?
                    //     props.setEdittingPhone.color : props.setEdittingPhone.receiveColor,

                    receiveCondition: props.setEdittingPhone.receiveCondition,
                    //  === null ?
                    //     props.setEdittingPhone.conditions : props.setEdittingPhone.receiveCondition,

                    receiveOS: props.setEdittingPhone.receiveOS,
                    //  === null ?
                    //     props.setEdittingPhone.os : props.setEdittingPhone.receiveOS,
                    mismatchInd: true,
                    mismatchOrderInd: true
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(props.phoneId)
                    props.updateValidationInReceive({
                        ...values,
                        receivePhoneUser: props.userId,
                        receivePhoneDate: moment()
                    },
                        props.phoneListData.phoneId,
                        props.orderPhoneId
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
                    <Form>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="receiveCompany"
                                    label="OEM"
                                    type="number"
                                    placeholder={"Value"}
                                    isColumn
                                    values={props.setEdittingPhone.receiveCompany}
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveModel"
                                    label="Model"
                                    type="number"
                                    placeholder={"Value"}
                                    values={props.setEdittingPhone.receiveModel}
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveIMEI"
                                    label="IMEI"
                                    type="number"
                                    placeholder={"Value"}
                                    values={props.setEdittingPhone.receiveIMEI}
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveGB"
                                    label="GB"
                                    type="number"
                                    values={props.setEdittingPhone.receiveGB}
                                    placeholder={"Value"}
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                            </div>

                            <div style={{ width: "47%" }}>
                                <Field
                                    name="receiveColor"
                                    label="Color"
                                    type="number"
                                    values={props.setEdittingPhone.receiveColor}
                                    placeholder={"Value"}
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveCondition"
                                    label="Condition"
                                    type="number"
                                    placeholder={"Value"}
                                    isColumn
                                    width={"100%"}
                                    values={props.setEdittingPhone.receiveCondition}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveOS"
                                    label="OS"
                                    type="number"
                                    placeholder={"Value"}
                                    isColumn
                                    values={props.setEdittingPhone.receiveOS}
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Button
                                    loading={props.updatingValidationInRecive}
                                    type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ inventory, auth }) => ({
    setEdittingPhone: inventory.setEdittingPhone,
    userId: auth.userDetails.userId,
    updatingValidationInRecive: inventory.updatingValidationInRecive
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        updateValidationInReceive
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedPhoneList);

