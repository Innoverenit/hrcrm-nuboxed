import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import { StyledLabel } from '../../../../../../Components/UI/Elements';
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from '../../../../../../Components/Forms/Formik/TextareaComponent';
import { Button, Tooltip, message } from 'antd';
import { getSaleCurrency } from "../../../../../Auth/AuthAction";
import { updateOrderStep1, getContactDistributorList } from '../../../AccountAction'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddressFieldArray1 from '../../../../../../Components/Forms/Formik/AddressFieldArray1';
import { FormattedMessage } from 'react-intl';
import dayjs from "dayjs";

const FormSchema = Yup.object().shape({
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
})
function OrderStep1(props) {
    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })
    useEffect(() => {
        props.getContactDistributorList(props.setEdittingOrder.distributorId)
        props.getSaleCurrency()
    }, [])
    console.log(props.setEdittingOrder)
    const [priority, setPriority] = useState(props.setEdittingOrder.priority)

    function handleButtonClick(type) {
        console.log(type)
        setPriority(type)
    }
    const currencyOption = props.saleCurrencies.map((item) => {
        return {
            label: item.currency_name || "",
            value: item.currency_id,
        };
    });
    return (
        <Formik
            initialValues={{
                availabilityDate: dayjs(props.setEdittingOrder.availabilityDate) || "",
                deliveryDate: dayjs(props.setEdittingOrder.deliveryDate) || "",
                contactPersonId: props.setEdittingOrder.contactPersonId || "",
                paymentInTerms: props.setEdittingOrder.paymentInTerms || "",
                customPayment: props.setEdittingOrder.customPayment || "",
                comments: props.setEdittingOrder.comments || "",
                totalPhoneCount: props.setEdittingOrder.totalPhoneCount || "",
                deliverToBusinessInd: "",
                fullLoadTruckInd: "",
                privateInd: "",
                advancePayment: props.setEdittingOrder.advancePayment || "",
                distributorId: props.setEdittingOrder.distributorId,
                orderCurrencyId: props.setEdittingOrder.orderCurrencyId || "",
                userId: props.userId,
                orderId: props.setEdittingOrder.orderId || "",
                priority: props.setEdittingOrder.priority || "",
                loadingAddress: [
                    {
                        addressId: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].addressId : "",
                        address1: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].address1 : "",
                        state: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].state : "",
                        city: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].city : "",
                        pinCode: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].pinCode : "",
                        countryId: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].countryId : "",
                        latitude: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].latitude : "",
                        longitude: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].longitude : "",
                        country: props.setEdittingOrder.loadingAddress.length ?
                            props.setEdittingOrder.loadingAddress[0].country : "",
                    },
                ],

                unloadingAddress: [
                    {
                        address1: "",
                        addressId: "",
                        state: "",
                        city: "",
                        pinCode: "",
                        countryId: "",
                        latitude: "",
                        longitude: "",
                        country: "",
                    },
                ],

            }}

            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(priority)
                if (values.advancePayment < 100) {
                    props.updateOrderStep1({
                        ...values,
                        orderSource: "erp",
                        priority: priority || "",
                        paymentInTerms: values.paymentInTerms === "Custom" ? values.customPayment : values.paymentInTerms,
                    },
                        props.setEdittingOrder.orderId,
                        props.setEdittingOrder.distributorId);
                } else {
                    message.success("Advance payment should be less than 100")
                }
            }}
        >
            {({ values, handleChange }) => (
                <div class="overflow-y-auto h-[28rem] overflow-x-hidden max-sm:h-[30rem]">
                    <Form>
                        <div class=" flex justify-between">
                            <div class=" w-[47%] flex-col flex">
                                <div class="mt-3">
                                    <StyledLabel><h3> <FormattedMessage
                                        id="app.pickupaddress"
                                        defaultMessage="Pickup Address"
                                    /></h3></StyledLabel>

                                    <FieldArray
                                        name="loadingAddress"
                                        render={(arrayHelpers) => (
                                            <AddressFieldArray1
                                                singleAddress
                                                arrayHelpers={arrayHelpers}
                                                values={values}
                                            />
                                        )}
                                    />
                                </div>
                                <div class="mt-3">
                                    <Field
                                        name="comments"
                                        label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                    />
                                </div>

                            </div>
                            <div class=" w-[47%]">
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%]">
                                        <Field
                                            name="paymentInTerms"
                                            label="Payment Terms (in Days)"
                                            isColumn
                                            inlineLabel
                                            component={SelectComponent}
                                            options={["7", "15", "21", "30", "45", "60", "75", "90", "Custom"]}
                                        />
                                    </div>
                                    {values.paymentInTerms === "Custom" &&
                                        <div class="w-[45%]">
                                            <Field
                                                label={
                                                    <FormattedMessage
                                                        id="app.Custom Payment"
                                                        defaultMessage="Custom Payment"
                                                    />
                                                }
                                                name="customPayment"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>}
                                </div>
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%]">
                                        <Field
                                            label="Total Phone"
                                            name="totalPhoneCount"
                                            component={InputComponent}
                                            inlineLabel
                                            width={"100%"}
                                            isColumn
                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            label="Contact Person"
                                            name="contactPersonId"
                                            placeholder="Value"
                                            component={SelectComponent}
                                            options={Array.isArray(contactOption) ? contactOption : []}
                                            inlineLabel
                                            width={"100%"}
                                            isColumn
                                        />
                                    </div>
                                </div>
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%]">
                                        <Field
                                            width={"100%"}
                                            name="advancePayment"
                                            label="Advance Payment(%)"
                                            isColumn
                                            inlineLabel
                                            component={InputComponent}
                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            name="orderCurrencyId"
                                            label="Currency"
                                            isColumn
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(currencyOption) ? currencyOption : []}
                                        />
                                    </div>
                                </div>
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%]">
                                        <Field
                                            name="availabilityDate"
                                            label="Pickup Date "
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={DatePicker}
                                            value={values.availabilityDate}

                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            name="deliveryDate"
                                            label="Delivery Date "
                                            isColumn
                                            inlineLabel
                                            width={"100%"}
                                            component={DatePicker}
                                            value={values.deliveryDate}

                                        />
                                    </div>

                                </div>

                                <div class=" mt-3 flex justify-between">
                                    <div class="w-[46%]  ml-8 mt-2">
                                        <StyledLabel><FormattedMessage
                                            id="app.priority"
                                            defaultMessage="Priority"
                                        /></StyledLabel>
                                        <div class="justify-between flex">
                                            <div>
                                                <Tooltip title={<FormattedMessage
                                                    id="app.high"
                                                    defaultMessage="High"
                                                />}>
                                                    <Button
                                                        // type="primary"
                                                        shape="circle"
                                                        icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                        onClick={() => handleButtonClick("High")}
                                                        style={{
                                                            backgroundColor:
                                                                priority === "High"
                                                                    ? "red"
                                                                    : "white",
                                                            borderRadius: "50%",
                                                            width: "31px",
                                                            height: "31px"
                                                        }}
                                                    />
                                                </Tooltip>
                                                &nbsp;
                                                <Tooltip title={<FormattedMessage
                                                    id="app.medium"
                                                    defaultMessage="Medium"
                                                />}>
                                                    <Button
                                                        // type="primary"
                                                        shape="circle"
                                                        icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                        onClick={() => handleButtonClick("Medium")}
                                                        style={{
                                                            backgroundColor:
                                                                priority === "Medium"
                                                                    ? "Orange"
                                                                    : "white",
                                                            borderRadius: "50%",
                                                            width: "31px",
                                                            height: "31px"
                                                        }}
                                                    />
                                                </Tooltip>
                                                &nbsp;
                                                <Tooltip title={<FormattedMessage
                                                    id="app.low"
                                                    defaultMessage="Low"
                                                />}>
                                                    <Button
                                                        // type="primary"
                                                        shape="circle"
                                                        icon={<ExclamationCircleOutlined style={{ fontSize: '0.1875em' }} />}
                                                        onClick={() => handleButtonClick("Low")}
                                                        style={{
                                                            backgroundColor:
                                                                priority === "Low"
                                                                    ? "teal"
                                                                    : "white",
                                                            borderRadius: "50%",
                                                            width: "31px",
                                                            height: "31px"
                                                        }}
                                                    ></Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-[20%]  mt-[35px] mr-[100px] mb-[17px] ml-[-33px] flex justify-end">
                                        <Button
                                            className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                                            htmlType="Submit"
                                            loading={props.addingOrder}
                                        >
                                            <FormattedMessage
                                                id="app.save"
                                                defaultMessage="Save"
                                            />

                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "47%" }}>
                            <Field
                                name="availabilityDate"
                                label="Available Date "
                                isColumn
                                inlineLabel
                                width={"100%"}
                                disabledDate={(currentDate) => {
                                    const date = new Date()
                                    if (
                                        moment(currentDate).isBefore(moment(date).subtract(1, 'days'))
                                    ) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }}
                                component={DatePicker}
                                value={values.availabilityDate}

                            />
                        </div>
                        <div style={{ width: "47%" }}>
                            <Field
                                name="deliveryDate"
                                label="Delivery Date "
                                isColumn
                                inlineLabel
                                width={"100%"}
                                component={DatePicker}
                                value={values.deliveryDate}
                                disabledDate={(currentDate) => {
                                    if (values.availabilityDate) {
                                        if (
                                            moment(currentDate).isBefore(
                                                moment(values.availabilityDate)
                                            )
                                        ) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div> */}
                    </Form>
                </div>
            )}
        </Formik>
    );
}

const mapStateToProps = ({ auth, distributor }) => ({
    contactDistributor: distributor.contactDistributor,
    userId: auth.userDetails.userId,
    saleCurrencies: auth.saleCurrencies,
    setEdittingOrder: distributor.setEdittingOrder,
    updatingOrderStep1: distributor.updatingOrderStep1
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateOrderStep1,
            getContactDistributorList,
            getSaleCurrency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderStep1);