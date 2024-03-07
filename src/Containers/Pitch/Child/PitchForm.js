import React, {  useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getSectors} from "../../Settings/Sectors/SectorsAction"
import {getSources} from "../../Settings/Category/Source/SourceAction"
import {getAllEmployeelist,getDialCode} from "../../Investor/InvestorAction"
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {addPitch,setClearbitData} from "../PitchAction"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import { Listbox, } from '@headlessui/react'
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
   phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function PitchForm (props) {
  
 const handleReset = (resetForm) => {
    resetForm();
  };
 
  useEffect(()=> {
props.getAllEmployeelist();
props.getSources(props.orgId);
props.getDialCode();
props.getSectors();
  },[]);
  const sourceOption = props.sources.map((item) => {
    return {
      label: item.name
      || null,
      value: item.sourceId
      ,
    };
  });
  const dialCodeOption = props.dialCodeList.map((item) => {
    return {
      label: `+${item.country_dial_code || ""}`,
      value: item.country_dial_code
      ,
    };
  });
  const sectorOption = props.sectors.map((item) => {
    return {
      label: item.sectorName
      || null,
      value: item.sectorId
      ,
    };
  });
    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingLeads,
      addLeads,
      clearbit,
      setClearbitData,
    } = props;

    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            partnerName: "",
            companyName: "",
            url: "",
            sectorId: "",
            email: "",
            phoneNumber: "",
            countryDialCode:user.countryDialCode || "",
            fullName:"",
            userId: props.userId,
            notes: "",
            businessRegistration: "",
            assignedTo: selectedOption ? selectedOption.employeeId:userId,
            department: "",
            salutation:"",
            firstName:"",
            middleName:"",
            lastName:"",
            proposalValue:"",
            opportunityName:"",
            source:"",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
              },
            ],
          }}
          validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addPitch(
              {
                ...values,
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
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
            <div class="overflow-y-auto h-[34rem] md:overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
            <div class="">
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
            <div class=" flex justify-around max-sm:flex-col">
                   
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                   
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-2/5 max-sm:w-full">
                          <Field
                            name="salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            isColumn
                          />
                        </div> */}
                        <div class=" w-full max-sm:w-full">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstname"
                                defaultMessage="firstname"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between  max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="middle"
                              />
                            }
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
                            label={
                              <FormattedMessage
                                id="app.lastname"
                                defaultMessage="lastname"
                              />
                            }
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

                  <Field
                  isRequired
                    name="email"
                    type="text"
                    label={
                      <FormattedMessage id="app.email" defaultMessage="Email" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> 
                               
                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[32%]">
                   
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
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                  
                    </div>
                    <div class=" w-8/12">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label={
                          <FormattedMessage
                            id="app.phoneno#"
                            defaultMessage="phoneno#"
                          />
                        }
                        
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      </div>
                    </div>
                  </div>
                 
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
                  <Field
                
                    name="companyName"
                    type="text"
                    label={
                      <FormattedMessage id="app.company" defaultMessage="company" />
                    }
                    isColumn
                    width={"100%"}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                  />
                  </div>
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  <Field
                    name="url"
                    type="text"
                    label={<FormattedMessage id="app.url" defaultMessage="url" />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-w47.5">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <Field
                        name="vatNo"
                        type="text"
                        label={
                          <FormattedMessage
                            id="app.vatNumber"
                            defaultMessage="vatNumber"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                    <div class="w-w47.5">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label={
                          <FormattedMessage
                            id="app.businessregistration"
                            defaultMessage=" businessregistration"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                  <div class=" w-w47.5">
                      <Field
                        name="sectorId"
                        isColumnWithoutNoCreate
                        // selectType="sectorName"
                        label={
                          <FormattedMessage
                            id="app.sector"
                            defaultMessage="Sector"
                          />
                        }
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(sectorOption) ? sectorOption : []
                        }
                      />
                    </div>
                    <div class=" w-w47.5">
                          <Field
                            name="source"
                             label={
                              <FormattedMessage
                                id="app.source"
                                defaultMessage="source"
                              />
                            }
                            isColumnWithoutNoCreate
                            component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                            isColumn
                          />
                        </div>
                    </div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "  
                >
                   <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem]"><FormattedMessage
                                id="app.assignedto"
                                defaultMessage="assignedto"
                              />
           </Listbox.Label>
          <div className="relative ">
              <Listbox.Button style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
             

                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
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
                  
                <div class="mt-3">
                  <Field
                    name="notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="notes" />
                    }
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
                  loading={props.addingPitch}
                >
                  <FormattedMessage id="app.create" defaultMessage="create" />
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

const mapStateToProps = ({ auth,investor,source,countrys,sector, leads,employee,pitch }) => ({
    addingPitch: pitch.addingPitch,
  addingLeadsError: leads.addingLeadsError,
   clearbit: pitch.clearbit,
  user: auth.userDetails,
  sources: source.sources,
  country: countrys.country,
  dialCodeList:investor.dialCodeList,
orgId:auth.userDetails.organizationId,
  allEmployeeList:investor.allEmployeeList,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName,
  // countryDialCode:auth.userDetails.countryDialCode,
  sectors: sector.sectors,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addPitch,
      setClearbitData,
      getAllEmployeelist,
      getSources,
      getDialCode,
      getSectors,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchForm);
