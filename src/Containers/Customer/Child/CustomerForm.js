import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
  addCustomer,
  setClearbitData
} from "../CustomerAction";
import { getCrm } from "../../Leads/LeadsAction";
import { Listbox } from '@headlessui/react';
import {getCurrency} from "../../Auth/AuthAction";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

function CustomerForm(props) {
   const[checked,setChecked]=useState(true);
  const[whiteblue,setWhiteblue]=useState(true);

  function handleWhiteBlue(checked) {
    setWhiteblue(checked);
  };

  function handleReset(resetForm) {
    resetForm();
  };
  function handleChange() {
    setChecked(
      !checked
    );
  };
  useEffect(() => {
    props.getAllCustomerEmployeelist();
    props.getSectors();
    props.getCrm();
    props.getCurrency();
  }, []);

    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingCustomer,
      addCustomer,
      clearbit,
      // setClearbitData,
    } = props;
   
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    const sortedSector =props.sectors.sort((a, b) => {
      const nameA = a.sectorName.toLowerCase();
      const nameB = b.sectorName.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const sectorOption = sortedSector.map((item) => {
      return {
        label: item.sectorName || "",
        value: item.sectorId,
      };
    });
    const sortedCurrency =props.currencies.sort((a, b) => {
      const nameA = a.currency_name.toLowerCase();
      const nameB = b.currency_name.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const currencyNameOption = sortedCurrency.map((item) => {
      return {
        label: `${item.currency_name}`,
        value: item.currency_name,
      };
    });

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = props.crmAllData.find((item) => item.empName === selected);
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          // sectorId:"",
          // sectorName:"",
          partnerName: "",
          // sectorDescription:"",
          name: "",
          url: "",
          gst: "",
          source: "",
          sectorId: "",
          country: props.user.country,
          email: "",
          // sector: props.user.sectorName,
          countryDialCode: props.user.countryDialCode,
          phoneNumber: "",
          fullName: "",
          category: checked ? "Both" : whiteblue ? "White" : "Blue",
          userId: props.userId,
          notes: "",
          businessRegistration: "",
          assignedTo: selectedOption ? selectedOption.employeeId : userId,
          department: "",
          address: [
            {
              address1: "",
              address2: "",
              street: "",
              city: "",
              state: "",
              postalCode: "",
              country: props.user.countryName,
            },
          ],
          category: whiteblue ? "White" : "Blue" || "Both",
        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          addCustomer(
            {
              ...values,
              category: checked ? "Both" : whiteblue ? "White" : "Blue",
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
            },
            props.userId,
            () => handleReset(resetForm)
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
          <div class="max-sm:h-[30rem] overflow-y-auto">
            <Form className="form-background">
              <div class="flex justify-between  pr-2 max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
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
                  <div class=" mt-3">
                    <Field
                      isRequired
                      name="name"
                      type="text"
                      //label="Name"
                      label={
                        <FormattedMessage id="app.name" defaultMessage="Name" />
                      }
                      isColumn
                      width={"100%"}
                      setClearbitData={props.setClearbitData}
                      component={ClearbitImage}
                      accounts={accounts}
                      inlineLabel
                    />
                  </div>
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={<FormattedMessage id="app.url" defaultMessage="URL" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  {/* <Field
                    name="email"
                    type="text"
                    // label="Email"
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />                   */}
                  <div class=" flex justify-between mt-3">
                    <div class=" w-3/12 max-sm:w-[30%]">
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        component={SearchSelect}
                        value={values.countryDialCode}
                        label={
                          <FormattedMessage
                            id="app.dialcode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        defaultValue={{
                          label:`+${props.user.countryDialCode}`,
                        }}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-8/12">
                      <FastField
                        name="phoneNumber"
                        label={
                          <FormattedMessage
                            id="app.phoneno"
                            defaultMessage="Phone No"
                          />
                        }
                        // label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div>


                  <div class=" flex justify-between mt-3">
                    <div class="w-w47.5 max-sm:w-w47.5">
                      <Field
                        placeholder="Sector"
                        name="sectorId"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SelectComponent}
                        value={values.sectorId}
                        options={
                          Array.isArray(sectorOption) ? sectorOption : []
                        }
                      />
                    </div>
                    <div class="w-w47.5">
                      <FastField
                        name="source"
                        type="text"
                        label={
                          <FormattedMessage
                            id="app.source"
                            defaultMessage="Source"
                          />
                        }
                        isColumnWithoutNoCreate
                        selectType="sourceName"
                        component={SearchSelect}
                        value={values.source}
                        inlineLabel
                        className="field"
                        isColumn
                      />
                    </div>
                    <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}
                      label={
                        <FormattedMessage
                          id="app.potential"
                          defaultMessage="Potential"
                        />
                      }
                      width="100%"
                      isColumn
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyNameOption)
                          ? currencyNameOption
                          : []
                      }
                    />
                  </div>
                  </div>


                  <div class=" mt-3">
                    <Field
                      name="notes"
                      // label="Notes"
                      label={
                        <FormattedMessage id="app.notes" defaultMessage="Notes" />
                      }
                      width={"100%"}
                      isColumn
                      component={TextareaComponent}
                    />
                  </div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                >

                  <div class=" flex justify-between mb-[0.35rem] mt-3">
                    <div class=" h-full w-full">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block font-semibold text-[0.75rem]  leading-lh1.2  "
                            // style={{boxShadow:"0em 0.25em 0.625em -0.25em" }}
                            >
                              <FormattedMessage
                                id="app.assignedTo"
                                defaultMessage="Assigned to"
                              />

                            </Listbox.Label>
                            <div className="relative ">
                              <Listbox.Button style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                {selected}
                              </Listbox.Button>
                              {open && (
                                <Listbox.Options
                                  static
                                  className="absolute z-10 max-h-56 w-full overflow-auto mt-1  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  {props.crmAllData.map((item) => (
                                    <Listbox.Option
                                      key={item.employeeId}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "text-white bg-indigo-600" : "text-gray-900"
                                        }`
                                      }
                                      value={item.empName}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            <span
                                              className={`ml-3 block truncate ${selected ? "font-semibold" : "font-normal"
                                                }`}
                                            >
                                              {item.empName}
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
                      {/* <Field
                    name="assignedTo"
                    selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    // component={SearchSelect}
                    isColumn
                    // value={values.employeeId}
                    // defaultValue={{
                    //   label: `${firstName || ""} ${middleName ||
                    //     ""} ${lastName || ""}`,
                    //   value: employeeId,
                    // }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                    inlineLabel
                  /> */}
                    </div>
                  </div>

                  <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                    <div class=" w-2/5 max-sm:w-wk">
                      <Field
                        name="vatNo"
                        type="text"
                        // label="VAT Number"
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-[10rem] max-sm:w-wk">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.businessregistration"
                            defaultMessage=" Business Registration#"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>

                  <div class="mt-8 w-full" style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                    <div>
                      <div class=" text-[white] text-xs" >
                        <FormattedMessage
                          id="app.corporateAddress"
                          defaultMessage="Corporate Address"
                        />

                      </div>
                    </div>
                  </div>
                  <div class=" mt-3">
                    <FieldArray
                      name="address"
                      label="Address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
                  </div>
                  {/* <div class=" flex justify-between">
                   <div class=" w-1/2 max-sm:w-wk">
                     <Field
                       name="country"
                       isColumnWithoutNoCreate
                       label={
                         <FormattedMessage
                           id="app.country"
                           defaultMessage="Country"
                         />
                       }
                       component={SearchSelect}
                       defaultValue={{
                         value: props.user.countryName,
                       }}
                       value={values.countryName}
                       selectType="country"
                       inlineLabel
                       isColumn
                       width="100%"
                     />
                   </div>
                 </div> */}

                </div>
              </div>

              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingCustomer}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}


const mapStateToProps = ({ auth, customer,employee ,investor,sector,leads}) => ({
  addingCustomer: customer.addingCustomer,
  addingCustomerError: customer.addingCustomerError,
  clearbit: customer.clearbit,
  user: auth.userDetails,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  sectors: sector.sectors,
  fullName: auth.userDetails.fullName,
  crmAllData:leads.crmAllData,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomer,
      setClearbitData,
      getSectors,
      getAllCustomerEmployeelist,
      getCrm,
      getCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
