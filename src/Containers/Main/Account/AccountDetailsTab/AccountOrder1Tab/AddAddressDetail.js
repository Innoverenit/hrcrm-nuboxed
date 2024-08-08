import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import { StyledLabel } from '../../../../../Components/UI/Elements';
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from '../../../../../Components/Forms/Formik/TextareaComponent';
import { Button, Tooltip, message } from 'antd';
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import { FormattedMessage } from 'react-intl';
import { createOrderForProduction } from '../../AccountAction'
import { getContactDistributorList } from "../../../Suppliers/SuppliersAction"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddressFieldArray1 from '../../../../../Components/Forms/Formik/AddressFieldArray1';
const FormSchema = Yup.object().shape({
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
})
function AddAddressDetail(props) {
    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })
    useEffect(() => {
        props.getContactDistributorList(props.distributorId)
        props.getSaleCurrency()
    }, [])

    const [priority, setPriority] = useState("High")

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
                availabilityDate: "",
                deliveryDate: "",
                contactPersonId: "",
                paymentInTerms: "",
                comments: "",
                awbNo: "",
                orderCurrencyId: "",
                deliverToBusinessInd: "",
                fullLoadTruckInd: "",
                privateInd: "",
                orgId: props.orgId,
                advancePayment: "",
                distributorId: props.distributorId,
                userId: props.userId,
                orderId: "",
                priority: priority || "",
                xlUpdateInd: false,
                customPayment: "",
                loadingAddress: [
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
                    props.createOrderForProduction({
                        ...values,
                        priority: priority || "",
                        paymentInTerms: values.paymentInTerms === "Custom" ? values.customPayment : values.paymentInTerms,

                    }, props.distributorId);
                } else {
                    message.success("Advance payment should be less than 100")
                }
            }}
        >
            {({ values, handleChange }) => (
                <div class="overflow-y-auto h-[28rem] overflow-x-hidden max-sm:h-[30rem]">
                    <Form>
                        <div class="w-wk flex justify-between">
                            <div class="w-[47.5%]">
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
                                            dayjs(currentDate).isBefore(dayjs(date).subtract(1, 'days'))
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
                                />
                            </div>
                        </div> */}



                                <div class=" mt-3 justify-between flex">
                                    <div class="w-wk">
                                        <Field
                                            name="comments"
                                            label="Comment"
                                            width={"100%"}
                                            isColumn
                                            component={TextareaComponent}
                                        />
                                    </div>


                                </div>
                            </div>
                            <div class="w-[47.5%]">
                                <div class="justify-between flex mt-2">
                                    <div class="w-[47.5%]">
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
                                <div class="justify-between flex mt-2">
                                    <div class="w-[47.5%]">
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
                                    <div class="w-[47.5%]">
                                        <Field
                                            width={"100%"}
                                            name="advancePayment"
                                            label="Advance Payment(%)"
                                            isColumn
                                            inlineLabel
                                            component={InputComponent}
                                        />
                                    </div>
                                </div>
                                <div class="justify-between flex mt-2">

                                    <div class="w-[47.5%]">
                                        <Field
                                            name="orderCurrencyId"
                                            label="Currency"
                                            isColumn
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(currencyOption) ? currencyOption : []}
                                        />
                                    </div>
                                    <div class="w-[47.5%]">
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
                                <div class="justify-between flex mt-2 items-center">
                                    <div class="w-[47.5%]  ">
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
                                    <div class="w-[47.5%] mt-4  ">
                                        <Button
                                            className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                                            htmlType="Submit"
                                            loading={props.creatingOrderForProduction}
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

                    </Form>
                </div>
            )}
        </Formik>
    );
}

const mapStateToProps = ({ suppliers, auth, distributor }) => ({
    contactDistributor: suppliers.contactDistributor,
    userId: auth.userDetails.userId,
    saleCurrencies: auth.saleCurrencies,
    orgId: auth.userDetails.organizationId,
    creatingOrderForProduction: distributor.creatingOrderForProduction
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            createOrderForProduction,
            getSaleCurrency,
            getContactDistributorList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressDetail);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
    const start = type;
    console.log(start);
    //////debugger;
    if (status === type) {
        size = "30px";
    } else {
        size = "16px";
    }
    return (
        <Tooltip title={tooltip}>
            <Button
                ghost={status !== type}
                style={{
                    padding: "6px",
                    borderColor: "transparent",
                    color: status === type ? "orange" : "grey",
                }}
                onClick={onClick}
            >
                <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
            </Button>
        </Tooltip>
    );
}
