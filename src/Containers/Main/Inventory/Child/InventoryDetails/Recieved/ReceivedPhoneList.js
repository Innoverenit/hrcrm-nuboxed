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

    console.log(props.particularRowData,props.particularRowData.model)
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    receivePhoneInd: true,
                    orderPhoneId: props.orderPhoneId,
                    receiveCompany: props.particularRowData.company ?
                    props.particularRowData.company : "" ,

                    receiveModel: props.particularRowData.model ? props.particularRowData.model : "",

                    receiveIMEI: props.particularRowData.imei ? props.particularRowData.imei : "",

                    receiveGB: props.particularRowData.gb ? props.particularRowData.gb : "",

                    receiveColor: props.particularRowData.color ? props.particularRowData.color : "",

                    receiveCondition: props.particularRowData.conditions  ? props.particularRowData.conditions : "",

                    receiveOS: props.particularRowData.os ?  props.particularRowData.os : "",
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
                                    label="Brand"
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
                                    disabled
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
                                    options={["Android", "Apple","Windows"]}
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

