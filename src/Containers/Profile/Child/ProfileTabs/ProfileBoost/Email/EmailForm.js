import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { addEmailCredentials } from "../Email/EmailAction";
// import { addEmailCredentialsForAdmin } from "../EmailAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Field
                      name="email"
                      label="Email Id"
                      inlineLabel
                      isRequired
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                      width={"100%"}
                    />
                    <div class=" mt-3" />
                    <Field
                      type="password"
                      isRequired
                      name="password"
                      label="Password"
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    />
                    <div class=" mt-3" />
                    {/* <Field
                  name="serverType"
                  label="Server Type"
                  component={InputComponent}
                  inlineLabel
                  style={{ flexBasis: "80%" }}
                />
                <div class=" mt-3" /> */}
                    <Field
                      isMulti
                      isRequired
                      name="host"
                      label="Host Name"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      style={{ flexBasis: "80%" }}
                    />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for Outlook users - smtp-mail.outlook.com{" "}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for other webmail host - mail.example.com{" "}
                    </span>
                    <div class=" mt-3" />
                    <Field
                      name="port"
                      label="Port"
                      inlineLabel
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    />
                    <div class=" mt-3" />
                  </div>
                </div>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // style={{ float: "right" }}
                    Loading={addingEmail}
                  >
                    Create
                </Button>
                </FlexContainer>
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
