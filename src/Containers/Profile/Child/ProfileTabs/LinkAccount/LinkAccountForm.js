import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Input } from "../../../../Auth/styled";
import { ValidationError, Title, SubTitle } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import Button from "antd/lib/button";
import styled from "styled-components";
 import { forgotUserPassword, validateOtpurL, verifyEmailurL } from "../../../../Auth/AuthAction";

class LinkAccountForm extends Component {
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

            <FlexContainer>
              <AuthContainer
                style={{
                  backgroundColor: "white",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
            
                <FormWrapper>
                  <Formik
                    initialValues={{
                      emailId: this.props.user.emailId,
                      otp: "",
                    }}
                    // validationSchema={ChangePasswordSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      this.props.forgetPassword(
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
                              readOnly
                               
                                placeholder="Enter your email1"
                                name="emailId"
                               
                                isColumn
                                defaultValue={this.props.user.emailId}
                                width={"100%"}
                                component={this.InputComponent}
                                inlineLabel
                              />
                            </div>
                            <div className="w-[25%] mt-2" >
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
                                // onClick={() => {
                                //   this.props.validateOtpurL({
                                //     emailId: values.emailId,
                                //     otp: values.otp,
                                //   });

                                // }}
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

                       

                        </div>
                        <div >
                          <div className="flex w-full">
                            <div className="w-[75%]" >
                              <Field
                          
                               
                                placeholder="Enter your email2"
                                name="email"
                               
                                isColumn
                                // defaultValue={this.props.user.emailId}
                                width={"100%"}
                                component={this.InputComponent}
                                inlineLabel
                              />
                            </div>
                            <div className="w-[25%] mt-2" >
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
                                // onClick={() => {
                                //   this.props.validateOtpurL({
                                //     emailId: values.emailId,
                                //     otp: values.otp,
                                //   });

                                // }}
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

                       

                        </div>

                        <div className="mt-4">
                          <span className="flex justify-between">


                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={this.props.doResetpassword}
                              style={{ width: "15.875em", height: "2.5em" }}
                            // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                            >
                            Submit
                            </Button>
                          </span>
                        </div>
                     

                      </Form>
                    )}
                  </Formik>
             
                </FormWrapper>
             
              </AuthContainer>

            </FlexContainer>
          </div>
 
        </div>


      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  doResetpassword: auth.doResetpassword,
  doResetpasswordError: auth.doResetpasswordError,
  emailId: auth.userDetails.emailId,
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
  connect(mapStateToProps, mapDispatchToProps)(LinkAccountForm)
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
