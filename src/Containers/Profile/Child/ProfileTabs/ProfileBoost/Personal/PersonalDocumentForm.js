import React, {  Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { addPersonalDetails } from "../../../../ProfileAction";

function onChange(date, dateString) {}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const documentSchema = Yup.object().shape({
  emailId: Yup.string().email("Enter a valid Email"),
  firstName: Yup.string().required("Please provide First Name"),
  phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
  mobileNo: Yup.string().matches(phoneRegExp, "Enter a valid Mobile No"),

  documentId: Yup.string().required("Input needed !"),
});

class PersonalDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "Full Time",
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
      
       "Salutation",
       "First Name",
       "Last Name",
        "Middle ",
        "Mobile",
        "Mobile No",
        "Phone",
        "Phone No",
        "Submit",
     
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  render() {
    const {
      addingContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      addingPersonalDetails,
    } = this.props;
    console.log(accountId);

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            bloodGroup: "",
            dob: "",
            contactSalutation: "",
            contactFirstName: "",
            contactMiddleName: "",
            contactLastName: "",
            mobileNo: "",
            phoneNo: "",

            address: [
              {
                address1: "",
                town: "",
                postalCode: "",
                country: "",
              },
            ],
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addPersonalDetails(
              { ...values },

              this.props.employeeId,

              resetForm()
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form className="form-background">
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-[45%]"
                >
              
                  <div class=" flex justify-between mt-3">
                    <div class=" w-[25%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[0]}</div>
                      <FastField
                        name="contactSalutation"
                        type="text"
                        //label="Salutation"
                        // label={
                        //   <FormattedMessage
                        //     id="app.contactSalutation"
                        //     defaultMessage="Salutation"
                        //   />
                        // }
                        options={["Mr.", "Ms.", "None"]}
                        component={SelectComponent}
                        inlineLabel
                        className="field"
                        isColumn
                        style={{
                          flexBasis: "80%",

                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div class=" w-[67%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[1]}</div>
                      <FastField
                        isRequired
                        name="contactFirstName"
                        //label="First Name"
                        // label={
                        //   <FormattedMessage
                        //     id="app.contactFirstName"
                        //     defaultMessage="First Name"
                        //   />
                        // }
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>

                  <div class=" flex justify-between mt-6" >
                  <div class=" w-[55%]" >
                  <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[2]}</div>
                      <FastField
                        name="contactLastName"
                        //label="Last Name"
                        // label={
                        //   <FormattedMessage
                        //     id="app.contactLastName"
                        //     defaultMessage="Last Name"
                        //   />
                        // }
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div class=" w-[38%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[3]}</div>
                      <FastField
                        name="contactMiddleName"
                        //label="Middle "
                        // label={
                        //   <FormattedMessage
                        //     id="app.contactMiddleName"
                        //     defaultMessage="Middle"
                        //   />
                        // }
                        type="text"
                        width={"100%"}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        style={{
                          height: "2.0625em",
                          flexBasis: "80%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
                
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[4]}</div>
                      <Field
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.countryDialCode"
                        //     defaultMessage="Mobile #"
                        //   />
                        // }
                        isColumn
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[5]}</div>
                      <Field
                        type="text"
                        name="mobileNo"
                        // label={
                        //   <FormattedMessage
                        //     id="app.mobileNo"
                        //     defaultMessage="Mobile No"
                        //   />
                        // }
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
                

                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[6]}</div>
                      <Field
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        // label="Phone #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.countryDialCode1"
                        //     defaultMessage="Phone #"
                        //   />
                        // }
                        isColumn
                        margintop={"0.25em"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                      />
                    </div>
                    <div class=" w-[47%]" >
                    <div class=" font-poppins font-bold text-xs">{this.state.translatedMenuItems[7]}</div>
                      <Field
                        type="text"
                        name="phoneNo"
                        // label={
                        //   <FormattedMessage
                        //     id="app.phoneNo"
                        //     defaultMessage="Phone No"
                        //   />
                        // }
                        placeholder="Phone #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
            
                </div>

                <div class=" w-[45%]"

                >
                  <FieldArray
                    name="Address"
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
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={addingPersonalDetails}
                >
                 {this.state.translatedMenuItems[8]} {/* <FormattedMessage id="app.submit" defaultMessage="Submit" /> */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile }) => ({  
  addingPersonalDetails: profile.addingPersonalDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addPersonalDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDocumentForm);
