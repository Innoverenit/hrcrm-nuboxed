import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateValidationInReceive } from "../../../InventoryAction"
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import moment from 'moment';

function ReceivedPhoneList(props) {
    console.log(props.phnId)

    return (
        <>
            <Formik
                initialValues={{
                    receivePhoneInd: true,
                    orderPhoneId: props.orderPhoneId,
                    receiveCompany: props.phoneListData.receiveCompany === null ?
                        props.phoneListData.company : props.phoneListData.receiveCompany,

                    receiveModel: props.phoneListData.receiveModel === null ?
                        props.phoneListData.model : props.phoneListData.receiveModel,

                    receiveIMEI: props.phoneListData.receiveIMEI === null ?
                        props.phoneListData.imei : props.phoneListData.receiveIMEI,

                    receiveGB: props.phoneListData.receiveGB === null ?
                        props.phoneListData.gb : props.phoneListData.receiveGB,

                    receiveColor: props.phoneListData.receiveColor === null ?
                        props.phoneListData.color : props.phoneListData.receiveColor,

                    receiveCondition: props.phoneListData.receiveCondition === null ?
                        props.phoneListData.conditions : props.phoneListData.receiveCondition,

                    receiveOS: props.phoneListData.receiveOS === null ?
                        props.phoneListData.os : props.phoneListData.receiveOS,
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
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Button type="primary" htmlType="submit">
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
    phoneListData: inventory.phoneListData,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        updateValidationInReceive
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedPhoneList);

