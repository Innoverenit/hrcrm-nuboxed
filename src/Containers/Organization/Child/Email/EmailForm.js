import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addEmailCredentials } from "../Email/EmailAction";
import { FormattedMessage } from "react-intl";
/**
 * yup validation scheme for creating a Team
 */
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is needed!"),
  password: Yup.string().required("Password is needed!"),
  host: Yup.string().required("Host name is needed!"),
  port: Yup.string().required("Port is needed!"),
});

class EmailForm extends Component {
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
        "Email Id",
        "Password",
        "Host Name",
        "Example for Outlook users",
        "Example for other webmail host",
        "Port",
        "Create"
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
    const {
      addingEmail,
      addEmailCredentials,
      //   addingEmailCredentialForAdmin,
    } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
            host: "",
            port: "",
          }}
          validationSchema={EmailSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addEmailCredentials(values);
            resetForm();
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
                <div class=" flex justify-between" >
                  <div class=" w-[75%] h-full"   >
                    <div class=" text-xs font-bold font-poppins text-black">{this.state.translatedMenuItems[0]}</div>
                    <Field
                      name="email"
                      // label="Email Id"
                      isColumn
                      isRequired
                      component={InputComponent}
                      width={"100%"}
                    />
                  <div class=" mt-4">
                  <div class=" text-xs font-bold font-poppins text-black">{this.state.translatedMenuItems[1]}</div>
                    <Field
                      type="password"
                      isRequired
                      name="password"
                      // label="Password"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                    </div>
                    {/* <div class=" mt-4"> */}
                    <div class=" text-xs font-bold font-poppins text-black">{this.state.translatedMenuItems[2]}</div>
                    <Field
                      isMulti
                      isRequired
                      name="host"
                      // label="Host Name"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                    />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                     {this.state.translatedMenuItems[3]}- smtp-mail.outlook.com{" "}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      {this.state.translatedMenuItems[4]} - mail.example.com{" "}
                    </span>
                    <div class=" mt-4">
                    <div class=" text-xs font-bold font-poppins text-black">{this.state.translatedMenuItems[5]}</div>
                    <Field
                      name="port"
                      // label={
                      //   <FormattedMessage
                      //     id="app.port"
                      //     defaultMessage="Port"
                      //   />
                      // }
                      isColumn
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                    />
                    </div>
                  
                  </div>
                </div>
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    // style={{ float: "right" }}
                    Loading={addingEmail}
                  >
                  {this.state.translatedMenuItems[6]}  {/* Create */}
                </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ email }) => ({
  addingEmail: email.addingEmail,
  addingEmailError: email.addingEmailError,
  //   addingEmailCredentialForAdminError: email.addingEmailCredentialForAdminError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addEmailCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
