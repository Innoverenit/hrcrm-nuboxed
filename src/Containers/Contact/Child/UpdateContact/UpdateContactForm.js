import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { HeaderLabel } from "../../../../Components/UI/Elements";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateContact } from "../../ContactAction";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
import { property } from "lodash";


const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateContactForm extends Component {
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleReset = (resetForm) => {
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
      updateContact,
      updateContactById,
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
      designationTypeId,
      departmentId,
      defaultCustomers
    } = this.props;
    console.log(linkContact);
    const customerNameOption = this.props.customerData
    .sort((a, b) => {
      const libraryNameA = a.name && a.name.toLowerCase();
      const libraryNameB = b.name && b.name.toLowerCase();
      if (libraryNameA < libraryNameB) {
        return -1;
      }
      if (libraryNameA > libraryNameB) {
        return 1;
      }
  
      // names must be equal
      return 0;
    }
  )
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });
   
    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingContact.salutation || "",
            designationTypeId: this.props.setEditingContact.designationTypeId || "",
            description: this.props.setEditingContact.description || "",
            departmentId: this.props.setEditingContact.department || "",
            departmentDetails:
              this.props.setEditingContact.departmentDetails || "",
              source:
              this.props.setEditingContact.source || "",
            userId: this.props.userId,
            firstName: this.props.setEditingContact.firstName || "",
            middleName: this.props.setEditingContact.middleName || "",
            lastName: this.props.setEditingContact.lastName || "",
            countryDialCode:
              this.props.setEditingContact.countryDialCode ||
              this.props.user.countryDialCode,
            countryDialCode1:
              this.props.setEditingContact.countryDialCode1 ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingContact.phoneNumber || "",
            mobileNumber: this.props.setEditingContact.mobileNumber || "",
            emailId: this.props.setEditingContact.emailId || "",
            alternateEmail: this.props.setEditingContact.alternateEmail || "",
            
            customerId:this.props.setEditingContact.customerId||"",
            linkedinPublicUrl:
              this.props.setEditingContact.linkedinPublicUrl || "",
              address: [
              {
                addressId: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].addressId : "",
                address1: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].address1 : "",
                street:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].street : "",
                city:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].city : "",
                state:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].state : "",
                postalCode:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].postalCode : "",
              },
            ],
            notes: this.props.setEditingContact.notes || "",
            bedrooms:this.props.setEditingContact.bedrooms || "",
            price:this.props.setEditingContact.price || "",
            propertyType:this.props.setEditingContact.propertyType || "",
          }}
          validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateContact(
              {
                ...values,
                contactId: this.props.contactId,
              },
              this.props.contactId,
              () => this.handleReset(resetForm)
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col "
              >
                <div class=" h-full w-w47.5 max-sm:w-wk"
                >
                 <div class=" flex  flex-nowrap justify-between">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                    <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-w47.5 max-sm:w-full">
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div> */}
                        <div class=" w-wk max-sm:w-full">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
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
                                defaultMessage="Middle"
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
                                id="app.lastName"
                                defaultMessage="Last Name"
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
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        isRequired
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="alternateEmail"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.alternateEmail"
                            defaultMessage="Alternate Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        // isRequired
                      />
                    </div>
                  
                  </div>  
                  <div class=" flex justify-between">
                    <div class=" w-2/6 max-sm:w-2/5">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`+${this.props.user.countryDialCode }`,
                        }}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-[60%] max-sm:w-2/4">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobileNumber"
                            defaultMessage="Mobile #"
                          />
                        }
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                  {/* <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <FastField
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        //label="Phone No #"
                        label={
                          <FormattedMessage
                            id="app.countryDialCode1"
                            defaultMessage="Dial Code"
                          />
                        }
                        isColumn
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/4">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        //placeholder="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phoneNumber"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div> */}

                 
                  
                  < div class=" flex justify-between mt-3">
                    <div class=" w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedinPublicUrl"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                 
                  
                  <div class="mt-4">
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
                <div class=" flex  justify-between max-sm:mt-20">
                <div class=" w-1/2">
                      <Field
                        name="customerId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.tagCompany"
                            defaultMessage="Tag Company"
                          />
                        }
                        component={SelectComponent}
                        isColumn
                        value={values.customerId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>
               
                <div class=" w-w47.5 mt-3">
                    <FastField
                            name="source"
                             label={
                              <FormattedMessage
                                id="app.source"
                                defaultMessage="Source"
                              />
                            }
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.source}
                            isColumn
                          />
                        </div>
               
              </div>
              
                  <div class=" flex justify-between mt-3">      
              <div class="w-1/2">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      // component={SelectComponent}
                      component={InputComponent}
                      // value={values.departmentId}
                      // selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                  <div class=" w-[47.5%]">
                  <FastField
                    name="designationTypeId"
                    //label="Designation"
                    label={
                      <FormattedMessage
                        id="app.designation"
                        defaultMessage="Designation"
                      />
                    }
                    selectType="designationType"
                    isColumn
                    component={SearchSelect}
                    value={values.designationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                  />
                </div>
                 </div>
                 
               
                  <div class="mt-8" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} > Address</HeaderLabel>
                  </div>
                    </div>
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

               
                {this.props.orgType==="Real Estate"&&(
                  <div class=" h-3/4 max-sm:w-wk mt-4 "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                    <div class="  w-w47.5">
                      <Field
                        name="bedrooms"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label="Bedrooms"
                       
                        // label={
                        //   <FormattedMessage
                        //     id="app.tagCompany"
                        //     defaultMessage="Tag Company"
                        //   />
                        // }
                        options={["1", "2", "3","4","5","6"]}
                        component={SelectComponent}
                        isColumn
                        //value={values.customerId}
                        //isDisabled={defaultCustomers}
                        //options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>

                   
                    <div class=" w-w47.5" >
                    <FastField
                            name="price"
                            label="Price"
                            //isColumnWithoutNoCreate
                            //selectType="sourceName"
                            options={["0-100000", "100001-300000", "300001-500000","500000+"]}
                            component={SelectComponent}
                            
                            // value={values.source}
                            isColumn
                          />
                        </div>
                     
                    
                  </div>
                 
                  <div class=" flex justify-between mt-3">         
                  <div class="  w-w47.5">
                    <Field
                      name="propertyType"
                      label="Property Type"
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      options={["Studio", "Row house", "Villa"]}
                      component={SelectComponent}
                    
                      // value={values.departmentId}
                      // options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                      inlineLabel
                    />
                  </div>
                
                  </div>
                 
                 

                
                  {/* <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address[0].address1"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                   */}
                  {/* <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  /> */}
                 
                  <div class=" flex  justify-between mt-3">
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.ddress[0].city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div> */}
                  </div>
                  
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.address[0].State"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer> */}
                </div>
                )}
                 
                 
                  <div class=" flex  justify-between mt-3">
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.ddress[0].city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                      </div> */}
                  </div>
                  
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.address[0].State"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer> */}
                </div>
              </div>
             
              <div class="flex mt-3 justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactById}
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
}

const mapStateToProps = ({ auth, contact,customer, departments, designations, opportunity }) => ({
  setEditingContact: contact.setEditingContact,
  updateContactById: contact.updateContactById,
  updateContactByIdError: contact.updateContactByIdError,
  user: auth.userDetails,
  orgType:auth.userDetails.orgType,
  customerData:customer.customerData,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      updateContact,
      getCustomerData,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactForm);
