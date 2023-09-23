import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDepartments } from "../../../Containers/Settings/Department/DepartmentAction";
import { getSectors } from "../../../Containers/Settings/Sectors/SectorsAction";
import { getLibrarys } from "../../../Containers/Settings/Library/LibraryAction";
import { Button, Select, Tag, Switch, Checkbox } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import { getVendorContactData } from "../../Contact/ContactAction";
import { Spacer } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addCandidate } from "../CandidateAction";
import Upload from "../../../Components/Forms/Formik/Upload";
import { StyledLabel } from "../../../Components/UI/Elements";
import { HeaderLabel } from "../../../Components/UI/Elements";
import VideoUpload from "./VideoUpload"
import { FlexContainer } from "../../../Components/UI/Layout";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import styled from "styled-components";
import SkillsLoadMore from "./CandidateTable/SkillsLoadMore";
import { BundleLoader } from "../../../Components/Placeholder";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CandidateSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Enter a valid Email")
    .required("Input needed!"),
  firstName: Yup.string().required("Input needed!"),
  mobileNumber: Yup.string()
    .matches(phoneRegExp, "Mobile number is not valid")
    .min(5, "Number is too short")
    .max(10, "Number is too long"),
});

class CandidateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: true,
      billing: false,
      whiteblue: true,
      checked: true,
      whatsapp: false,
      empInd: true,
      value: "",
      share: false,
      videoId:""
      // onChange4: this.onChange4.bind(this)
    };
    // this.onNumber = this.onNumber.bind(this)
  }

