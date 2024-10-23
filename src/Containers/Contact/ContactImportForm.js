import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import {uploadContctList} from "./ContactAction";
import DraggableUpload1 from "../../Components/Forms/Formik/DraggableUpload1";




function ContactImportForm(props) {

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
                    props.uploadContctList(

                        {
                            ...values,
                        },
                       "customer"
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
                                <div class="h-full w-[45%] mt-4">
                                    <Field
                                        name="excelId"
                                        isRequired
                                        component={DraggableUpload1}
                                    />
                                </div>

                            </div>
                            <div class="flex justify-end mt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.uploadingContactList}
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
const mapStateToProps = ({ auth,contact }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    uploadingContactList:contact.uploadingContactList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            uploadContctList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactImportForm);

