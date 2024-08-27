import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
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
    this.props.getInvestorData(this.props.userId);
    this.props.getSources(this.props.orgId);
    this.props.getDialCode();
  }
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getDepartments();
    
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
        "295",//0 First Name
        "353",//1 Middle Name
        "354",//2 Last Name
        "140",//3 Email
'1117', // 4 Alternate Email
'357', // 5 Dial Code
'546', // 6 Mobile
'1157', // 7 WhatsApp
'547', // 8 Linkedin
'147',//9Description
'361', // 10 Tag Company
'325' , // 11 Designation
'326', // 12 Department
'279' ,//13 Source
'185',//Address
'104'//Create
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
                        <div class=" font-bold font-poppins text-xs w-full max-sm:w-wk">
                          {translatedMenuItems[0]}
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
                        <div class="font-bold font-poppins text-xs w-2/5 max-sm:w-wk">
                       {translatedMenuItems[1]}
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
                        <div class=" font-bold font-poppins text-xs w-1/2 max-sm:w-wk">
                       {translatedMenuItems[2]}
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
                    <div class=" font-bold font-poppins text-xs w-full">
                  {translatedMenuItems[3]}
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
                    <div class=" font-bold font-poppins text-xs  w-full">
                    {translatedMenuItems[4]}
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
                    <div class="font-bold font-poppins text-xs  w-2/6">
                  {translatedMenuItems[5]}
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
                    <div class=" font-bold font-poppins text-xs w-[60%]">
                   {translatedMenuItems[6]}
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
                    <div class=" font-bold font-poppins text-xs w-2/4">      
                    {translatedMenuItems[7]}           
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
                 
                  < div class=" flex justify-between mt-2">
                    <div class="font-bold font-poppins text-xs w-full">
                  {translatedMenuItems[8]}
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
                  <div class="font-bold font-poppins text-xs mt-2">
                  {translatedMenuItems[9]}
                    {/* Descriptions */}
                 
                    <div>               
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      
                    ></textarea>
                  </div>
                </div>
</div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk " >
                  <div class=" flex  justify-between">
                    <div class="font-bold font-poppins text-xs  w-w47.5">
                    {translatedMenuItems[10]}
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

                    <div class=" font-bold font-poppins text-xs w-w47.5">
                    {translatedMenuItems[11]}
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
                  <div class="font-bold font-poppins text-xs w-w47.5">
                 {translatedMenuItems[12]}
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
                  <div class="font-bold font-poppins text-xs w-w47.5">
                 {translatedMenuItems[13]}
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
                 <div className="font-bold font-poppins text-xs"> {translatedMenuItems[14]}</div>
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
