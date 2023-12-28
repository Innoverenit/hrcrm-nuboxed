import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import {
  getCustomer,

} from "../../Settings/Category/Customer/CustomerAction";
import { Listbox, Transition } from '@headlessui/react'
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addDistributor, setClearbitData } from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { getCurrency } from "../../Auth/AuthAction";
import { ProgressiveImage } from "../../../Components/Utils";
import { FormattedMessage } from "react-intl";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  country: Yup.string().required("Input needed!"),
  // dialCode: Yup.string().required("Input needed!"),
  // phoneNo: Yup.string().required("Input needed!"),
  // assignTo: Yup.string().required("Input needed!"),
});

const AddAccountForm = ({
  userId,
  groupId,
  vat,
  user,
  orgId,
  accounts,clearbit,fullName,allCustomerEmployeeList,
  customerListData,
  countries,
  currencies,
  country,
  setClearbitData,
  addingDistributor,
  addDistributor,

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
  }, [getCountry,getAllCustomerEmployeelist, getCustomer,, getCurrency, orgId]);

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
      label: `${item.name || ""}`,
      value: item.customerTypeId,
    };
  });

  const currencyOption = currencies.map((item) => {
    return {
      label: item.currencyName || "",
      value: item.currencyName,
    };
  });
  
  const [defaultOption, setDefaultOption] = useState(fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = allCustomerEmployeeList.find((item) => item.fullName === selected);
  return (
    <>
      <Formik
        initialValues={{
          userId: userId,
          name: "",
          phoneNo: "",
          url: "",
          description: "",
          dialCode: "",
          country: "",
          clientId: "",
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
              assignedTo: selectedOption ? selectedOption.employeeId:userId,
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
              assignedTo: selectedOption ? selectedOption.employeeId:userId,
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
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form class="form-background">
            <div class=" flex justify-around max-sm:flex-col ">
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
  <Spacer />
                    <Field
                        isRequired
                        name="name"
                        type="text"
                        label="Name"
                        width={"100%"}
                        // component={InputComponent}
                        setClearbitData={setClearbitData}
    component={ClearbitImage}
    accounts={accounts}
                        isColumn
                        inlineLabel
                    />
                    <Spacer />
                    <div class=" flex justify-between">
                    <div class=" w-2/6">
                            <FastField
                                name="dialCode"
                                isColumnWithoutNoCreate
                                label={
                                  <FormattedMessage
                                    id="app.countryDialCode"
                                    defaultMessage="Dial Code"
                                  />
                                }
                                isColumn
                                // width={"100%"}
                                selectType="dialCode"
                                component={SearchSelect}
                                inlineLabel
                            />
                        </div>
                        <div class=" w-[60%]">
                            <FastField
                                type="text"
                                // isRequired
                                name="phoneNo"
                                label="Phone"
                                placeholder="Phone #"
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
                        label="Website"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                    />
                    <Spacer />
                    <FlexContainer justify-content="space-evenly">
                        <div>
                            <b>VAT Validity</b>
                            <Checkbox
                            />
                        </div>
                    </FlexContainer>
                    <Spacer />
                    <div><b>VAT</b></div>
                    <Spacer />
                    <FlexContainer justifyContent="space-between">
                        <div style={{ width: "47%" }}>
                            <FastField
                                name="country"
                                label="Country"
                                isColumn
                                placeholder="Select"
                                inlineLabel
                                component={SelectComponent}
                                options={
                                    Array.isArray(CountryOptions) ? CountryOptions : []
                                  }
                            />
                        </div>
                        <div style={{ width: "47%" }}>
                            <FastField
                                label="Value"
                                name="countryValue"
                                placeholder="Value"
                                component={InputComponent}
                                inlineLabel
                                width={"100%"}
                                isColumn
                            />
                        </div>
                    </FlexContainer>
                    <Spacer />
                    {/* <Field
                        name="insuranceGrade"
                        type="text"
                        label="Insurance Grade"
                        width={"100%"}
                        component={InputComponent}
                        isColumn
                        inlineLabel
                    />
                    <Spacer /> */}
                    {/* <FlexContainer justifyContent="space-between">
                        <div style={{ width: "47%" }}>
                            <FastField
                                label="Credit Limit"
                                name="currencyPrice"
                                placeholder="Price"
                                component={InputComponent}
                                inlineLabel
                                width={"100%"}
                                isColumn
                            />
                        </div>
                        <div style={{ width: "47%" }}>
                            <FastField
                                name="currency"
                                label="Currency"
                                isColumn
                                inlineLabel
                                component={SelectComponent}
                                options={Array.isArray(currencyOption) ? currencyOption : []}
                            />
                        </div>
                    </FlexContainer>
                    <Spacer /> */}
                    <FlexContainer justifyContent="space-between">
                        <div style={{ width: "47%" }}>
                            <FastField
                                label="Payment Terms (in Days)"
                                name="payment"
                                placeholder="Select"
                                component={SelectComponent}
                                options={["7", "15", "21", "30", "45", "60", "75", "90","Custom"]}
                                inlineLabel
                                width={"100%"}
                                isColumn
                            />
                        </div>
                        <div style={{ width: "47%" }}>
                            <FastField
                                name="clientName"
                                label="Type"
                                isColumn
                                inlineLabel
                                component={SelectComponent}
                                options={
                                    Array.isArray(customerTypeOptions) ? customerTypeOptions : []
                                  }
                                // component={SelectComponent}
                                // options={["Marketplace", "Customer", "Distributor"]}
                            />
                        </div>
                    </FlexContainer>
                    <Spacer />
                    <Field
                        name="description"
                        label="Description"
                        width={"100%"}
                        isColumn
                        component={TextareaComponent}
                    />
                </div>
                <div class=" h-full w-w47.5 max-sm:w-wk">
                    <div class=" h-full w-full mt-2">
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] ">
              Assigned to
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
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.fullName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.fullName}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-white" : "text-indigo-600"
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
                    <Spacer />
                    <StyledLabel >Invoice Address</StyledLabel>
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
                </div>
            </div>
            <Spacer />
            <FlexContainer justifyContent="flex-end">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={addingDistributor}
                >
                    Create
                </Button>
            </FlexContainer>
        </Form>
        </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth, countrys,employee, catgCustomer, distributor, rule, groups, category }) => ({
  userId: auth.userDetails.userId,
  groupId: auth.userDetails.groupId,
  vat: rule.vat,
  fullName: auth.userDetails.fullName,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  customerListData: catgCustomer.customerListData,
  countries: auth.countries,
  clearbit: distributor.clearbit,
  currencies: auth.currencies,
  country: countrys.country,
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