//   onNumber(e){
//     const re = /^[0-9\b]+$/;
//     if (e.target.value === '' || re.test(e.target.value)) {
//        this.setState({value: e.target.value})
//     }
//  }

  // NumericOnly = (e) => {
  //   //angka only
  //   const reg = /^[0-9\b]+$/;
  //   let preval = e.target.value;
  //   if (e.target.value === "" || reg.test(e.target.value)) return true;
  //   else e.target.value = preval.substring(0, preval.length - 1);
  // };

  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };

  handleSetVideo = (videoId) => {
    this.setState({videoId : videoId });
  };
  handleShare = (checked) => {
    this.setState({ share: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handlebilling = (checked) => {
    this.setState({ billing: checked });
  };
  handleEmployee = (checked) => {
    this.setState({ empInd: checked });
  };
  handleWhiteBlue = (checked) => {
    this.setState({ whiteblue: checked });
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

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
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

  getContactOptions(filterOptionKey, filterOptionValue) {
    const contactOptions =
      this.props.vendorContactData.length &&
      this.props.vendorContactData
        .filter((option) => {
          if (
            option.partnerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.fullName || "",
          value: option.contactId,
        }));

    return contactOptions;
  }

  handledepartmentOptions = (filterOptionKey, filterOptionValue) => {
    const departmentOptions =
      this.props.departments.length &&
      this.props.departments
        .filter((option) => {
          if (
            option.sectorId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.departmentName || "",
          value: option.departmentId,
        }));

    return departmentOptions;
  };

  componentDidMount() {
    const { getLibrarys, organizationId } = this.props;
    console.log();
    getLibrarys(organizationId);
    this.props.getVendorContactData();
    this.props.getSectors();
    this.props.getDepartments();
  }

  render() {
    // if (this.props.fetchingDepartments) {
    //   return <BundleLoader/>;
    // }
    const {
      user: { userId, firstName, lastName, department },
      addCandidate,
      addingCandidate,
      availableDate,
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
    } = this.props;
    console.log(this.props.resumeForm.length && this.props.resumeForm);
    console.log(this.props.sectors);
    //console.log(this.props.parsingForm ? this.props.parsingForm.linkedInProfile.length && this.props.parsingForm.linkedInProfile : "")

    const libraryOption = this.props.librarys
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
      })
      .map((item) => {
        return {
          // label: `${item.salutation || ""} ${item.firstName ||
          //   ""} ${item.middleName || ""} ${item.name || ""}`,
          // value: item.userId,
          label: item.name || "",
          value: item.definationId,
        };
      });
    // console.log(linkContact);

    const sectorOption = this.props.sectors.map((item) => {
      return {
        label: item.sectorName || "",
        value: item.sectorId,
      };
    });

    // console.log("sector",sectorOption)

    return (
      <>
        <Formik
          initialValues={{
            sectorId: "",
            roleTypeId: "",
            workPreference: "Home",
            partnerId: "",
            contactId: "",
            experience: "",
            sectorName: "",
            partnerName: "",
            sectorDescription: "",
            currentCtc: "",
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            noticeDetail: "",
            channel: "Self",
            definationId: [],
            countryDialCode: this.props.user.countryDialCode,
            phoneNumber: "",
            // mobileNumber: "", phoneNumbers
            mobileNumber:
              this.props.responseData &&
              this.props.responseData.phoneNumbers.length
                ? this.props.responseData.phoneNumbers[0]
                : "",
            countryDialCode1: this.props.user.countryDialCode,
            emailId: this.props.responseData
              ? this.props.responseData.emails.length &&
                this.props.responseData.emails[0]
              : "",
            documentId:
              this.props.resumeForm.length && this.props.resumeForm
                ? this.props.resumeForm.length && this.props.resumeForm
                : "",
            // emailId:"",

            // designation: "",
            linkedin:
              this.props.parsingForm &&
              this.props.parsingForm.hasOwnProperty("linkedInProfile")
                ? this.props.parsingForm.linkedInProfile
                : "",
            designationTypeId: "",
            departmentId: "",
            countryDialCode1: "",
            phoneNumber: "",
            notes: "",
            currentCtcCurency: "",
            country: this.props.user.country,
            availableDate: availableDate || dayjs(),
            benifit: "",
            tag_with_company: "",
            billing: 0,
            noticeDetail: "",
            currency: this.props.user.currency,
            userId: this.props.userId,
            active: this.state.availability ? "true" : "false",
            employee: this.state.empInd ? "true" : "false",
            worktype: this.state.billing ? "Permanent" : "Contract",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            share: this.state.share ? "true" : "false",
            category: this.state.checked
              ? "Both"
              : this.state.whiteblue
              ? "White"
              : "Blue",
            // startDate: dayjs(),
            dateOfBirth: dayjs(),
            gender: "",
            nationality: this.props.user.countryName,
            idProof: "",
            idNumber: "",
            CostType: "",
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
                skills: [],
                longitude: "",
              },
            ],
          }}
          validationSchema={CandidateSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(
              values,
              this.props.responseData &&
                this.props.responseData.phoneNumbers.length
                ? this.props.responseData.phoneNumbers[0]
                : ""
            );

            addCandidate(
              {
                ...values,
                // skills: this.props.parsingForm ? this.props.parsingForm.skills : [],
                skills: this.props.responseData
                  ? this.props.responseData.skills.concat(values.skills)
                  : values.skills || [],
                mobileNumber: values.mobileNumber,
                linkedin: values.linkedin,
                videoClipsId:this.state.videoId,
                //linkedin: this.props.parsingForm ? this.props.parsingForm.linkedInProfile.length && this.props.parsingForm.linkedInProfile:"",
                // emailId:this.props.parsingForm ? this.props.parsingForm.emails : "",

                active: this.state.availability ? "true" : "false",
                employee: this.state.empInd ? "true" : "false",
                worktype: this.state.billing ? "Permanent" : "Contract",
                whatsapp: this.state.whatsapp ? "Different" : "Same",
                // category: this.state.whiteblue ?"White" : "Blue",
                category: this.state.checked
                  ? "Both"
                  : this.state.whiteblue
                  ? "White"
                  : "Blue",
                // availableDate: dayjs(values.availableDate).format(
                //   "YYYY-MM-DD"
                availableDate: dayjs(values.availableDate).toISOString(),
                // availableDate: `${newavailableDate}T00:00:00Z`,
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
            <Form className="form-background">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "70vh",
                  overflow: "scroll",
                  paddingRight: "0.6em",
                }}
              >
                <div
                  style={{
                    width: "48%",
                  }}
                >
                  
                  <FlexContainer flexWrap="no-wrap">
                    <FastField 
                    name="imageId"
                     component={Upload} 
                     
                     />

                  
                    <div style={{ width: "75%" }}>  
                    <Spacer/>        
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "30%" }}>
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
                            //  className="field"
                            isColumn
                          />
                        </div>
                        <div style={{ width: "65%" }}>
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
                          {/* <input value={this.state.value} onChange={this.onNumber}/> */}
                        </div>
                      </FlexContainer>                     
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "30%" }}>
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
                        <div style={{ width: "65%" }}>
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
                      </FlexContainer>
                    </div>
                  </FlexContainer>
                  <FlexContainer>
                  <StyledLabel>Upload Video  </StyledLabel>
                  <VideoUpload
                   handleSetVideo={this.handleSetVideo}
                   />
                   </FlexContainer> 
                  <Spacer />
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}}>
                  Communication
                   
                    </HeaderLabel>
                    </div>
                    </div>
                    <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        isRequired
                        type="email"
                        name="emailId"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "30%" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
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
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "40%" }}>
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label="Mobile No"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        // style={{ flexBasis: "30%" }}
                        isColumn
                      />
                    </div>
                    <div
                      style={{
                        width: "25%",
                        fontWeight: "bold",
                      }}
                    >
                      <StyledLabel>WhatsApp</StyledLabel>
                      <Switch
                        onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                  <div style={{ width: "73%" }}>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "41%" }}>
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Available from"

                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="WhatsApp #"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          // value={values.availableDate}
                          inlineLabel
                        />
                      )}
                    </div>
                    <div style={{ width: "55%" }}>
                      {this.state.whatsapp && (
                        <FastField
                          name="phoneNumber"
                          isColumn
                          width={"100%"}
                          // style={{ flexBasis: "30%" }}
                          component={InputComponent}
                          inlineLabel
                        />
                      )}
                    </div>
                    </FlexContainer>
                    </div>
                  </FlexContainer>
                  {/* <Spacer /> */}
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="text"
                        name="linkedin"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedin"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
                        width={"100%"}
                        //value={ this.props.parsingForm.hasOwnProperty("linkedInProfile") ? this.props.parsingForm.linkedInProfile: ""}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}} >
                  Identity
                    </HeaderLabel>
                    </div>
                    </div>
                    <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="nationality"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.nationality"
                            defaultMessage="Nationality"
                          />
                        }
                        isColumn
                        selectType="country"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName}
                        inlineLabel
                      />
                    </div>
                    {user.gdprApplicableInd === true && (
                      <div style={{ width: "47%" }}>
                        <div>
                          <StyledLabel>Allow sharing info?</StyledLabel>
                        </div>
                        <div>
                          <Switch
                            checked={this.state.share}
                            onChange={this.handleShare}
                            // disabled={this.state.availability}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                      </div>
                    )}
                  </FlexContainer>

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47.5%" }}>
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "48%" }}>
                          <FastField
                            name="idProof"
                            //label="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.idproof"
                                defaultMessage="ID Proof"
                              />
                            }
                            isColumn
                            options={["PassPort", "ID Card"]}
                            component={SelectComponent}
                            inlineLabel
                          />
                        </div>
                        <div style={{ width: "48%" }}>
                          <FastField
                            type="idNumber"
                            name="idNumber"
                            //placeholder="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.idNumber"
                                defaultMessage="ID Number"
                              />
                            }
                            component={InputComponent}
                            inlineLabel
                            width={"100%"}
                            isColumn
                          />
                        </div>
                      </FlexContainer>
                    </div>
                    <div style={{ width: "47.5%" }}>
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "57%" }}>
                          <Field
                            name="dateOfBirth"
                            label={
                              <FormattedMessage
                                id="app.dateOfBirth"
                                defaultMessage="Date of Birth"
                              />
                            }
                            isColumn
                            component={DatePicker}
                            value={values.dateOfBirth}
                            // defaultValue={dayjs("2020-01-01")}
                          />
                        </div>

                        <div style={{ width: "40%" }}>
                          <FastField
                            name="gender"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.gender"
                                defaultMessage="Gender"
                              />
                            }
                            options={["Male", "Female", "Others"]}
                            component={SelectComponent}
                            inlineLabel
                            // className="field"
                            isColumn
                          />
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <div style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <HeaderLabel style={{color:"white"}}>
                    Correspondence</HeaderLabel>
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
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        // name="address[0].country"
                        name="country"
                        isColumnWithoutNoCreate
                        // label="Country"

                        label={
                          <FormattedMessage
                            id="app.country"
                            defaultMessage="Country"
                          />
                        }
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryName,
                        }}
                        value={values.countryName}
                        selectType="country"
                        inlineLabel
                        // style={{ flexBasis: "80%" }}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer>
                </div>

                <div
                  style={{
                    width: "48%",
                  }}
                >
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47.5%" }}>
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "30%" }}>
                          <StyledLabel>Employee?</StyledLabel>
                          <Switch
                            checked={this.state.empInd}
                            onChange={this.handleEmployee}
                            //  disabled={this.state.empInd}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                        <div style={{ width: "65%" }}>
                          <>
                            <Field
                              name="tag_with_company"
                              // selectType="customerList"
                              // label="Tag Company"
                              label={
                                <FormattedMessage
                                  id="currentemployer"
                                  defaultMessage="Employer"
                                />
                              }
                              component={InputComponent}
                              isColumn
                              // value={values.customerId}
                              // defaultValue={{ label: firstName, value: documentId }}
                              inlineLabel
                              width={"100%"}
                            />
                          </>
                        </div>
                      </FlexContainer>
                    </div>
                   
                    <div style={{ width: "47.5%" }}>
                      <FlexContainer justifyContent="space-between">
                      {" "}
                      {this.state.empInd &&(
                        <div style={{ width: "48.5%" }}>
                          <FastField
                            name="partnerId"
                            isColumnWithoutNoCreate
                            //label="Mobile #"
                            label={
                              <FormattedMessage
                                id="app.vendor"
                                defaultMessage="Vendor"
                              />
                            }
                            isColumn
                            selectType="partnerListName"
                            component={SearchSelect}
                            inlineLabel
                          />
                        </div>
                      )}
                       {this.state.empInd &&(
                        <div style={{ width: "48.5%" }}>
                          <Field
                            name="contactId"
                            // selectType="contactListFilter"
                            isColumnWithoutNoCreate
                            label={
                              <FormattedMessage
                                id="app.vendorContact"
                                defaultMessage="Vendor Contact"
                              />
                            }
                            component={SelectComponent}
                            options={
                              Array.isArray(
                                this.getContactOptions(
                                  "partnerId",
                                  values.partnerId
                                )
                              )
                                ? this.getContactOptions(
                                    "partnerId",
                                    values.partnerId
                                  )
                                : []
                            }
                            value={values.contactId}
                            filterOption={{
                              filterType: "partnerId",
                              filterValue: values.partnerId,
                            }}
                            disabled={!values.partnerId}
                            isColumn
                            margintop={"0"}
                            inlineLabel
                            style={{ flexBasis: "80%" }}
                          />
                        </div>
                      )}   
                      </FlexContainer>
                    </div>
                  </FlexContainer>
                  {this.props.responseData && (
                    <>
                      <StyledLabel>Skill set</StyledLabel>
                      <SkillsLoadMore
                        skillList={this.props.responseData.skills}
                      />
                    </>
                  )}
                  <>
                    {/* <FlexContainer justifyContent="space-between">
                      <FlexContainer justifyContent="space-between">
                        <Field
                          name="skills"
                          //  selectType="contactList"
                          // isColumnWithoutNoCreate
                          label="Skills"
                          mode
                          placeholder="Select"
                          width={"100%"}
                          component={SelectComponent}
                          options={
                            Array.isArray(libraryOption) ? libraryOption : []
                          }
                        />
                      </FlexContainer>
                    </FlexContainer> */}
                  
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47.5%" }}>
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "48.5%" }}>
                            <FastField
                              name="roleTypeId"
                              selectType="roleType"
                              //label="Designation"
                              label={
                                <FormattedMessage
                                  id="app.role"
                                  defaultMessage="Role"
                                />
                              }
                              isColumnWithoutNoCreate
                              isColumn
                              component={SearchSelect}
                              inlineLabel
                            />
                          </div>
                          <div style={{ width: "48.5%" }}>
                            <FastField
                              name="experience"
                              type="number"
                              //label="Email"
                              label={
                                <FormattedMessage
                                  id="app.experience"
                                  defaultMessage="Experience"
                                />
                              }
                              // className="field"
                              placeholder="Years"
                              isColumn
                              width={"100%"}
                              component={InputComponent}
                              inlineLabel
                            />
                            {/* <HeaderLabel>Experience(in Years)</HeaderLabel>  

                    {/* <Input 
                  type="number"
                  name="experience"
                  style={{ 
                    width: '100%',
                    border: "0.0625em solid gainsboro",
    backgroundColor: "#fff",
    height: "1.8125em",
    boxShadow: "0em 0.25em 0.625em -0.25em #aaa"
                   }}
                  placeholder="Select"
                  />  */}
                            {/* <input 
type="text"
className="form-control"
name="experience"
onChange={this.NumericOnly}
/> */}
                          </div>
                        </FlexContainer>
                      </div>

                      <div style={{ width: "47.5%" }}>
                        <div style={{ width: "100%" }}>
                          <Field
                            // name="department"
                            name="sectorId"
                            // isColumnWithoutNoCreate
                            //  selectType="sectorName"
                            label={
                              <FormattedMessage
                                id="app.sector"
                                defaultMessage="Sector"
                              />
                            }
                            isColumn
                            //component={SearchSelect}
                            component={SelectComponent}
                            value={values.sectorId}
                            options={
                              Array.isArray(sectorOption) ? sectorOption : []
                            }
                          />
                        </div>
                      </div>
                    </FlexContainer>

                    <FlexContainer justifyContent="space-between">
                      <FlexContainer justifyContent="space-between">
                        <Field
                          name="skills"
                          //  selectType="contactList"
                          // isColumnWithoutNoCreate
                          label="Skills"
                          mode
                          placeholder="Select"
                          width={"100%"}
                          component={SelectComponent}
                          options={
                            Array.isArray(libraryOption) ? libraryOption : []
                          }
                        />
                      </FlexContainer>
                    </FlexContainer>

                    {/* <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47%" }}>
                        <FastField
                          name="designationTypeId"
                          //label="Designation"
                          label={
                            <FormattedMessage
                              id="app.designation"
                              defaultMessage="Designation"
                            />
                          }
                          isColumnWithoutNoCreate
                          selectType="designationType"
                          isColumn
                          // component={SelectComponent}
                          component={SearchSelect}
                          value={values.designationTypeId}
                          inlineLabel
                        />
                      </div>
                    </FlexContainer> */}

                    <Spacer  />
                    <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47.5%" }}>
                    <FlexContainer justifyContent="space-between">
                    <div style={{ width: "48.5%" }}>
                        <StyledLabel>Category</StyledLabel>

                        <Switch
                          checked={this.state.whiteblue}
                          onChange={this.handleWhiteBlue}
                          disabled={this.state.checked}
                          checkedChildren="White collar"
                          unCheckedChildren="Blue collar"
                        />
                      </div>
                      <div>
                        <Checkbox
                          checked={this.state.checked}
                          onChange={() => this.handleChange()}
                          style={{ marginLeft: "auto" }}
                        >
                          Both
                        </Checkbox>
                      </div>
                      </FlexContainer>
                      {/* <div style={{ width: "25%" }}>

<Switch
  // checked={this.state.billing}
  // onChange={this.handlebilling}
  checkedChildren="PartTime"
  unCheckedChildren="FullTime"
/>
</div> */}
                      </div>
                      <div style={{ width: "47.5%" }}>
                      <div style={{ width: "25%" }}>
                        <StyledLabel>Type</StyledLabel>

                        <Switch
                          checked={this.state.billing}
                          onChange={this.handlebilling}
                          checkedChildren="Permanent"
                          unCheckedChildren="Contract"
                        />
                      </div>
                    
                      </div>
                      
                    </FlexContainer>

                    <Spacer  />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47.5%" }}>
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "25%" }}>
                            <StyledLabel>Active</StyledLabel>
                            <Switch
                              checked={this.state.availability}
                              onChange={this.handleAvailability}
                              // disabled={this.state.availability}
                              checkedChildren="Yes"
                              unCheckedChildren="No"
                            />
                          </div>
                          <div style={{ width: "70%" }}>
                            {" "}
                            {this.state.availability && (
                              <Field
                                name="availableDate"
                                //label="Available from"

                                label={
                                  <FormattedMessage
                                    id="app.availableDate"
                                    defaultMessage="Available from"
                                  />
                                }
                                // disabled={!this.state.availability}
                                component={DatePicker}
                                isColumn
                                width={"100%"}
                                value={values.availableDate}
                                inlineLabel
                                disabledDate={(currentDate) => {
                                  if (values.availableDate) {
                                    if (
                                      dayjs(currentDate).isBefore(
                                        dayjs(values.availableDate)
                                      )
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }
                                }}
                              />
                            )}
                          </div>
                        </FlexContainer>
                      </div>
                      <div style={{ width: "47.5%" }}>
                        <FastField
                          // isRequired
                          // type="email"
                          name="workPreference"
                          //label="Email"
                          label={
                            <FormattedMessage
                              id="app.workPreference"
                              defaultMessage="Work Preference"
                            />
                          }
                          // className="field"
                          isColumn
                          width={"100%"}
                          component={SelectComponent}
                          placeholder={"Home"}
                          options={[
                            "Home",
                            "Office-1 Day/Week",
                            "Office-2 Day/Week",
                            "Office-3 Day/Week",
                            "Office-4 Day/Week",
                            "Office"
                          ]}
                          // defaultValue={'value'}
                          inlineLabel
                        />
                      </div>
                    </FlexContainer>

                    <Spacer  />
                    <FlexContainer justifyContent="space-between">
                      <div style={{ width: "47.5%" }}>
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "48%" }}>
                            <Field
                              name="billing"
                              label={
                                this.state.billing ? "Expectation" : "Billing"
                              }
                              // label={
                              //   <FormattedMessage
                              //     id="app.billing"
                              //     defaultMessage="Billing/Hr"
                              //   />
                              // }
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                            />
                          </div>
                          <div style={{ width: "48%" }}>
                            <Field
                              name="currency"
                              isColumnWithoutNoCreate
                              placeholder="Currency"
                              // defaultValue={{
                              //   value: this.props.user.currency,
                              // }}
                              label={
                                <FormattedMessage
                                  id="app.currency"
                                  defaultMessage="Currency"
                                />
                              }
                              isColumn
                              selectType="currencyName"
                              isRequired
                              width={"100%"}
                              component={SearchSelect}
                            />
                          </div>
                        </FlexContainer>
                      </div>
                      <div style={{ width: "47.5%" }}>
                        {/* {this.state.billing ? (
                        <div style={{ width: "22%" }}>
                          <Field
                            name="CostType"
                            //label="Email"
                            label={
                              <FormattedMessage
                                id="app.cost"
                                defaultMessage="Cost Type"
                              />
                            }
                            // className="field"
                            isColumn
                            width={"100%"}
                            component={SelectComponent}
                            options={["Monthly Salary", "Annual Salary"]}

                            inlineLabel
                          />
                        </div>
                      ) : (
                        <div style={{ width: "22%" }}>
                          <Field
                            name="CostType"
                            label="Cost Type"
                            // className="field"
                            isColumn
                            width={"100%"}
                            component={SelectComponent}
                            options={["Hourly", "Weekly", "Monthly"]}
                            inlineLabel
                          />
                        </div>
                      )} */}
                        <FlexContainer justifyContent="space-between">
                          <div style={{ width: "48%" }}>
                            <FastField
                              // isRequired
                              // type="text"
                              name="currentSalary"
                              //label="Email"
                              label={
                                <FormattedMessage
                                  id="app.currentsalary"
                                  defaultMessage="Current Salary"
                                />
                              }
                              // className="field"
                              isColumn
                              width={"100%"}
                              component={InputComponent}
                              inlineLabel
                            />
                          </div>
                          <div style={{ width: "48%" }}>
                            <Field
                              name="currentCtcCurency"
                              isColumnWithoutNoCreate
                              placeholder="Currency"
                              // defaultValue={{
                              //   value: this.props.user.currency,
                              // }}
                              label={
                                <FormattedMessage
                                  id="app.currency"
                                  defaultMessage="Currency"
                                />
                              }
                              isColumn
                              width={"100%"}
                              selectType="currencyName"
                              isRequired
                              component={SearchSelect}
                            />
                          </div>
                        </FlexContainer>
                      </div>
                    </FlexContainer>
                  </>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="benifit"
                        //label="State"
                        label={
                          <FormattedMessage
                            id="benifit"
                            defaultMessage="Benefits"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="noticePeriod"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.notice"
                            defaultMessage="Notice (months)"
                          />
                        }
                        // className="field"
                        isColumn
                        width={"100%"}
                        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer>
                    <div style={{ width: "100%" }}>
                      <Field
                        name="noticeDetail"
                        //label="Description"
                        label={
                          <FormattedMessage
                            id="app.noticeperiodinfo"
                            defaultMessage="Notice Period Info"
                          />
                        }
                        isRequired
                        isColumn
                        component={TextareaComponent}
                      />
                    </div>
                  </FlexContainer>
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // icon={<PoweroffOutlined />}
                  Loading={addingCandidate}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  candidate,
  departments,
  sector,
  librarys,
  team,
  contact,
  opportunity,
}) => ({
  addingCandidate: candidate.addingCandidate,
  resumeForm: candidate.resumeForm,
  sectors: sector.sectors,
  organizationId: auth.userDetails.organizationId,
  addingCandidateError: candidate.addingCandidateError,
  user: auth.userDetails,
  fetchingDepartments: departments.fetchingDepartments,
  userId: auth.userDetails.userId,
  department: auth.userDetails && auth.userDetails.department,
  currencies: auth.currencies,
  librarys: librarys.librarys,
  departments: departments.departments,
  vendorContactData: contact.vendorContactData,
  parsingForm:candidate.parsingForm
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      addCandidate,
      getLibrarys,
      getSectors,
      getDepartments,
      getVendorContactData,
      // getAllPartnerListByUserId,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
