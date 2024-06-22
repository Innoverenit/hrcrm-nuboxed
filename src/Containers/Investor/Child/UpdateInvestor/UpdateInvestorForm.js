import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button,Switch} from "antd";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getAllEmployeelist,getDialCode} from "../../InvestorAction"
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Listbox } from '@headlessui/react'
import {UpdateInvestor} from "../../InvestorAction";
import {getInvestorList} from "../../../Settings/Category/InvestorTab/InvestorListAction";

//yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateInvestorSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  // email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdateInvestorForm (props) {
 
  const [contract, setContract] = useState(false);
  useEffect(() => {
    props.getAllEmployeelist();
    props.getInvestorList(props.orgId)
    props.getDialCode();
  }, []);
  const handleContract = (checked) => {
    setContract(checked);
  };

  const handleReset = (resetForm) => {
    resetForm();
  };

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
  
    const {
      accounts,
      user,
      updateInvestorById,
      UpdateInvestor,
      RowData,
      userId
    } = props;

    const investorType = props.investorListData.map((item) => {
      return {
        label: item.name || "",
        value: item.investorCategoryId,
      };
    });
    const [defaultOption, setDefaultOption] = useState(RowData.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: RowData.name || "",
            url: RowData.url || "",
            pvtAndIntunlInd: contract ? "true" : "false",
            sectorId: RowData.sectorId || "",
            investorCategoryId:RowData.investorCategoryId || "",
            source: RowData.source || "" ,
            vatNo:RowData.vatNo  ,
            businessRegistration:RowData.businessRegistration ||"",
            email: RowData.email || "",
            country:RowData.country || "",
            countryDialCode: RowData.countryDialCode || user.countryDialCode,
            phoneNumber: RowData.phoneNumber || "",
            userId: userId,
            assignedTo:selectedOption ? selectedOption.employeeId:props.RowData.employeeId,
            notes: RowData.notes || "",
            address: [
              {
                addressId: RowData.address.length ? RowData.address[0].addressId : "",
                address1: RowData.address.length ? RowData.address[0].address1 : "",
                address2:  RowData.address.length ? RowData.address[0].address2 : "",
                street:  RowData.address.length ? RowData.address[0].street : "",
                city:  RowData.address.length ? RowData.address[0].city : "",
                state:  RowData.address.length ? RowData.address[0].state : "",
                postalCode:  RowData.address.length ? RowData.address[0].postalCode : "",             
              },
            ],
          }}
          validationSchema={UpdateInvestorSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            UpdateInvestor(
              {
                ...values,
                investorId: RowData.investorId,
                // source: RowData.source,
                pvtAndIntunlInd: contract ? "true" : "false",
                assignedTo:selectedOption ? selectedOption.employeeId:props.RowData.employeeId,
              },
              RowData.investorId,
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
                <div class=" w-w47.5 max-sm:w-wk" >
                  
                   <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold mt-3 ">
                    <FormattedMessage id="app.name" defaultMessage="Name" /></div>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
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
                  
                  {/* <Field
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
                   <div class=" flex justify-between mt-6">
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
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-8/12">
                      <FastField
                        //isRequired
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
                  
                  
                     <div class=" flex justify-between max-sm:flex-col mt-3">
                     {contract ?
                  <div class=" w-w47.5 max-sm:w-wk">
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
                        defaultValue={RowData.sector}
                      />
                    </div>
                     : ( null)}
                      {contract ?
                    <div class="md:w-w47.5">
                    <FastField
                            name="source"
                            isColumnWithoutNoCreate
                             label={
                              <FormattedMessage
                                id="app.source"
                                defaultMessage="Source"
                              />
                            }
                            defaultValue={{
                              label:RowData.source,
                            }}
                          
                            selectType="sourceName"
                            component={SearchSelect}
                            // value={values.source}
                            // defaultValue={RowData.source}
                            isColumn
                          />

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
                            component={SelectComponent}
                            options={
                              Array.isArray(investorType) ? investorType : []
                            }
                            defaultValue={RowData.investorId}
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
                  
                   <div class=" flex justify-between mt-3">
                   <div class=" h-full w-full">
                   <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem]">
              Assigned
            </Listbox.Label>
            <div className="relative mt-[0.1rem]">
              <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}}>
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
                   
                    <div class=" flex justify-between max-sm:flex-col mt-[0.35rem]">
                    {contract ?
                    <div class=" w-1/2 max-sm:w-wk">
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
                  Loading={updateInvestorById}
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

const mapStateToProps = ({ auth,investor,investorList,employee }) => ({
  updateInvestorById: investor.updateInvestorById,
  updateInvestorByIdError: investor.updateInvestorByIdError,
  user: auth.userDetails,
  dialCodeList:investor.dialCodeList,
  allEmployeeList:investor.allEmployeeList,
  userId: auth.userDetails.userId,
  employees: employee.employees,
  investorListData:investorList.investorListData,
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      UpdateInvestor,
      getAllEmployeelist,
      getInvestorList,
      getDialCode
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInvestorForm);
