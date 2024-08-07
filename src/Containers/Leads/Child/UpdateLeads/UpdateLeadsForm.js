import React, {useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select} from "antd";
import { FormattedMessage } from "react-intl";
import ProgressiveImage from "../../../../Components/Utils/ProgressiveImage";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import ClearbitImage from "../../../../Components/Forms/Autocomplete/ClearbitImage";
import {getSources} from "../../../Settings/Category/Source/SourceAction"
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import {
    updateLeads,
    setEditLeads,
    setClearbitData, 
    emptyClearbit,

    getCrm
} from "../../../Leads/LeadsAction";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Listbox } from '@headlessui/react'
import { BundleLoader } from "../../../../Components/Placeholder";
const { Option } = Select; 

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateLeadsSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber:  Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdateLeadsForm (props) {
 
  const handleReset = (resetForm) => {
    resetForm();
  };
  useEffect(() => {
    props.getAllCustomerEmployeelist();
    props.getSources(props.orgId);
    props.getCrm();
     props.emptyClearbit();

    fetchSector();
    if (props.setEditingLeads.source) {
      setSelectedSource(props.setEditingLeads.source);
    }
    if (props.setEditingLeads.sector) {
      setSelectedSector(props.setEditingLeads.sector);
    }
    if (props.setEditingLeads.lob) {
      setSelectedSource(props.setEditingLeads.lob);
    }
  }, []);

    const {
      accounts,
      user,
      // user: { userId, firstName },
      isEditing,
      clearbit,
      prefillAccount,
      updateLeadsById,
      updateLeads,
      setClearbitData,
    } = props;
    const SourceOptions = props.sources.map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.sourceId,
      };
    });
    
    const [lob, setLob] = useState([]);
    const [selectedLob, setSelectedLob] = useState(null);
    const [touchedLob, setTouchedLob] = useState(false);
    const [isLoadingLob, setIsLoadingLob] = useState(false);
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);
    const [source, setSource] = useState([]);
    const [sector, setSector] = useState([]);
    const [touched, setTouched] = useState(false);
  const [touchedSector, setTouchedSector] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
     'First Name', // 0
