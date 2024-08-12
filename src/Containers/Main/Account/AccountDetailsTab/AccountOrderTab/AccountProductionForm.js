import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { getInventory } from "../../../Inventory/InventoryAction"
import {  addProductionLocationInOrder, startRepairInStatus } from "../../AccountAction"

function AccountProductionForm(props) {
    useEffect(() => {
        props.getInventory(props.orgId)
    }, []);
    dayjs.addRealYear = function addRealYear(y) {
        var fm = dayjs(y).add(10, "Y");
        var fmEnd = dayjs(fm).endOf("year");
        return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
            ? fm.add(10, "y")
            : fm;
    };

    const locationsName = props.inventory
        // .filter((item) => {
        // return item.productionInd === true
        // })
        .map((item) => {
            return {
                label: item.locationName || "",
                value: item.locationDetailsId,
            };
        });
    const handleCallBack = () => {
        props.startRepairInStatus({
            qcRepairInd: 1,
            orderPhoneId: props.particularRowData.orderId || "",
            qcRepairUserId: props.userId,
            repairReason: "",
            repairReasonInd: true
        }, props.particularRowData.distributorId)
    }
    return (
        <>
            <Formik
                initialValues={{
                    locationId: "",
                    userId: props.userId,
                    orderPhoneId: props.particularRowData.orderId,
                    inspectionInd: 3
                }}
                onSubmit={(values, { resetForm }) => {
                    //debugger;
                    console.log(values);
                    props.addProductionLocationInOrder({
                        ...values,
                        transferInd: 2,
                    },
                        props.particularRowData.distributorId,
                        handleCallBack
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <div style={{ width: "90%" }}>
                                <Field
                                    name="locationId"
                                    type="text"
                                    width={"100%"}
                                    placeholder="Location"
                                    label="Location"
                                    isRequired
                                    component={SelectComponent}
                                    options={Array.isArray(locationsName) ? locationsName : []}
                                />
                            </div>
                            <div style={{ marginTop: "15px", marginLeft: "14px" }}>
                                <Button type="primary" htmlType="submit">
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
const mapStateToProps = ({ plant, auth, inventory }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    inventory: inventory.inventory,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        addProductionLocationInOrder,
        getInventory,
        startRepairInStatus
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountProductionForm);
