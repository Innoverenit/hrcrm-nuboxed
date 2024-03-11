import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import { Listbox } from '@headlessui/react'
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addDistributor, setClearbitData } from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { getCurrency } from "../../Auth/AuthAction";
import { ProgressiveImage } from "../../../Components/Utils";
import { FormattedMessage } from "react-intl";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  country: Yup.string().required("Input needed!"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

const AddAccountForm = ({
  userId,
  groupId,
  vat,
  user,
  countryDialCode1,
  orgId,
  accounts, clearbit, fullName, allCustomerEmployeeList,
  countries,
  setClearbitData,
  addingDistributor,
  addDistributor,
  customerListData,
  currencies,
  getCountry,
  getAllCustomerEmployeelist,
  getCustomer,
  getCurrency,
}) => {
  const [vatInd, setVatInd] = useState(false);

  useEffect(() => {
    getCountry();
    getAllCustomerEmployeelist();
    getCustomer(orgId);
    getCurrency();

  }, []);

  const handleVatCheckBox = () => {
    setVatInd(true);
  };

  const CountryOptions = countries.map((item) => {
    return {
      label: `${item.country_name || ""}`,
      value: item.country_id,
    };
  });

  const customerTypeOptions = customerListData.map((item) => {
    return {
      label: `${item.name}`,
      value: item.customerTypeId,
    };
  });

  const currencyOption = currencies.map((item) => {
    return {
      label: item.currency_name || "",
      value: item.currency_name,
    };
  });
  console.log(countryDialCode1)

  const [defaultOption, setDefaultOption] = useState(fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = allCustomerEmployeeList.find((item) => item.fullName === selected);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          userId: userId,
          name: "",
          phoneNo: "",
          url: "",
          description: "",
          dialCode: "",
          country: "",
          currency: "",
          clientId: "",
          payment: "",
          customPayment: "",
          groupId: groupId,
          vatInd: vatInd,
          address: [
            {
              addressType: "",
              address1: "",
              address2: "",
              town: "",
              street: "",
              city: "",
              postalCode: "",
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
              country: user.countryName,
              latitude: "",
              state: "",
              longitude: "",
            },
          ],
        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          addDistributor(
            {
              ...values,
              payment: values.payment === "Custom" ? values.customPayment : values.payment,
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
            },
            userId,
            resetForm()
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
          // <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form class="form-background">
            <div class=" flex justify-between max-sm:flex-col ">
              <div class=" h-full w-w47.5 max-sm:w-wk">
                <div>
                  {clearbit && clearbit.hasOwnProperty("logo") && (
                    <ProgressiveImage
                      preview={
                        "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
                      }
                      image={clearbit.logo}
                      width={140}
                      height={150}
                      borderRadius={25}
                      padding={15}

                    />
                  )}
                  {clearbit && clearbit.hasOwnProperty("logo") ? (
                    <a
                      href="https://clearbit.com"
                      target="_blank"
                      style={{ fontSize: 13, marginLeft: 5 }}
                    >
                      Logos provided by Clearbit
                    </a>
                  ) : null}
                </div>
                <div class="mt-4">
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    label={<FormattedMessage
                      id="app.name"
                      defaultMessage="name"
                    />}
                    width={"100%"}
                    // component={InputComponent}
                    setClearbitData={setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    isColumn
                    inlineLabel
                  />
                </div>
                <div class=" flex justify-between mt-4">
                  <div class=" w-2/6">
                    <FastField
                      name="dialCode"
                      isColumnWithoutNoCreate
                      label={
                        <FormattedMessage
                          id="app.dialCode"
                          defaultMessage="Dial Code"
                        />
                      }
                      isColumn
                      value={countryDialCode1}
                      selectType="dialCode"
                      component={SearchSelect}
                      inlineLabel
                    />
                  </div>

                  <div class=" w-[60%]">
                    <FastField
                      name="phoneNo"
                      label={
                        <FormattedMessage
                          id="app.phone"
                          defaultMessage="phone"
                        />
                      }
                      placeholder="Mobile #"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                </div>
                <Field
                  // isRequired
                  name="url"
                  type="text"
                  label={
                    <FormattedMessage
                      id="app.website"
                      defaultMessage="website"
                    />
                  }
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                />
                <div class="flex  mt-4" >
                  <div>
                    <b><FormattedMessage
                      id="app.vatvalidity"
                      defaultMessage="vatvalidity"
                    /></b>
                    <Checkbox
                      checked={vatInd}
                      onChange={handleVatCheckBox}
                    />
                  </div>
                </div>


                <div class="flex justify-between mt-4" >
                  <div class="w-w47.5">
                    <FastField
                      name="country"
                      label={
                        <FormattedMessage
                          id="app.country"
                          defaultMessage="country"
                        />
                      }
                      isColumn
                      placeholder="Select"
                      inlineLabel
                      component={SelectComponent}
                      options={
                        Array.isArray(CountryOptions) ? CountryOptions : []
                      }
                    />
                  </div>
                  <div class="w-w47.5">
                    <FastField
                      label={
                        <FormattedMessage
                          id="app.vat"
                          defaultMessage="vat"
                        />
                      }
                      name="countryValue"
                      placeholder="Value"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                </div>
                <div class="flex justify-between mt-4" >
                  <div class="w-w47.5">
                    <Field
                      name="insuranceGrade"
                      type="text"
                      label={
                        <FormattedMessage
                          id="app.insurancegrade"
                          defaultMessage="insurancegrade"
                        />
                      }
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class="w-w47.5">
                    <Field
                      name="clientId"
                      label={
                        <FormattedMessage
                          id="app.type"
                          defaultMessage="Type"
                        />
                      }
                      isColumn
                      placeholder="Type"
                      component={SelectComponent}
                      options={
                        Array.isArray(customerTypeOptions)
                          ? customerTypeOptions
                          : []
                      }

                    />
                  </div>
                </div>
                <div class="flex justify-between mt-4" >
                  <div class="w-w47.5">
                    <FastField
                      label={
                        <FormattedMessage
                          id="app.creditlimit"
                          defaultMessage="creditlimit"
                        />
                      }
                      name="currencyPrice"
                      placeholder="Price"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  <div class="w-w47.5">
                    <Field
                      name="currency"
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />
                      }
                      isColumn
                      placeholder="Currency"
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyOption)
                          ? currencyOption
                          : []
                      }

                    />
                  </div>
                </div>
                <div class="flex justify-between mt-4" >
                  <div class="w-w47.5">
                    <FastField
                      label={
                        <FormattedMessage
                          id="app.Paymenttermdays"
                          defaultMessage="Paymenttermdays"
                        />
                      }
                      name="payment"
                      placeholder="Select"
                      component={SelectComponent}
                      options={["7", "15", "21", "30", "45", "60", "75", "90", "Custom"]}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  {values.payment === "Custom" && <div class="w-w47.5">
                    <FastField
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

              </div>
              <div class=" h-full w-w47.5 max-sm:w-wk">
                <div class=" h-full w-full mt-3">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="block font-semibold text-[0.75rem] ">
                          <FormattedMessage
                            id="app.assignedto"
                            defaultMessage="assignedto"
                          />
                        </Listbox.Label>
                        <div className="relative mt-[0.1rem]">
                          <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            {selected}
                          </Listbox.Button>
                          {open && (
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {allCustomerEmployeeList.map((item) => (
                                <Listbox.Option
                                  key={item.employeeId}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "text-white bg-indigo-600" : "text-gray-900"
                                    }`
                                  }
                                  value={item.fullName}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className="flex items-center">
                                        <span
                                          className={`ml-3 block truncate ${selected ? "font-semibold" : "font-normal"
                                            }`}
                                        >
                                          {item.fullName}
                                        </span>
                                      </div>
                                      {selected && (
                                        <span
                                          className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
                                            }`}
                                        >

                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          )}
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                <div class="mt-4">
                  <StyledLabel > <FormattedMessage
                    id="app.billingaddress"
                    defaultMessage="billingaddress"
                  /></StyledLabel>
                </div>
                <div>
                  <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                </div>
                <div class="mt-4">
                  <Field
                    name="description"
                    label={
                      <FormattedMessage
                        id="app.description"
                        defaultMessage="description"
                      />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-4" >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "3rem", marginTop: "65px" }}
                className=" w-16 absolute top-3/4 right-0"
                loading={addingDistributor}
              >
                <FormattedMessage
                  id="app.create"
                  defaultMessage="create"
                />
              </Button>
            </div>
          </Form>
          // </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth, countrys, employee, catgCustomer, distributor, rule, groups, category }) => ({
  userId: auth.userDetails.userId,
  groupId: auth.userDetails.groupId,
  vat: rule.vat,
  fullName: auth.userDetails.fullName,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  customerListData: catgCustomer.customerListData,
  countries: auth.countries,
  clearbit: distributor.clearbit,
  currencies: auth.currencies,
  country: countrys.country,
  countryDialCode1: auth.userDetails.countryDialCode1,
  addingDistributor: distributor.addingDistributor,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDistributor,
      setClearbitData,
      getCountry,
      getCustomer,
      getAllCustomerEmployeelist,
      getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);


