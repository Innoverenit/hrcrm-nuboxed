import React, { lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import {uploadPitchList} from "../PitchAction";
import { BundleLoader } from "../../../Components/Placeholder";
const DraggableUpload1=lazy(()=> import("../../../Components/Forms/Formik/DraggableUpload1"));


function UploadPitchForm(props) {

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
                    props.uploadPitchList(

                        {
                            ...values,
                        },
                        props.userId,"0","creationdate","hot","cold","warm"
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
                                <Suspense fallback={<BundleLoader />}>
                                    <Field
                                        name="excelId"
                                        isRequired
                                        component={DraggableUpload1}
                                    /></Suspense>
                                </div>

                            </div>
                            <div class="flex justify-between mt-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.uploadingPitchList}
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
const mapStateToProps = ({ auth, distributor,pitch }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
    orgId: auth.userDetails.organizationId,
    uploadingPitchList:pitch.uploadingPitchList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            uploadPitchList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadPitchForm);

