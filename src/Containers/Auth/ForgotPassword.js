import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Input } from "./styled";
import { ValidationError, Title, SubTitle } from "../../Components/UI/Elements";
import Button from "antd/lib/button";
import styled from "styled-components";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import FWLogo from "../../Assets/Images/name.jpg";  // for CT
import { forgotUserPassword, validateOtpurL, verifyEmailurL } from "./AuthAction";

class ForgotPassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show2: Boolean(),
    show: Boolean(),
    sendOtpClicked: false,
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
    if (this.props.userType === "Admin") {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <>
        <div className="main" style={{ display: "flex", justifyContent: "space-evenly" }}>

          <div className="forgot_password">

          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <AuthContainer
                style={{
                  backgroundColor: "white",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <img
                  className="big-logo"
                  src={FWLogo}
                  style={{ width: 200 }}
                  alt="Tekorero logo"
                />
                <FormWrapper>
                  <Title>Forgot Password</Title>
                  <SubTitle>Link will be sent to your registered email id</SubTitle>
                  <div class="mt-3" />
                  <Formik
                    initialValues={{
                      emailId: "",
                      otp: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    // validationSchema={ChangePasswordSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      this.props.forgotUserPassword(
                        {
                          emailId: this.props.email,
                        },
                        this.callback
                      );
                    }}
                  >
                    {({ errors, touched, values, isSubmitting }) => (
                      <Form style={{ width: "25vw" }}>
                        <div >
                          <div className="flex w-full">
                            <div className="w-[75%]" >
                              <Field
                                // type="defaultUser.email"
                                placeholder="Enter your email"
                                name="emailId"
                                // label="Verify Email"
                                // className="field"
                                isColumn
                                width={"100%"}
                                component={this.InputComponent}
                                inlineLabel
                              />
                            </div>
                            <div className="w-[25%]" >
                              <Button
                                type="primary"
                                disabled={!values.emailId.length}
                                onClick={() => {
                                  // this.setState({ sendOtpClicked: true });
                                  this.props.verifyEmailurL({
                                    emailId: values.emailId,
                                    otp: 0,
                                  });
                                }}
                                class={{
                                  width: "100%",
                                  margin: "7%",
                                }}

                              >
                                Send OTP
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex" >
                            <div className="w-[75%]" >
                              <Field
                                // disabled={!this.state.otp}
                                name="otp"
                                // label="Validate OTP*"
                                placeholder="Validate OTP"
                                isColumn
                                component={this.InputComponent}
                              />
                            </div>
                            <div className="w-[25%]">
                              <Button
                                type="primary"
                                disabled={!values.otp.length}
                                onClick={() => {
                                  this.props.validateOtpurL({
                                    emailId: values.emailId,
                                    otp: values.otp,
                                  });

                                }}
                                style={{
                                  width: "100%",
                                  margin: "7%",
                                }}
                              // disabled={!this.state.sendOtpClicked}
                              >
                                Validate
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex" >

                            <div className="w-full" >
                              <Field
                                name="password"
                                type={this.state.type}
                                placeholder=" New password"
                                component={this.InputComponent}
                              />
                            </div>
                            {this.state.show ? (
                              <EyeOutlined
                                type="eye"
                                onClick={this.handleClick}
                                style={{ marginLeft: "-1.25em", marginTop: "-0.25em" }}
                                size="24"
                              />
                            ) : (
                              <EyeInvisibleOutlined
                                type="eye-invisible"
                                onClick={this.handleClick}
                                size="24"
                                style={{ marginLeft: "-1.25em", marginTop: "-0.25em" }}
                              />
                            )}

                          </div>

                          <div className="w-full flex" >

                            <div className="w-full " >
                              <Field
                                name="confirmPassword"
                                type={this.state.type1}
                                placeholder="Confirm new password"
                                component={this.InputComponent}
                              />
                            </div>
                            {this.state.show1 ? (
                              <EyeOutlined
                                type="eye"
                                onClick={this.handleClick1}
                                style={{
                                  marginLeft: "-1.25em",
                                  marginTop: "-0.25em",
                                }}
                              // style={{ size: 24 }}
                              />
                            ) : (
                              <EyeInvisibleOutlined
                                type="eye-invisible"
                                onClick={this.handleClick1}
                                style={{
                                  marginLeft: "-1.25em",
                                  marginTop: "-0.25em",
                                }}
                            
                              />
                            )}
                          

                          </div>

                        </div>

                        <div className="mt-4">
                          <span className="flex justify-between">

                            <span className=" font-bold flex justify-start">
                              {" "}
                              <Link
                                to="/login"
                                style={{ textAlign: "center", fontSize: 14 }}
                              >
                                Back to login
                              </Link>


                            </span>

                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={this.props.doResetpassword}
                              style={{ width: "15.875em", height: "2.5em" }}
                          
                            >
                              Save Password
                            </Button>
                          </span>
                        </div>
                     

                      </Form>
                    )}
                  </Formik>
                 
                </FormWrapper>
                <div className="text-xs text-center font-poppins mt-auto text-black absolute bottom-0"
                 >
                  © {new Date().getFullYear()},  {` `} CloudHub, All rights reserved.
                </div>
              </AuthContainer>

            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  doResetpassword: auth.doResetpassword,
  doResetpasswordError: auth.doResetpasswordError,
  email: auth.userDetails.email,
  user: auth.userDetails,
  userType: auth.userDetails.userType,
  validOtp: auth.validOtp,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      forgotUserPassword, validateOtpurL, verifyEmailurL
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);

const AuthContainer = styled.div`
  // width: 50%;
  width:${(props) => props.width || "50%"}
  min-height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  @media only screen and (max-width: 37.5em) { 
   width:100%
  }
`;
const FormWrapper = styled.div`    
padding: 1rem;
width: ${(props) => props.width}
     border-radius: 0.3rem;
    box-shadow: 0em 0.25em 0.625em -0.125em #444;
    border: 0.0625em solid #ddd;
    background: #fff;
    @media only screen and (max-width: 37.5em) {
       width:89%
         }
 @media only screen 
and (min-device-width : 48em) 
and (max-device-width : 64em)
and (-webkit-min-device-pixel-ratio: 2){
}`;
