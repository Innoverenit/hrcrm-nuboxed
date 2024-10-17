import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { addCustomerContact } from "../../../../CustomerAction";
import PostImageUpld from "../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().required("Input needed!").email("Enter a valid Email"),
  whatsappNumber: Yup.string()
    .matches(phoneRegExp, "Whatsapp number is not valid")
    .min(8, "Minimum 8 digits")
    .max(10, "Number is too long"),
});

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      whatsapp: false,
      currentOption: "",
      candidate: false,
      availability: false,
      translatedMenuItems: [],
      loading: true
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    // this.props.getDocuments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
'295', // 0
'353', // 1
'354', // 2
'357', // 3
'546', // 4
'1157', // 5
'140',//6
'547', // 7
'361', // 8
'325' ,// 9
'326', // 10
 '185',//12
'316',//13
  '104'
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      addCustomerContact,
      addingCustomerContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
      customerId,
      tagWithCompany,
    } = this.props;
    console.log(linkContact);

      
    const {loading,translatedMenuItems } = this.state;
    // if (loading) {
    //   return <div><BundleLoader/></div>;
    // } 
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            // designation: undefined,
            designationTypeId: this.props.designationTypeId,
            description: "",
            // department: undefined,
            departmentDetails: "",
            departmentId: "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            whatsappNumber: "",
            mobileNumber: "",
            email: "",
            emailId: "",
            linkedinPublicUrl: "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addCustomerContact(
              {
                ...values,
                customerId: this.props.customerId,
                opportunityId:this.props.opportunityId,
                investorId:this.props.investorId,
                whatsapp: this.state.whatsapp ? "Different" : "Same",
              },
              this.props.userId,
            );
            this.handleReset(resetForm)
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
            <Form className="form-background">
              <div class=" flex justify-between">
                <div class=" h-full w-w47.5" >
                 
                  <div class=" flex flex-nowrap justify-between mt-3">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between">                    
                            {/* name="salutation" */}
                       
                        <div class=" w-full">
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
                         {translatedMenuItems[1]}             
                          </div>
                          <FastField
                            name="middleName"
                            //label="Middle Name"                       
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-2/4">
                        <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[2]}             
                          </div>
                          <FastField
                            name="lastName"
                            //label="Last Name"                      
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
                          //label="Available from"

                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="Dial Code "
                            />
                          }
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
                          label={
                            <FormattedMessage
                              id="app.phoneNumber"
                              defaultMessage="Whatsapp #"
                            />}
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
                    <div class="w-full">
                    <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[7]}    
                         {/* Linkedin          */}
                          </div>
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"                      
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
              

                  <div class=" flex justify-between mt-2">
                    <div class=" w-2/4">
                      <>
                      <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[8]}             
                          </div>
                          {/* TagCompany */}
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
                      </>
                    </div>
                    <div class=" w-2/5">
                    <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[9]}             
                          </div>
                          {/* Designation */}
                      <FastField
                        name="designationTypeId"                  
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class="  w-w47.5 mt-2">
                  <div class=" text-xs font-bold font-poppins"> 
                         {translatedMenuItems[10]}             
                          </div>
                          {/* Department */}
                    <FastField
                      name="departmentId"                
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      component={InputComponent}                 
                      inlineLabel
                    />
                  </div>
                </div>
                <div class=" h-4/6 w-w47.5">
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
                </div>
              </div>
           
              <div class=" flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingCustomerContact}
                >
                 <div class=" text-xs font-bold font-poppins">  {translatedMenuItems[13]}  </div>   
                             
                         
                  {/*                     
                    Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  contact,
  customer,
  opportunity,
  departments,
  designations,
}) => ({
  addingCustomerContact: customer.addingCustomerContact,
  addingCustomerContactError: customer.addingCustomerContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  // tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      addCustomerContact,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
