import React, { useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select,Switch } from "antd";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getCountries} from "../../Auth/AuthAction"
import {getAllEmployeelist} from "../InvestorAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {AddInvestor,getDialCode} from "../InvestorAction";
import {setClearbitData} from "../../Customer/CustomerAction";
import { Listbox} from '@headlessui/react'
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import {getInvestorList} from "../../Settings/Category/InvestorTab/InvestorListAction";

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
  }, []);

    const {
      accounts,
      user,
      userId,
      addingInvestor,
      AddInvestor,
      clearbit,
    } = props;
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
        label: `${item.sectorName}`,
        value: item.sectorId,
      };
    });

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
            AddInvestor(
              {
                ...values,
                category: checked ? "Both" : whiteblue ? "White" : "Blue",
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                pvtAndIntunlInd: contract ? "true" : "false",
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
                <div class="mt-[0.7rem]">
                  <Field
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
                    label={<FormattedMessage id="app." defaultMessage="URL" />}
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
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.dialCode"
                            defaultMessage="Dial Code"
                          />
                        }
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
                  <div class=" w-w47.5"  style={{display:"flex",flexDirection:"column"}}>
                  {/* <Field                     
                            name="sectorId"
                            label={
                              <FormattedMessage
                                id="app.sector"
                                defaultMessage="Sector"
                              />
                            }
                            isColumn
                            placeholder="Sector"
                          
                            value={values.sectorId}
                            component={SelectComponent}
                        options={
                          Array.isArray(sectorOption)
                            ? sectorOption
                            : []
                        }
                          /> */}
                             <label>Sector</label>

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
                    <div class=" w-w47.5" style={{display:"flex",flexDirection:"column"}}>
                    {/* <FastField
                            name="source"
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
                            isColumn
                          /> */}
                          <label>Source</label>

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
                  <div class=" w-w47.5">
                  <Field                     
                            name="investorCategoryId"
                            label={
                              <FormattedMessage
                                id="app.type"
                                defaultMessage="Type"
                              />
                            }
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
                 <div class="flex justify-between">
                 <div class=" flex flex-col items-center  mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">UBO</div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      //onChange={handleContract}
                      //checked={contract}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex flex-col items-center  mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Identification</div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      //onChange={handleContract}
                      //checked={contract}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  
                 </div>
                 
                  <div class=" flex flex-col   mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Inofocit</div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      //onChange={handleContract}
                      //checked={contract}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class="mt-3">
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                  </div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "  
                >
                 
                 <div class=" flex justify-between">
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
                    : ( null)}
                      {contract ?
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
                  <FormattedMessage id="app.create" defaultMessage="Create" />
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
      getInvestorList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvesterForm);
