import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updatePartnerContact,setEditPartnerContact } from "../../PartnerAction";
import Upload from "../../../../Components/Forms/Formik/Upload";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import {getSectors} from "../../../Settings/Sectors/SectorsAction";
import {getDesignations} from "../../../Settings/Designation/DesignationAction";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
});

class UpdatePartnerContactForm extends Component {
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
      updatePartnerContact,
      updatePartnerContactById,
      setEditingPartnerContact,
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
      contactId,
      // tagWithCompany,
    } = this.props;
    console.log(linkContact);
    console.log(contactId);

    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingPartnerContact.salutation || "",
            designationTypeId: this.props.setEditingPartnerContact.designationTypeId || "",
            description: this.props.setEditingPartnerContact.description || "",
            // department: this.props.setEditingPartnerContact.department || undefined,
            sectorId:this.props.setEditingPartnerContact.sectorId || "",
            departmentDetails:  this.props.setEditingPartnerContact.departmentDetails || "",
            // userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: this.props.setEditingPartnerContact.tagWithCompany || "",
            firstName: this.props.setEditingPartnerContact.firstName || "",
            middleName: this.props.setEditingPartnerContact.middleName || "",
            lastName: this.props.setEditingPartnerContact.lastName || "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingPartnerContact.phoneNumber || "",
            mobileNumber: this.props.setEditingPartnerContact.mobileNumber || "",
            emailId: this.props.setEditingPartnerContact.emailId || "",
            linkedinPublicUrl: this.props.setEditingPartnerContact.linkedinPublicUrl || "",
            address: [
              {
                addressId: this.props.setEditingPartnerContact.address.length ? this.props.setEditingPartnerContact.address[0].addressId : "",
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.setEditingPartnerContact.countryName || this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: this.props.setEditingPartnerContact.notes || "",
          }}
          // validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updatePartnerContact(
              {
                ...values,
                partnerId: this.props.partnerId,
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
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between",height: "70vh", overflow:"scroll",paddingRight: "0.6em" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
           <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                    <FastField name="imageId" component={Upload} />
                    <div>
                    <div class=" mt-3"/>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                        <div style={{ width: "30%" }}>
                          <FastField
                            name="salutation"
                            type="text"
                            label="Salutation"
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn

                          />
                        </div>
                        <div style={{ width: "63%" }}>
                          <FastField
                            isRequired
                            name="firstName"
                            label="First Name"
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                      <div class=" mt-3" />
                      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                        <div style={{ width: "40%" }}>
                          <FastField
                            name="middleName"
                            label="Middle Name"
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                                  />
                        </div>
                        <div style={{ width: "55%" }}>
                          <FastField
                            name="lastName"
                            label="Last Name"
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
                  <div class=" mt-3" />
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        label="Dial Code"
                        isColumn
                        // margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label="Mobile #"
                         
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        //label="Phone No #"
                        label="Dial Code"
                         
                        isColumn
                        // margintop={"0.25em"}
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        type="text"
                        name="phoneNumber"
                        //placeholder="Phone #"
                        label="Phone #"
                         
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div>

                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="email"
                        name="emailId"
                        label="Email"
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        label="Linkedin "
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />

                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="designationTypeId"
                        //label="Designation"
                        label="Role"                         
                        isColumnWithoutNoCreate
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
               
                  </div>
                  
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">

                  </div>
                </div>
                &nbsp;
                <div
                  style={{
                    height: "70%",
                    width: "45%",
                  }}
                >
                  
                  
                  <div class=" mt-3" />
                  <FieldArray
                    name="address"
                    label="searxh"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  <div class=" mt-3"  style={{ marginTop: "1.25em" }}/>
                  <Field
                    name="notes"
                    label="Notes"
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  // icon={<PoweroffOutlined />}
                  loading={updatePartnerContactById}
                >
                                    
                    Create 
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, partner,sector,designations }) => ({
  setEditingPartnerContact: partner.setEditingPartnerContact,
  updatePartnerContactById: partner.updatePartnerContactById,
  updatePartnerContactByIdError: partner.updatePartnerContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerId: partner.partner.partnerId,
  sectorId:sector.sectorId,
  designationTypeId:designations.designationTypeId,
  //   tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      updatePartnerContact,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
      getSectors,
      setEditPartnerContact,
      getDesignations,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePartnerContactForm);
