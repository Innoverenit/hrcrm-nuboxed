import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Select } from "antd";
import {getCustomerConfigure} from "../../Settings/SettingsAction"
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { getAllCustomerEmployeelist } from "../../Employees/EmployeeAction";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
  addCustomer,
  setClearbitData,
  emptyClearbit
} from "../CustomerAction";
import {getCustomer} from "../../Settings/Category/Customer/CustomerAction"
import { getCrm } from "../../Leads/LeadsAction";
import { Listbox } from '@headlessui/react';
import {getCurrency} from "../../Auth/AuthAction";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import { BundleLoader } from "../../../Components/Placeholder";

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  
});

const { Option } = Select;  

function CustomerForm(props) {
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
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
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          ' Name', // 0
'Url ', // 1
'Dial Code', // 2
'Phone No', // 3
'Sector', // 4
'Source', // 5
'Potential', // 6
'Currrency', // 7
'Type', // 8
'Assigned', // 9
'Address', // 10
// 'Street',//11
// 'Zip Code',//12
// 'City',//13
// 'State',//14
// 'Country',//15
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
    props.getCustomer(props.orgId); 
    props.getCrm();
    props.emptyClearbit()
    props.getCustomerConfigure(props.orgId,"add","customer")
    
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
    // const sortedSector =props.sectors.sort((a, b) => {
    //   const nameA = a.sectorName.toLowerCase();
    //   const nameB = b.sectorName.toLowerCase();
    //   // Compare department names
    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // const sectorOption = sortedSector.map((item) => {
    //   return {
    //     label: item.sectorName || "",
    //     value: item.sectorId,
    //   };
    // });
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
    const [code, setCode] = useState([]);
    const [assign, setAssign] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [source, setSource] = useState([]);
    const [sector, setSector] = useState([]);
    const [selectedCode, setSelectedCode] = useState(props.user.countryDialCode);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [selectedAssign, setSelectedAssign] = useState(props.fullName);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [isLoadingCode, setIsLoadingCode] = useState(false);
    const [isLoadingCurrency, setIsLoadingCurrency] = useState(false);
    const [isLoadingAssign, setIsLoadingAssign] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [touchedCode, setTouchedCode] = useState(false);
  const [touchedAssign, setTouchedAssign] = useState(false);
  const [touched, setTouched] = useState(false);
  const [touchedSector, setTouchedSector] = useState(false);
  const [touchedCurrency, setTouchedCurrency] = useState(false);
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = props.crmAllData.find((item) => item.empName === selected);
  const fetchSource = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/source/${props.organizationId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setSource(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedSource(value)
    console.log('Selected user:', value);
  };
console.log(selectedSource)
 



  const fetchSector = async () => {
    setIsLoadingSector(true);
    try {
      const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/sector`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setSector(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingSector(false);
    }
  };



  const fetchAssign = async () => {
    setIsLoadingAssign(true);
    try {
      const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/customer/employee/create/all-employees`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setAssign(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingAssign(false);
    }
  };


  const fetchCurrency = async () => {
    setIsLoadingCurrency(true);
    try {
      const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/currencies/sales`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCurrency(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingCurrency(false);
    }
  };


  const fetchCode = async () => {
    setIsLoadingCode(true);
    try {
      const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/countries/all/dail-code/list`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCode(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingCode(false);
    }
  };
  const handleSelectSector = (value) => {
    setSelectedSector(value)
    console.log('Selected user:', value);
  };


  const handleSelectAssign = (value) => {
    setSelectedAssign(value)
    console.log('Selected user:', value);
  };


  const handleSelectCurrency = (value) => {
    setSelectedCurrency(value)
    console.log('Selected user:', value);
  };

  const handleSelectCode = (value) => {
    setSelectedCode(value)
    console.log('Selected user:', value);
  };



  const handleSelectFocus = () => {
    if (!touched) {
      fetchSource();
      // fetchSector();

      setTouched(true);
    }
  };

  const handleSelectSectorFocus = () => {
    if (!touchedSector) {
     
      fetchSector();

      setTouchedSector(true);
    }
  };

  const handleSelectCurrencyFocus = () => {
    if (!touchedCurrency) {
     
      fetchCurrency();

      setTouchedCurrency(true);
    }
  };

  const handleSelectAssignFocus = () => {
    if (!touchedAssign) {
     
      fetchAssign();

      setTouchedAssign(true);
    }
  };

  const handleSelectCodeFocus = () => {
    if (!touchedCode) {
     
      fetchCode();

      setTouchedCode(true);
    }
  };

  const sortedType =props.customerListData.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const typeOption = sortedType.map((item) => {
    return {
      label: `${item.name}`,
      value: item.customerTypeId,
    };
  });
  
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

  console.log(selectedSector)
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          // currencyId:"",
       
          partnerName: "",
          type:"",
        
          name: "",
          url: "",
          gst: "",
          // source: "",
          // sectorId: "",
          country: props.user.country,
          email: "",
          potentialValue:"",
          countryDialCode:selectedCode ,
          phoneNumber: "",
          fullName: "",
          category: checked ? "Both" : whiteblue ? "White" : "Blue",
          userId: props.userId,
          notes: "",
          businessRegistration: "",
          assignedTo: selectedOption ? selectedOption.employeeId : userId,
          department: "",
          vatNo:"",
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
              currencyId:selectedCurrency,
              source: selectedSource,
              sectorId: selectedSector,
              currencyId:selectedCurrency,
              assignedTo: selectedOption ? selectedOption.employeeId : userId,
             
            },
            props.userId,
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
                  {props.customerConfigure.nameInd===true&&
                    <Field
                      isRequired
                      name="name"
                      type="text"
                      // label="Names"
                      label={translatedMenuItems[0]}
                      // {
                      //   <FormattedMessage id="app.name" defaultMessage="Name" />
                      // }
                      isColumn
                      width={"100%"}
                      setClearbitData={props.setClearbitData}
                      component={ClearbitImage}
                      accounts={accounts}
                      inlineLabel
                    />
}
                  </div>
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                 label={translatedMenuItems[1]}
                    // {<FormattedMessage id="app.url" defaultMessage="URL" />}
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
                  <div class=" flex justify-between mt-2">
                    <div class=" w-3/12 max-sm:w-[30%]">
                      {/* <FastField
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
                      /> */}
{props.customerConfigure.dailCodeInd===true&&
<div className="font-bold text-[0.75rem]">
{translatedMenuItems[2]}
  {/* Dial code */}

</div>
}
{props.customerConfigure.dailCodeInd===true&&
<Select
        showSearch
        style={{ width: 120 }}
        placeholder="Search or select code"
        optionFilterProp="children"
        loading={isLoadingCode}
        defaultValue={selectedCode}
        onFocus={handleSelectCodeFocus}
        onChange={handleSelectCode}
      >
        {code.map(codes => (
          <Option key={codes.
            country_dial_code
            } value={codes.
              country_dial_code
              }>
            {codes.
country_dial_code
}
          </Option>
        ))}
      </Select>
}
                    </div>
                    <div class=" w-8/12">
                    {props.customerConfigure.phoneNoInd===true&&
                      <FastField
                        name="phoneNumber"
                        label={translatedMenuItems[3]}          
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
}
                    </div>
                  </div>


                  <div class=" flex justify-between mt-3">
                    <div class="w-w47.5 max-sm:w-w47.5" style={{display:"flex",flexDirection:"column"}}>
                      {/* <Field
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
                      /> */}
                       {props.customerConfigure.sectorInd===true&&
                   <div className="font-bold text-[0.75rem]">
                        {translatedMenuItems[4]}
                        {/* Sector */}
                        </div>
                       }
                      {props.customerConfigure.sectorInd===true&&
<Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search or select sector"
        optionFilterProp="children"
        loading={isLoadingSector}
        onFocus={handleSelectSectorFocus}
        onChange={handleSelectSector}
      >
        {sector.map(sectors => (
          <Option key={sectors.sectorId} value={sectors.sectorId}>
            {sectors.sectorName}
          </Option>
        ))}
      </Select>
}
                    </div>
                    <div class="w-w47.5" style={{display:"flex",flexDirection:"column"}}>
                      {/* <FastField
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
                      /> */}
 {props.customerConfigure.sourceInd===true&&
<label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Source</label>
}
{props.customerConfigure.sourceInd===true&&
<Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search or select source"
        optionFilterProp="children"
        loading={isLoading}
        onFocus={handleSelectFocus}
        onChange={handleSelectChange}
      >
        {source.map(sources => (
          <Option key={sources.sourceId} value={sources.sourceId}>
            {sources.name}
          </Option>
        ))}
      </Select>
}
                    </div>
                  </div>
                  <div class="flex justify-between mt-2">
  <div class="w-w47.5 flex">
    <div class="w-24">
    {props.customerConfigure.potentialInd===true&&
      <Field
        name="potentialValue"
        label= {translatedMenuItems[5]}     
        isColumn
        width={"100%"}
        component={InputComponent}
        inlineLabel
      />
}
    </div>
    <div class="w-16 ml-2 max-sm:w-wk">
    {props.customerConfigure.potentialCurrencyInd===true&&
       <div className="font-bold text-[0.75rem]">
       {translatedMenuItems[6]}
        {/* Currency */}
        </div>
    }
     {props.customerConfigure.potentialCurrencyInd===true&&
      <Select
        showSearch
        style={{ width: 100 }}
        placeholder="Search or select currency"
        optionFilterProp="children"
        loading={isLoadingCurrency}
        onFocus={handleSelectCurrencyFocus}
        onChange={handleSelectCurrency}
      >
        {currency.map(currencies => (
          <Option key={currencies.currency_name} value={currencies.currency_name}>
            {currencies.currency_name}
          </Option>
        ))}
      </Select>
}
    </div>
  </div>


  <div class="w-w47.5">
  {props.customerConfigure.typeInd===true&&
    <Field
      name="type"
      label=  {translatedMenuItems[7]}
      isColumn
      width={"100%"}
      component={SelectComponent}
      options={
        Array.isArray(typeOption)
          ? typeOption
          : []
      }
      inlineLabel
    />
}
  </div>
</div>

{props.customerConfigure.noteInd===true&&
<div class="mt-3">
                    <div>Notes</div>
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
                          
                            >
                          <StopCircleIcon className="!text-icon ml-1 text-green-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span  >
                          <RotateRightIcon className="!text-icon ml-1" />
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
}
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                >
{props.customerConfigure.assignedToInd===true&&
                  <div class=" flex justify-between mb-[0.35rem] mt-3">
                    <div class=" flex flex-col">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <div className="font-bold text-[0.75rem] ">                                               
                               {translatedMenuItems[8]}                            
                              {/* Assigned */}
                            </div>
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
                    // label="Assigned"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned"
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
}

                  <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                  <div class="w-w47.5">
                  {props.customerConfigure.vatNoInd===true&&
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
}
                    </div>
                    <div class="w-w47.5">
                    {props.customerConfigure.businessRegInd===true&&
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.registration"
                            defaultMessage="Registration"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
}
                    </div>
                  </div>

                  {props.customerConfigure.addressInd===true&&               
<div>

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
                      // label="Address"
                      label=  {translatedMenuItems[9]}
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
                  </div>

                  </div>
}
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


const mapStateToProps = ({ auth, customer,settings,employee ,catgCustomer,sector,leads}) => ({
  addingCustomer: customer.addingCustomer,
  addingCustomerError: customer.addingCustomerError,
  saleCurrencies: auth.saleCurrencies,
  customerListData: catgCustomer.customerListData,
  clearbit: customer.clearbit,
  user: auth.userDetails,
  token: auth.token,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  sectors: sector.sectors,
  fullName: auth.userDetails.fullName,
  customerConfigure:settings.customerConfigure,
  crmAllData:leads.crmAllData,
  currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomer,
      setClearbitData,
      emptyClearbit,
      getSectors,
      getAllCustomerEmployeelist,
      getCrm,
      getCurrency,
      getCustomerConfigure,
      getCustomer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
