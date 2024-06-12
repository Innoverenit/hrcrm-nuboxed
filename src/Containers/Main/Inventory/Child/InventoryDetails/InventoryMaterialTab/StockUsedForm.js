
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button, message } from "antd";
import { FlexContainer } from "./../../../../../../Components/UI/Layout";
import { sentItemToStock, getCellById } from "../../../InventoryAction"
import { InputComponent } from "./../../../../../../Components/Forms/Formik/InputComponent";
import { bindActionCreators } from "redux";
import { SelectComponent } from './../../../../../../Components/Forms/Formik/SelectComponent';
import { connect } from "react-redux";

function StockUsedForm(props) {
    useEffect(() => {
        props.getCellById(props.row.suppliesId, props.orgId)
    }, [])
    const cellOption = props.cellById.map((item) => {
        return {
            label: item.cellChamber || "",
            value: item.cellChamberLinkId,
        };
    });
    return (
        <div>
            <Formik
                initialValues={{
                    poSupplierDetailsId: props.row.poSupplierDetailsId || "",
                    poSupplierSuppliesId: props.row.poSupplierSuppliesId || "",
                    unitUsed: "",
                    unitWasted: "",
                    userId: props.userId || "",
                    cellChamberLinkId: ""
                }}
                onSubmit={(values, { resetForm }) => {
                    const wasted = Number(props.row.unit) - values.unitUsed
                    if (Number(values.unitUsed) <= Number(props.row.unit)
                        && Number(values.unitWasted) <= Number(wasted)) {
                        props.sentItemToStock(
                            {
                                ...values,

                            },
                            resetForm()
                        );
                    } else {
                        message.error("Stock and wasted unit should be less unit !")

                    }

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
                                    <div style={{ width: "80%", marginTop: "8px" }}>
                                        <Field
                                            name="cellChamberLinkId"
                                            label="Cell"
                                            isColumn
                                            style={{ borderRight: "3px red solid" }}
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(cellOption) ? cellOption : []}
                                        />
                                    </div>
                                    <div style={{ width: "80%", marginTop: "8px" }}>
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
                                    <div style={{ width: "80%", marginTop: "8px" }}>
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

const mapStateToProps = ({ inventory, location, auth }) => ({
    sendingItemToStock: inventory.sendingItemToStock,
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    cellById: inventory.cellById,
    //locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            sentItemToStock,
            getCellById
        },
        dispatch
    );

export default
    connect(mapStateToProps, mapDispatchToProps)(StockUsedForm)


