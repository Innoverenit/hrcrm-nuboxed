import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getSources} from "../../Settings/Category/Source/SourceAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addLinkContactByOpportunityId } from "../../Contact/ContactAction";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { getDesignations } from "../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import {addContactInvest} from "../ContactInvestAction";
import {getInvestorData,getDialCode} from "../../Investor/InvestorAction";
import { BundleLoader } from "../../../Components/Placeholder";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

class ContactInvestForm extends Component {
  componentDidMount() {
    this.props.getInvestorData(this.props.userId);
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
      translatedMenuItems: [],
      loading: true
    };
  }

  
  componentDidMount() {
    this.fetchMenuTranslations();
    this.props.getCustomerConfigure(this.props.orgId,"add","contact")
  }

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       'First Name', // 0
'Middle Name', // 1
'Last Name', // 2
'Email', // 3
'Alternate Email', // 4
'Dial Code', // 5
'Mobile', // 6
'WhatsApp', // 7
'Linkedin', // 8
'Description',//9
'Tag Company', // 10
'Designation' , // 11
'Department', // 12
'Source' ,//13
// 'Address',
 
//   'Create'
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
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

    const countryNameOption = this.props.dialCodeList.map((item) => {
      return {
        label: `+${item.country_dial_code}`,
        value: item.country_dial_code,
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
    const {
      user: { userId, firstName, lastName },
      addContactInvest,
      addingContact,
      customerId,
      designationTypeId,
      departmentId,
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
    } = this.props;


    const investorNameOption = this.props.investorData
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
        value: item.investorId,
      };
    });
  
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            departmentId: this.props.departmentId,
            departmentDetails: "",
            userId: this.props.userId,
            investorId: this.props.investorId,
            opportunityId: this.props.opportunityId,
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode1,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            alternateEmail:"",
            linkedinPublicUrl: "",
            sourceId:"",
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
              : addContactInvest(
                {
                  ...values,
                //   whatsapp: this.state.whatsapp ? "Different" : "Same",
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col ">
                <div class=" h-full w-w47.5 max-sm:w-wk">
                  <div class=" flex justify-between  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">                     
                            {/* name="salutation"                                        */}
                        <div class=" w-full max-sm:w-wk">
                          <div>{translatedMenuItems[0]}</div>
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
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-wk">
                        <div>{translatedMenuItems[1]}</div>
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
                        <div class=" w-1/2 max-sm:w-wk">
                        <div>{translatedMenuItems[2]}</div>
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
                    <div class=" w-full">
                    <div>{translatedMenuItems[3]}</div>
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"                            
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
                    <div>{translatedMenuItems[4]}</div>
                      <FastField
                        type="email"
                        name="alternateEmail"
                        //label="Email"                                
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
                    <div class=" w-2/6">
                    <div>{translatedMenuItems[5]}</div>
                    <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate                                
                        defaultValue={{
                          label:`+${user.countryDialCode}`,
                        }}
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-[60%]">
                    <div>{translatedMenuItems[6]}</div>
                      <FastField
                        type="number"
                        name="mobileNumber"                                      
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>                  
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                         <Field
                         name="countryDialCode1"
                         selectType="dialCode"
                         isColumnWithoutNoCreate
                         // label="Phone #"
                          label= {
                           <FormattedMessage
                             id="app.phone"
                             defaultMessage="Dial Code"
                           />
                         }
                         defaultValue={{
                          label:`+${user.countryDialCode1}`,
                        }}
                         isColumn
                         component={SelectComponent}
                         options={
                           Array.isArray(countryNameOption)
                             ? countryNameOption
                             : []
                         }
                         // value={values.countryDialCode1}
                         inlineLabel
                       />
                      )}
                    </div>
                    <div class=" w-2/4"> 
                       <div>{translatedMenuItems[7]}</div>
                      {this.state.whatsapp && (
                        <FastField
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone #"
                        
                        //phone no
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
                    <div>{translatedMenuItems[8]}</div>
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "                                     
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                  <div>   {translatedMenuItems[9]}
                    {/* Descriptions */}
                    </div>
                    <div>               
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      // value={transcript ? transcript : text}
                      // onChange={handletext}
                    ></textarea>
                  </div>
                </div>
</div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk " >
                  <div class=" flex  justify-between">
                    <div class=" w-w47.5">
                    <div>{translatedMenuItems[10]}</div>
                      <Field
                        name="investorId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate                 
                         //Tag Company
                         component={SelectComponent}
                        isColumn
                        value={values.investorId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(investorNameOption) ? investorNameOption : []}
                        inlineLabel
                      />
                    </div>

                    <div class=" w-w47.5">
                    <div>{translatedMenuItems[11]}</div>
                      <FastField
                        name="designationTypeId"
                        //label="Designation"                                         
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                    </div>
                  </div>
                
                  <div class=" flex justify-between mt-3">         
                  <div class="w-w47.5">
                  <div>{translatedMenuItems[12]}</div>
                    <FastField
                      name="departmentId"
                      //label="Department"                                
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                  <div class=" w-w47.5">
                  <div>{translatedMenuItems[13]}</div>
                  <Field
                            name="sourceId"
                            //source                                
                            isColumnWithoutNoCreate
                            component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                            isColumn
                          />
                        </div>
                  </div>
                 
                  <div class="w-full mt-3 "
                   style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <div class="text-white font-medium m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" > Address</div>
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
                                           
                  <div class=" flex  justify-between mt-6">
                  {/* City */}
                  </div>                               
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-4 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingContact}
                >
                  <FormattedMessage id="app.create" defaultMessage="create" />
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

const mapStateToProps = ({ auth, contact,source, customer,investor, opportunity, departments, designations }) => ({
  addingContact: contact.addingContact,
  addingContactError: contact.addingContactError,
  user: auth.userDetails,
  sources: source.sources,
  dialCodeList:investor.dialCodeList,
  orgId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  investorData:investor.investorData,
  investorId: investor.investorDetails.investorId,
  tagWithCompany: customer.customer.name,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactInvest,
      addLinkContactByOpportunityId,
      getDesignations,
      getSources,
      getDialCode,
      getInvestorData,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestForm);
