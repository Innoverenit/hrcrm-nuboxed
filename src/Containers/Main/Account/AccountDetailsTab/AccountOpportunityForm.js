import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import * as Yup from "yup";
import { getBrandCategoryData } from "../../../../Containers/Settings/Category/BrandCategory/BrandCategoryAction";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { Button, Tooltip, Select, Input } from "antd";
import { getSaleCurrency, getAllDialCodeList } from "../../../Auth/AuthAction";
import { getContactDistributorList } from "../../Suppliers/SuppliersAction";
import {
  addQuotationOrderForm,
  addOrderProcurementForm,
  addOrderForm,
  getLobList,
} from "../AccountAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ValidationAddressField from "../../../../Components/Forms/Formik/ValidationAddressField";
import dayjs from "dayjs";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";

const { Option } = Select;

const addressSchema = Yup.object().shape({
  address1: Yup.string().required("Address is required"),
  street: Yup.string().required("Street is required"),
});

const FormSchema = Yup.object().shape({
  lobDetsilsId: Yup.string().required("Input needed!"),
  advancePayment: Yup.number().positive().typeError("Number Required!"),
  contactPersonId: Yup.string().required("Input needed!"),
  orderCurrencyId: Yup.string().required("Input needed!"),
  customPayment: Yup.number().typeError("Number Required!"),
  loadingAddress: Yup.array()
    .of(addressSchema)
    .min(1, "At least one address is required"),
});
function AccountOpportunityForm(props) {
  const [selectOnType, setselectOnType] = useState("Procure");
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    countryDialCode: "",
  });

  const handleOnSelectType = (ontype) => {
    setselectOnType(ontype);
  };
  const handleAddContact = () => {
    setIsAddingContact(true);
  };
  const handleMobileKeyPress = async (e) => {
    if (e.key === "Enter") {
      console.log("New Contact Added:", newContact);
      let data = {
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        emailId: newContact.emailId,
        phoneNumber: newContact.phoneNumber,
        countryDialCode: newContact.countryDialCode,
        distributorId: props.distributorId,
        userId: props.userId,
      };

      try {
        const response = await axios.post(`${base_url2}/contactPerson`, data, {
          headers: {
            Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
          },
        });
        setIsAddingContact(false);
        setNewContact({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          dialCode: "",
        });
        props.getContactDistributorList(props.distributorId, props.type);
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    }
  };
  const handleRemoveFields = () => {
    setIsAddingContact(false);
    setNewContact({
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      countryDialCode: "",
      distributorId: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };
  const handleDialCodeChange = (value) => {
    setNewContact((prev) => ({ ...prev, countryDialCode: value }));
  };

  const contactOption = props.contactDistributor.map((item) => {
    return {
      value: item.contactPersonId,
      label: `${item.firstName || ""} ${item.lastName || ""}`,
    };
  });

  useEffect(() => {
    props.getContactDistributorList(props.distributorId, props.type);
    props.getSaleCurrency();
    props.getLobList(props.orgId);
    props.getBrandCategoryData(props.orgId);
    props.getAllDialCodeList();
  }, []);

  const [priority, setPriority] = useState("High");

  function handleButtonClick(type) {
    console.log(type);
    setPriority(type);
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
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
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
        orderCurrencyId: "",
        shipById: "",
        totalPhoneCount: "",
        advancePayment: "",
        distributorId: props.distributorId,
        userId: props.userId,
        orderId: "",
        lobDetsilsId: "",
        priority: priority || "",
        orgId: props.orgId,
        loadingAddress: [
          {
            address1: "",
            street: "",
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
        console.log(priority);
        if (props.currentOrderType === "Quotation") {
          props.addQuotationOrderForm(
            {
              ...values,
              orderSource: "B2B ERP",
              priority: priority || "",
              orderType: selectOnType,
              paymentInTerms:
                values.paymentInTerms === "Custom"
                  ? values.customPayment
                  : values.paymentInTerms,
            },
            props.distributorId
          );
        } else if (props.currentOrderType === "Commerce") {
          props.addOrderProcurementForm(
            {
              ...values,
              orderSource: "erp",
              priority: priority || "",
              paymentInTerms:
                values.paymentInTerms === "Custom"
                  ? values.customPayment
                  : values.paymentInTerms,
              orderType: "Procure",
            },
            props.distributorId
          );
        } else if (props.currentOrderType === "Repair") {
          props.addOrderForm(
            {
              ...values,
              orderSource: "erp",
              priority: priority || "",
              paymentInTerms:
                values.paymentInTerms === "Custom"
                  ? values.customPayment
                  : values.paymentInTerms,
              orderType: "Repair",
            },
            props.distributorId
          );
        }
      }}
    >
      {({ values, handleChange }) => (
        <div class="overflow-y-auto h-[28rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form>
            <div class=" flex justify-between">
              <div class=" w-[45%] flex-col flex">
                <div class=" flex justify-between">
                  <div class="flex items-center justify-center w-[35%]">
                    <div class="flex h-fit">
                      {props.currentOrderType === "Quotation" && (
                        <>
                          <div
                            className={
                              selectOnType === "Procure"
                                ? "bg-green-400 text-white border rounded-md"
                                : "bg-purple-400 text-black border rounded-md"
                            }
                            onClick={() => handleOnSelectType("Procure")}
                          >
                            {props.translatedMenuItems[12]}
                            {/* Commerce */}
                          </div>
                          &nbsp;
                          <div
                            className={
                              selectOnType === "Repair"
                                ? "bg-green-400 text-white rounded-md"
                                : "bg-purple-400 text-black border rounded-md"
                            }
                            onClick={() => handleOnSelectType("Repair")}
                          >
                            {/* Repair */} {props.translatedMenuItems[1]}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div class="w-[35%] ">
                    <div class=" text-xs font-bold font-poppins text-black">
                      {/* Priority  */} {props.translatedMenuItems[134]}
                    </div>
                    <div class="justify-between flex">
                      <div>
                        <Tooltip title={props.translatedMenuItems[33]}>
                          <Button
                            shape="circle"
                            onClick={() => handleButtonClick("High")}
                            style={{
                              backgroundColor:
                                priority === "High" ? "red" : "white",
                              borderRadius: "50%",
                              width: "31px",
                              height: "31px",
                            }}
                          />
                        </Tooltip>
                        &nbsp;
                        <Tooltip title={props.translatedMenuItems[37]}>
                          <Button
                            shape="circle"
                            onClick={() => handleButtonClick("Low")}
                            style={{
                              backgroundColor:
                                priority === "Low" ? "teal" : "white",
                              borderRadius: "50%",
                              width: "31px",
                              height: "31px",
                            }}
                          ></Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="w-[30%]">
                    <Field
                      name="deliveryDate"
                      label={props.translatedMenuItems[135]}
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
                {values.orderType === "Repair" ? (
                  <div className="mt-3">
                    <div class=" text-xs font-bold font-poppins text-black">
                      <div>Pickup Address</div>
                    </div>
                    <FieldArray
                      name="loadingAddress"
                      render={(arrayHelpers) => (
                        <ValidationAddressField
                          {...props}
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
                      <div>
                        {/* Delivery Address */}{" "}
                        {props.translatedMenuItems[136]}
                      </div>
                    </div>
                    <FieldArray
                      name="loadingAddress"
                      render={(arrayHelpers) => (
                        <ValidationAddressField
                          {...props}
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
                    label={props.translatedMenuItems[5]}
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
                      label={props.translatedMenuItems[137]}
                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={[
                        "7",
                        "15",
                        "21",
                        "30",
                        "45",
                        "60",
                        "75",
                        "90",
                        "Custom",
                      ]}
                    />
                  </div>
                  {values.paymentInTerms === "Custom" && (
                    <div class="w-[45%]">
                      <Field
                        label={props.translatedMenuItems[138]}
                        name="customPayment"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  )}
                </div>
                <div class="justify-between flex mt-3">
                  <div class="w-[45%]">
                    <Field
                      name="orderCurrencyId"
                      label={props.translatedMenuItems[116]}
                      isColumn
                      style={{ borderRight: "3px red solid" }}
                      inlineLabel
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyOption) ? currencyOption : []
                      }
                    />
                  </div>

                  <div class="w-[45%]">
                    <Field
                      width={"100%"}
                      name="advancePayment"
                      label={props.translatedMenuItems[139]}
                      isColumn
                      inlineLabel
                      component={InputComponent}
                    />
                  </div>
                </div>
                <div class="justify-between flex mt-3">
                  <div class="w-[45%] ">
                    <Field
                      name="shipById"
                      label={props.translatedMenuItems[31]}
                      isColumn
                      style={{ borderRight: "3px red solid" }}
                      inlineLabel
                      component={SelectComponent}
                      options={
                        Array.isArray(categoryOption) ? categoryOption : []
                      }
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

                <div class="w-[45%] mt-2">
                  <div class="flex items-center">
                    <div class="font-bold font-poppins text-xs">
                      {/* Contact */} {props.translatedMenuItems[9]}
                    </div>
                    <span>
                      <AddCircleIcon
                        className="text-[red] !text-icon"
                        onClick={handleAddContact}
                      />
                    </span>
                  </div>

                  <Field
                    style={{ borderRight: "3px red solid" }}
                    name="contactPersonId"
                    placeholder="Value"
                    component={SelectComponent}
                    options={Array.isArray(contactOption) ? contactOption : []}
                    inlineLabel
                    width={"100%"}
                    isColumn
                  />
                  {isAddingContact && (
                    <div class="flex  justify-between max-sm:flex-col mt-[0.75rem]">
                      <div className="flex justify-between w-[100%]">
                        <div class=" w-[100%] max-sm:w-wk">
                          <div className="font-bold text-xs">
                            {/* Customer */}
                          </div>
                          <Input
                            placeholder="First Name"
                            name="firstName"
                            style={{ marginLeft: "-6px" }}
                            value={newContact.firstName}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div class=" w-[100%] max-sm:w-wk">
                          <div className="font-bold text-xs">
                            {/* Customer */}
                          </div>
                          <Input
                            placeholder="Last Name"
                            name="lastName"
                            style={{ marginLeft: "-4px" }}
                            value={newContact.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col w-[100%]">
                        <div class=" w-w47.5.5 max-sm:w-wk">
                          <div className="font-bold text-[0.75rem]"></div>
                          <Select
                            placeholder="Select dialcode"
                            name="countryDialCode"
                            style={{ width: "80px" }}
                            onChange={handleDialCodeChange}
                            value={newContact.dialCode}
                          >
                            {props.dialcodeList.map((contact) => (
                              <Option
                                key={`+${contact.country_dial_code}`}
                                value={`+${contact.country_dial_code}`}
                              >
                                {`+${contact.country_dial_code}`}
                              </Option>
                            ))}
                          </Select>
                        </div>

                        <div class=" w-[100%] max-sm:w-wk">
                          <div className="font-bold text-[0.75rem]"></div>
                          <Input
                            placeholder="Mobile No"
                            name="phoneNumber"
                            value={newContact.mobile}
                            onChange={handleInputChange}
                            style={{ flex: 1, marginLeft: "-1px" }}
                          />
                        </div>
                        <div class=" w-[100%] max-sm:w-wk">
                          <div className="font-bold text-xs"></div>
                          <Input
                            placeholder="Email"
                            name="emailId"
                            value={newContact.email}
                            onChange={handleInputChange}
                            onKeyPress={handleMobileKeyPress}
                          />
                          <CancelIcon
                            className="cursor-pointer text-[red] ml-2"
                            onClick={handleRemoveFields}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div class=" mt-3 flex justify-between">
                  <div class="w-[100%]  mt-[68px] flex justify-end">
                    <Button
                      className="bg-[#3695cd] text-white text-xs pt-0 pr-3"
                      htmlType="Submit"
                      loading={
                        props.currentOrderType === "Quotation"
                          ? props.addingQuotationOrder
                          : props.currentOrderType === "Commerce"
                          ? props.addingOrderProcurement
                          : props.addingOrder
                      }
                    >
                      {props.translatedMenuItems[48]}
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

const mapStateToProps = ({
  homeStepper,
  brandCategory,
  auth,
  distributor,
  suppliers,
}) => ({
  contactDistributor: suppliers.contactDistributor,
  userId: auth.userDetails.userId,
  saleCurrencies: auth.saleCurrencies,
  addingQuotationOrder: distributor.addingQuotationOrder,
  lobList: distributor.lobList,
  orgId: auth.userDetails.organizationId,
  BrandCategoryData: brandCategory.BrandCategoryData,
  moduleMapper: auth.userDetails.moduleMapper,
  dialcodeList: auth.dialcodeList,
  addingOrderProcurement: distributor.addingOrderProcurement,
  addingOrder: distributor.addingOrder,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addQuotationOrderForm,
      getSaleCurrency,
      getLobList,
      getContactDistributorList,
      getBrandCategoryData,
      getAllDialCodeList,
      addOrderProcurementForm,
      addOrderForm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOpportunityForm);
