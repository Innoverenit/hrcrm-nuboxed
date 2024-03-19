import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateValidationInReceive } from "../../../InventoryAction"
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import moment from 'moment';

function ReceivedPhoneList(props) {
    console.log(props.particularRowData)

    return (
        <>
            <Formik
                initialValues={{
                    receivePhoneInd: true,
                    orderPhoneId: props.orderPhoneId,
                    receiveCompany: props.particularRowData.receiveCompany === null ?
                        props.particularRowData.company : props.particularRowData.receiveCompany,

                    receiveModel: props.particularRowData.receiveModel === null ?
                        props.particularRowData.model : props.particularRowData.receiveModel,

                    receiveIMEI: props.particularRowData.receiveIMEI === null ?
                        props.particularRowData.imei : props.particularRowData.receiveIMEI,

                    receiveGB: props.particularRowData.receiveGB === null ?
                        props.particularRowData.gb : props.particularRowData.receiveGB,

                    receiveColor: props.particularRowData.receiveColor === null ?
                        props.particularRowData.color : props.particularRowData.receiveColor,

                    receiveCondition: props.particularRowData.receiveCondition === null ?
                        props.particularRowData.conditions : props.particularRowData.receiveCondition,

                    receiveOS: props.particularRowData.receiveOS === null ?
                        props.particularRowData.os : props.particularRowData.receiveOS,
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
    phoneListData: inventory.phoneListData,
    userId: auth.userDetails.userId,
    updatingValidationInRecive: inventory.updatingValidationInRecive
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        updateValidationInReceive
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedPhoneList);

