
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Formik, Form, Field,  } from 'formik';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import { SelectComponent } from '../../../../../Components/Forms/Formik/SelectComponent';
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { Button, Tooltip, message } from 'antd';
import { getSaleCurrency } from "../../../../Auth/AuthAction";
import { getContactDistributorList } from "../../../Suppliers/SuppliersAction"
import { updateProcureStep1, getLobList } from '../../AccountAction'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import dayjs from "dayjs";
const FormSchema = Yup.object().shape({
    lobDetsilsId: Yup.string().required("Input needed!"),
    advancePayment: Yup.string().required("Input needed!"),
    contactPersonId: Yup.string().required("Input needed!"),
    orderCurrencyId: Yup.string().required("Input needed!"),
})
function ProcureStep1(props) {
    const contactOption = props.contactDistributor.map((item) => {
        return {
            value: item.contactPersonId,
            label: `${item.firstName || ""} ${item.lastName || ""}`
        }
    })
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
    '110', // 0
    '14', // 1
    '218', // 2
    '71', // 3
    '260', // 4
    '142', // 5
   '259',//6
    "218",// Value
  "1379", // Ship on
   "1486" // track ID


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
        props.getContactDistributorList(props.setEdittingProcure.distributorId)
        props.getSaleCurrency()
        props.getLobList(props.orgId)
    }, [])

    const [priority, setPriority] = useState(props.setEdittingProcure.priority)

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
    const disabledDate = current => {
        // Disable past dates
        return current && current < dayjs().startOf('day');
    };
    return (
        <Formik
        initialValues={{
            availabilityDate: dayjs(props.setEdittingProcure.availabilityDate) || "",
            deliveryDate: dayjs(props.setEdittingProcure.deliveryDate) || "",
            contactPersonId: props.setEdittingProcure.contactPersonId || "",
            paymentInTerms: props.setEdittingProcure.paymentInTerms || "",
            customPayment: props.setEdittingProcure.customPayment || "",
            comments: props.setEdittingProcure.comments || "",
            totalPhoneCount: props.setEdittingProcure.totalPhoneCount || "",
            advancePayment: props.setEdittingProcure.advancePayment || "",
            distributorId: props.distributorId,
            orderCurrencyId: props.setEdittingProcure.orderCurrencyId || "",
            userId: props.userId,
            orderType: "Procure",
            orderId: props.setEdittingProcure.orderId || "",
            priority: props.setEdittingProcure.priority || "",
            lobDetsilsId: props.setEdittingProcure.lobDetsilsId || "",
            // loadingAddress: [
            //     {
            //         addressId: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].addressId : "",
            //         address1: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].address1 : "",
            //         state: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].state : "",
            //         city: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].city : "",
            //         pinCode: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].pinCode : "",
            //         countryId: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].countryId : "",
            //         latitude: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].latitude : "",
            //         longitude: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].longitude : "",
            //         country: props.setEdittingProcure.loadingAddress.length ?
            //             props.setEdittingProcure.loadingAddress[0].country : "",
            //     },
            // ],

        }}

        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
            console.log(priority)
            if (values.advancePayment < 100) {
                props.updateProcureStep1({
                    ...values,
                    orderSource: "erp",
                    priority: priority || "",
                    orgId: props.orgId,
                    distributorId: props.distributorId,
                    paymentInTerms: values.paymentInTerms === "Custom" ? values.customPayment : values.paymentInTerms,
                },
                    props.setEdittingProcure.orderId,
                    props.setEdittingProcure.distributorId);
            } else {
                message.success("Advance payment should be less than 100")
            }
        }}
        >
            {({ values, handleChange }) => (
                <div class="overflow-y-auto h-[28rem] overflow-x-hidden max-sm:h-[30rem]">
                    <Form>
                        <div class=" flex justify-between">
                          
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
                                        <div class=" text-xs font-bold font-poppins text-black">Priority</div>
                                        <div class="justify-between flex">
                                            <div>
                                                <Tooltip title="High">
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
                                                <Tooltip title="Medium">
                                                    <Button
                                                        // type="primary"
                                                        shape="circle"
                                                        icon={<ErrorOutlineIcon style={{ fontSize: '0.1875em' }} />}
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
                                                <Tooltip title="Low">
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
                                            loading={props.updatingProcureStep1}
                                        >
                                          Update
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

const mapStateToProps = ({ homeStepper, auth, distributor, suppliers }) => ({
    contactDistributor: suppliers.contactDistributor,
    userId: auth.userDetails.userId,
    setEdittingProcure: distributor.setEdittingProcure,
    saleCurrencies: auth.saleCurrencies,
    updatingProcureStep1: distributor.updatingProcureStep1,
    lobList: distributor.lobList,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateProcureStep1,
            getSaleCurrency,
            getLobList,
            getContactDistributorList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProcureStep1);