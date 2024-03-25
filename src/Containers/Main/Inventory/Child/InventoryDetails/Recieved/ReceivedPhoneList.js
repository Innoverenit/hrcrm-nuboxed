import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateValidationInReceive } from "../../../InventoryAction"
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import moment from 'moment';
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';

function ReceivedPhoneList(props) {

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    receivePhoneInd: true,
                    orderPhoneId: props.orderPhoneId,
                    receiveCompany: props.setEdittingPhone.receiveCompany === null ?
                        props.setEdittingPhone.company : props.setEdittingPhone.receiveCompany,

                    receiveModel: props.setEdittingPhone.receiveModel === null ?
                        props.setEdittingPhone.model : props.setEdittingPhone.receiveModel,

                    receiveIMEI: props.setEdittingPhone.receiveIMEI === null ?
                        props.setEdittingPhone.imei : props.setEdittingPhone.receiveIMEI,

                    receiveGB: props.setEdittingPhone.receiveGB === null ?
                        props.setEdittingPhone.gb : props.setEdittingPhone.receiveGB,

                    receiveColor: props.setEdittingPhone.receiveColor === null ?
                        props.setEdittingPhone.color : props.setEdittingPhone.receiveColor,

                    receiveCondition: props.setEdittingPhone.receiveCondition === null ?
                        props.setEdittingPhone.conditions : props.setEdittingPhone.receiveCondition,

                    receiveOS: props.setEdittingPhone.receiveOS === null ?
                        props.setEdittingPhone.os : props.setEdittingPhone.receiveOS,
                    mismatchInd: true,
                    receivePhoneUser: props.userId,
                    receivePhoneDate: moment(),
                    mismatchOrderInd: true
                }}

                onSubmit={(values, { resetForm }) => {
                    props.updateValidationInReceive(
                        {
                            ...values,

                        },
                        props.particularRowData.phoneId,
                        props.distributorId,
                    );
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
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ width: "47%" }}>
                                <Field
                                    name="receiveCompany"
                                    label="OEM"
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveModel"
                                    label="Model"
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveIMEI"
                                    label="IMEI"
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveGB"
                                    label="GB"

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
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveCondition"
                                    label="Condition"
                                    isColumn
                                    width={"100%"}
                                    component={InputComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Field
                                    name="receiveOS"
                                    label="OS"
                                    isColumn

                                    width={"100%"}
                                    options={["Andriod", "Apple"]}
                                    component={SelectComponent}
                                    inlineLabel
                                    isRequired
                                />
                                <Button
                                    // loading={props.updatingValidationInRecive}
                                    type="primary"
                                    htmlType="submit"
                                >
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

