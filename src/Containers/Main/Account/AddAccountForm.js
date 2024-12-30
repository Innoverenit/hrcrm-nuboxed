import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { getCrm } from "../../Leads/LeadsAction";
import { getCountry } from "../../../Containers/Settings/Category/Country/CountryAction";
import { getCustomer } from "../../Settings/Category/Customer/CustomerAction";
import { Listbox } from '@headlessui/react'
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { addDistributor, setClearbitData ,emptyClearbit} from "./AccountAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { getSaleCurrency, getCategory } from "../../Auth/AuthAction";
import { ProgressiveImage } from "../../../Components/Utils";
import  { useSpeechRecognition,} from 'react-speech-recognition';
import { InputComponent1 } from "../../../Components/Forms/Formik/InputComponent1";
import SearchSelect1 from "../../../Components/Forms/Formik/SearchSelect1";

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
  accounts, clearbit, fullName, 
  crmAllData,
  countries,
  setClearbitData,
  addingDistributor,
  addDistributor,
  customerListData,
  saleCurrencies,
  getCountry,
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
const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
    const [currencySaleOptions, setcurrencySaleOptions] = useState([]);
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [countryOptions, setcountryOptions] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [clientCustomerOptions, setclientCustomerOptions] = useState([]);
  const [loadingclientCustomer, setLoadingclientCustomer] = useState(false);


   const fetchCategoryOptions = async () => {
      setLoadingCategory(true);
      await getCategory(orgId);
      setLoadingCategory(false);
    };
    useEffect(() => {
      if (category && category.length > 0) {
        const options = category.map((item) => {
          return {
            label: item.name || "",
      value: item.categoryId,
          };
        });
        setCategoryOptions(options);
      }
    }, [category]);

    const fetchCurrencyOptions = async () => {
        setLoadingCurrency(true);
        await getSaleCurrency();
        setLoadingCurrency(false);
      };
      useEffect(() => {
        if (saleCurrencies && saleCurrencies.length > 0) {
          const options = saleCurrencies.map((item) => {
            return {
              label: item.currency_name || "",
              value: item.currency_id,
            };
          });
          setcurrencySaleOptions(options);
        }
      }, [saleCurrencies]);
    
      const fetchCountryOptions = async () => {
        setLoadingCountry(true);
        await getCountry();
        setLoadingCountry(false);
      };
      useEffect(() => {
        if (countries && countries.length > 0) {
          const options = countries.map((item) => {
            return {
              label: `${item.country_name || ""}`,
              value: item.country_id,
            };
          });
          setcountryOptions(options);
        }
      }, [countries]);

      const fetchClientCustomerOptions = async () => {
        setLoadingclientCustomer(true);
          await   getCustomer(orgId);
        setLoadingclientCustomer(false);
        };
        useEffect(() => {
          if (customerListData && customerListData.length > 0) {
            const options = customerListData.map((item) => {
              return {
                label: `${item.name}`,
                value: item.customerTypeId,
              };
            });
            setclientCustomerOptions(options);
          }
        }, [customerListData]);     

