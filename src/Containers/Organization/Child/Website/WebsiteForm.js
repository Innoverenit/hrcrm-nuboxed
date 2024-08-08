import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addWebsiteCredentials } from "../Website/WebsiteAction";

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is needed!"),
  password: Yup.string().required("Password is needed!"),
  host: Yup.string().required("Host name is needed!"),
  port: Yup.string().required("Port is needed!"),
});

class WebsiteForm extends Component {
  render() {
    const {
        addingWebsite,
        addWebsiteCredentials,
      //   addingEmailCredentialForAdmin,
    } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // email: "",
            // password: "",
            // host: "",
            // port: "",
            organizationId:this.props.organizationId,
            website:""
          }}
        //   validationSchema={EmailSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addWebsiteCredentials(values);
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
                  <div class=" w-full h-full"
                  >
                    <Field
                       name="website"
                      label="URL"
                      inlineLabel
                      isRequired
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                      width={"100%"}
                    />
                    
                    {/* <Field
                      type="password"
                      isRequired
                      name="password"
                      label="Password"
                      inlineLabel
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    /> */}
                   
                    {/* <Field
                  name="serverType"
                  label="Server Type"
                  component={InputComponent}
                  inlineLabel
                  style={{ flexBasis: "80%" }}
                />
                <div class=" mt-3" /> */}
                    {/* <Field
                      isMulti
                      isRequired
                      name="host"
                      label="Host Name"
                      component={InputComponent}
                      inlineLabel
                      width={"100%"}
                      style={{ flexBasis: "80%" }}
                    /> */}
                    {/* <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for Outlook users - smtp-mail.outlook.com{" "}
                    </span> */}
                    <br />
                    {/* <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for other webmail host - mail.example.com{" "}
                    </span> */}
                  
                    {/* <Field
                      name="port"
                      label="Port"
                      inlineLabel
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                      style={{ flexBasis: "80%" }}
                    /> */}
                
                  </div>
                </div>
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    // style={{ float: "right" }}
                    Loading={addingWebsite}
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
const mapStateToProps = ({ websites,auth }) => ({
  addingWebsite: websites.addingWebsite,
  organizationId: auth.userDetails.organizationId,
   addingWebsiteError: websites.addingWebsiteError,
  //   addingEmailCredentialForAdminError: email.addingEmailCredentialForAdminError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addWebsiteCredentials
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteForm);
