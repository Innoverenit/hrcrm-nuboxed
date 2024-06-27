import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import {uploadContactInvestList} from "../ContactInvestAction";
import DraggableUpload1 from "../../../Components/Forms/Formik/DraggableUpload1";




function UploadContactInvestorForm(props) {

    return (
        <>
            <Formik
                initialValues={{
                    excelId: "",
                    userId: props.userId,
                    orgId:props.orgId,
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.uploadContactInvestList(

                        {
                            ...values,
                        },
                        "investor",props.userId,"0","creationdate"
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
                        <div class="flex justify-between">
                                <div class="h-full w-full mt-4">
                                    <Field
                                        name="excelId"
                                        isRequired
                                        component={DraggableUpload1}
                                    />
                                </div>

                            </div>
                            <div class="flex justify-between mt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.uploadingContactInvestList}
                                >
                                    Upload
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
const mapStateToProps = ({ auth, distributor,pitch,contactinvest }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
    orgId: auth.userDetails.organizationId,
    uploadingContactInvestList:contactinvest.uploadingContactInvestList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            uploadContactInvestList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadContactInvestorForm);

