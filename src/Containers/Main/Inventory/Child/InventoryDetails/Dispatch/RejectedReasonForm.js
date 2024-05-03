import React, { } from "react";
import { Formik, Form, Field } from "formik";
import { Button, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rejectPhoneData } from "../../../InventoryAction";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

function RejectedReasonForm(props) {
    console.log(props.phoneId)
    return (
        <>
            <Formik
                initialValues={{
                    phoneId: props.rowData.phoneId,
                    dispatchReceivedInd: true,
                    dispatchReceivedDate: "",
                    rejectInd: true
                }}
                onSubmit={(values) => {

                    props.rejectPhoneData({
                        ...values,
                        userId: props.userId,
                    }, props.rowData.phoneId
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
                        <div class=" w-[50%]" >
                            <Field
                                name="reason"
                                label="Reason"
                                component={TextareaComponent}
                                isColumn
                                isRequired
                                width={"100%"}
                                inlineLabel
                            />
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={props.rejectPhoneList}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ inventory, auth }) => ({
    rejectPhoneList: inventory.rejectPhoneList
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        rejectPhoneData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RejectedReasonForm);
