import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { updateSupplierById } from "../SuppliersAction";
import {getEmployeelistAsErp} from "../../Shipper/ShipperAction"
import { Listbox } from '@headlessui/react';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});

function UpdateSupplierForm (props) {
  useEffect(() => {
    props.getEmployeelistAsErp();
  }, []);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.employeeAsErp.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            userId: props.userId,
            name: props.setEditingSuppliers.name || "",
            dialCode: props.setEditingSuppliers.dialCode || "",
            phoneNo: props.setEditingSuppliers.phoneNo || "",
            emailId: props.setEditingSuppliers.emailId || "",
            orgId: props.orgId,
            assignedTo: selectedOption ? selectedOption.employeeId:props.setEditingSuppliers.userId,
            // address: [
            //   {
            //   addressType:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].addressType : "",
            //     address1: props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].address1 : "",
            //     address2:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].address2 : "",
            //     addressId:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].addressId : "",
            //   town: props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].town :"",
            //   street:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].street : "",
            //   city:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].city : "",
            //   pinCode:props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].pinCode : "",
            //   country: props.setEditingSuppliers.address.length ? props.setEditingSuppliers.address[0].country :"",
            //     latitude: "",
            //     longitude: "",

            //   },
            // ],
            address: "",
          }}
          validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
           props.updateSupplierById(
              {
                ...values,
                assignedTo: selectedOption ? selectedOption.employeeId:props.setEditingSuppliers.userId,
              },
              props.rowdata.supplierId,
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
                <div class="h-full w-w47.5 max-sm:w-full">
                <div className="font-bold font-poppins text-xs"> {props.translatedMenuItems[0]}</div>
                  <Field
                    isRequired
                    name="name"
                    type="text"               
                    width={"100%"}
                    component={InputComponent}             
                    isColumn
                    inlineLabel
                  />
                  </div>
                   <div class=" flex justify-between">
                    <div class="w-[30%] max-sm:w-[40%] ">
                      {/* Dial Code               */}
                      <div class="font-bold font-poppins text-xs"> {props.translatedMenuItems[14]}</div>
                      <FastField
                        name="dialCode"
                        selectType="dialCode"
                        isColumn
                        component={SearchSelect}
                        defaultValue={{
                          value: props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                        isColumnWithoutNoCreate
                      />
                  
                    </div>
                    <div class="w-[68%] max-sm:w-[50%]">
                    <div className="font-bold font-poppins text-xs"> {props.translatedMenuItems[15]}</div>
                      <FastField
                        name="phoneNo"               
                        type="text"
                        placeholder="Phone #"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />

                    </div>
                  </div>
                  <div class="w-full">
                  <div className="font-bold text-[0.75rem] mb-1 leading-lh1.2 ">         
                        {/* Email */}
                        {props.translatedMenuItems[16]}
         
                   </div>
                    <FastField
                      type="email"
                      name="emailId"                  
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
          
             
                <div class="h-full w-w47.5 max-sm:w-full">
                <div class=" h-full w-full">
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="font-bold text-[0.75rem] mb-1 leading-lh1.2 ">         
                        {/* Assigned */}
                        {props.translatedMenuItems[24]}
         
            </div>
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
                  {/* <div>
                    <div class="mt-3">
                    <FieldArray
                      name="address"
                      render={(arrayHelpers) => (
                        <AddressFieldArray
                          singleAddress
                          arrayHelpers={arrayHelpers}
                          values={values}
                        />
                      )}
                    />
                    </div>
                  </div> */}
                </div>
              </div>

              <div class="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.updateSuppliersById}
                >
                   {props.translatedMenuItems[25]}
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

const mapStateToProps = ({ auth, shipper,employee,suppliers,shipBy }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  updateSuppliersById: suppliers.updateSuppliersById,
  allCustomerEmployeeList:employee.allCustomerEmployeeList,
  fullName: auth.userDetails.fullName,
  orgId:auth.userDetails.organizationId,
  ShipByData:shipBy.ShipByData,
  employeeAsErp:shipper.employeeAsErp,
  setEditingSuppliers:suppliers.setEditingSuppliers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        updateSupplierById,
      getEmployeelistAsErp,
  
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSupplierForm);
