
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import {getBrandCategoryData} from "../../../../../Containers/Settings/Category/BrandCategory/BrandCategoryAction"
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from '../../../../../Components/Forms/Formik/TextareaComponent';
import { Button, Tooltip, message} from 'antd';
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import { getContactDistributorList } from "../../../Suppliers/SuppliersAction"
import { addOrderProcurementForm, getLobList } from '../../AccountAction'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddressFieldArray1 from '../../../../../Components/Forms/Formik/AddressFieldArray1';
import dayjs from "dayjs";
import { BundleLoader } from '../../../../../Components/Placeholder';
const FormSchema = Yup.object().shape({
    lobDetsilsId: Yup.string().required("Input needed!"),
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
    orderCurrencyId: Yup.string().required("Input needed!"),
})
function AddProcurementInAccount(props) {
    const [loading, setLoading] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
              '707', // 0 Payment terms
    '73', // 1 contact
    '', // 2Advance Payment
    '241', // 3 currency
    '280', // 4 lob
    '772', // 5 Delivery Date
    '14', // 6 Category
    '124', // 7 priority
    '107',//High 8
    '1603',//low 9
    '1078', // 10 save
     '',  // 11'Delivery Address',9
     '316'   ,// 12  'Notes'
    
    
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
           setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

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
    const lobOption = props.lobList.map((item) => {
        return {
            label: item.name || "",
            value: item.lobDetsilsId,
        };
    });
    const categoryOption = props.BrandCategoryData.map((item) => {
        return {
            label: item.name || "",
            value: item.shipById,
        };
    });
    const disabledDate = current => {
        // Disable past dates
        return current && current < dayjs().startOf('day');
    };
    if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
        <Formik
            initialValues={{
                availabilityDate: "",
                deliveryDate: "",
                contactPersonId: "",
                paymentInTerms: "",
                customPayment: "",
                comments: "",
                shipById:"",
                orderType:"Procure",
                orderCurrencyId: "",
                totalPhoneCount: "",
                advancePayment: 50,
                distributorId: props.distributorId,
                userId: props.userId,
                lobDetsilsId:"",
                orderId: "",
                priority: priority || "",
                orgId: props.orgId,
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
                    props.addOrderProcurementForm({
                        ...values,
                        orderSource: "erp",
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
                        <div class=" flex justify-between">
                            <div class=" w-[47%] flex-col flex">
                                <div class="mt-3">
                                    <div class=" text-xs font-bold font-poppins text-black">
                                    {translatedMenuItems[11]}
                                       </div>

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
                                       <div class=" text-xs font-bold font-poppins text-black">      {translatedMenuItems[12]}</div>
                                    <Field
                                        name="comments"
                                        // label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                    />
                                </div>

                            </div>
                            <div class=" w-[47%]">
                                <div class="justify-between flex mt-3">
                                    <div class="w-[45%] font-bold font-poppins text-xs">
                                    {translatedMenuItems[0]}
                                        <Field
                                            name="paymentInTerms"
                                            // label="Payment Terms (in Days)"
                                            isColumn
                                            inlineLabel
                                            component={SelectComponent}
                                            options={["7", "15", "21", "30", "45", "60", "75", "90", "Custom"]}
                                        />
                                    </div>
                                    {values.paymentInTerms === "Custom" &&
                                        <div class="w-[45%] font-bold font-poppins text-xs">
                                             
                                            <Field  

                                                label= "customPayment"                                  
                                                name="customPayment"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>}

                                </div>
                                <div class="justify-between flex mt-3">
                                <div class="w-[45%] font-bold font-poppins text-xs">
                                {translatedMenuItems[1]}
                                        <Field
                                            // label="Contact"
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
                                    <div class="w-[45%] font-bold font-poppins text-xs">
                                {translatedMenuItems[2]}
                                        <Field
                                            width={"100%"}
                                            style={{ borderRight: "3px red solid" }}
                                            name="advancePayment"
                                            // label="Advance Payment(%)"
                                            isColumn
                                            inlineLabel
                                            component={InputComponent}
                                        />
                                    </div>
                                </div>
                                <div class="justify-between flex mt-3">
                                <div class="w-[45%] font-bold font-poppins text-xs">
                                {translatedMenuItems[3]}
                                        <Field
                                            name="orderCurrencyId"
                                            // label="Currency"
                                            isColumn
                                            style={{ borderRight: "3px red solid" }}
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(currencyOption) ? currencyOption : []}
                                        />
                                    </div>
                                    <div class="w-[45%] font-bold font-poppins text-xs">
                                    {translatedMenuItems[4]}
                                        <Field
                                            // ="LOB"
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
                                    {/* <div class="w-[45%]">
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
                                    </div> */}
                                  <div class="w-[45%] font-bold font-poppins text-xs">
                                  {translatedMenuItems[5]}
                                        <Field
                                            name="deliveryDate"
                                        // Delivery Date "
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
                                <div class="w-[45%] font-bold font-poppins text-xs">
                                {translatedMenuItems[6]}
                                        <Field
                                            name="shipById"
                                            // label="Category"
                                            isColumn
                                            style={{ borderRight: "3px red solid" }}
                                            inlineLabel
                                            component={SelectComponent}
                                            options={Array.isArray(categoryOption) ? categoryOption : []}
                                        />
                                    </div>
                                <div class="justify-between flex mt-3">

                                    <div class="w-[46%]  ml-8 mt-2">
                                        <div class=" text-xs font-bold font-poppins text-black">     {translatedMenuItems[7]}</div>
                                        {/* Priority */}
                                        <div class="justify-between flex">
                                            <div>
                                                <Tooltip title= {translatedMenuItems[8]}
                                                >
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
                                               
                                                &nbsp;
                                                <Tooltip title= {translatedMenuItems[9]}
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

                                <div class=" mt-3 flex justify-between">

                                    <div class="w-[20%]  mt-[35px] mr-[100px] mb-[17px] ml-[-33px] flex justify-end">
                                        <Button
                                            className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                                            htmlType="Submit"
                                            loading={props.addingOrderProcurement}
                                        >
                                <div class=" text-xs font-bold font-poppins ">     {translatedMenuItems[10]}</div>

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

const mapStateToProps = ({ homeStepper, auth, distributor,brandCategory, suppliers }) => ({
    contactDistributor: suppliers.contactDistributor,
    userId: auth.userDetails.userId,
    saleCurrencies: auth.saleCurrencies,
    addingOrderProcurement: distributor.addingOrderProcurement,
    lobList: distributor.lobList,
    BrandCategoryData: brandCategory.BrandCategoryData,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addOrderProcurementForm,
            getSaleCurrency,
            getLobList,
            getContactDistributorList,
            getBrandCategoryData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddProcurementInAccount);