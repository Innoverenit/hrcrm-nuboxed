import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { message, } from "antd";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CheckCircleOutlined, EyeInvisibleOutlined, EyeOutlined,
} from "@ant-design/icons";
import { AuthContainer, FormWrapper, Input } from "./styled";
import { ValidationError, Title, SubTitle } from "../../Components/UI/Elements";
import Button from "antd/lib/button";
import { changePassword, generateOtpByEmail, validateOtp } from "./AuthAction";

/**
 * yup validation scheme for set Password
 */
const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Password should contain minimum 8 character ")
    .max(50, "Password should have maximum 50 characters!"),
  confirmPassword: Yup.string()
    .required("Enter password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
class ChangePassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show2: Boolean(),
    show: Boolean(),
  };
  handleClick = () =>
    this.setState(({ type, prevState }) => ({
      type: type === "text" ? "password" : "text",
      show: !this.state.show,
    }));
  handleClick1 = () =>
    this.setState(({ type1, prevState }) => ({
      type1: type1 === "text" ? "password" : "text",
      show1: !this.state.show1,
    }));
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <ValidationError>{errors[field.name]}</ValidationError>
      )}
    </div>
  );
  componentDidMount() {
    console.log("inside cDM login");
  }
  callback = () => {
    message.success("You have successfully changed your password");
    this.props.history.push("/change-password");
  };
  render() {
    return (
      <>
        <div class=" flex">
          <AuthContainer
            style={{
              backgroundColor: "#eaedf1",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <FormWrapper>
              <Title>Change Password</Title>
              <SubTitle>Its a good idea to use a strong password.</SubTitle>
           <div class=" mt-4"></div>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",

                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={(values) => {
                  console.log(values);
                  this.props.changePassword(
                    {
                      password: values.password,
                      emailId: this.props.emailId,
                    },
                    this.callback
                  );
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form style={{ width: "25vw" }}>
                    <div className="set_password items-center">
                      <div class=" w-full" >
                        <Field
                          name="password"
                          type={this.state.type}
                          placeholder=" New password"
                          component={this.InputComponent}
                          style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined
                          type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em",  }}
                          size="24"
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em",  }}
                        />
                      )}
                    </div>
                  

                    <div  className="set_password ">
                      {/* <div class=" flex justify-between" > */}
                      <div class=" w-full" >
                          <Field
                            name="confirmPassword"
                            type={this.state.type1}
                            placeholder="Confirm new password"
                            component={this.InputComponent}
                            style={{ border: "1px solid lightgrey", boxShadow: "rgb(220 216 216) 2px 2px 2px" }}

                          />
                        </div>
                        {this.state.show1 ? (
                          <EyeOutlined
                            type="eye"
                            onClick={this.handleClick1}
                            style={{ marginLeft: "-1.25em",  }}
                            size="24"
                          // style={{ size: 24 }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            type="eye-invisible"
                            onClick={this.handleClick1}
                            style={{ marginLeft: "-1.25em",  }}
                          size="24"
                          // style={{ size: 24 }}
                          />
                        )}
                        {/* <div >
                          <Button
                            type="primary"
                            onClick={() => {
                              this.props.generateOtpByEmail({
                                emailId: this.props.emailId
                              })
                              // this.handleOtpField()
                            }}
                            style={{ marginLeft: "-6.25em", marginTop: "0.4em" }}

                          >
                            <ArrowRightOutlined />
                          </Button>
                        </div> */}
                      </div>
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlined
                          type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={80}
                          style={{
                            marginLeft: "1.25em",
                            marginTop: "0.875em",
                            fontSize: "1.5625em",
                          }}
                        />
                      ) : null}
                    {/* </div> */}

                    {/* <Spacer /> */}
                    {/* <div >
                      <Button
                        type="primary"
                        onClick={() => {
                          this.props.generateOtpByEmail({
                            emailId: this.props.emailId
                          })
                          // this.handleOtpField()
                        }}
                        style={{ marginLeft: "85%" }}

                      >
                        <ArrowRightOutlined />
                      </Button>
                    </div> */}

                    

                 
                   
                      {/* <FlexContainer justifyContent="space-between">
                        <div>
                         
                          <Field
                            name="otp"
                            placeholder="Enter OTP"
                            
                            component={InputComponent}
                         

                          />
                        </div>
                        <div  style={{ marginRight: "12.25em"}}>

                          <Button
                            type="primary"
                            onClick={() => {
                              this.props.validateOtp({
                                otp: values.otp,
                                emailId: this.props.emailId
                              })
                            }}
                          >
                            Validate
                          </Button>
                        </div>
                      </FlexContainer> */}
                   

                   <div class="mt-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={this.props.changingPassword}
                      style={{ width: "100%", height: "2.5em" }}
                    // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      {/* Save Password */}
                      <FormattedMessage
                        id="app.savepassword"
                        defaultMessage="Save Password"
                      />
                    </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <br />
              {/* <Link to='/register' style={{ textAlign: 'center' }}>Doesn't have an account? Register</Link> */}
            </FormWrapper>
          </AuthContainer>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  changingPassword: auth.changingPassword,
  changingPasswordError: auth.changingPasswordError,
  emailId: auth.userDetails.emailId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changePassword,
      generateOtpByEmail,
      validateOtp
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
