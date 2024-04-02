import React, {useState,useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import {getCustomer} from "../../../Settings/Category/Customer/CustomerAction"
import ProgressiveImage from "../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../Components/Forms/Autocomplete/ClearbitImage";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateCustomer,setEditCustomer ,setClearbitData} from "../../CustomerAction";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Listbox, } from '@headlessui/react'
import { getCrm} from "../../../Leads/LeadsAction";
import {getCurrency} from "../../../Auth/AuthAction";

//yup validation scheme for creating a account
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

 
    const [defaultOption, setDefaultOption] = useState(setEditingCustomer.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);
    
    const srcnme=setEditingCustomer.source

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
            source:setEditingCustomer.source  || "",
            currencyId: setEditingCustomer.currency || "",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingCustomer.employeeId,
            notes: setEditingCustomer.notes || "",
            potentialValue:setEditingCustomer.potentialValue || "",
            address: [
              {
                // country:setEditingCustomer.country || "",
                addressId: setEditingCustomer.address.length ? setEditingCustomer.address[0].addressId : "",
                address1: setEditingCustomer.address.length ? setEditingCustomer.address[0].address1 : "",
                address2:  setEditingCustomer.address.length ? setEditingCustomer.address[0].address2 : "",
                street:  setEditingCustomer.address.length ? setEditingCustomer.address[0].street : "",
                city:  setEditingCustomer.address.length ? setEditingCustomer.address[0].city : "",
                state:  setEditingCustomer.address.length ? setEditingCustomer.address[0].state : "",
                country: setEditingCustomer.address.length ? setEditingCustomer.address[0].country : "",
                postalCode:  setEditingCustomer.address.length ? setEditingCustomer.address[0].postalCode : "",             
              },
            ],
          }}
          validationSchema={UpdateCustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomer(
              {
                ...values,
                customerId: props.customerId,
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
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" w-w47.5 max-sm:w-wk" >
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
                
                   <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
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
                   
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={
                      <FormattedMessage id="app.url" defaultMessage="URL" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />

                  {/* <Spacer />
                  <Field
                    name="email"
                    type="text"                   
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    /> */}
                   <div class=" flex justify-between mt-3">
                   <div class=" w-3/12 max-sm:w-[31%]">
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect}
                      
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code "
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
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}
                        label="Phone No"
                        inlineLabel
                        width={"100%"}
                        />                   
                         </div>
                  </div>
                 
                  
                     <div class=" flex justify-between mt-3">
                     <div class="w-w47.5 max-sm:w-w47.5">
                      <FastField                      
                        name="sectorId"
                        isColumnWithoutNoCreate
                        selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                      />
                    </div>
                    <div class=" w-w47.5">
                    <FastField
                          name="source"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                              id="app.source"
                              defaultMessage="Source"
                            />
                          }
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
           <div class=" flex justify-between mt-3">
           <div class="flex justify-between w-w47.5 max-sm:w-wk">
           <div class="w-24">
                    <Field
                  name="potentialValue"
                    label={
                      <FormattedMessage
                        id="app.potential"
                        defaultMessage="Potential"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                    <div class="w-16 max-sm:w-wk">
                    <Field
                      name="currencyId"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
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
                 
                   <div class=" flex justify-between mt-3 mb-[0.35rem]">
                   <div class=" h-full w-full">
                   <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem]">
              Assigned to
            </Listbox.Label>
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
                      <Field
                        name="vatNo"
                        type="text" 
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="VAT Number"
                          />
                        }
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                    </div>
                    <div class="w-w47.5">
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
                    <div class=" flex justify-between mt-[0.2rem] max-sm:flex-col ">
                  <div class="w-w47.5">
                      <Field
                        name="type"
                        // type="text"
                        // label="VAT Number"
                        label={
                          <FormattedMessage
                            id="app.type"
                            defaultMessage="Type"
                          />
                        }
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
                
                  </div>
                 
                  <div class="mt-8" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                 <div class=" text-[white] text-xs" >Corporate Address</div>
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
                       // name="address[0].country"
                       name="country"
                       isColumnWithoutNoCreate
                       // label="Country"

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
                       // style={{ flexBasis: "80%" }}
                       isColumn
                       width="100%"
                     />
                   </div>
                 </div> */}
               
                                     
                </div>
              </div>
              <div class="flex justify-end w-wk mt-3 bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateCustomerById}
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateCustomer,
      setClearbitData,
      setEditCustomer,
      getCrm,
      getCustomer,
      getCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerForm);
