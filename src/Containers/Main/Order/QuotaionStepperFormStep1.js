
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import {getBrandCategoryData} from "../../../Containers/Settings/Category/BrandCategory/BrandCategoryAction"
import { SelectComponent } from '../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from '../../../Components/Forms/Formik/TextareaComponent';
import { Button, Tooltip, message, Switch } from 'antd';
import { getSaleCurrency } from "../../Auth/AuthAction";
import { getContactDistributorList } from "../Suppliers/SuppliersAction"
import { addQuotationOrderForm, getLobList } from '../Account/AccountAction'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ValidationAddressField from '../../../Components/Forms/Formik/ValidationAddressField';
import dayjs from "dayjs";

const addressSchema = Yup.object().shape({
    address1: Yup.string().required('Address is required'),
    street: Yup.string().required('Street is required'), 
  });

const FormSchema = Yup.object().shape({
    lobDetsilsId: Yup.string().required("Input needed!"),
    advancePayment: Yup.number()
    .required("Input needed!")
    .typeError('Number Required!'),
    contactPersonId: Yup.string().required("Input needed!"),
    orderCurrencyId: Yup.string().required("Input needed!"),
    customPayment: Yup.number()
    .typeError('Number Required!'),
    loadingAddress: Yup.array().of(addressSchema).min(1, 'At least one address is required'),

})
function QuotaionStepperFormStep1(props) {

const [selectOnType,setselectOnType]=useState("Commerce");

const handleOnSelectType =(ontype)=> {
    setselectOnType(ontype)
}

    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })
    useEffect(() => {
        props.getContactDistributorList(props.distributorId)
        props.getSaleCurrency()
        props.getLobList(props.orgId)
        props.getBrandCategoryData(props.orgId);
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
    const categoryOption = props.BrandCategoryData.map((item) => {
        return {
            label: item.name || "",
            value: item.shipById,
        };
    });
    const lobOption = props.lobList.map((item) => {
        return {
            label: item.name || "",
            value: item.lobDetsilsId,
        };
    });
    const disabledDate = current => {
        // Disable past dates
        return current && current < dayjs().startOf('day');
    };
    return (
        <Formik
            initialValues={{
                availabilityDate: "",
                deliveryDate: "",
                contactPersonId: "",
                paymentInTerms: "",
                customPayment: "0",
                comments: "",
                orderType:selectOnType,
                orderCurrencyId: "",
                shipById:"",
                totalPhoneCount: "",
                advancePayment: 50,
                distributorId: props.distributorId,
                userId: props.userId,
                orderId: "",
                lobDetsilsId:"",
                // orderType: "Repair",
                priority: priority || "",
                orgId: props.orgId,
                loadingAddress: [
                    {
                        address1: "",
                        street:"",
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
                    props.addQuotationOrderForm({
                        ...values,
                        orderSource: "B2B ERP",
                        priority: priority || "",
                        orderType:selectOnType,
                        paymentInTerms: values.paymentInTerms === "Custom" ? values.customPayment : values.paymentInTerms,

                    }, props.distributorId,);
                    // "0","High","Medium","Low"
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
                          
                            <div class=" flex justify-between">
 <div class="w-[45%]">
                                        {/* <Field
                                            name="orderType"
                                            label="Type"
                                            isColumn
                                            inlineLabel
                                            component={SelectComponent}
                                            options={[
                                                { label: "Repair", value: "Repair" },
                                                { label: "Commerce", value: "Procure" },
                                            ]}
                                        /> */}
                                       
                                        <button className={`${props.moduleMapper.ecomModInd === true || props.moduleMapper.ecomModInd === false && 
                                        selectOnType === "Commerce" ? 
                                        "bg-green-400 text-white border rounded-md":"bg-purple-400 text-black border rounded-md"}`}
                                        onClick={() => handleOnSelectType("Commerce")}
                                        >
                                            Commerce
                                        </button>
                                        &nbsp;
                                        <button className={`${props.moduleMapper.repairInd=== true  &&  selectOnType==="Repair" ? 
                                        "bg-green-400 text-white rounded-md":"bg-purple-400 text-black border rounded-md"}`}
                                        onClick={() => handleOnSelectType("Repair")}
                                        >
                                            Repair
                                        </button>
                                       
                                    </div>


<div class="w-[46%]  ml-8 mt-2">
    <div class=" text-xs font-bold font-poppins text-black">Priority
    </div>
    <div class="justify-between flex">
        <div>
            <Tooltip title="Urgent">
                <Button
                    // type="primary"
                    shape="circle"
                    icon={<ErrorOutlineIcon style={{ fontSize: '0.1875em' }} />}
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
       
            
            <Tooltip title="Low"
           >
                <Button
                    // type="primary"
                    shape="circle"
                    icon={<ErrorOutlineIcon style={{ fontSize: '0.1875em' }} />}
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

                                 

                                    {values.orderType === "Repair" ? (
                                    <div className="mt-3">
                                        <div class=" text-xs font-bold font-poppins text-black">
                                            <h3>
                                              Pickup Address
                                            </h3>
                                        </div>
                                        <FieldArray
                                            name="loadingAddress"
                                            render={(arrayHelpers) => (
                                                <ValidationAddressField
                                                    singleAddress
                                                    arrayHelpers={arrayHelpers}
                                                    values={values}
                                                />
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-3">
                                        <div class=" text-xs font-bold font-poppins text-black">
                                            <h3>
                                                Delivery Address
                                            </h3>
                                        </div>
                                        <FieldArray
                                            name="loadingAddress"
                                            render={(arrayHelpers) => (
                                                <ValidationAddressField
                                                    singleAddress
                                                    arrayHelpers={arrayHelpers}
                                                    values={values}
                                                />
                                            )}
                                        />
                                    </div>
                                )}
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
                                                label="Custom Payment"
                                                  
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
                                        <div>
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
                                </div>
                                <div class="justify-between flex mt-3">
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
                                <div class="w-[45%]">
  {values.orderType === "Procure" ? null : (
    <Field
      name="availabilityDate"
      label="Pickup Date"
      isColumn
      inlineLabel
      width={"100%"}
      disabledDate={disabledDate}
      component={DatePicker}
      value={values.availabilityDate}
    />
  )}
</div>

                               

                                </div>
                                <div class="w-[45%]">
                                        <Field
                                            name="shipById"
                                            label="Category"
                                            isColumn
                                            style={{ borderRight: "3px red solid" }}
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(categoryOption) ? categoryOption : []}
                                        />
                                    </div>

                                <div class=" mt-3 flex justify-between">

                                    <div class="w-[20%]  mt-[35px] mr-[100px] mb-[17px] ml-[-33px] flex justify-end">
                                        <Button
                                            className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                                            htmlType="Submit"
                                            loading={props.addingQuotationOrder}
                                        >
                                            Save
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

const mapStateToProps = ({ homeStepper,brandCategory, auth, distributor, suppliers }) => ({
    contactDistributor: suppliers.contactDistributor,
    userId: auth.userDetails.userId,
    saleCurrencies: auth.saleCurrencies,
    addingQuotationOrder: distributor.addingQuotationOrder,
    lobList: distributor.lobList,
    orgId: auth.userDetails.organizationId,
    BrandCategoryData: brandCategory.BrandCategoryData,
    moduleMapper:auth.userDetails.moduleMapper
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addQuotationOrderForm,
            getSaleCurrency,
            getLobList,
            getContactDistributorList,
            getBrandCategoryData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(QuotaionStepperFormStep1);