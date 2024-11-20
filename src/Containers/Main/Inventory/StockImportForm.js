import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import {uploadStockList} from "../Inventory/InventoryAction";
import ImportTaskUpload from "../../../Components/Forms/Formik/ImportTaskUpload";



function UploadInvestorForm(props) {

    return (
        <>
            <Formik
                initialValues={{
                    excelId: "",
                    userId: props.userId,
                    orgId:props.orgId,
                    locationDetailsId:props.locationDetailsId
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    props.uploadStockList(

                        {
                            ...values,
                        },
                       
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
                                        component={ImportTaskUpload}
                                    />
                                </div>

                            </div>
                            <div class="flex mt-4 justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.addingStockImportForm}
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
const mapStateToProps = ({ auth, distributor,pitch,inventory }) => ({
    userId: auth.userDetails.userId,
    orderDetailsId: distributor.orderDetailsId,
    orgId: auth.userDetails.organizationId,
    addingStockImportForm:inventory.addingStockImportForm
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            uploadStockList
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadInvestorForm);

