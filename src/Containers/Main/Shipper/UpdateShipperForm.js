import React,{ useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { updateShipper,getEmployeelistAsErp } from "./ShipperAction";
import {getShipByData} from "../../Settings/Category/ShipBy/ShipByAction";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Listbox } from '@headlessui/react';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Input needed!"),
  phoneNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Too Short").max(10, "Too Large")
});
function UpdateShipperForm(props) {
  useEffect(() => {
    props.getEmployeelistAsErp();
    props.getShipByData(props.orgId);
  }, []);

  const shipByOptions = props.ShipByData.map((item) => {
    return {
      label: item.name || "",
      value: item.shipById,
    };
  });

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = props.employeeAsErp.find((item) => item.empName === selected);
  
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          userId: props.userId,
          assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingShipper.employeeId,
          name: props.setEditingShipper.shipperName || "",
          dialCode: props.setEditingShipper.dialCode || "",
          phoneNo: props.setEditingShipper.phoneNo || "",
          emailId: props.setEditingShipper.emailId || "",
          mobileNo: props.setEditingShipper.mobileNo || "",
          imageId: props.setEditingShipper.imageId || "",
          shipById: props.setEditingShipper.shipById || "",
      address: [
            {
              // addressType:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].addressType : "",
              //   address1: props.setEditingShipper.address.length ? props.setEditingShipper.address[0].address1 : "",
              //   address2:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].address2 : "",
              //   addressId:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].addressId : "",
              // town: props.setEditingShipper.address.length ? props.setEditingShipper.address[0].town :"",
              // street:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].street : "",
              // city:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].city : "",
              // pinCode:props.setEditingShipper.address.length ? props.setEditingShipper.address[0].pinCode : "",
              // country: props.setEditingShipper.address.length ? props.setEditingShipper.address[0].country :"",
              // latitude: "",
              // longitude: "",

            },
          ],

        }}
        validationSchema={CustomerSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.updateShipper(
            {
              ...values,
              assignedTo:selectedOption ? selectedOption.employeeId:props.setEditingShipper.employeeId,
            },
            props.rowdata.shipperId,
            props.userId
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
          <Form class="form-background">
          <div class="flex justify-between max-sm:flex-col">
          <div class="h-full w-w47.5 max-sm:w-full">
                <Field
                  isRequired
                  name="name"
                  type="text"
                  label={props.translatedMenuItems[0]}
                  width={"100%"}
                  component={InputComponent}
                  isColumn
                  inlineLabel
                />

                <div class="flex justify-between mt-5">
                <div class="w-[30%] max-sm:w-[40%] ">
                    <FastField
                      name="dialCode"
                      label={props.translatedMenuItems[12]}
                      isColumn
                      // margintop={"0.25em"}
                      width={"100%"}
                      selectType="dialCode"
                      component={SearchSelect}
                      isColumnWithoutNoCreate
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
              
                  </div>
                  <div class="w-[68%] max-sm:w-[50%]">
                    <FastField
                      type="text"
                      name="phoneNo"
                      label={`${props.translatedMenuItems[1]} #`}
                      placeholder={`${props.translatedMenuItems[1]} #`}
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      isColumn
                      style={{
                        flexBasis: "80%",
                      }}
                    />
                  </div>
                </div>
                <div class="w-full mt-3">
                  <FastField
                    type="email"
                    name="emailId"
                    label={props.translatedMenuItems[2]}
                    className="field"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>


                <div class="w-full mt-5">
                <Field
                  name="shipById"
                  selectType="shipperName"
                  label={props.translatedMenuItems[3]}
                  component={SelectComponent}
                  options={
                    Array.isArray(shipByOptions) ? shipByOptions : []
                  }
                  isColumn
                  value={values.shipById}
                  inlineLabel
                />
              </div></div>

              <div class="h-full w-w47.5 max-sm:w-full">
              <div class=" h-full w-full">
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] mb-1 leading-lh1.2  "
            // style={{boxShadow:"0em 0.25em 0.625em -0.25em" }}
            >
                 {/* {<FormattedMessage id="app.assignedto" defaultMessage="Assigned"/>}
                  */}
                                           {props.translatedMenuItems[14]}
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
                <div>
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
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-3">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.updateShipperById}
              >
 {/* <FormattedMessage id="app.update" defaultMessage="Update"/> */}
 {props.translatedMenuItems[16]}
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, shipper,shipBy,employee }) => ({
  userId: auth.userDetails.userId,
  setEditingShipper: shipper.setEditingShipper,
  updateShipperById: shipper.updateShipperById,
  ShipByData:shipBy.ShipByData,
  employeeAsErp:shipper.employeeAsErp,
  fullName: auth.userDetails.fullName,
  orgId:auth.userDetails.organizationId,
  fullName: auth.userDetails.fullName,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateShipper,
      getShipByData,
      getEmployeelistAsErp
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateShipperForm);
