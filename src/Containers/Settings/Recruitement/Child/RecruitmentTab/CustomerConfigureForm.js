import React, { useState ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch,Button,Select  } from "antd";
import { getSectors } from "../../../../../Containers/Settings/Sectors/SectorsAction";

import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { getAllCustomerEmployeelist } from "../../../../Employees/EmployeeAction";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import {
  addCustomer,
  setClearbitData
} from "../../../../Customer/CustomerAction";
import { getCrm} from "../../../../Leads/LeadsAction";
import { getAllSalesList } from "../../../../Opportunity/OpportunityAction"
import { Listbox,  } from '@headlessui/react'
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../../Components/Forms/Autocomplete/ClearbitImage";
import {addCustomerConfigure,getCustomerConfigure} from "../../../SettingsAction"
// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const CustomerSchema = Yup.object().shape({
//   name: Yup.string().required("Input needed!"),
//   // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
//   // phoneNumber: Yup.string().required("Input needed!").matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
// });
const { Option } = Select;  
function CustomerForm(props) {
  const hardcodedCurrencies = [
    { currency_name: 'USD' },
    { currency_name: 'EUR' },
    { currency_name: 'JPY' },
    // add more currencies as needed
  ];

   const[checked,setChecked]=useState(true);
  const[whiteblue,setWhiteblue]=useState(true);

  const [isFirstNameVisible, setIsFirstNameVisible] = useState(false);
  const [isLastNameVisible, setIsLastNameVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [isSourceVisible, setIsSourceVisible] = useState(false);
  const [isVatVisible, setIsVatVisible] = useState(false);
  const [isAssignedVisible, setIsAssignedVisible] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);

  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isPotentialVisible, setIsPotentialVisible] = useState(false);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isTypeVisible, setIsTypeVisible] = useState(false);
