import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../../Components/Forms/Formik/AddressFieldArray";
import { addPersonalDetails } from "../../../../../../Profile/ProfileAction";

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
        "",//0 "Salutation"
        "295",//1First Name"
        "354",//2Last Name"
        "353",//3Middle"
      "299",  // Mobile #4
      "546",  // "Mobile No"5
      "875",  // "Phone #6
      "300",  // "Phone No7"
      "154",  // Submit8
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
                  <div class=" w-[25%]"
                >
                  <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[0]}</div>
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
                         />
                    </div>
                    <div class=" w-[67%]"
                ><div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[1]}</div>
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
                        />
                    </div>
                  </div>

                
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[55%]" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[2]}</div>
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
                         />
                    </div>
                    <div class=" w-[38%]" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[3]}</div>
                      <FastField
                        name="contactMiddleName"
                        // //label="Middle "
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
                       />
                    </div>
                  </div>

                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                  <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[4]}</div>
                      <Field
                        name="countryDialCode"
                        //label="Mobile #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.countryDialCode"
                        //     defaultMessage="Mobile #"
                        //   />
                        // }
                        isColumn
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[47%]" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[5]}</div>
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
                        />
                    </div>
                  </div>
                 

                  <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                  <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[6]}</div>
                      <Field
                        name="countryDialCode1"
                        // label="Phone #"
                        // label={
                        //   <FormattedMessage
                        //     id="app.countryDialCode1"
                        //     defaultMessage="Phone #"
                        //   />
                        // }
                        isColumn
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-[47%]" >
                    <div className=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[7]}</div>
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
  // userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  addingPersonalDetails: profile.addingPersonalDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addPersonalDetails }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDocumentForm);
