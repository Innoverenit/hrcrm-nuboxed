import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
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

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Input needed!"),
    emailId: Yup.string().required("Input needed!"),
});

class SupplierContactForm extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          option: "Mobile",
          option1: "Mobile",
          option2: "Work",
          currentOption: "",
          whatsapp: false,
          candidate: false,
          availability: false,
          translatedMenuItems: [],
        
        };
      }
      componentDidMount() {
        this.props.getDesignations();
        this.props.getDepartments();
        this.fetchMenuTranslations();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
          this.fetchMenuTranslations();
        }
      }
      async fetchMenuTranslations() {
        try {
          this.setState({ loading: true });
          const itemsToTranslate = [
     '295', // 0 First name
     '353', // 1 middle name
    '354', // 2 last name
    '357',// 3 Dial Code
    '299', // 4 mobile #
     '140', // 5 Email 
     '547', // 6 Linkdin
    '316', // 7 notes 
    '76',// 8 Assigned
     '325', // 9 designation
    '326', // 10 department
    '185',//11 Address
   '104'//12 create
          ];
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations ,loading: false});
         
        } catch (error) {
          this.setState({ loading: false });
          console.error('Error translating menu items:', error);
        }
      }
  
    render() {
        const { translatedMenuItems } = this.state; 
        const designation = this.props.designations.map((item) => {
            return {
                label: item.designationType || "",
                value: item.designationTypeId,
            };
        });

        const department = this.props.departments.map((item) => {
            return {
                label: item.departmentName || "",
                value: item.departmentId,
            };
        });
        return (
            <>
                <Formik
                    initialValues={{
                        userId: this.props.userId,
                        supplierId: this.props.type === "supplier" ? this.props.id : "",
                        distributorId: this.props.type === "distributor" ? this.props.id : "",
                        shipperId: this.props.type === "shipper" ? this.props.id : "",
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
                        this.props.addSupplierContact(
                            {
                                ...values,
                            },
                            this.props.id,
                            this.props.type
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
                    }) => (
                        <Form>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                   <div class=" flex flex-row flex-nowrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                        <FastField name="imageId" component={PostImageUpld} />
                                        <div>
                                        <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                                {/* <div style={{ width: "35%" }}>
                                                    <FastField
                                                        name="salutation"
                                                        type="text"
                                                        label="Salutation"
                                                        options={["Mr.", "Ms.", "None"]}
                                                        component={SelectComponent}
                                                        inlineLabel
                                                        className="field"
                                                        isColumn
                                                        style={{
                                                            flexBasis: "80%",
                                                            height: "2.0625em",
                                                            marginTop: "0em",
                                                        }}
                                                    />
                                                </div> */}
                                            <div class=" flex justify-between max-sm:flex-col">
               
               {/* name="salutation"
              */}
           <div class=" w-[100%] max-sm:w-full">
           <div class=" text-xs font-bold font-poppins"> 
            {translatedMenuItems[0]}             
             </div>
             <FastField
               isRequired
               name="firstName"
               // label="First Name"                          
               type="text"
               width={"100%"}
               isColumn
               component={InputComponent}
               inlineLabel
             />
           </div>
         </div>   
                                            </div>
                                            <mt-3 />
                                            <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                            <div class=" w-[100%] max-sm:w-full">
                                            <div class=" text-xs font-bold font-poppins"> 
                                            {translatedMenuItems[1]}</div>
                                                    <FastField
                                                        name="middleName"
                                                        // label="Middle Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel
                                                      
                                                    />
                                                </div>
                                                <div class=" w-[100%] max-sm:w-full">
                                                <div class=" text-xs font-bold font-poppins"> 
                                                {translatedMenuItems[2]}</div>
                                                    <FastField
                                                        name="lastName"
                                                        // label="Last Name"
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
                                    <mt-3 />
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto">
                                    <div class=" w-2/4">
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[3]}</div>
                                            <FastField
                                                name="dialCode1"
                                                // label="Mobile #"
                                                isColumn
                                                width="100px"               
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                defaultValue={{
                                                    value: this.props.user.countryDialCode,
                                                }}
                                                value={values.countryDialCode}
                                                inlineLabel
                                               
                                            />
                                        </div>
                                        <div class=" w-2/5 max-sm:w-2/5 ">
                                        <div class=" text-xs font-bold font-poppins"> 
                                        {translatedMenuItems[4]}</div>
                                            <FastField
                                                type="text"
                                                name="mobileNo"
                                                placeholder="Mobile #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                               
                                            />
                                        </div>
                                    </div>
                                    <mt-3 />
                                    {/* <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                    <div className="w-[47%] flex-[0_0_80%] ">
                                            <FastField
                                                name="dialCode2"
                                                selectType="dialCode"
                                                // label="Phone #"
                                                isColumn
                                                margintop={"0.25em"}
                                                component={SearchSelect}
                                                defaultValue={{
                                                    value: this.props.user.countryDialCode,
                                                }}
                                                value={values.countryDialCode1}
                                                inlineLabel
                                               
                                            />
                                        </div>
                                        <div className="w-[47%] h-[2.0625em] flex-[0_0_80%] mt-0">
                                            <FastField
                                                type="text"
                                                name="phoneNo"
                                                placeholder="Phone #"
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                               
                                            />
                                        </div>
                                    </div> */}

                                    <mt-3 />
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                    <div className="w-[100%]">
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[5]}</div>
                                            <FastField
                                                // isRequired
                                                type="email"
                                                name="emailId"
                                                // label="Email"
                                                className="field"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}

                                                inlineLabel
                                              
                                            />
                                        </div>
                                    </div>
                                    <mt-3 />
                                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                    <div className="w-[100%]">
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[6]}</div>
                                            <FastField
                                                type="text"
                                                name="linkedIn"
                                                // label="Linkedin "
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel
                                             
                                            />
                                        </div>
                                    </div>
                                    <mt-3 style={{ marginTop: "25px" }} />
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[7]}</div>
                                    <Field
                                        name="notes"
                                        // label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                        style={{
                                            flexBasis: "80%",
                                            height: "3em",
                                            // marginLeft: "2.5em",
                                            marginTop: "0em",
                                        }}
                                    />

                                </div>
                                &nbsp;
                                <div
                                    style={{
                                        height: "70%",
                                        width: "45%",
                                        marginTop: "10px"
                                    }}
                                >
                                 <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                                        <div style={{ width: "47%" }}>
                                        <div class=" text-xs font-bold font-poppins"> 
                                        {translatedMenuItems[9]}</div>
                                            <Field
                                                name="designationId"
                                                placeholder="Designation"
                                                // label="Designation"
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                                style={{
                                                    borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                        <div class=" text-xs font-bold font-poppins"> 
                                        {translatedMenuItems[10]}</div>
                                            <Field
                                                name="departmentId"
                                                // placeholder="Designation"
                                                // label="Department"
                                                component={SelectComponent}
                                                options={Array.isArray(department) ? department : []}
                                                style={{
                                                    borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <mt-3 />

                                    <div style={{ marginTop: "30px" }}>
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[11]}</div>
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
                            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // icon={<PoweroffOutlined />}
                                    loading={this.props.addingContactSupplier}
                                >
                      <div class=" text-xs font-bold font-poppins"> 
                        {translatedMenuItems[11]}</div>
                     {/* create */}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ auth, suppliers, designations, departments }) => ({
    addingContactSupplier: suppliers.addingContactSupplier,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    supplierId: suppliers.supplierDetailById.supplierId,
    departments: departments.departments,
    designations: designations.designations,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addSupplierContact,
            getDesignations,
            getDepartments,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SupplierContactForm);
