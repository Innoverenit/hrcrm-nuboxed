import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import Button from "antd/lib/button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FWLogo from "../../Assets/Images/name.webp";  // for CT
import { forgotUserPassword, validateOtpurL, verifyEmailurL } from "./AuthAction";
import { Input } from "../../Components/UI/Layout";

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
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{errors[field.name]}</div>
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
        <div className="flex justify-between p-4 w-wk" >

          {/* <div className="forgot_password"> */}

          <div class=" flex flex-col bg-[#fffafa] relative justify-center items-center  max-sm:w-wk h-[80vh] ">
          <div className=" flex justify-start w-[9rem] h-12 ">
                <img
                  className="w-18 h-18"
                  src={FWLogo}           
                  alt="Tekorero logo"
                />
                </div>
           <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white">
                  <div class=" text-lg font-poppins font-bold text-black ">Forgot Password</div>
                  <div class=" text-sm font-poppins text-black">Link will be sent to your registered email id</div>
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
                      <Form className=" w-[25vw]">
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
                              <VisibilityIcon
                                type="eye"
                                onClick={this.handleClick}
                                style={{ marginLeft: "-1.25em", marginTop: "-0.25em" }}
                                size="24"
                              />
                            ) : (
                              <VisibilityOffIcon
                                // type="eye-invisible"
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
                              <VisibilityIcon  className=" !text-icon  -ml-5 -mt-1"
                                type="eye"
                                onClick={this.handleClick1}
                                />
                            ) : (
                              <VisibilityOffIcon  className=" !text-icon  -ml-5 -mt-1"
                                type="eye-invisible"
                                onClick={this.handleClick1}
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
                 
                </div>
                <div className="text-xs text-center font-poppins mt-auto text-black absolute bottom-0"
                 >
                  © {new Date().getFullYear()},  {` `} CloudHub, All rights reserved.
                </div>
              </div>

            </div>
          {/* </div> */}

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

