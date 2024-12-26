import React, { useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Tooltip, Button,Select,Switch } from "antd";
import { getSectors } from "../../../../../Containers/Settings/Sectors/SectorsAction";

import {getCustomerConfigure} from "../../../SettingsAction"
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {getCountries} from "../../../../Auth/AuthAction"
import {getAllEmployeelist} from "../../../../../Containers/Investor/InvestorAction"
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import {AddInvestor,getDialCode} from "../../../../../Containers/Investor/InvestorAction";
import {setClearbitData} from "../../../../../Containers/Customer/CustomerAction";
import { Listbox} from '@headlessui/react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../../Components/Forms/Autocomplete/ClearbitImage";
import {getInvestorList} from "../../../../../Containers/Settings/Category/InvestorTab/InvestorListAction";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import {base_url} from "../../../../../Config/Auth";

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const InvestorSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
 // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  //  phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});
const { Option } = Select; 
function InvesterForm(props) {

   const[checked,setChecked]=useState(true);
  const[whiteblue,setWhiteblue]=useState(true);

  function handleWhiteBlue (checked) {
    setWhiteblue( checked );
  };

 function handleReset  (resetForm) {
    resetForm();
  };
 function handleChange () {
  setChecked(
 !checked
    );
  };
  useEffect(() => {
    // props.getSectors();
     props.getAllEmployeelist();
     props.getCountries();
     props.getDialCode();
     props.getInvestorList(props.orgId)
     props.getCustomerConfigure(props.orgId,"add","investor")
  }, []);

    const {
      accounts,
      user,
      userId,
      addingInvestor,
      AddInvestor,
      clearbit,
    } = props;
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
    //     label: `${item.sectorName}`,
    //     value: item.sectorId,
    //   };
    // });

    const sortedInvest =props.investorListData.sort((a, b) => {
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
    const investorType = sortedInvest.map((item) => {
      return {
        label: `${item.name}`,
        value: item.investorCategoryId,
      };
    });
   

 
    const sortedCountry =props.dialCodeList.sort((a, b) => {
      const nameA = a.country_dial_code.toLowerCase();
      const nameB = b.country_dial_code.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const countryNameOption = sortedCountry.map((item) => {
      return {
        label: `+${item.country_dial_code}`,
        value: item.country_dial_code,
      };
    });

    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);

    const [source, setSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [selectedSource, setSelectedSource] = useState(null);
    const [contract, setContract] = useState(false);
    const [sector, setSector] = useState([]);
    const [selectedSector, setSelectedSector] = useState(null);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [touchedSector, setTouchedSector] = useState(false);
    const fetchSource = async () => {
      setIsLoading(true);
      try {
        const apiEndpoint = `${base_url}/source/${props.organizationId}`;
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

    const handleSelectFocus = () => {
      if (!touched) {
        fetchSource();
        // fetchSector();
  
        setTouched(true);
      }
    };

    const handleContract = (checked) => {
      setContract(checked);
    };
    
    const fetchSector = async () => {
      setIsLoadingSector(true);
      try {
        const apiEndpoint = `${base_url}/sector`;
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

    const handleSelectSector = (value) => {
      setSelectedSector(value)
      console.log('Selected user:', value);
    };


    const handleSelectSectorFocus = () => {
      if (!touchedSector) {
       
        fetchSector();
  
        setTouchedSector(true);
      }
    };
    const {
      startDate,
      endDate,
    } = props;
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
            partnerName: "",
            name: "",
            url: "",
            gst:"",
            investorCategoryId:"",
            sectorId: selectedSector,
            country: props.user.country,
            email: "",
            source: selectedSource,
            countryDialCode:  user.countryDialCode || "",
            phoneNumber: "",
            fullName:"",
            category: checked ? "Both" : whiteblue ? "White" : "Blue",
            userId: props.userId,
            notes: "",
            pvtAndIntunlInd: contract ? "true" : "false",
            businessRegistration: "",
            assignedTo: selectedOption ? selectedOption.employeeId:userId,
            department: "",
            firstMeetingDate: endDate || null,
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
          validationSchema={InvestorSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            let timeZoneFirst = "GMT+05:30";
            let mytimeZone = timeZoneFirst.substring(4, 10);
            var a = mytimeZone.split(":");
            var timeZoneminutes = +a[0] * 60 + +a[1];
            
            if (!values.firstMeetingDate) {
              values.firstMeetingDate = values.startDate;
            }
  
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            let newEndDate = dayjs(values.firstMeetingDate).format("YYYY-MM-DD");
  
            let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
            let firstStartHours = newStartTime.substring(0, 5);
            let timeEndPart = newStartTime.substring(5, 13);
            var firstStartTimeSplit = firstStartHours.split(":");
            var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
            var firstStartTimeminutes = minutes - timeZoneminutes;
            let h = Math.floor(firstStartTimeminutes / 60);
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;

            AddInvestor(
              {
                ...values,
                category: checked ? "Both" : whiteblue ? "White" : "Blue",
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                pvtAndIntunlInd: contract ? "true" : "false",
                firstMeetingDate: `${newEndDate}T20:00:00Z`,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
            <div class=" flex justify-between max-sm:flex-col">
                <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
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
                <div class="mt-[0.7rem]">
                  <Field
                    name="name"
                    type="text"
                    label="Name"
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
                    label="URL"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  {!contract ?
                  <Field
                    name="email"
                    type="text"
                    label="Email"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />     
                  : ( null)}             
                   <div class=" flex justify-between mt-3">
                    <div class=" w-3/12 max-sm:w-[30%]">
                    <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        label="Dial Code"
                        defaultValue={{
                          label:`+${user.countryDialCode}`,
                        }}
                        // value={values.countryDialCode}
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-8/12">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div>

                  
                  <div class=" flex justify-between mt-3">
                  {contract ?
                  <div class=" w-w47.5.5"  style={{display:"flex",flexDirection:"column"}}>
               
                             <div class="font-bold text-xs font-poppins text-black">Sector</div>

<Select
        showSearch
      
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
                    </div>
                     : ( null)}
                      {contract ?
                    <div class=" w-w47.5.5" style={{display:"flex",flexDirection:"column"}}>
                  
                          <div class="font-bold text-xs font-poppins text-black">Source</div>

<Select
        showSearch
       
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
                        </div>
                          : ( null)}
                  </div>
                  <div class=" flex justify-between">
                  <div class=" w-w47.5.5">
                  <Field                     
                            name="investorCategoryId"
                            label="Type"
                              
                            isColumn
                            placeholder="Type"
                           
                            value={values.investorCategoryId}
                            component={SelectComponent}
                            options={
                              Array.isArray(investorType)
                                ? investorType
                                : []
                            }
                             
                          />
                    </div>
                    <div class=" flex flex-col items-center  mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Category</div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Institutional"
                      unCheckedChildren="Private"
                    />
                  </div>
                    </div> 
                 
                 
           
                  <div class=" w-w47.5.5 max-sm:w-wk">
                    <Field
                      name="firstMeetingDate"
                      label="Date"
                      component={DatePicker}
                      value={values.firstMeetingDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class="mt-3">
                  <div>Descriptions</div>
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
                          <StopCircleIcon     className="!text-icon ml-1 text-green-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span  >
                          <RotateRightIcon className="!text-icon ml-1"/>
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
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "  
                >
                 
                 <div class=" flex justify-between">
                    <div class=" h-full w-full mt-2">
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] ">
              Assigned
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
                  {props.allEmployeeList.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.empName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
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
                    </div>
                    
                    <div class=" flex justify-between max-sm:flex-col mt-3">
                    {contract ?
                     <div class=" w-2/5 max-sm:w-wk">
                      <Field
                        name="vatNo"
                        type="text"
                        label="VAT Number"
                        
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div> 
                    : ( null)}
                      {contract ?
                    <div class=" w-[10rem] max-sm:w-wk">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label="Business Registration#"
                        
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                     : ( null)}
                  </div>
                 
                  <div class="mt-3 w-full" style={{backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class="text-white font-medium m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" >Corporate Address</div>
                  </div>
                    </div>
                 
                  <div class="mt-3">
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
                </div>
              </div>
           
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingInvestor}
                >
                Submit
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ auth,investor, customer,employee ,investorList,sector}) => ({
  addingInvestor: investor.addingInvestor,
  clearbit: customer.clearbit,
  user: auth.userDetails,
  countries:auth.countries,
  dialCodeList:investor.dialCodeList,
  allEmployeeList:investor.allEmployeeList,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  sectors: sector.sectors,
  token: auth.token, 
  fullName: auth.userDetails.fullName,
  investorListData: investorList.investorListData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCountries,
      getDialCode,
        AddInvestor,
      setClearbitData,
      getSectors,
      getAllEmployeelist,
      getInvestorList,
      getCustomerConfigure
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvesterForm);
