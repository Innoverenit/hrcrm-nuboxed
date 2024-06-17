import React, {  useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Switch,Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import {getAllEmployeelist,getDialCode} from "../../Investor/InvestorAction"
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
     updatePitch,
    setEditPitch,
} from "../PitchAction";
import {getSectors} from "../../Settings/Sectors/SectorsAction"
import {getSources} from "../../Settings/Category/Source/SourceAction"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Listbox, } from '@headlessui/react'
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdatePitchSchema = Yup.object().shape({
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function UpdatePitchForm (props) {
 
  const [contract, setContract] = useState(false); 
  const [priority,setpriority]=useState(props.selectedTask
    ? props.selectedTask.priority
    : "hot");
  const handleContract = (checked) => {
    setContract(checked);
  };
  const handleButtonClick = (type) => {
    setpriority(type);
    };
  const handleReset = (resetForm) => {
    resetForm();
  };
  useEffect (()=>{
    props.getAllEmployeelist();
    props.getDialCode();
    props.getSources(props.orgId);
    props.getSectors();
  },[])
 
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
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      updateLeadsById,
      updateLeads,
      setClearbitData,
    } = props;

    const [defaultOption, setDefaultOption] = useState(props.setEditingPitch.assignedTo);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            companyName: props.setEditingPitch.companyName || "",
            url: props.setEditingPitch.url || "",
            sectorId: props.setEditingPitch.sectorId  ,
            type:priority,
            source: props.setEditingPitch.source || "" ,
            pvtAndIntunlInd: contract ? "true" : "false",
            vatNo:props.setEditingPitch.vatNo  ,
            email: props.setEditingPitch.email || "",
            country:props.setEditingPitch.country || "",
            countryDialCode:
              props.setEditingPitch.countryDialCode ||
              props.user.countryDialCode,
            phoneNumber: props.setEditingPitch.phoneNumber || "",
            userId: props.userId,
            notes: props.setEditingPitch.notes || "",
            salutation:props.setEditingPitch.salutation || "",
            firstName:props.setEditingPitch.firstName || "",
            middleName:props.setEditingPitch.middleName || "",
            lastName:props.setEditingPitch.lastName || "",
            unitOfShare:props.setEditingPitch.unitOfShare ||"",
            valueOfShare:props.setEditingPitch.valueOfShare ||"",
            businessRegistration:props.setEditingPitch.businessRegistration ||"",
            assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,
            address: [
              {
                addressId: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].addressId : "",
                address1: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].address1 : "",
                address2:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].address2 : "",
                street:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].street : "",
                city:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].city : "",
                state:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].state : "",
                postalCode:  props.setEditingPitch.address.length ? props.setEditingPitch.address[0].postalCode : "",  
                country: props.setEditingPitch.address.length ? props.setEditingPitch.address[0].country : "",           
              },
            ],
            
          }}
          // validationSchema={UpdatePitchSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.updatePitch(
              {
                ...values,
                type:priority,
                investorleadsId: props.investorleadsId,
                assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingPitch.employeeId,
                pvtAndIntunlInd: contract ? "true" : "false",
              },
              props.investorleadsId,
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
            <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk"   >
                    <div class=" flex  flex-nowrap mt-3">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                     
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
                      <div class=" flex justify-between max-sm:flex-col">
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
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
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
                    />
                    </div>
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
                        //isRequired
                        type="text"
                        name="phoneNumber"
                        isColumn
                        component={InputComponent}
                        label={
                          <FormattedMessage
                            id="app.phoneno#"
                            defaultMessage="phoneno#"
                          />
                        }
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
                    //label="Name"
                    label={
                      <FormattedMessage id="app.company" defaultMessage="company" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    // setClearbitData={props.setClearbitData}
                    // component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                    />
                    </div>
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  <Field
                    name="url"
                    type="text"
                    // label="URL"
                    label={
                      <FormattedMessage id="app.url" defaultMessage="url" />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                    </div>
                  <div class=" flex justify-between max-sm:flex-col">
                    <div class=" w-w47.5 max-sm:w-wk">
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
                        //isRequired
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        />
                        </div>
                    </div>
                    <div class=" w-w47.5 max-sm:w-wk">
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
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      <Field
                        name="unitOfShare"
                        type="text"
                        label="Share Quantity"
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
                        name="valueOfShare"
                        type="text"
                        label="Share Value"
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
                    <div class="w-w47.5">
                  
                        <FastField
                          name="source"
                          label={
                            <FormattedMessage
                            id="app.source"
                            defaultMessage="source"
                          />
                          }
                          isColumnWithoutNoCreate
                          defaultValue={{
                            label:props.setEditingPitch.source,
                          }}
                          component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                          isColumn
                          inlineLabel
                        />

           </div>
                </div>
                <div class=" flex items-center justify-between">
                <div class=" flex flex-col   mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Category</div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Institutional"
                      unCheckedChildren="Private"
                    />
                  </div>
                  <div class=" w-w47.5 max-sm:w-wk">
                    <div class="flex">
                       <Tooltip title="Hot">
                         <Button
                           
                            shape="circle"
                           onClick={() => handleButtonClick("hot")}
                           style={{
                             backgroundColor:"red",
                                 borderRadius: "50%", 
                                 width: "31px", 
                                 height: "31px"
                           }}
                         />
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Warm">
                         <Button
                           
                            shape="circle"
             
                           onClick={() => handleButtonClick("warm")}
                           style={{
                             backgroundColor:"orange",
                                 borderRadius: "50%", 
                                 width: "31px", 
                                 height: "31px",
                           }}
                         />
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Cold">
                         <Button
                           
                            shape="circle"
                   
                           onClick={() => handleButtonClick("cold")}
                           style={{
                             backgroundColor:"teal",
                                 borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                 width: "31px", // Adjust the width as needed
                                 height: "31px"
                           }}
                         ></Button>
                       </Tooltip>
                     </div>
                      </div>
                      </div>
                 </div>
                 <div class=" h-3/4 w-w47.5 max-sm:w-wk "   >
                   
                   
                    <div class=" mt-3">
                    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem] mt-[0.6rem]"><FormattedMessage
                                id="app.assignedto"
                                defaultMessage="assignedto"
                              /></Listbox.Label>
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
                    </div>

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
                 
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
                  <Field
                    name="notes"
                    // label="Notes"
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
                 Loading={props.updatePitchById}
                >
                  <FormattedMessage id="app.create" defaultMessage="create" />
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

const mapStateToProps = ({ auth,investor,countrys,source,sector, leads,employee,pitch }) => ({
    setEditingPitch: leads.setEditingPitch,
    updateLeadsById: leads.updateLeadsById,
    updatePitchById:pitch.updatePitchById,
    updateLeadsByIdError: leads.updateLeadsByIdError,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    organizationId: auth.userDetails.organizationId,
    orgId:auth.userDetails.organizationId,
    employees: employee.employees,
    leadsAllData:leads.leadsAllData,
    dialCodeList:investor.dialCodeList,
    sectors: sector.sectors,
    allEmployeeList:investor.allEmployeeList,
    setEditingPitch:pitch.setEditingPitch,
    sources: source.sources,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updatePitch,
        getSources,
        getDialCode,
        setEditPitch,
        getAllEmployeelist,
        getSectors
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePitchForm);