'Middle ', // 1
'Last Name', // 2
'Email', // 3
'Dial Code', // 4
'Phone No', // 5
'Company', // 6
'URL', // 7
'Sector', // 8
'Source', // 9
'LOB', // 10
'VAT Number', // 11
'Registration', // 12
'Assigned', // 13
'Notes', // 14
   
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
    const fetchLob = async () => {
      setIsLoadingLob(true);
      try {
        const apiEndpoint = `https://develop.tekorero.com/employeePortal/api/v1/lob/all/${props.orgId}`;
        const response = await fetch(apiEndpoint,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${props.token}`,
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
        });
        const data = await response.json();
        setLob(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoadingLob(false);
      }
    };
    const handleSelectLobFocus = () => {
      if (!touchedLob) {
       
        fetchLob();
  
        setTouchedLob(true);
      }
    };
    const handleSelectLob = (value) => {
      setSelectedLob(value)
      console.log('Selected user:', value);
    };
    if (loading) {
      return <div><BundleLoader/></div>;
    }
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            companyName: props.setEditingLeads.companyName || "",
            url: props.setEditingLeads.url || "",
            sectorId: props.setEditingLeads.sector  ,
            vatNo:props.setEditingLeads.vatNo  ,
            email: props.setEditingLeads.email || "",
            country:props.setEditingLeads.country || "",
            countryDialCode:
              props.setEditingLeads.countryDialCode ||
              props.user.countryDialCode,
            phoneNumber: props.setEditingLeads.phoneNumber || "",
            userId: props.userId,
            notes: props.setEditingLeads.notes || "",
            businessRegistration:props.setEditingLeads.businessRegistration ||"",
            salutation:props.setEditingLeads.salutation || "",
            firstName:props.setEditingLeads.firstName || "",
            middleName:props.setEditingLeads.middleName || "",
            lastName:props.setEditingLeads.lastName || "",
            source:props.setEditingLeads.source || "",
            lob:props.setEditingLeads.lob || "",
            price:props.setEditingLeads.price || "",
            bedrooms:props.setEditingLeads.bedrooms || "",
        
            propertyType:props.setEditingLeads.propertyType || "",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingLeads.employeeId,
            // address: [
            //   {
            //     addressId: props.setEditingLeads.address.length ? props.setEditingLeads.address[0].addressId : "",
            //     address1: props.setEditingLeads.address.length ? props.setEditingLeads.address[0].address1 : "",
            //     address2:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].address2 : "",
            //     street:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].street : "",
            //     city:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].city : "",
            //     state:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].state : "",
            //     postalCode:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].postalCode : "",  
            //     country:  props.setEditingLeads.address.length ? props.setEditingLeads.address[0].country : "",            
            //   },
            // ],
                addressId: props.setEditingLeads.addressId || "",
                address1: props.setEditingLeads.address1 || "",
                address2:  props.setEditingLeads.address2 || "",
                street:  props.setEditingLeads.street || "",
                city: props.setEditingLeads.city || "",
                state:  props.setEditingLeads.state || "",
                postalCode:  props.setEditingLeads.postalCode || "", 
                country:   props.setEditingLeads.country || "",         
            
          }}
          validationSchema={UpdateLeadsSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateLeads(
              {
                ...values,
                leadsId: props.leadsId,
                source: selectedSource,
                lob:selectedLob,
                
                sectorId: selectedSector,
                countryDialCode:values.countryDialCode,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingLeads.employeeId,
              },
              props.leadsId,
            );
          handleReset(resetForm)
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
              <div class=" flex justify-around max-sm:flex-col ">
                <div class=" h-full w-[47.5%] max-sm:w-wk"   >
                   
                    <div class=" flex  flex-nowrap mt-3">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                   {/* saluatation */}
                        <div class=" w-wk max-sm:w-full">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label= {translatedMenuItems[0]}
                            // {
                            //   <FormattedMessage
                            //     id="app.firstName"
                            //     defaultMessage="First Name"
                            //   />
                            // }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={translatedMenuItems[1]}
                            // {
                            //   <FormattedMessage
                            //     id="app.middleName"
                            //     defaultMessage="Middle"
                            //   />
                            // }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={translatedMenuItems[2]}
                            // {
                            //   <FormattedMessage
                            //     id="app.lastName"
                            //     defaultMessage="Last Name"
                            //   />
                            // }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                  <Field
                    name="email"
                    type="text"                   
                    label={translatedMenuItems[3]}
                    // {
                    //   <FormattedMessage id="app.email" defaultMessage="Email" />
                    // }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                    <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                  
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`+${props.user.countryDialCode}`,
                        }}
                        isColumnWithoutNoCreate
                        label={translatedMenuItems[4]}
                        // {
                        //   <FormattedMessage
                        //     id="app.countryDialCode"
                        //     defaultMessage="Dial Code "
                        //   />
                        // }
                        isColumn
                        inlineLabel
                       />
                      
                    </div>
                    <div class=" w-8/12">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <div> {translatedMenuItems[5]}</div>
                      <FastField
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}
                        // label="Phone No"
                        inlineLabel
                        width={"100%"}
                        />     
                        </div>              
                         </div>
                  </div>
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
                  <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold mt-3 ">
                  <Field
                    defaultValue={{
                      label: props.setEditingLeads.companyName,
                      value: props.setEditingLeads.companyName,
                    }}
                    name="companyName"
                    type="text"
                    //label="Name"
                    label={translatedMenuItems[6]}
                    // label={
                    //   <FormattedMessage id="app.company" defaultMessage="Company" />
                    // }
                    isColumn
                    width={"100%"}
                    // component={InputComponent}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                    />
                    </div>
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={translatedMenuItems[7]}
                    // label={
                    //   <FormattedMessage id="app.url" defaultMessage="URL" />
                    // }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                  
                  
                  <div class=" flex justify-between mt-3">
                  <div class=" w-w47.5" style={{display:"flex",flexDirection:"column"}}>
                   <div  className="font-bold text-xs">
                   {translatedMenuItems[8]}
                    {/* Sector */}
                    </div>

<Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search or select sector"
        optionFilterProp="children"
        loading={isLoadingSector}
        value={selectedSector}
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
                    <div class=" w-w47.5"  style={{display:"flex",flexDirection:"column"}}>
                    <div  className="font-bold text-xs">
                    {translatedMenuItems[9]}
                      {/* Source */}
                      </div>

<Select
        showSearch
       
        placeholder="Search or select source"
        optionFilterProp="children"
        loading={isLoading}
        onFocus={handleSelectFocus}
        onChange={handleSelectChange}
        value={selectedSource}
      >
        {source.map(sources => (
          <Option key={sources.sourceId} value={sources.sourceId}>
            {sources.name}
          </Option>
        ))}
      </Select>
           </div>
                </div>
               
              
                <div class=" flex justify-between mt-3 max-sm:flex-col">
                    <div class=" w-w47.5 max-sm:w-wk">                
                    <div  className="font-bold text-xs">
                    {translatedMenuItems[10]}
                      {/* LOB */}
                      </div>

<Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search or select LOB"
        optionFilterProp="children"
        loading={isLoadingLob}
        value={selectedLob}
        onFocus={handleSelectLobFocus}
        onChange={handleSelectLob}
      >
        {lob.map(item => (
          <Option key={item.name} value={item.lobDetsilsId}>
            {item.name}
          </Option>
        ))}
      </Select>
                    </div>
                  
                  </div> 
          
                <div class=" flex justify-between max-sm:flex-col mt-3">
                <div class=" w-w47.5 max-sm:w-wk">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <Field
                        name="vatNo"
                        type="text" 
                        label=   {translatedMenuItems[11]}
                        // {
                        //   <FormattedMessage
                        //     id="app.vatNumber"
                        //     defaultMessage="VAT Number"
                        //   />
                        // }
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                        </div>
                    </div>
                    <div class="w-w47.5">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label=   {translatedMenuItems[12]}
                        // {
                        //   <FormattedMessage
                        //     id="app.registration"
                        //     defaultMessage="Registration"
                        //   />
                        // }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>                    
                    </div>
                 </div>

                 <div class=" h-3/4 w-[47.5%] max-sm:w-wk "   >                 
                    <div class=" mt-3">
                    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-bold text-xs mt-[0.6rem]" >
               {translatedMenuItems[13]}
          {/*   Assigned */}
            </Listbox.Label>
          <div className="relative ">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.crmAllData.map((item) => (
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
                 
                  {/* <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold mt-3 ">
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                      translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  </div> */}
                 
                  {props.orgType==="Real Estate"&&(
                  <div class=" h-3/4  max-sm:w-wk "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                    <div class="  w-w47.5">
                      <Field
                        name="bedrooms"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label="Bedrooms"
                       
                        // label={
                        //   <FormattedMessage
                        //     id="app.tagCompany"
                        //     defaultMessage="Tag Company"
                        //   />
                        // }
                        options={["1", "2", "3","4","5","6"]}
                        component={SelectComponent}
                        isColumn
                        //value={values.customerId}
                        //isDisabled={defaultCustomers}
                        //options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>

                   
                    <div class=" w-w47.5">
                    <FastField
                            name="price"
                            label="Price"
                            //isColumnWithoutNoCreate
                            //selectType="sourceName"
                            options={["0-100000", "100001-300000", "300001-500000","500000+"]}
                            component={SelectComponent}
                           
                            // value={values.source}
                            isColumn
                          />
                        </div>
                     
                    
                  </div>
                 
                  <div class=" flex justify-between mt-3">         
                  <div class="  w-w47.5">
                    <Field
                      name="propertyType"
                      label="Property Type"
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      options={["Studio", "Row house", "Villa"]}
                      component={SelectComponent}
                     
                      // value={values.departmentId}
                      // options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                      inlineLabel
                    />
                  </div>
                
                  </div>
                 
                 

                 
                  {/* <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address[0].address1"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                  */}
                  {/* <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  /> */}
                 
                  <div class=" flex  justify-between mt-3">
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.ddress[0].city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div> */}
                  </div>
                 
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.address[0].State"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer> */}
                </div>
                )}
                 <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold mt-3 ">
                  <Field
                    name="notes"
                    // label="Notes"
                    label=     {translatedMenuItems[14]}
                    // {
                    //   <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    // }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    /> 
                    </div>                 
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateLeadsById}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  
}

const mapStateToProps = ({ auth, leads,employee,source, }) => ({
    setEditingLeads: leads.setEditingLeads,
    updateLeadsById: leads.updateLeadsById,
    updateLeadsByIdError: leads.updateLeadsByIdError,
    user: auth.userDetails,
    sources: source.sources,
    clearbit: leads.clearbit,
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    organizationId: auth.userDetails.organizationId,
    employees: employee.employees,
    leadsAllData:leads.leadsAllData,
    fullName: auth.userDetails.fullName,
    orgType:auth.userDetails.orgType,
    allCustomerEmployeeList:employee.allCustomerEmployeeList,
    crmAllData:leads.crmAllData,
    token: auth.token,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateLeads,
        setEditLeads,
        emptyClearbit,
      getAllCustomerEmployeelist,
      setClearbitData,
      getSources,
      getCrm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeadsForm);
