import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select,  Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getDialCode} from "../../../../../Investor/InvestorAction"
import {getSources} from "../../../../../Settings/Category/Source/SourceAction"
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { addLinkContactByOpportunityId } from "../../../../../Contact/ContactAction";
import PostImageUpld from "../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";
import { getCustomerData } from "../../../../../Customer/CustomerAction";
import {addDealContact} from "../../../../DealAction";

const { Option } = Select;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Number is too short").max(10, "Number is too long")
});

class DealContactForm extends Component {
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getSources(this.props.orgId);
    this.props.getDialCode();

  }
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
    };
  }
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
      addingDealContact,
      customerId,
      designationTypeId,
      departmentId,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,

      // tagWithCompany,
    } = this.props;

    const dialCodeOption = this.props.dialCodeList.map((item) => {
      return {
        label: `+${item.country_dial_code || ""}`,
        value: item.country_dial_code
        ,
      };
    });
    const sourceOption = this.props.sources.map((item) => {
      return {
        label: item.name
        || null,
        value: item.sourceId
        ,
      };
    });
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
            salutation: "",
            source:"",
            designationTypeId: this.props.designationTypeId,
            description: "",
            //department: undefined,
            departmentId: this.props.departmentId,
            departmentDetails: "",
            userId: this.props.userId,
            customerId: this.props.customerId,
            opportunityId: this.props.opportunityId,

            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: "",
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            linkedinPublicUrl: "",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.country,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            linkContact
              ? addLinkContactByOpportunityId(values, opportunityId, () =>
                this.handleReset(resetForm)
              )
              : addDealContact(
                {
                  ...values,
                  whatsapp: this.state.whatsapp ? "Different" : "Same",
                },
                this.props.userId,
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
            <div class="overflow-y-auto h-[34rem] md:overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-between h-[27rem] overflow-x-hidden max-sm:flex-col"
              >
                 <div class=" h-full w-w47.5 max-sm:w-wk">
                  <div class=" flex  flex-nowrap justify-between">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">                  
                        <div class=" w-full max-sm:w-2/5">
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
                      <div class=" flex justify-between">
                        <div class=" w-2/5">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middleName"
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
                        <div class=" w-1/2">
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
                  <div class=" w-3/12 max-sm:w-[32%]">
                  <Field
                        name="countryDialCode"
                        // selectType="dialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.dialCode"
                            defaultMessage="dialCode"
                          />
                        }
                        isColumn
                        component={SelectComponent}
                        options={
                          Array.isArray(dialCodeOption) ? dialCodeOption : []
                        }
                        inlineLabel
                      />
                    </div>
                    <div class=" w-8/12">
                      <FastField
                        type="number"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobileNo"
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
                  <div class=" w-1/4 font-bold" >
                      WhatsApp
                      <Switch
                        onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <FastField
                          name="countryDialCode1"
                          selectType="dialCode"
                          isColumnWithoutNoCreate
                          //label="Phone No #"
                          placeholder='+31'
                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
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
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
                        <FastField
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone #"
                          label={
                            <FormattedMessage
                              id="app.phoneNumber"
                              defaultMessage="Whatsapp #"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                        />
                      )}
                    </div>
                  </div>
     
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
                  <div class="mt-3">
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
                <div
               class=" h-full w-w47.5 max-sm:w-wk">
                  <div class=" flex  justify-between max-sm:mt-20">
                    <div class=" w-1/2">
                      <Field
                        name="customerId"
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
                        inlineLabel
                      />
                    </div>

                    <div class=" w-2/5">
                      <FastField
                        name="designationTypeId"
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
                  <div class="mt-3 flex justify-between">         
                  <div class="w-2/5">
                    <FastField
                      name="departmentId"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                  <div class="w-2/5">
                          <Field
                            name="source"
                            type="text"
                            label={
                              <FormattedMessage
                                id="app.source"
                                defaultMessage="Source"
                              />
                            }
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div>
                  </div>
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class=" text-[white] text-xs mt-4" > <FormattedMessage
                        id="app.address"
                        defaultMessage="Address"
                      /> </div>
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
       
                  <div class="mt-3 flex  justify-between">                  
                  </div>                 
                </div>
              </div>
              <div class="mt-3 flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingDealContact}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
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

const mapStateToProps = ({ auth, source,contact,investor, customer, opportunity, departments, designations }) => ({
  addingDealContact: contact.addingDealContact,
  addingDealContactError: contact.addingDealContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerData:customer.customerData,
  sources: source.sources,
  customerId: customer.customer.customerId,
  tagWithCompany: customer.customer.name,
  orgId:auth.userDetails.organizationId,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  dialCodeList:investor.dialCodeList,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSources,
      addDealContact,
      getDialCode,
      addLinkContactByOpportunityId,
      // getCurrency,
      getDesignations,
      getCustomerData,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealContactForm);
