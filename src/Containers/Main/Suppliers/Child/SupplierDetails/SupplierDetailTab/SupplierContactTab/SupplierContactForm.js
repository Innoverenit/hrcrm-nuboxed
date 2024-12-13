import React, { Component } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button, Select , Switch} from "antd";
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
    '546', // 4
    '1157', // 5
    '140', // 6 Email 
    '547', // 7 Linkdin
    '361', // 8
    '325', // 9 designation
    '326', // 10 department
    '185',//11 Address
    '316',//12 notes
      '104',// create
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
                        defaultCustomers,
                    }) => (
                        <Form className="form-background h-[70vh]">
              <div class=" flex justify-between">
                <div class=" h-full w-w47.5.5" >
                <div class=" flex flex-nowrap justify-between mt-3">
                                        <FastField name="imageId" component={PostImageUpld} />
                                        <div>
                                        <div class=" flex justify-between">    
                                                          
               {/* name="salutation" */}
           <div class=" w-[100%] ">
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
                                
                                            <div class=" flex justify-between mt-3">
                                            <div class=" w-2/5">
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
                                                <div class=" w-2/4">
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
                          
                                    <div class=" flex justify-between">
                    <div class=" w-2/6 max-sm:w-2/5 mt-1">
                    <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[3]}    
                         {/* dialCode*/}
                          </div>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate                   
                        placeholder='+31'                    
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5 ml-2 mr-2 mt-1">
                    <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[4]}             
                          </div>
                      <FastField
                  // Mobile
                        type="number"
                        name="mobileNumber"                               
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    
                    <div class="  mt-1 text-xs font-bold font-poppins"> 
                         {translatedMenuItems[5]}                                              
                    {/* WhatsApp */}
                    <Switch
                      onChange={this.handleWhatsApp}
                      checked={this.state.whatsapp}
                      checkedChildren="Different"
                      unCheckedChildren="Same"
                    />
                  </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          placeholder='+31'
                          selectType="dialCode"
                          label="Dial Code"

                        
                          component={SearchSelect}
                          isColumn
                          // value={values.availableDate}
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
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
                  <div class=" flex justify-between">
                    <div class=" w-full mt-1">
                    <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[6]}    
                         {/* Email          */}
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
                  <div class=" flex justify-between mt-2">
                                    <div className="w-[100%]">
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[7]}</div>
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
                                    <div class=" flex justify-between mt-2">
                                    <div class=" w-2/4">
                                    <div class=" text-xs font-bold font-poppins"> 
                                    {translatedMenuItems[8]}</div>
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
                       {/* <div class=" w-w47.5.5 ">

<div class=" text-xs font-bold font-poppins"> Reports To</div>


{this.props.customerConfigure.sourceInd===true&&
<Select

placeholder="Select Contact"
loading={this.state.isLoadingCustomers}
onFocus={this.handleSelectCustomerFocus}
onChange={this.handleCustomerChange}
>
{this.state.customers.map(customer => (
<Option key={customer.contactId} value={customer.contactId}>
{customer.fullName}
</Option>
))}
</Select>

    </div> */}
    </div>
            <div className="flex justify-between mt-2">                   
    <div class=" w-[47.5%]">
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
                                   <div class=" w-[47.5%]">
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
                                        </div>

                                        <div class=" h-4/6 w-w47.5.5">
                <div class=" text-xs font-bold font-poppins mt-3"> 
                         {translatedMenuItems[11]}             
                          </div>
                  <FieldArray
                    name="address"
                    // label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />             
                  <div class=" mt-3">
                  <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[12]}             
                          </div>
                  <Field
                    name="notes"
                    // label="Notes"               
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                   </div>
                   <div className="mt-2">
                   <Field name="documentId" isRequired component={DragableUpload} />       
                  {errors.documentId && (
                    <p style={{ color: "tomato", fontWeight: 600 }}>{errors.documentId}</p>
                  )}
                  </div>
                </div>                      
                            </div>

                             <div class=" flex justify-end mt-3">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // icon={<PoweroffOutlined />}
                                    loading={this.props.addingContactSupplier}
                                >
                      <div class=" text-xs font-bold font-poppins"> 
                        {translatedMenuItems[13]}</div>
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
