import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { getCrm } from "../../Leads/LeadsAction";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import { Listbox } from '@headlessui/react'
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { addDistributor, setClearbitData ,emptyClearbit} from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { getSaleCurrency, getCategory } from "../../Auth/AuthAction";
import { ProgressiveImage } from "../../../Components/Utils";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // clientId: Yup.string().required("Input needed!"),
  country: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  url: Yup.string().required("Input needed!"),
  // phoneNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

const AddAccountForm = ({
  userId,
  groupId,
  vat,
  user,
  countryDialCode1,
  orgId,
  accounts, clearbit, fullName, allCustomerEmployeeList,
  crmAllData,
  countries,
  setClearbitData,
  addingDistributor,
  addDistributor,
  customerListData,
  saleCurrencies,
  getCountry,
  getAllCustomerEmployeelist,
  getCrm,
  getCustomer,
  getSaleCurrency,
  getCategory,
  emptyClearbit,
  category,
  translateText,
  selectedLanguage,
}) => {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
                "110",    // " Name",1
                "357",   // "Dial Code",2
                "102",   // "Phone",3
                "700",    // "Website",4
                    "1109",    // "Country",5
                    "702",  // "Tax Registration",6
                    "703",// "Insurancegrade",7
                    "71",   // "Type",8
                    "705",   // "Creditlimit",9
                    "241",   // "Currency",10
                    "707",// "Payment Term Days",11
                    "14",  // "Category",12
                    "",  // "Custom Payment",13
                    "76",  // "Assigned",14
                    "147",  // "Description",`15
                    "104",  //    "Create"16
                   "158" ,// Start17
                   "5" ,// "Stop  18
                   "194", // "Clear19
                   
      ];

        const translations = await translateText(itemsToTranslate, selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [selectedLanguage]);

  useEffect(() => {
    getCountry();
    getAllCustomerEmployeelist();
    getCrm();
    getCustomer(orgId);
    getSaleCurrency();
    getCategory(orgId);


  }, []);
  useEffect(() => {
    return () => {
      emptyClearbit(); 
    };
  }, [emptyClearbit]);

  const [billingSameAsCommunication, setBillingSameAsCommunication] = useState(false);

  const handleToggleChange = () => {
    setBillingSameAsCommunication(!billingSameAsCommunication);
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

  const currencyOption = saleCurrencies.map((item) => {
    return {
      label: item.currency_name || "",
      value: item.currency_id,
    };
  });

  const categoryOption = category.map((item) => {
    return {
      label: item.name || "",
      value: item.categoryId,
    };
  });


  console.log(countryDialCode1)

  const [defaultOption, setDefaultOption] = useState(fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = crmAllData.find((item) => item.empName === selected);
  // console.log(category.categoryId)
  const [text, setText] = useState("");
  function handletext(e) {
    setText(e.target.value);
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          userId: userId,
          dcategory: "",
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
          vatInd: false,
          insuranceGrade: "",
          countryValue: "",
          currencyPrice: "",
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
              orgId: orgId,
              vatInd: values.vatInd ? true : false,
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[0]}</div>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    // label={<FormattedMessage
                    //   id="app.name"
                    //   defaultMessage="name"
                    // />}
                    width={"100%"}
                    // isColumnWithoutNoCreate
                    setClearbitData={setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    isColumn
                    inlineLabel
                    style={{ borderRight: "3px red solid" }}
                  />
                </div>
                <div class=" flex justify-between mt-4">
                  <div class=" w-2/6">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[1]}</div>
                  
                    <FastField
                      name="dialCode"
                      isColumnWithoutNoCreate
                      // label={
                      //   <FormattedMessage
                      //     id="app.dialCode"
                      //     defaultMessage="Dial Code"
                      //   />
                      // }
                      isColumn
                      value={countryDialCode1}
                      selectType="dialCode"
                      component={SearchSelect}
                      inlineLabel
                    />
                  </div>

                  <div class=" w-[60%]">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[2]}</div>
                
                    <FastField
                      name="phoneNo"
                      // label={
                      //   <FormattedMessage
                      //     id="app.phone"
                      //     defaultMessage="phone"
                      //   />
                      // }
                      placeholder="Mobile #"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                </div>
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[3]}</div>
                <Field
                  // isRequired
                  name="url"
                  type="text"
                  // label={
                  //   <FormattedMessage
                  //     id="app.website"
                  //     defaultMessage="website"
                  //   />
                  // }
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  disable
                  inlineLabel
                />
                {/* <div class="flex  mt-4" >
                  <div>
                    <b><FormattedMessage
                      id="app.vatvalidity"
                      defaultMessage="vatvalidity"
                    /></b>
                    <Field
                      name="vatInd"
                      component={SwitchComponent}
                      data={values.vatInd}
                      checkedChildren={"Yes"}
                      unCheckedChildren={"No"}
                      width={"5em"}
                    />

                  </div>
                </div> */}


                <div class="flex justify-between mt-4" >
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                  <div class="w-w47.5">
                    <FastField
                      name="country"
                      // label={
                      //   <FormattedMessage
                      //     id="app.country"
                      //     defaultMessage="country"
                      //   />
                      // }
                      isColumn
                      placeholder="Select"
                      inlineLabel
                      style={{ borderRight: "4px red solid" }}
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(CountryOptions) ? CountryOptions : []
                      }
                    />
                  </div>
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[5]}</div>
                    <FastField
                      // label="Tax Registration"
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
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[6]}</div>
                  <div class="w-w47.5">
                    <Field
                      name="insuranceGrade"
                      type="text"
                      // label={
                      //   <FormattedMessage
                      //     id="app.insurancegrade"
                      //     defaultMessage="insurancegrade"
                      //   />
                      // }
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[7]}</div>
                    <Field
                      name="clientId"
                      // label={
                      //   <FormattedMessage
                      //     id="app.type"
                      //     defaultMessage="Type"
                      //   />
                      // }
                      isColumn
                      // style={{ borderRight: "3px red solid" }}
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
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
                  <div class="w-w47.5">
                    <FastField
                      // label={
                      //   <FormattedMessage
                      //     id="app.creditlimit"
                      //     defaultMessage="creditlimit"
                      //   />
                      // }
                      name="currencyPrice"
                      placeholder="Price"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                    <Field
                      name="currency"
                      // label={
                      //   <FormattedMessage
                      //     id="app.currency"
                      //     defaultMessage="Currency"
                      //   />
                      // }
                      isColumn
                      placeholder="Currency"
                      component={SelectComponent}
                      style={{ borderRight: "4px red solid" }}
                      options={
                        Array.isArray(currencyOption)
                          ? currencyOption
                          : []
                      }

                    />
                  </div>
                </div>
                <div class="flex justify-between mt-4" >
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
                  <div class="w-w47.5">
                    <FastField
                      // label={
                      //   <FormattedMessage
                      //     id="app.Paymenttermdays"
                      //     defaultMessage="Paymenttermdays"
                      //   />
                      // }
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[11]}</div>
                    <Field
                      name="dcategory"
                      // label="Category"
                      isColumn
                      placeholder="Select"
                      style={{ borderRight: "3px red solid" }}
                      component={SelectComponent}
                      options={
                        Array.isArray(categoryOption)
                          ? categoryOption
                          : []
                      }

                    />
                  </div>
                  {values.payment === "Custom" && <div class="w-w47.5">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[12]}</div>
                    <FastField
                      // label={
                      //   <FormattedMessage
                      //     id="app.Custom Payment"
                      //     defaultMessage="Custom Payment"
                      //   />
                      // }
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
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[13]}</div>
                <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            {/* <Listbox.Label className="block font-semibold text-[0.75rem]  leading-lh1.2  "
                            // style={{boxShadow:"0em 0.25em 0.625em -0.25em" }}
                            >
                              <FormattedMessage
                                id="app.assignedTo"
                                defaultMessage="Assigned"
                              />

                            </Listbox.Label> */}
                            <div className="relative ">
                              <Listbox.Button style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                {selected}
                              </Listbox.Button>
                              {open && (
                                <Listbox.Options
                                  static
                                  className="absolute z-10 max-h-56 w-full overflow-auto mt-1  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  {crmAllData.map((item) => (
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
                </div>
                <div class="mt-4">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[14]}</div>
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
                {/* <div class="flex items-center">
        <div>Billing Address Same as Communication Address</div>
        <div className="toggle mt-1 ml-2">
          <input type="checkbox" checked={billingSameAsCommunication} onChange={handleToggleChange} />
          <span className="slider round"></span>
        </div>
      </div>
      {!billingSameAsCommunication && (
        <div class="flex flex-col">
                <div class="mt-4">
                  <div class=" text-xs font-bold font-poppins"> Billing Address</div>
                </div>
                 
                <div>
                  <FieldArray
                    name="pickUpAddress"
                    render={(arrayHelpers) => (
                      <AddressFieldArray4
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                </div>
                </div>
                )} */}
                <div class="mt-4">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[15]}</div>
                    <div>
                  <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span
                          
                            class="!text-icon ml-1 text-green-600">
                          <StopCircleIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span  class="!text-icon ml-1">
                          <RotateRightIcon />
                        </span>
                      </Tooltip>
                    </span>
                  </div> 
                   <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea>
                  </div>
                </div>
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
              {translatedMenuItems[16]}
              </Button>
            </div>
          </Form>
          // </div>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth, countrys, leads,employee, catgCustomer, distributor, rule, groups, category }) => ({
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
  saleCurrencies: auth.saleCurrencies,
  category: auth.category,
  country: countrys.country,
  countryDialCode1: auth.userDetails.countryDialCode1,
  addingDistributor: distributor.addingDistributor,
  crmAllData:leads.crmAllData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      emptyClearbit,
      addDistributor,
      setClearbitData,
      getCountry,
      getCustomer,
      getCrm,
      getAllCustomerEmployeelist,
      getSaleCurrency,
      getCategory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);