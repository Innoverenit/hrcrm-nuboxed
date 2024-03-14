import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { addLocationInOrder, getLocationList } from "../../AccountAction"
import * as Yup from "yup";
import { BundleLoader } from "../../../../../Components/Placeholder";

const FormSchema = Yup.object().shape({
    locationId: Yup.string().required("Input needed!"),

})

function LocationOrderForm(props) {
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
            {props.fetchingLocationList ? <BundleLoader /> :
                <Formik
                    initialValues={{
                        locationId: "",
                        userId: props.userId,
                        orderPhoneId: props.particularRowData.orderId
                    }}
                    validationSchema={FormSchema}
                    onSubmit={(values, { resetForm }) => {
                        //debugger;
                        console.log(values);
                        props.addLocationInOrder({
                            ...values,
                            transferInd: 1,
                        },
                            props.particularRowData.distributorId
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
                                <div class="flex justify-end mt-5">
                                    <Button
                                        loading={props.addingLocationInOrder}
                                        type="primary"
                                        htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>}
        </>
    );
}
const mapStateToProps = ({ distributor, plant, auth }) => ({
    orgId: auth.userDetails.organizationId,
    locationlist: distributor.locationlist,
    userId: auth.userDetails.userId,
    fetchingLocationList: distributor.fetchingLocationList,
    addingLocationInOrder: distributor.addingLocationInOrder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getLocationList,
        addLocationInOrder
    }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationOrderForm);
