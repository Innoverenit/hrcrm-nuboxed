import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip} from "antd";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { Listbox, } from '@headlessui/react'
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { updateDistributor ,setClearbitData} from "./AccountAction";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { getCrm} from "../../Leads/LeadsAction";
import { getSaleCurrency, getCategory } from "../../Auth/AuthAction";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DistributorSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // clientId: Yup.string().required("Input needed!"),
  country: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  // phoneNo: Yup.string().required("Input needed!").matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

const UpdateAccountForm = ({
  fullName,
  orgId,
  setClearbitData,
  customerListData,
  getCountry,
  getAllCustomerEmployeelist,
  saleCurrencies,
  setEditingDistributor,
  updateDisributorById,
  updateDistributor,
  userId,
  clearbit,
  allCustomerEmployeeList,
  crmAllData,
  countries,
  getCustomer,
  accounts,
  getCrm,
  getSaleCurrency,
  getCategory,
  category,
  translateText,
  selectedLanguage,
}) => {
  const [vatInd, setVatInd] = useState(setEditingDistributor.vatInd);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
                "110",    // " Name",0
                "357",   // "Dial Code",1
                "102",   // "Phone",2
                "700",    // "Website",3
                    "1109",    // "Country",4
                    "702",  // "Tax Registration",5
                    "703",// "Insurancegrade",6
                    "71",   // "Type",7
                    "705",   // "Creditlimit",8
                    "241",   // "Currency",9
                    "707",// "Payment Term Days",10
                    "14",  // "Category",11
                    "1466",  // "Custom Payment",12
                    "76",  // "Assigned",13
                    "147",  // "Description",`14
                    "1246",  //    "update"15
                   "158" ,// Start16
                   "5" ,// "Stop  17
                   "194", // "Clear18
                   "710" ,//  Billing address
                  "1"//  select
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
    getSaleCurrency();
    getCustomer(orgId);
    getCountry();
    getCrm();
    getCategory(orgId);
    getAllCustomerEmployeelist();
  }, [getCountry, getSaleCurrency, getAllCustomerEmployeelist]);

  const [billingSameAsCommunication, setBillingSameAsCommunication] = useState(false);

  const handleToggleChange = () => {
    setBillingSameAsCommunication(!billingSameAsCommunication);
  };

  const CountryOptions = countries.map((item) => ({
    label: `${item.country_name || ""}`,
    value: item.country_id,
  }));
  const dialCodeOptions = countries.map((item) => ({
    label: `${item.country_dial_code || ""}`,
    value: item.country_dial_code,
  }));
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
  const handlevat = () => {
    setVatInd(!vatInd)
  }
 
  const [defaultOption, setDefaultOption] = useState(setEditingDistributor.assignTo);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = crmAllData.find((item) => item.fullName === selected);
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
        initialValues={{
          userId: userId,
          payment: setEditingDistributor.payment || "",
          name: setEditingDistributor.name || "",
          country: setEditingDistributor.countryId || "",
          countryValue: setEditingDistributor.countryValue || "",
          insuranceGrade: setEditingDistributor.insuranceGrade || "",
          currencyPrice: setEditingDistributor.currencyPrice || "",
          currency: setEditingDistributor.currency || "",
          phoneNo: setEditingDistributor.phoneNo || "",
          dcategory: setEditingDistributor.dCategory || "",
          assignTo:selectedOption ? selectedOption.employeeId:setEditingDistributor.employeeId,
          // assignedTo: selectedOption ? selectedOption.employeeId : userId,
          url: setEditingDistributor.url || "",
          description: setEditingDistributor.description || "",
          imageId: setEditingDistributor.imageId || "",
          notes: setEditingDistributor.notes || "",
          customPayment: "",
          dialCode: setEditingDistributor.dialCode || "",
          clientId: setEditingDistributor.clientName || "",
          imageURL:setEditingDistributor.imageURL || "",
          // address: [
          //   {
          //     addressId: setEditingDistributor.address.length ? setEditingDistributor.address[0].addressId : "",
          //     addressType: setEditingDistributor.address.length ? setEditingDistributor.address[0].addressType : "",
          //     address1: setEditingDistributor.address.length ? setEditingDistributor.address[0].address1 : "",
          //     address2: setEditingDistributor.address.length ? setEditingDistributor.address[0].address2 : "",
          //     town: setEditingDistributor.address.length ? setEditingDistributor.address[0].town : "",
          //     street: setEditingDistributor.address.length ? setEditingDistributor.address[0].street : "",
          //     city: setEditingDistributor.address.length ? setEditingDistributor.address[0].city : "Null",
          //     state: setEditingDistributor.address.length ? setEditingDistributor.address[0].state : "",
          //     pinCode: setEditingDistributor.address.length ? setEditingDistributor.address[0].pinCode : "",
          //     country: setEditingDistributor.address.length ? setEditingDistributor.address[0].country : "",
          //     dialCode: setEditingDistributor.address.length ? setEditingDistributor.address[0].dialCode : "",
          //     latitude: setEditingDistributor.address.length ? setEditingDistributor.address[0].latitude : "",
          //     longitude: setEditingDistributor.address.length ? setEditingDistributor.address[0].longitude : "",
          //   },
          // ],
        }}
        validationSchema={DistributorSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          updateDistributor(
            {
              ...values,
              vatInd: vatInd,
              orgId: orgId,
              payment: values.payment === "Custom" ? values.customPayment : values.payment,
              // assignedTo: selectedOption ? selectedOption.employeeId : userId,
              assignTo:selectedOption ? selectedOption.employeeId:setEditingDistributor.employeeId,
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
          <Form class="form-background">
            <div class="flex justify-between" >
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
                
                   <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs  font-poppins flex flex-col mt-3">
                   {translatedMenuItems[0]}  {/* <FormattedMessage id="app.name" defaultMessage="Name" /> */}
                    </div>
                  <Field
                      defaultValue={{
                        label: setEditingDistributor.name,
                        value: setEditingDistributor.name,
                      }}
                    isRequired
                    name="name"
                    type="text"
                    isColumn
                    width={"100%"}
                    style={{ borderRight: "3px red solid" }}
                    setClearbitData={setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                    />
                <div class=" mt-3" />
                <div class=" flex justify-between">
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
                    
                      component={SelectComponent}
                      options={Array.isArray(dialCodeOptions) ? dialCodeOptions : []}
                      inlineLabel
                    />
                  </div>
                  <div class=" w-[60%]">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[2]}</div>
                    <FastField
                      type="text"
                      // isRequired
                      name="phoneNo"
                      // label={
                      //   <FormattedMessage
                      //     id="app.phone"
                      //     defaultMessage="phone"
                      //   />
                      // }
                      placeholder="Phone #"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                </div>
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[3]}</div>
                <Field
                  isRequired
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
                  // placeholder="Start typing..."
                  isColumn
                  inlineLabel
                />

                <div class=" flex justify-between mt-4">
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                    <FastField
                      name="country"
                      // label={
                      //   <FormattedMessage
                      //     id="app.country"
                      //     defaultMessage="country"
                      //   />
                      // }
                      isColumn
                      style={{ borderRight: "4px red solid" }}
                      inlineLabel
                      component={SelectComponent}
                      options={Array.isArray(CountryOptions) ? CountryOptions : []}
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
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[6]}</div>
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
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
                      style={{ borderRight: "4px red solid" }}
                      isColumn
                      placeholder={translatedMenuItems[9]}
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
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
                      name="dCategory"
                      // label="Category"
                      isColumn
                      placeholder={translatedMenuItems[20]}
                      // "Select"
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
                        // <FormattedMessage
                        //   id="app.Custom Payment"
                        //   defaultMessage="Custom Payment"
                        // />
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
                <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="block font-semibold text-[0.75rem]  leading-lh1.2  "
                            // style={{boxShadow:"0em 0.25em 0.625em -0.25em" }}
                            >
                              <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[13]}</div>
                              {/* <FormattedMessage
                                id="app.assignedTo"
                                defaultMessage="Assigned"
                              /> */}

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
                  <div class=" text-xs text-black font-bold font-poppins" > 
                  {translatedMenuItems[19]}   {/* Billing Address */}
                    </div>
                </div>
                {/* <div>
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
                </div> */}
                

                <div class="mt-4">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[14]}</div>
                    <div>
                  <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title= {translatedMenuItems[16]}>
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title= {translatedMenuItems[17]}>
                        <span
                          
                            class="!text-icon ml-1 text-green-600">
                          <StopCircleIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title= {translatedMenuItems[18]}>
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
            <div class="flex justify-end mt-1" >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "3rem", marginTop: "65px" }}
                className=" w-16 absolute top-3/4 right-0"
                loading={updateDisributorById}
              >{translatedMenuItems[15]}
                {/* <FormattedMessage
                  id="app.update"
                  defaultMessage="update"
                /> */}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth, distributor, leads,catgCustomer, rule, category, employee }) => ({
  userId: auth.userDetails.userId,
  vat: rule.vat,
  clearbit: distributor.clearbit,
  orgId: auth.userDetails.organizationId,
  customerListData: catgCustomer.customerListData,
  fullName: auth.userDetails.fullName,
  saleCurrencies: auth.saleCurrencies,
  category: auth.category,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  setEditingDistributor: distributor.setEditingDistributor,
  updateDisributorById: distributor.updateDisributorById,
  countries: auth.countries,
  crmAllData:leads.crmAllData,
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCountry,
      updateDistributor,
      getCustomer,
      getSaleCurrency,
      getAllCustomerEmployeelist,
      getCategory,
      getCrm,
      setClearbitData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountForm);
