import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { addCarDetails } from "../../AccountAction"
import DraggableUpload1 from "../../../../../Components/Forms/Formik/DraggableUpload1";
import { FormattedMessage } from 'react-intl';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";

function AddPhoneExcel(props) {

    const [bulkQr, setBulkQr] = useState(false)
    const [nonRepaied, setNonRepaired] = useState(false)

    function handleBulkQr(checked) {
        setBulkQr(checked)
    }
    function handleRepaired(checked) {
        setNonRepaired(checked)
    }

    return (
        <>
            <Formik
                initialValues={{
                    orderPhoneId: props.orderDetailsId.orderId,
                    excelId: "",
                    userId: props.userId,
                    orgId: props.orgId,
                    totalPhoneCount: "",
                    bulkQrInd: bulkQr,
                    sendBackNonRepairInd:nonRepaied,

                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.addCarDetails(

                        {
                            ...values,
                            distributorId: props.distributorId,
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
                                    <div class=" flex justify-between">
                                        <div class="w-[45%]">
                                            <Field
                                                label="Units"
                                                name="totalPhoneCount"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        <div class="w-[45%]">
                                            <label>Required bulk QR code</label>
                                            <Switch
                                                onChange={handleBulkQr}
                                                checked={bulkQr}
                                                checkedChildren="Yes"
                                                unCheckedChildren="No" />
                                        </div>
                                      
                                    </div>
                                    <div class=" flex justify-between">
                                    <div class="w-[70%] mt-2">
                                            <label>Send back non repaired units </label>
                                            <Switch
                                                onChange={handleRepaired}
                                                checked={nonRepaied}
                                                checkedChildren="Yes"
                                                unCheckedChildren="No" />
                                        </div>
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
    addingCar: distributor.addingCar,
    orgId: auth.userDetails.organizationId,
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