console.log(isFirstNameVisible)
console.log(isLastNameVisible)
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
    props.getAllCustomerEmployeelist();
    props.getSectors();
    props.getAllSalesList();
    props. getCrm();
    props.getCustomerConfigure(props.orgId,"add","customer")
  }, []);



  useEffect(() => {
    if (
      props.customerConfigure.addressInd !== undefined &&
      props.customerConfigure.businessRegInd !== undefined &&
      props.customerConfigure.vatNoInd !== undefined &&
      props.customerConfigure.assignedToInd !== undefined &&
      props.customerConfigure.noteInd !== undefined &&
      props.customerConfigure.sourceInd !== undefined &&
      props.customerConfigure.sectorInd !== undefined &&
      props.customerConfigure.phoneNoInd !== undefined &&
      props.customerConfigure.dailCodeInd !== undefined &&
      props.customerConfigure.nameInd !== undefined &&
      props.customerConfigure.potentialInd !== undefined &&
      props.customerConfigure.potentialCurrencyInd !== undefined &&
      props.customerConfigure.typeInd !== undefined
      
      
    ) {
      //setIsFirstNameVisible(props.customerConfigure.startInd);
      setIsLastNameVisible(props.customerConfigure.dailCodeInd);
      setIsEmailVisible(props.customerConfigure.phoneNoInd);
      setIsMobileNumberVisible(props.customerConfigure.sectorInd);
      setIsSourceVisible(props.customerConfigure.sourceInd)
      setIsVatVisible(props.customerConfigure.vatNoInd)
      setIsAssignedVisible(props.customerConfigure.assignedToInd)
      setIsNotesVisible(props.customerConfigure.noteInd)
      setIsAddressVisible(props.customerConfigure.addressInd)
      setIsFirstNameVisible(props.customerConfigure.nameInd)
      setIsPotentialVisible(props.customerConfigure.potentialInd )
      setIsCurrencyVisible(props.customerConfigure.potentialCurrencyInd)
      setIsTypeVisible(props.customerConfigure.typeInd)
    }
  }, [props.customerConfigure]);

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
    const sectorOption = props.sectors.map((item) => {
      return {
        label: item.sectorName || "",
        value: item.sectorId,
      };
    });
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allCustomerEmployeeList.find((item) => item.fullName === selected);


    const toggleFieldVisibility = (fieldName) => {
        switch (fieldName) {
          case 'name':
            setIsFirstNameVisible(!isFirstNameVisible);
            break;
          case 'countryDialCode':
            setIsLastNameVisible(!isLastNameVisible);
            break;
          case 'phoneNumber':
            setIsEmailVisible(!isEmailVisible);
            break;
          case 'sectorId':
            setIsMobileNumberVisible(!isMobileNumberVisible);
            break;
            case 'notes':
                setIsNotesVisible(!isNotesVisible);
                break;
                case 'assignedTo':
                    setIsAssignedVisible(!isAssignedVisible);
                    break;
                    case 'vatNo':
                        setIsVatVisible(!isVatVisible);
                        break;
                        case 'source':
                            setIsSourceVisible(!isSourceVisible);
                            break;
                            case 'businessRegistration':
                                setIsRegistrationVisible(!isRegistrationVisible);
                                break;
                                case 'address':
                                    setIsAddressVisible(!isAddressVisible);
                                    break;
                                    case 'potential':
                                      setIsPotentialVisible(!isPotentialVisible);
                                      break;
                                      case 'currency':
                                        setIsCurrencyVisible(!isCurrencyVisible);
                                        break;
                                        case 'type':
                                          setIsTypeVisible(!isTypeVisible);
                                          break;
          default:
            break;
        }
      };
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
           nameInd:"",
           
           potentialInd:"",
           potentialCurrencyInd:'',
           typeInd:"",
           formType:"add",
           baseFormType:"customer",

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
            //category: whiteblue ? "White" : "Blue" || "Both",
          }}
          // validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addCustomerConfigure(
              {
                ...values,
                dailCodeInd:isLastNameVisible,
           phoneNoInd:isEmailVisible,
           sectorInd:isMobileNumberVisible,
           sourceInd:isSourceVisible,
           noteInd:isNotesVisible,
           assignedToInd:isAssignedVisible,
           vatNoInd:isVatVisible,
           businessRegInd:isRegistrationVisible,
           addressInd:isAddressVisible,
           nameInd:isFirstNameVisible,
           typeInd:isTypeVisible,
           potentialInd:isPotentialVisible,
           potentialCurrencyInd:isCurrencyVisible,

                // category: checked ? "Both" : whiteblue ? "White" : "Blue",
                // assignedTo: selectedOption ? selectedOption.employeeId:userId,
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
              <div class="flex justify-around  pr-2 max-sm:flex-col">
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
             <div class=" mt-4"></div>
             {/* {!isFirstNameVisible && ( */}
                  <Field
                    isRequired
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
             {/* )} */}
             <Switch
            checked={isFirstNameVisible}
            onChange={() => toggleFieldVisibility('name')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  
               
                  <Field
                    name="url"
                    type="text"
                    label="URL"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                


              
                        
                   <div class=" flex justify-between mt-4">
                    <div class=" w-3/12 max-sm:w-[30%]">
                         {/* {!isLastNameVisible&&( */}
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        isColumnWithoutNoCreate
                        // label="Phone #"
                        label="Dial Code"
                          
                        isColumn
                        component={SearchSelect}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                         {/* )} */}

<Switch
            checked={isLastNameVisible}
            onChange={() => toggleFieldVisibility('countryDialCode')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                    <div class=" w-8/12">
                        {/* {!isEmailVisible&&( */}
                      <FastField
                        name="phoneNumber"
                        label="Phone No"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                        {/* )} */}

<Switch
            checked={isEmailVisible}
            onChange={() => toggleFieldVisibility('phoneNumber')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                  </div>

              
                  <div class=" flex justify-between mt-4">
                  <div class="w-w47.5.5 max-sm:w-w47.5.5">
                    {/* {!isMobileNumberVisible&&( */}
                  <Field             
                  placeholder="Sector"        
                            name="sectorId"
                            label="Sector"
                             
                            isColumn
                            component={SelectComponent}
                            value={values.sectorId}
                            options={
                              Array.isArray(sectorOption) ? sectorOption : []
                            }
                          />
                    {/* )} */}

<Switch
            checked={isMobileNumberVisible}
            onChange={() => toggleFieldVisibility('sectorId')}
       checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                    <div class="w-w47.5.5">
                        {/* {!isSourceVisible&&( */}
                    <FastField
                            name="source"
                            type="text"
                            label="Source"
                              
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.source}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        {/* )} */}

<Switch
            checked={isSourceVisible}
            onChange={() => toggleFieldVisibility('source')}
        checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                  </div>
                  <div class="flex justify-between mt-2">
  <div class="w-w47.5.5 flex">
    <div class="w-24">
      <Field
        name="potentialValue"
        label="Potential"
        
        isColumn
        width={"100%"}
        component={InputComponent}
        inlineLabel
      />
      <Switch
            checked={isPotentialVisible}
            onChange={() => toggleFieldVisibility('potential')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
    </div>
    <div class="w-16 ml-2 max-sm:w-wk">
      <div style={{fontWeight:"bold",fontSize:"0.75rem"}}>Currency</div>
      <Select
        showSearch
        style={{ width: 100 }}
        placeholder="Search or select currency"
        optionFilterProp="children"
        // loading={isLoadingCurrency}
        // onFocus={handleSelectCurrencyFocus}
        // onChange={handleSelectCurrency}
      >
          {hardcodedCurrencies.map(currency => (
    <Option key={currency.currency_name} value={currency.currency_name}>
      {currency.currency_name}
    </Option>
  ))}
      </Select>
      <Switch
            checked={isCurrencyVisible}
            onChange={() => toggleFieldVisibility('currency')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
    </div>
   
  </div>


  <div class="w-w47.5.5 ">
    <Field
      name="type"
      label="Type"
       
      isColumn
      width={"100%"}
      component={SelectComponent}
      options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" }
      ]}
      // options={
      //   Array.isArray(typeOption)
      //     ? typeOption
      //     : []
      // }
     
      inlineLabel
    />
     <Switch
            checked={isTypeVisible}
            onChange={() => toggleFieldVisibility('type')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
  </div>
 
</div>

                 
               
                  {/* {!isNotesVisible&&( */}
                  <Field
                    name="notes"
                    label="Notes"
                    h={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                  {/* )} */}
                  <Switch
            checked={isNotesVisible}
            onChange={() => toggleFieldVisibility('notes')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "  
                >
       
                 <div class=" flex justify-between mb-[0.35rem] mt-4">
                    <div class=" h-full w-full">
                        {/* {!isAssignedVisible&&( */}
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className=" font-bold text-xs  leading-lh1.2  "
            // style={{boxShadow:"0em 0.25em 0.625em -0.25em" }}
            >
              Assigned
            </Listbox.Label>
            <div className="relative ">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                        {/* )} */}

      <Switch
            checked={isAssignedVisible}
            onChange={() => toggleFieldVisibility('assignedTo')}
           checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />

                  </div>
                    </div>
                   
                    <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                    <div class=" w-2/5 max-sm:w-wk">
                        {/* {!isVatVisible&&( */}
                      <Field
                        name="vatNo"
                        type="text"
                        label="VAT Number"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                        {/* )} */}

<Switch
            checked={isVatVisible}
            onChange={() => toggleFieldVisibility('vatNo')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                      
                    </div>
                    <div class=" w-[10rem] max-sm:w-wk">
                        {/* {!isRegistrationVisible&&( */}
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
                        {/* )} */}

<Switch
            checked={isRegistrationVisible}
            onChange={() => toggleFieldVisibility('businessRegistration')}
         checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                  </div>
                  
                  <div class="mt-8" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class="font-semibold text-xs text-white flex"> Corporate Address</div>
                  </div>
                    </div>
           
                  {/* {!isAddressVisible&&( */}
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
                  {/* )} */}
                  <Switch
            checked={isAddressVisible}
            onChange={() => toggleFieldVisibility('address')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  
               
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-[3.5rem] mr-2 absolute mt-3 ">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingCustomerConfig}
              >
                
Update
              </Button>
            </div>
          
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }


const mapStateToProps = ({ auth, customer,settings,employee ,opportunity,sector,leads}) => ({
  addingCustomer: customer.addingCustomer,
  addingCustomerError: customer.addingCustomerError,
  clearbit: customer.clearbit,
  orgId: auth.userDetails.organizationId,
  addingCustomerConfig:settings.addingCustomerConfig,
  user: auth.userDetails,
  customerConfigure:settings.customerConfigure,
  sales: opportunity.sales,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  userId: auth.userDetails.userId,
  sectors: sector.sectors,
  fullName: auth.userDetails.fullName,
  crmAllData:leads.crmAllData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomer,
      setClearbitData,
      addCustomerConfigure,
      getCustomerConfigure,
      getSectors,
      getAllSalesList,
      getAllCustomerEmployeelist,
      getCrm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);






















