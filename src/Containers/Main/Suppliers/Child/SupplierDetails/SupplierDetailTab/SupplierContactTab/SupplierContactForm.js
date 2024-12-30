import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import PostImageUpld from "../../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import { addSupplierContact } from "../../../../SuppliersAction";
import { getDesignations } from "../../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../../Settings/Department/DepartmentAction";
import DragableUpload from "../../../../../../../Components/Forms/Formik/DragableUpload";
const { Option } = Select;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().required("Input needed!"),
});

const SupplierContactForm = (props) => {
  const [whatsapp, setWhatsapp] = useState(false);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [DepartmentOptions, setDepartmentOptions] = useState([]);
  const [DesignationOptions, setDesignationOptions] = useState([]);

  const fetchDepartmentOptions = async () => {
    await props.getDepartments();
  };
  useEffect(() => {
    if (props.departments && props.departments.length > 0) {
      const options = props.departments.map((item) => {
        return {
          label: item.departmentName || "",
          value: item.departmentId,
        };
      });
      setDepartmentOptions(options);
    }
  }, [props.departments]);

  const fetchDesignationOptions = async () => {
    await props.getDesignations();
  };

  useEffect(() => {
    if (props.designations && props.designations.length > 0) {
      const options = props.designations.map((item) => {
        return {
          label: item.designationType || "",
          value: item.designationTypeId,
        };
      });
      setDesignationOptions(options);
    }
  }, [props.designations]);
  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const fetchMenuTranslations = async () => {
    try {
      setLoading(true);
      const itemsToTranslate = [
        "295", // 0 First name
        "353", // 1 middle name
        "354", // 2 last name
        "357", // 3 Dial Code
        "546", // 4
        "1157", // 5
        "140", // 6 Email
        "547", // 7 Linkdin
        "361", // 8
        "325", // 9 designation
        "326", // 10 department
        "185", //11 Address
        "316", //12 notes
        "104", // create
      ];
      const translations = await props.translateText(
        itemsToTranslate,
        props.selectedLanguage
      );
      setTranslatedMenuItems(translations);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error translating menu items:", error);
    }
  };
  return (
    <Formik
      initialValues={{
        userId: props.userId,
        supplierId: props.type === "supplier" ? props.id : "",
        distributorId: props.type === "distributor" ? props.id : "",
        shipperId: props.type === "shipper" ? props.id : "",
        salutation: "",
        mobileNo: "",
        phoneNo: "",
        notes: "",
        middleName: "",
        linkedIn: "",
        lastName: "",
        firstName: "",
        dialCode1: "",
        dialCode2: "",
        emailId: "",
        departmentId: "",
        designationId: "",
        address: [
          {
            addressType: "",
            address1: "",
            address2: "",
            addressId: "",
            date: "",
            street: "",
            city: "",
            pinCode: "",
            country: "",
            county: "",
            latitude: "",
            longitude: "",
            location: "",
            state: "",
          },
        ],
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, { resetForm }) => {
        props.addSupplierContact(
          {
            ...values,
          },
          props.id,
          props.type
        );
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        defaultCustomers,
      }) => (
        <Form className="form-background h-[70vh]">
          <div className="flex justify-between">
            <div className="h-full w-w47.5.5">
              <div className="flex flex-nowrap justify-between mt-3">
                <FastField name="imageId" component={PostImageUpld} />
                <div>
                  <div className="flex justify-between">
                    <div className="w-[100%]">
                      <div className="text-xs font-bold font-poppins">
                        {translatedMenuItems[0]}
                      </div>
                      <FastField
                        isRequired
                        name="firstName"
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="w-2/5">
                      <div className="text-xs font-bold font-poppins">
                        {translatedMenuItems[1]}
                      </div>
                      <FastField
                        name="middleName"
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                    <div className="w-2/4">
                      <div className="text-xs font-bold font-poppins">
                        {translatedMenuItems[2]}
                      </div>
                      <FastField
                        name="lastName"
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
              <div className="flex justify-between">
                <div className="w-2/6 max-sm:w-2/5 mt-1">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[3]}
                  </div>
                  <FastField
                    name="countryDialCode"
                    isColumnWithoutNoCreate
                    placeholder="+31"
                    isColumn
                    selectType="dialCode"
                    component={SearchSelect}
                    defaultValue={{
                      value: props.user.countryDialCode,
                    }}
                    value={values.countryDialCode}
                    inlineLabel
                  />
                </div>
                <div className="w-2/5 ml-2 mr-2 mt-1">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[4]}
                  </div>
                  <FastField
                    type="number"
                    name="mobileNumber"
                    component={InputComponent}
                    inlineLabel
                    width={"100%"}
                    isColumn
                  />
                </div>
                <div className="mt-1 text-xs font-bold font-poppins">
                  {translatedMenuItems[5]}
                  <Switch
                    onChange={() => setWhatsapp(!whatsapp)}
                    checked={whatsapp}
                    checkedChildren="Different"
                    unCheckedChildren="Same"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-2/4">
                  {whatsapp && (
                    <Field
                      name="countryDialCode1"
                      isColumnWithoutNoCreate
                      placeholder="+31"
                      selectType="dialCode"
                      label="Dial Code"
                      component={SearchSelect}
                      isColumn
                      inlineLabel
                    />
                  )}
                </div>
                <div className="w-2/4">
                  {whatsapp && (
                    <FastField
                      name="whatsappNumber"
                      isColumn
                      width={"100%"}
                      style={{ flexBasis: "30%" }}
                      component={InputComponent}
                      label="Whatsapp #"
                      inlineLabel
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full mt-1">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[6]}
                  </div>
                  <FastField
                    type="email"
                    name="emailId"
                    className="field"
                    isColumn
                    width={"100%"}
                    isRequired
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="w-[100%]">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[7]}
                  </div>
                  <FastField
                    type="text"
                    name="linkedIn"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="w-2/4">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[8]}
                  </div>
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    component={SearchSelect}
                    isColumn
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    inlineLabel
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="w-[47.5%]">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[9]}
                  </div>
                  <Field
                    name="designationId"
                    placeholder="Designation"
                    component={SelectComponent}
                    options={
                      Array.isArray(DesignationOptions)
                        ? DesignationOptions
                        : []
                    }
                    style={{
                      borderRadius: "2px",
                      width: "100%",
                    }}
                    onFocus={fetchDesignationOptions}
                  />
                </div>
                <div className="w-[47.5%]">
                  <div className="text-xs font-bold font-poppins">
                    {translatedMenuItems[10]}
                  </div>
                  <Field
                    name="departmentId"
                    component={SelectComponent}
                    options={
                      Array.isArray(DepartmentOptions) ? DepartmentOptions : []
                    }
                    style={{
                      borderRadius: "2px",
                      width: "100%",
                    }}
                    onFocus={fetchDepartmentOptions}
                  />
                </div>
              </div>
            </div>
            <div className="h-4/6 w-w47.5.5">
              <div className="text-xs font-bold font-poppins mt-3">
                {translatedMenuItems[11]}
              </div>
              <FieldArray
                name="address"
                render={(arrayHelpers) => (
                  <AddressFieldArray
                    arrayHelpers={arrayHelpers}
                    values={values}
                  />
                )}
              />
              <div className="mt-3">
                <div className="text-xs font-bold font-poppins">
                  {translatedMenuItems[12]}
                </div>
                <Field
                  name="notes"
                  width={"100%"}
                  isColumn
                  component={TextareaComponent}
                />
              </div>
              <div className="mt-2">
                <Field
                  name="documentId"
                  isRequired
                  component={DragableUpload}
                />
                {errors.documentId && (
                  <p style={{ color: "tomato", fontWeight: 600 }}>
                    {errors.documentId}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              type="primary"
              htmlType="submit"
              loading={props.addingContactSupplier}
            >
              <div className="text-xs font-bold font-poppins">
                {translatedMenuItems[13]}
              </div>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ auth, suppliers, designations, departments }) => ({
  addingContactSupplier: suppliers.addingContactSupplier,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  supplierId: suppliers.supplierDetailById.supplierId,
  departments: departments.departments,
  designations: designations.designations,
});

export default connect(mapStateToProps, {
  addSupplierContact,
  getDesignations,
  getDepartments,
})(SupplierContactForm);
