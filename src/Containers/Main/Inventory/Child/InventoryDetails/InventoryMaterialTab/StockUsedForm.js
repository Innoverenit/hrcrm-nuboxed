
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
                        <div className=" flex justify-between" >
                            <div className=" h-[100%] w-[45%]"  >
                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                
                                    <div  className="mt-2 w-[80%]">
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
                                    <div  className="mt-2 w-[80%]" >
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
                                    <div  className="mt-2 w-[80%]">
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
                                </div>
                                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginRight: "-194px" }}
                                        loading={props.sendingItemToStock}
                                    >
                                        Submit
                                    </Button>
                                </div>
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