useEffect(() => {
  getCrm();
}, []);

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
                    "316",  // "Notes",`14
                    "104",  //    "Create"15
                   "158" ,// Start16
                   "5" ,// "Stop  17
                   "194", // "Clear18
                   "710" // Billing address
                   
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
    return () => {
      emptyClearbit(); 
    };
  }, [emptyClearbit]);

  const [billingSameAsCommunication, setBillingSameAsCommunication] = useState(false);

  const handleToggleChange = () => {
    setBillingSameAsCommunication(!billingSameAsCommunication);
  };

  const [defaultOption, setDefaultOption] = useState(fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = crmAllData.find((item) => item.empName === selected);
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
              assignTo: selectedOption ? selectedOption.employeeId : userId,
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
              assignTo: selectedOption ? selectedOption.employeeId : userId,
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
          <Form class="form-background h-[77vh]">
            <div class=" flex justify-between max-sm:flex-col ">
              <div class=" h-full w-w47.5.5 max-sm:w-wk">
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
                  
                    width={"100%"}
                    
                    setClearbitData={setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    isColumn
                    inlineLabel
                    style={{ borderRight: "3px red solid" }}
                  />
                </div>
             
                 <div className="font-bold text-xs">{translatedMenuItems[2]}</div>
<div class=" flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                     <div class=" w-3/12 max-sm:w-[35%]">     
                     <FastField
                      name="dialCode"
                      isColumnWithoutNoCreate
                      isColumn
                      value={countryDialCode1}
                      selectType="dialCode"
                      component={SearchSelect1}
                      inlineLabel
                    />           
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
                    <div class=" w-[76%]">
                    <div class="text-xs flex flex-col font-bold "> 
                    <FastField
                      name="phoneNo"
                      placeholder="Mobile #"
                      component={InputComponent1}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                      </div>

                    </div>
                  
                  </div> 
                <div class=" text-xs font-bold font-poppins mt-2"> {translatedMenuItems[3]}</div>
                <Field
                  // isRequired
                  name="url"
                  type="text"
               
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  disable
                  inlineLabel
                />
               


                <div class="flex justify-between mt-4 text-xs font-bold font-poppins" >
               
           
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                    <FastField
                      name="country"           
                      isColumn
                      placeholder="Select"
                      inlineLabel
                      style={{ borderRight: "4px red solid" }}
                      isRequired
                      component={SelectComponent}
                      options={Array.isArray(countryOptions) ? countryOptions : []}
                      onFocus={fetchCountryOptions}
                      isLoading={loadingCountry}
                    />
                  </div>
                  </div>
                  <div class="w-w45.5 mt-2">
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
               
                <div class="flex justify-between mt-2" >
                <div class="w-w47.5.5">

                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[11]}</div>
                    <Field
                      name="dcategory"
                      // label="Category"
                      isColumn
                      placeholder="Select"
                      style={{ borderRight: "3px red solid" }}
                      component={SelectComponent}
                      options={
                        Array.isArray(categoryOptions)? categoryOptions: []}
                        onFocus={fetchCategoryOptions}
                        isLoading={loadingCategory}  
                    />
                  </div>
                 
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[7]}</div>
                    <Field
                      name="clientId"
                      isColumn
                      placeholder="Type"
                      component={SelectComponent}
                      options={Array.isArray(clientCustomerOptions)? clientCustomerOptions: []}
                      onFocus={fetchClientCustomerOptions}
                      isLoading={loadingclientCustomer}  
                    />
                  </div>
                </div>
                <div class="flex justify-between w-w47.5.5 mt-4" >
               
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
                    <FastField
                      name="currencyPrice"
                      placeholder="Price"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                    <Field
                      name="currency"
                      isColumn
                      placeholder="Currency"
                      component={SelectComponent}
                      style={{ borderRight: "4px red solid" }}
                      options={Array.isArray(currencySaleOptions) ? currencySaleOptions : []}
                      onFocus={fetchCurrencyOptions}
                      isLoading={loadingCurrency}
                    />
                  </div>
                </div>
                <div class="flex justify-between mt-4" >
               
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
                    <FastField
                      name="payment"
                      placeholder="Select"
                      component={SelectComponent}
                      options={["7", "15", "21", "30", "45", "60", "75", "90", "Custom"]}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>
                  <div class="w-w47.5.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[6]}</div>
                    <Field
                      name="insuranceGrade"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                    />
                  </div>
                 
                  {values.payment === "Custom" && <div class="w-w47.5.5">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[12]}</div>
                    <FastField
                      name="customPayment"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                    />
                  </div>}
                </div>

              </div>
              <div class=" h-full w-w47.5.5 max-sm:w-wk">
                <div class=" h-full w-full mt-3">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[13]}</div>
                <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                         
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
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[19]}</div>
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
                <ReactDescription
                setText={setText}
                text={text}
                />
                  {/* <div>
                <span class=" text-xs font-bold font-poppins"> {translatedMenuItems[14]}</span>
                  
                  <span>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title= {translatedMenuItems[16]}>
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title= {translatedMenuItems[17]}>
                        <span>
                          
                      <StopCircleIcon  className="!text-icon ml-1 text-green-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title= {translatedMenuItems[18]}>
                        <span >
                          <RotateRightIcon className="!text-icon  ml-1" />
                        </span>
                      </Tooltip>
                    </span>
                  </span> 
                   <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea>
                  </div>
                </div> */}
              
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
              {translatedMenuItems[15]}
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
      getSaleCurrency,
      getCategory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddAccountForm);