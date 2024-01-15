import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Listbox, } from '@headlessui/react'
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { FlexContainer } from "../../../Components/UI/Layout";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { updateDistributor } from "./AccountAction";
import { FormattedMessage } from "react-intl";
import { getCurrency } from "../../Auth/AuthAction";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DistributorSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  country: Yup.string().required("Input needed!"),
});

const UpdateAccountForm = ({
  fullName,
  orgId,
  customerListData,
  getCountry,
  getAllCustomerEmployeelist,
  currencies,
  setEditingDistributor,
  updateDisributorById,
  updateDistributor,
  userId,
  allCustomerEmployeeList,
  countries,
  getCustomer,
  getCurrency,
}) => {
  const [vatInd, setVatInd] = useState(false);

  useEffect(() => {
    getCurrency();
    getCustomer(orgId);
    getCountry();
    getAllCustomerEmployeelist();
  }, [getCountry, getCurrency, getAllCustomerEmployeelist]);

  const CountryOptions = countries.map((item) => ({
    label: `${item.country_name || ""}`,
    value: item.country_id,
  }));
  const customerTypeOptions = customerListData.map((item) => {
    return {
      label: `${item.name || ""}`,
      value: item.customerTypeId,
    };
  });
  const handlevat = () => {
    setVatInd(true)
  }
  const currencyOption = currencies.map((item) => ({
    label: item.currencyName || "",
    value: item.currencyName,
  }));
  const [defaultOption, setDefaultOption] = useState(fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = allCustomerEmployeeList.find((item) => item.fullName === selected);
  return (
    <>
      <Formik
        initialValues={{
          userId: userId,
          name: setEditingDistributor.name || "",
          countryId: setEditingDistributor.countryId || "",
          countryValue: setEditingDistributor.countryValue || "",
          insuranceGrade: setEditingDistributor.insuranceGrade || "",
          currencyPrice: setEditingDistributor.currencyPrice || "",
          currency: setEditingDistributor.currency || "",
          phoneNo: setEditingDistributor.phoneNo || "",
          assignedTo: selectedOption ? selectedOption.employeeId : userId,
          url: setEditingDistributor.url || "",
          description: setEditingDistributor.description || "",
          imageId: setEditingDistributor.imageId || "",
          notes: setEditingDistributor.notes || "",
          dialCode: setEditingDistributor.dialCode || "",
          clientId: setEditingDistributor.clientId || "",
          // address: [
          // {
          // country:setEditingCustomer.country || "",
          //   addressId: setEditingDistributor.address.address[0].addressId || "",
          //   address1: setEditingDistributor.address.length ? setEditingDistributor.address[0].address1 : "",
          //   address2:  setEditingDistributor.address.length ? setEditingDistributor.address[0].address2 : "",
          //   street:  setEditingDistributor.address.length ? setEditingDistributor.address[0].street : "",
          //   city:  setEditingDistributor.address.length ? setEditingDistributor.address[0].city : "",
          //   state:  setEditingDistributor.address.address[0].state || "",
          //   country: setEditingDistributor.address.length ? setEditingDistributor.address[0].country : "",
          //   postalCode:  setEditingDistributor.address.length ? setEditingDistributor.address[0].postalCode : "",             
          // },
          //   ],

          address: [
            {
              addressId: setEditingDistributor.address.length ? setEditingDistributor.address[0].addressId : "",
              addressType: setEditingDistributor.address.length ? setEditingDistributor.address[0].addressType : "",
              address1: setEditingDistributor.address.length ? setEditingDistributor.address[0].address1 : "",
              address2: setEditingDistributor.address.length ? setEditingDistributor.address[0].address2 : "",
              town: setEditingDistributor.address.length ? setEditingDistributor.address[0].town : "",
              street: setEditingDistributor.address.length ? setEditingDistributor.address[0].street : "",
              city: setEditingDistributor.address.length ? setEditingDistributor.address[0].city : "Null",
              state: setEditingDistributor.address.length ? setEditingDistributor.address[0].state : "",
              pinCode: setEditingDistributor.address.length ? setEditingDistributor.address[0].pinCode : "",
              country: setEditingDistributor.address.length ? setEditingDistributor.address[0].country : "",
              dialCode: setEditingDistributor.address.length ? setEditingDistributor.address[0].dialCode : "",
              latitude: setEditingDistributor.address.length ? setEditingDistributor.address[0].latitude : "",
              longitude: setEditingDistributor.address.length ? setEditingDistributor.address[0].longitude : "",
            },
          ],
        }}
        validationSchema={DistributorSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          updateDistributor(
            {
              ...values,
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
            },
            setEditingDistributor.distributorId,

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
            <div class="flex justify-between" >
            <div class=" h-full w-w47.5 max-sm:w-wk">
                <Field
                  isRequired
                  name="name"
                  type="text"
                  label={ <FormattedMessage
                    id="app.name"
                    defaultMessage="name"
                  />}
                  width={"100%"}
                  component={InputComponent}
                  placeholder="Start typing..."
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
                          id="app.dialCode"
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
                      label={
                        <FormattedMessage
                          id="app.phone"
                          defaultMessage="phone"
                        />
                      }
                      placeholder="Phone #"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                </div>
                <Field
                  isRequired
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
                  // placeholder="Start typing..."
                  isColumn
                  inlineLabel
                />
                <Spacer />
                <div class=" flex justify-between mt-4">
                  <div>
                  <FormattedMessage
                        id="app.vatvalidity"
                        defaultMessage="vatvalidity"
                      />
                    <Checkbox
                      checked={vatInd}
                      onChange={handlevat}
                    />
                  </div>
                </div>
                <div class=" flex justify-between mt-4">
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
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(CountryOptions) ? CountryOptions : []}
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
                 <div class=" flex justify-between mt-4">
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
                    <FastField
                      name="currency"
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="currency"
                        />
                      }
                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(currencyOption) ? currencyOption : []}
                    />
                  </div>
                </div>
                <div class=" flex justify-between mt-4">
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
                  <div class="w-w47.5">
                    <FastField
                      name="clientName"
                      label={
                        <FormattedMessage
                          id="app.type"
                          defaultMessage="type"
                        />
                      }
                      isColumn
                      inlineLabel
                      component={SelectComponent}
                      options={
                        Array.isArray(customerTypeOptions) ? customerTypeOptions : []
                      }
                    />
                  </div>
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
              <div class="w-w47.5">
                <div class="  w-full mt-2">
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
                <StyledLabel ><FormattedMessage
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
              </div>
            </div>
            <div class="flex justify-end mt-4" >
              <Button
                type="primary"
                htmlType="submit"
                loading={updateDisributorById}
              >
               <FormattedMessage
                        id="app.update"
                        defaultMessage="update"
                      />
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth, distributor, catgCustomer, rule, category, employee }) => ({
  userId: auth.userDetails.userId,
  vat: rule.vat,
  orgId: auth.userDetails.organizationId,
  customerListData: catgCustomer.customerListData,
  fullName: auth.userDetails.fullName,
  currencies: auth.currencies,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  setEditingDistributor: distributor.setEditingDistributor,
  updateDisributorById: distributor.updateDisributorById,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCountry,
      updateDistributor,
      getCustomer,
      getCurrency,
      getAllCustomerEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountForm);
