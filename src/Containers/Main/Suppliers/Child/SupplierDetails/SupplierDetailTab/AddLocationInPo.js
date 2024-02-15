import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import moment from "moment";
// import moment from "moment";
// import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { getLocationList } from "../../../../Account/AccountAction"
import { movePoToInventory } from "../../../SuppliersAction"

function AddLocationInPo(props) {
    useEffect(() => {
        props.getLocationList(props.orgId);
    }, []);
    moment.addRealYear = function addRealYear(y) {
        var fm = moment(y).add(10, "Y");
        var fmEnd = moment(fm).endOf("year");
        return y.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
            ? fm.add(10, "y")
            : fm;
    };
    const locationsName = props.locationlist.filter((item) => {
        return item.inventoryInd === true
    }).map((item) => {
        return {
            label: item.locationName || "",
            value: item.locationDetailsId,
        };
    });
    return (
        <>
            <Formik
                initialValues={{
                    locationId: "",
                    userId: props.userId,
                    supplierId: props.supplierId,
                    poSupplierDetailsId: props.rowData.poSupplierDetailsId
                }}
                onSubmit={(values, { resetForm }) => {
                    props.movePoToInventory({
                        ...values,
                    },
                        props.supplierId
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
                        <div class="flex justify-between">
                            <div class="w-[85%]">
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
                            <div class="flex justify-end mt-2">
                                <Button
                                    type="primary"
                                    htmlType="submit">
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
    locationlist: distributor.locationlist,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getLocationList,
        movePoToInventory
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddLocationInPo);
