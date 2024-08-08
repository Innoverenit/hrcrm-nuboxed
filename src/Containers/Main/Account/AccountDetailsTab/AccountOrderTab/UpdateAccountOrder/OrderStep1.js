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
import { Button, Tooltip, message, Switch } from 'antd';
import { getSaleCurrency } from "../../../../../Auth/AuthAction";
import { updateOrderStep1, getLobList } from '../../../AccountAction'
import { getContactDistributorList } from "../../../../Suppliers/SuppliersAction"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddressFieldArray1 from '../../../../../../Components/Forms/Formik/AddressFieldArray1';
import { FormattedMessage } from 'react-intl';

import dayjs from "dayjs";

const FormSchema = Yup.object().shape({
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
    orderCurrencyId: Yup.string().required("Input needed!"),
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
        props.getLobList(props.orgId)
    }, [])
    console.log(props.setEdittingOrder)
    const [priority, setPriority] = useState(props.setEdittingOrder.priority)

    const disabledDate = current => {
        // Disable past dates
        return current && current < dayjs().startOf('day');
    };
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
    const lobOption = props.lobList.map((item) => {
        return {
            label: item.name || "",
            value: item.lobDetsilsId,
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
                advancePayment: props.setEdittingOrder.advancePayment || "",
                distributorId: props.distributorId,
                orderCurrencyId: props.setEdittingOrder.orderCurrencyId || "",
                userId: props.userId,
                orderType: "Repair",
                orderId: props.setEdittingOrder.orderId || "",
                priority: props.setEdittingOrder.priority || "",
                lobDetsilsId: props.setEdittingOrder.lobDetsilsId || "",
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

            }}

            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(priority)
                if (values.advancePayment < 100) {
                    props.updateOrderStep1({
                        ...values,
                        orderSource: "erp",
                        priority: priority || "",
                        orgId: props.orgId,
                        distributorId: props.distributorId,
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
                                    <div class=" text-xs font-bold font-poppins text-black"><h3> <FormattedMessage
                                        id="app.pickupaddress"
                                        defaultMessage="Pickup Address"
                                    /></h3></div>

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
                                            label="Contact"
                                            style={{ borderRight: "3px red solid" }}
                                            name="contactPersonId"
                                            placeholder="Value"
                                            component={SelectComponent}
                                            options={Array.isArray(contactOption) ? contactOption : []}
                                            inlineLabel
                                            width={"100%"}
                                            isColumn
                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            width={"100%"}
                                            style={{ borderRight: "3px red solid" }}
                                            name="advancePayment"
                                            label="Advance Payment(%)"
                                            isColumn
                                            inlineLabel
                                            component={InputComponent}
                                        />
                                    </div>
                                </div>
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%]">
                                        <Field
                                            name="orderCurrencyId"
                                            label="Currency"
                                            isColumn
                                            style={{ borderRight: "3px red solid" }}
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(currencyOption) ? currencyOption : []}
                                        />
                                    </div>
                                    <div class="w-[45%]">
                                        <Field
                                            label="LOB"
                                            name="lobDetsilsId"
                                            component={SelectComponent}
                                            options={Array.isArray(lobOption) ? lobOption : []}
                                            inlineLabel
                                            width={"100%"}
                                            style={{ borderRight: "3px red solid" }}
                                            isColumn
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

                                            disabledDate={disabledDate}
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
                                            disable={!values.availabilityDate}
                                            component={DatePicker}
                                            disabledDate={(currentDate) => {
                                                if (values.availabilityDate) {
                                                    if (
                                                        dayjs(currentDate).isBefore(
                                                            dayjs(values.availabilityDate)
                                                        )
                                                    ) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                }
                                            }}
                                            value={values.deliveryDate}

                                        />
                                    </div>

                                </div>
                                <div class="justify-between flex mt-3">

                                    <div class="w-[46%]  ml-8 mt-2">
                                        <div class=" text-xs font-bold font-poppins text-black"><FormattedMessage
                                            id="app.priority"
                                            defaultMessage="Priority"
                                        /></div>
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
                                </div>

                                <div class=" mt-3 flex justify-between">

                                    <div class="w-[20%]  mt-[35px] mr-[100px] mb-[17px] ml-[-33px] flex justify-end">
                                        <Button
                                            className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                                            htmlType="Submit"
                                            loading={props.updatingOrderStep1}
                                        >
                                            <FormattedMessage
                                                id="app.update"
                                                defaultMessage="Update"
                                            />

                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </Form>
                </div>
            )}
        </Formik>
    );
}

const mapStateToProps = ({ auth, distributor, suppliers }) => ({
    contactDistributor: suppliers.contactDistributor,
    userId: auth.userDetails.userId,
    saleCurrencies: auth.saleCurrencies,
    setEdittingOrder: distributor.setEdittingOrder,
    updatingOrderStep1: distributor.updatingOrderStep1,
    orgId: auth.userDetails.organizationId,
    lobList: distributor.lobList,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateOrderStep1,
            getContactDistributorList,
            getSaleCurrency,
            getLobList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderStep1);