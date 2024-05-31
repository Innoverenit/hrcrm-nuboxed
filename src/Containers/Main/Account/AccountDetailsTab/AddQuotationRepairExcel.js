import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Select } from "antd";
import { Formik, Form, Field } from "formik";
import { addQuotationCarDetails } from "../AccountAction";
import DraggableUpload1 from "../../../../Components/Forms/Formik/DraggableUpload1";
import { FormattedMessage } from 'react-intl';
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import AddQuotationExcel from "./AddQuotationExcel";

const { Option } = Select;

function AddQuotationRepairExcel(props) {

    const [bulkQr, setBulkQr] = useState(false);
    const [nonRepaied, setNonRepaired] = useState(false);
    const [formType, setFormType] = useState('Repair'); 

    function handleBulkQr(checked) {
        setBulkQr(checked);
    }

    function handleRepaired(checked) {
        setNonRepaired(checked);
    }

    function handleFormTypeChange(value) {
        setFormType(value);
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
                    sendBackNonRepairInd: nonRepaied,
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    props.addQuotationCarDetails({
                        ...values,
                        distributorId: props.distributorId,
                        type: "Non-Catalogue",
                        // orderType: formType === 'Repair',
                        orderType: 'Repair',
                    }, props.distributorId);
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
                    <div className="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
                        <Form className="form-background">
                            <div className="justify-between flex mt-3">
                                <div className="h-full w-[45%]">
                                    <Select defaultValue="Repair" onChange={handleFormTypeChange} className="w-full mb-3">
                                        <Option value="Repair">Repair</Option>
                                        <Option value="Procure">Procure</Option>
                                    </Select>
                                    {formType === 'Repair' ? (
                                        <>
                                            <div className="mt-3">
                                                <Field
                                                    name="excelId"
                                                    isRequired
                                                    component={DraggableUpload1}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <Field
                                                    label="AWB No"
                                                    name="awbNo"
                                                    component={InputComponent}
                                                    inlineLabel
                                                    width={"100%"}
                                                    isColumn
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="w-[45%]">
                                                    <Field
                                                        label="Units"
                                                        name="totalPhoneCount"
                                                        component={InputComponent}
                                                        inlineLabel
                                                        width={"100%"}
                                                        isColumn
                                                    />
                                                </div>
                                                <div className="w-[45%]">
                                                    <label>Required bulk QR code</label>
                                                    <Switch
                                                        onChange={handleBulkQr}
                                                        checked={bulkQr}
                                                        checkedChildren="Yes"
                                                        unCheckedChildren="No" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="w-[70%] mt-2">
                                                    <label>Send back non repaired units </label>
                                                    <Switch
                                                        onChange={handleRepaired}
                                                        checked={nonRepaied}
                                                        checkedChildren="Yes"
                                                        unCheckedChildren="No" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                       
                                        <AddQuotationExcel formType={formType}/>
                                    )}
                                </div>
                            </div>
                            <div className="justify-end flex mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingQuotationCar}
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
    addingQuotationCar: distributor.addingQuotationCar,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addQuotationCarDetails
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddQuotationRepairExcel);
