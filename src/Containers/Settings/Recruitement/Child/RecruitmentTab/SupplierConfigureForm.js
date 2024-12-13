import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import {
  addCustomerConfigure,
  getCustomerConfigure
} from "../../../SettingsAction";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { getEmployeelistAsErp } from "../../../../../Containers/Main/Shipper/ShipperAction";
import { Listbox } from '@headlessui/react';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
});

function AddSuppliersForm(props) {
  //const [isDataFetched, setIsDataFetched] = useState(false);

  const [isphoneNoVisible, setIsphoneNoVisible] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [isAssignedVisible, setIsAssignedVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isapprovedVisible, setIsApprovedVisible] = useState(false);

  useEffect(() => {
    props.getEmployeelistAsErp();
    props.getCustomerConfigure(props.orgId, "add", "supplier");
  }, []);

  useEffect(() => {
    console.log("Customer Configure:", props.customerConfigure)
    // if (
    //   props.customerConfigure.addressInd !== undefined &&
    //   props.customerConfigure.assignedToInd !== undefined &&
    //   props.customerConfigure.phoneNoInd !== undefined &&
    //   props.customerConfigure.dailCodeInd !== undefined &&
    //   props.customerConfigure.approvedInd !== undefined
    // ) {
      setIsMobileNumberVisible(props.customerConfigure.dailCodeInd);
      setIsAssignedVisible(props.customerConfigure.assignedToInd);
      setIsAddressVisible(props.customerConfigure.addressInd);
      setIsphoneNoVisible(props.customerConfigure.phoneNoInd);
      setIsApprovedVisible(props.customerConfigure.approveInd);
      // setIsDataFetched(true);
    // }
  }, [props.customerConfigure]);




  useEffect(() => {
    console.log("isAssignedVisible:", isAssignedVisible);
    console.log("isMobileNumberVisible:", isMobileNumberVisible);
    console.log("isphoneNoVisible:", isphoneNoVisible);
    console.log("isAddressVisible:", isAddressVisible);
    console.log("isapprovedVisible:", isapprovedVisible);
  }, [
    isAssignedVisible,
    isMobileNumberVisible,
    isphoneNoVisible,
    isAddressVisible,
    isapprovedVisible,
  ]);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = props.employeeAsErp.find((item) => item.empName === selected);
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  const toggleFieldVisibility = (fieldName) => {
    switch (fieldName) {
      case 'assigned':
        setIsAssignedVisible(!isAssignedVisible);
        break;
      case 'dialcode':
        setIsMobileNumberVisible(!isMobileNumberVisible);
        break;
      case 'phoneNo':
        setIsphoneNoVisible(!isphoneNoVisible);
        break;
      case 'address':
        setIsAddressVisible(!isAddressVisible);
        break;
      case 'approve':
        setIsApprovedVisible(!isapprovedVisible);
        break;
      default:
        break;
    }
  };

  if (props.fetchingCustomerConfigure) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Formik
        initialValues={{
          formType: "add",
          baseFormType: "supplier",
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
        }}
        onSubmit={(values, { resetForm }) => {
          props.addCustomerConfigure(
            {
              ...values,
              dailCodeInd: isMobileNumberVisible,
              phoneNoInd: isphoneNoVisible,
              assignedToInd: isAssignedVisible,
              addressInd: isAddressVisible,
              approveInd: isapprovedVisible,
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
          <div className="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[33rem]">
            <Form className="form-background">
              <div className="flex justify-between max-sm:flex-col">
                <div className="h-full w-w47.5.5 max-sm:w-full">
                  <Field
                    isRequired
                    name="name"
                    type="text"
                    label="Name"
                    width={"100%"}
                    component={InputComponent}
                    isColumn
                    inlineLabel
                  />
                  <div className="flex justify-between">
                    <div className="w-[30%] max-sm:w-[40%]">
                      <FastField
                        name="dialCode"
                        selectType="dialCode"
                        label="Dial Code"
                        isColumn
                        component={SearchSelect}
                        defaultValue={{
                          value: props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                        isColumnWithoutNoCreate
                      />
                      <Switch
                        checked={isMobileNumberVisible}
                        onChange={() => toggleFieldVisibility('dialcode')}
                        checkedChildren="Visible"
                        unCheckedChildren="Hidden"
                      />
                    </div>
                    <div className="w-[68%] max-sm:w-[50%]">
                      <FastField
                        name="phoneNo"
                        label="Phone"
                        type="text"
                        placeholder="Phone #"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      <Switch
                        checked={isphoneNoVisible}
                        onChange={() => toggleFieldVisibility('phoneNo')}
                        checkedChildren="Visible"
                        unCheckedChildren="Hidden"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <FastField
                      type="email"
                      name="emailId"
                      label="Email"
                      className="field"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
                  <div className="w-full">
                    <div class="font-bold text-xs font-poppins text-black">Approve</div>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                    <Switch
                      checked={isapprovedVisible}
                      onChange={() => toggleFieldVisibility('approve')}
                      checkedChildren="Visible"
                      unCheckedChildren="Hidden"
                    />
                  </div>
                </div>
                <div className="h-full w-w47.5.5 max-sm:w-full">
                  <div className="h-full w-full">
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block font-semibold text-[0.75rem] mb-1 leading-lh1.2">
                            Assigned
                          </Listbox.Label>
                          <div className="relative">
                            <Listbox.Button
                              style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }}
                              className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            >
                              {selected}
                            </Listbox.Button>
                            {open && (
                              <Listbox.Options
                                static
                                className="absolute z-10 max-h-56 w-full overflow-auto mt-1 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                    <Switch
                      checked={isAssignedVisible}
                      onChange={() => toggleFieldVisibility('assigned')}
                      checkedChildren="Visible"
                      unCheckedChildren="Hidden"
                    />
                  </div>
                  <div>
                    <div className="mt-3">
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
                      <Switch
                        checked={isAddressVisible}
                        onChange={() => toggleFieldVisibility('address')}
                        checkedChildren="Visible"
                        unCheckedChildren="Hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingSuppliers}
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

const mapStateToProps = ({ auth, shipper, settings, employee, suppliers, shipBy }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  addingSuppliers: suppliers.addingSuppliers,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  fullName: auth.userDetails.fullName,
  orgId: auth.userDetails.organizationId,
  ShipByData: shipBy.ShipByData,
  employeeAsErp: shipper.employeeAsErp,
  fetchingCustomerConfigure:settings.fetchingCustomerConfigure,
  customerConfigure: settings.customerConfigure,
  addingCustomerConfig: settings.addingCustomerConfig,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeelistAsErp,
      getCustomerConfigure,
      addCustomerConfigure
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddSuppliersForm);

