
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { FlexContainer } from "./../../../../../../Components/UI/Layout";
import { sentItemToStock } from "../../../InventoryAction"
import { InputComponent } from "./../../../../../../Components/Forms/Formik/InputComponent";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function StockUsedForm(props) {
    return (
        <div>
            <Formik
                initialValues={{

                    poSupplierDetailsId: props.row.poSupplierDetailsId || "",
                    poSupplierSuppliesId: props.row.poSupplierSuppliesId || "",
                    unitUsed: "",
                    unitWasted: "",
                    userId: props.userId || ""

                }}
                onSubmit={(values, { resetForm }) => {
                    props.sentItemToStock(
                        {
                            ...values,

                        },
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
                    <Form>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "45%",
                                }}
                            >
                                <FlexContainer justifyContent="space-between">
                                    <div style={{ width: "100%", marginTop: "8px" }}>
                                        <Field
                                            name="unitUsed"
                                            label="To Stock"
                                            isRequired
                                            component={InputComponent}
                                            isColumn
                                            style={{
                                                flexBasis: "100%",
                                                width: "100%",
                                                marginTop: "0px",
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: "100%", marginTop: "8px" }}>
                                        <Field
                                            name="unitWasted"
                                            label="Wasted"
                                            isRequired
                                            component={InputComponent}
                                            isColumn
                                            style={{
                                                flexBasis: "100%",
                                                width: "100%",
                                                marginTop: "0px",
                                            }}
                                        />
                                    </div>
                                </FlexContainer>
                                <FlexContainer justifyContent="flex-end">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginRight: "-194px" }}
                                        loading={props.sendingItemToStock}
                                    >
                                        Submit
                                    </Button>
                                </FlexContainer>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const mapStateToProps = ({ inventory, auth }) => ({
    sendingItemToStock: inventory.sendingItemToStock,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            sentItemToStock
        },
        dispatch
    );

export default
    connect(mapStateToProps, mapDispatchToProps)(StockUsedForm)


