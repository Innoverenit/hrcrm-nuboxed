import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { startRepairInStatus } from "../../AccountAction"
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";

function RepairReasonForm(props) {

    return (
        <>
            <Formik
                initialValues={{
                    locationId: "",
                    userId: props.userId,
                    orderPhoneId: props.particularRowData.orderId
                }}
                onSubmit={(values, { resetForm }) => {
                    //debugger;
                    props.startRepairInStatus({
                        qcRepairInd: 1,
                        repairReason: "",
                        repairReasonInd: true,
                        orderPhoneId: props.particularRowData.orderId || "",
                        qcRepairUserId: props.userId
                    }, props.distributorId)
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

                            <div style={{ width: "90%" }}>
                                <Field
                                    name="repairReason"
                                    label="Reason"
                                    component={TextareaComponent}

                                />
                            </div>
                            <div style={{ marginTop: "15px", marginLeft: "14px" }}>
                                <Button
                                    loading={props.startRepairingInStatus}
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
const mapStateToProps = ({ distributor, plant, auth }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    startRepairingInStatus: distributor.startRepairingInStatus,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        startRepairInStatus
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairReasonForm);
