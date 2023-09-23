import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import {
    Spacer,
} from "../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";

import { updateContractDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

function onChange(date) { }

const documentSchema = Yup.object().shape({
    documentId: Yup.string().required("Input needed !"),
});
class UpdateContractForm extends Component {


    render() {
        const { updatingContractDetails } = this.props;
        return (
            <>
                <Formik
                    // enableReinitialize
                    initialValues={{
                        employeeId: this.props.employeeId,
                        id: this.props.setEditingContract.id,
                        previous_start_date: dayjs(this.props.setEditingContract.previous_start_date) || "",
                        previous_end_date: dayjs(this.props.setEditingContract.previous_end_date) || "",
                        contract_Type: this.props.setEditingContract.contract_Type || "",
                        notes: this.props.setEditingContract.notes || "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                        this.props.updateContractDetails(
                            {
                                ...values,
                                previous_start_date: dayjs(values.previous_start_date).toISOString(),
                                previous_end_date: dayjs(values.previous_end_date).toISOString(),
                                // present_start_date: dayjs(values.present_start_date).toISOString(),
                                // present_end_date: dayjs(values.present_end_date).toISOString(),
                            },
                            this.props.employeeId,
                            values.documentId,
                            resetForm()
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
                        <Form className="form-background">
                            <div
                                style={{
                                    display: "flex",
                                    // border: "0.125em solid red",
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        // border: "0.125em solid green"
                                    }}
                                >
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="previous_start_date"
                                                //label="Start Date"
                                                label={
                                                    <FormattedMessage
                                                        id="app.startDate"
                                                        defaultMessage="Start Date"
                                                    />
                                                }
                                                isRequired
                                                component={DatePicker}
                                                isColumn
                                                width={"100%"}
                                                value={values.previous_start_date}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    width: "100%",
                                                    marginTop: "0.25em",
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="previous_end_date"
                                                // label="End Date "
                                                label={
                                                    <FormattedMessage
                                                        id="app.endDate"
                                                        defaultMessage="End Date"
                                                    />
                                                }
                                                isRequired
                                                isColumn
                                                width={"100%"}
                                                component={DatePicker}
                                                value={values.previous_end_date}
                                                disabledDate={(currentDate) => {
                                                    if (values.previous_start_date) {
                                                        if (
                                                            dayjs(currentDate).isBefore(
                                                                dayjs(values.previous_start_date)
                                                            )
                                                        ) {
                                                            return true;
                                                        } else {
                                                            return false;
                                                        }
                                                    }
                                                }}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    width: "100%",
                                                    marginTop: "0.25em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "100%" }}>
                                            <Field
                                                isRequired
                                                name="contract_Type"
                                                type="text"
                                                isColumn
                                                width={"100%"}
                                                //label="Course Name"
                                                label={
                                                    <FormattedMessage
                                                        id="app.contractType"
                                                        defaultMessage="Contract Type"
                                                    />
                                                }
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0.25em",
                                                }}
                                            />
                                        </div>

                                    </FlexContainer>
                                    <Spacer />
                                    <Field
                                        name="notes"
                                        // label="Notes"
                                        label={
                                            <FormattedMessage id="app.notes" defaultMessage="Notes" />
                                        }
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                        style={{
                                            flexBasis: "80%",
                                            height: "5em",
                                            // marginLeft: "2.5em",
                                            marginTop: "0.25em",
                                        }}
                                    />
                                </div>
                            </div>
                            <Spacer />
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    Loading={updatingContractDetails}
                                >
                                    <FormattedMessage id="app.update" defaultMessage="Update" />
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ employee, profile }) => ({
    employeeId: employee.singleEmployee.employeeId,
    setEditingContract: profile.setEditingContract,
    updatingContractDetails: profile.updatingContractDetails,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateContractDetails
        },
        dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContractForm);
