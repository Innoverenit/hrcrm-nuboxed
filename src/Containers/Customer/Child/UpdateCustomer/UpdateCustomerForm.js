import React, {useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select} from "antd";
import {getCustomer} from "../../../Settings/Category/Customer/CustomerAction"
import ProgressiveImage from "../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../Components/Forms/Autocomplete/ClearbitImage";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateCustomer,setEditCustomer ,setClearbitData,emptyClearbit} from "../../CustomerAction";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Listbox, } from '@headlessui/react'
import { getCrm} from "../../../Leads/LeadsAction";
import {getCurrency} from "../../../Auth/AuthAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import {base_url} from "../../../../Config/Auth";
const { Option } = Select; 
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdateCustomerForm (props) {
  
  useEffect(() => {
    props.getCrm();
    props.getCustomer(props.orgId); 
    props.getCurrency();
    props.emptyClearbit()
    if (props.setEditingCustomer.currency) {
      setSelectedCurrency(props.setEditingCustomer.currency);
    }
  }, []);


  const handleReset = (resetForm) => {
    resetForm();
  };
  
    const {
      accounts,
      user,
      clearbit,
      updateCustomerById,
      updateCustomer,
      setEditingCustomer,
      userId
    } = props;

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState([]);
    const [touchedCurrency, setTouchedCurrency] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [isLoadingCurrency, setIsLoadingCurrency] = useState(false);
    const [defaultOption, setDefaultOption] = useState(setEditingCustomer.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);
    
    const srcnme=setEditingCustomer.sourceId

    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
                '110', // 0 Name
'302', // 1
'357', // 2  dial
'300', // 3 phn no
'278', // 4 Sector
'279', // 5 Source
'407', // 6 Potential
'241', // 7Currency
'71', // 8 Type
'316', // 9 Notes
'76', // 10 Assigned
'306', // 11 Vat No
'307', // 12 Registration
   '1246' //Update
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
    const fetchCurrency = async () => {
      setIsLoadingCurrency(true);
      try {
        const apiEndpoint = `${base_url}/currencies/sales`;
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
    const handleSelectCurrency = (value) => {
      setSelectedCurrency(value)
      console.log('Selected user:', value);
    };
    const handleSelectCurrencyFocus = () => {
      if (!touchedCurrency) {
       
        fetchCurrency();
  
        setTouchedCurrency(true);
      }
    };
    console.log(clearbit)
    if (loading) {
      return <div><BundleLoader/></div>;
    }
    return (
      
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: setEditingCustomer.name || "",
            url: setEditingCustomer.url || "",
            sectorId: setEditingCustomer.sectorId  ,
            vatNo:setEditingCustomer.vatNo  ,
            email: setEditingCustomer.email || "",
            type: setEditingCustomer.type || "",
            
            country:setEditingCustomer.country || "",
            businessRegistration:setEditingCustomer.businessRegistration ||"",
            countryDialCode: setEditingCustomer.countryDialCode || user.countryDialCode,
            phoneNumber: setEditingCustomer.phoneNumber || "",
            userId: userId,
            sourceId:setEditingCustomer.sourceId  || "",
            currencyId: setEditingCustomer.currency || "",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
            notes: setEditingCustomer.notes || "",
            potentialValue:setEditingCustomer.potentialValue || "",
            // address: [
            //   {
            //     // country:setEditingCustomer.country || "",
            //     addressId: setEditingCustomer.address.length ? setEditingCustomer.address[0].addressId : "",
            //     address1: setEditingCustomer.address.length ? setEditingCustomer.address[0].address1 : "",
            //     address2:  setEditingCustomer.address.length ? setEditingCustomer.address[0].address2 : "",
            //     street:  setEditingCustomer.address.length ? setEditingCustomer.address[0].street : "",
            //     city:  setEditingCustomer.address.length ? setEditingCustomer.address[0].city : "",
            //     state:  setEditingCustomer.address.length ? setEditingCustomer.address[0].state : "",
            //     country: setEditingCustomer.address.length ? setEditingCustomer.address[0].country : "",
            //     postalCode:  setEditingCustomer.address.length ? setEditingCustomer.address[0].postalCode : "",             
            //   },
            // ],
          }}
          validationSchema={UpdateCustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomer(
              {
                ...values,
                customerId: props.customerId,
                currencyId:selectedCurrency,
                // source: selectedSource,
                // sectorId: selectedSector,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
                
              },
            props.customerId,
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
            <Form className="form-background h-[87vh]">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" w-w47.5 max-sm:w-wk" >
                  <div className=" flex flex-nowrap justify-between">
                <div>
                {clearbit && Object.keys(clearbit).length === 0 && (
         <ProgressiveImage
         preview={
           "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
         }
         image={setEditingCustomer.imageURL}
         width={140}
         height={150}
         borderRadius={25}
         padding={15}

       />
      )}
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
                  <div className=" flex justify-between flex-wrap">
                  <div class=" w-wk max-sm:w-full">
                   <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs  mt-3">
                  {/* name */}
                    {translatedMenuItems[0]}
                    </div>
                  <Field
                      defaultValue={{
                        label: setEditingCustomer.name,
                        value: setEditingCustomer.name,
                      }}
                    isRequired
                    name="name"
                    type="text"
                    isColumn
                    width={"100%"}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                    />
                    </div>
                    <div class=" w-wk max-sm:w-full">
                    <div class="font-bold text-xs"> {translatedMenuItems[1]}  </div>
                  <Field
                    name="url"
                    type="text"
                    // label="URL"                                     
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                 </div>
                    </div>
                    </div>
                    <div class="font-bold text-xs mt-2"> {translatedMenuItems[3]}  </div>
                   <div class=" flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                   <div class=" w-3/12 max-sm:w-[35%]">     
                
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect}                
                        isColumnWithoutNoCreate                   
                        isColumn
                        defaultValue={{
                          label:`+${props.user.countryDialCode}`,
                        }}
                        inlineLabel
                       />
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
<div class=" w-[76%]">
                    {/* <div class="font-bold text-xs"> {translatedMenuItems[3]}  </div> */}
                      <FastField
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}                    
                        inlineLabel
                        width={"100%"}
                        />                   
                         </div>
                  </div>
                 
                  
                     <div class=" flex justify-between mt-3">
                     <div class="w-w47.5 max-sm:w-w47.5">
                     <div class="font-bold text-xs"> {translatedMenuItems[4]}  </div>
                      <FastField  
                            
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"                   
                        isColumn
                        component={SearchSelect}
                        // sector
                      />
                    </div>
                    <div class=" w-w47.5">
                    <div class="font-bold text-xs"> {translatedMenuItems[5]}  </div>
                    <FastField
        
                          name="sourceId"
                          isColumnWithoutNoCreate                    
                          selectType="sourceName"
                          component={SearchSelect}
                          defaultValue={{
                            label:srcnme,
                            // value: d,
                          }}
                          isColumn
                          inlineLabel
                        />
           </div>
           </div>
           <div class="flex justify-between mt-2">
           <div class="w-w47.5">
  <div class="font-bold text-xs"> {translatedMenuItems[8]}  </div>
    <Field
      name="type"
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
  </div>
  <div class="w-w47.5 flex">
    <div class="w-24">
    <div class="font-bold text-xs"> {translatedMenuItems[6]}  </div>
      <Field
       style={{ width: "5.5rem" }}
        name="potentialValue"    
        isColumn
        // width={"100%"}
        component={InputComponent}
        inlineLabel
      />
    </div>
    <div class="w-16 ml-2 max-sm:w-wk">
      <div className="font-bold text-xs">
      {translatedMenuItems[7]}
        {/* Currency */}

      </div>
      <Select
        showSearch
        style={{ width: "5.5rem" }}
        placeholder="Search or select currency"
        optionFilterProp="children"
        loading={isLoadingCurrency}
        value={selectedCurrency}
        onFocus={handleSelectCurrencyFocus}
        onChange={handleSelectCurrency}
      >
        {currency.map(currencies => (
          <Option key={currencies.currency_name} value={currencies.currency_name}>
            {currencies.currency_name}
          </Option>
        ))}
      </Select>
    </div>
  </div>
  
</div>            
           {/* <div class=" mt-3">
           <div class="font-bold text-xs"> {translatedMenuItems[9]}  </div>
                  <Field
                    name="notes"
                    // label="Notes"             
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    />  
                    </div>  */}
                 </div>
                 <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                >               
                   <div class=" flex justify-between mt-3 mb-[0.35rem]">
                   <div class=" h-full w-full">
                   <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="font-bold text-xs">
            {translatedMenuItems[10]}
              {/* Assigned */}
            </div>
            <div className="relative ">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                    </div>
              
                    <div class=" flex justify-between max-sm:flex-col">
                    <div class="w-w47.5">
                    <div class="font-bold text-xs"> {translatedMenuItems[11]}  </div>
                      <Field
                        name="vatNo"
                        type="text"                   
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold text-xs"> {translatedMenuItems[12]}  </div>
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"                 
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>                    
                    </div>
                                                                                  
                </div>
              </div>
              <div class="flex justify-end w-wk mt-3 bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateCustomerById}
                >
                 <div class="font-bold font-poppins  text-xs ">{translatedMenuItems[13]}</div>
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

const mapStateToProps = ({ auth, customer,catgCustomer,employee,leads }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  clearbit: customer.clearbit,
  updateCustomerById: customer.updateCustomerById,
  updateCustomerByIdError: customer.updateCustomerByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  employees: employee.employees,
  crmAllData:leads.crmAllData,
  customerListData: catgCustomer.customerListData,
  currencies: auth.currencies,
  token: auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomer,
      setClearbitData,
      setEditCustomer,
      emptyClearbit,
      getCrm,
      getCustomer,
      getCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerForm);
