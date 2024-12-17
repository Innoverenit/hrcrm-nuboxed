import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Switch } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import {getCustomerConfigure} from "../../../Settings/SettingsAction"
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { addSuppliers } from "../SuppliersAction";
import {getEmployeelistAsErp} from "../../Shipper/ShipperAction"
import { Listbox } from '@headlessui/react';
import { InputComponent1 } from "../../../../Components/Forms/Formik/InputComponent1";
import SearchSelect1 from "../../../../Components/Forms/Formik/SearchSelect1";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});

function AddSuppliersForm (props) {
  useEffect(() => {
    props.getEmployeelistAsErp();
    props.getCustomerConfigure(props.orgId,"add","supplier")
  }, []);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.employeeAsErp.find((item) => item.empName === selected);
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
      setChecked(checked);
      console.log(checked);
    };

    
    return (
      <>
        <Formik     
          initialValues={{
            userId: props.userId,
            name: "",
            dialCode: "",
            phoneNo: "",
            emailId: "",
            orgId: props.orgId,
            assignedTo: selectedOption ? selectedOption.employeeId:props.userId,
            address: [
              {
                addressId: "",
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                pinCode: "",
                country: "",
                latitude: "",
                longitude: "",

              },
            ],
            // address: "",
          }}
          validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
           props.addSuppliers(
              {
                ...values,
                approvedInd:checked,
                assignedTo: selectedOption ? selectedOption.employeeId:props.userId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[33rem]">
            <Form className="form-background">
              <div class="flex justify-between max-sm:flex-col">
                <div class="h-full w-w47.5.5 max-sm:w-full">
                <div className=" text-xs font-poppins font-bold "> {props.translatedMenuItems[0]} </div>
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    // label={props.translatedMenuItems[0]} 
                    width={"100%"}
                    component={InputComponent}
                  
                    isColumn
                    inlineLabel
                  />
                  <div className="text-xs font-poppins font-bold">
{props.translatedMenuItems[15]}
  {/* Dial code */}

</div>
               
<div class="  flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
<div class=" w-3/12 max-sm:w-[30%]">
                    {/* dial Code */}
                      {props.customerConfigure.dailCodeInd===true&&
                      <FastField
                        name="dialCode"
                        selectType="dialCode"
                        // label={props.translatedMenuItems[14]} 
                        
                        isColumn
                        component={SearchSelect1}
                        defaultValue={{
                          value: props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                        isColumnWithoutNoCreate
                      />
}
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
<div class=" w-[76%]">
                    {props.customerConfigure.phoneNoInd===true&&
                      <Field
                        name="phoneNo"
                        // label={`${props.translatedMenuItems[15]} #`} 
                        type="text"
                        placeholder="Phone #"
                        isColumn
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                      />
                    }
                    </div>
                  </div>
                  <div class="w-full">
                    <FastField
                      type="email"
                      name="emailId"
                      label={props.translatedMenuItems[16]} 
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>


                  <div class="w-full flex">
                  {props.customerConfigure.approveInd===true&&
                    <div class=" text-xs font-bold font-poppins ">
                     
                      {props.translatedMenuItems[17]} 
                    </div>
}
                    {props.customerConfigure.approveInd===true&&
                  <Switch 
                  checked={checked} 
                  onChange={handleChange} 
                   checkedChildren="Yes"
                  unCheckedChildren="No"
                  />
                    }
                  </div>       
                </div>
                <div class="h-full w-w47.5.5 max-sm:w-full">
                {props.customerConfigure.assignedToInd===true&&
                <div class=" h-full w-full">
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] mb-1 leading-lh1.2 ">          
                    {/* Assigned*/}
         {props.translatedMenuItems[24]}
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
                  {props.employeeAsErp.map((item) => (
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
}
                  <div>
                    <div class="mt-3">
                    {props.customerConfigure.addressInd===true&&
                    <FieldArray
                      name="address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                        {...props}
                          singleAddress
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingSuppliers}
                >
                  {props.translatedMenuItems[12]}
                  {/* Create */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
}

const mapStateToProps = ({ auth, shipper,settings,employee,suppliers,shipBy }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addingSuppliers: suppliers.addingSuppliers,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  fullName: auth.userDetails.fullName,
  orgId:auth.userDetails.organizationId,
  ShipByData:shipBy.ShipByData,
  customerConfigure:settings.customerConfigure,
  employeeAsErp:shipper.employeeAsErp
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSuppliers,
      getEmployeelistAsErp,
      getCustomerConfigure
  
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddSuppliersForm);
