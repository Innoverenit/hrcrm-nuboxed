import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FormWrapper, Input } from "./styled";
import { ValidationError, } from "../../Components/UI/Elements";
import Button from "antd/lib/button";
import * as Yup from "yup";
import { login, generateOtpByEmail, validateOtp } from "./AuthAction";
import {
  EyeInvisibleOutlined, EyeOutlined,
} from "@ant-design/icons";
import FWLogo from "../../Assets/Images/name.jpg"; //ct
import FWLogo1 from "../../Assets/Images/Screenshot (251).png";
import FWLogo2 from "../../Assets/Images/nuboxnew.jpg"; //nb
import inno from "../../Assets/Images/logo_22.png"; //inn


/**
 * yup validation scheme for set Password
 */
const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .email("Enter a valid email")
    .required("Input needed !"),
  password: Yup.string().required("Enter password"),
});
class LoginHr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Loading: false,
      render: false,
      
      type: "password",
      show: Boolean(),
    };
  }
  handleClick = () =>
    this.setState(({ type, prevState }) => ({
      type: type === "text" ? "password" : "text",
      show: !this.state.show,
    }));
  // enterLoading = () => {
  //   this.setState({ Loading: true });
  //   setTimeout(() => this.setState({ Loading: false }), 3500);
  // };

  submit = (values) => {
    // this.enterLoading();
    this.props.login(values, this.props.history);
  };
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <div>
        <Input {...field} {...props} 
        />
      </div>
      {touched[field.name] && errors[field.name] && (
        <ValidationError>{errors[field.name]}</ValidationError>
      )}
    </div>
  );
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
    }, 5000);

    console.log("inside cDM login");
    console.log(this.props);
    const params = this.props.match.params;
    if (params.username && params.password) {
      this.setState({
        username: params.username,
        password: params.password,
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }
  render() {
    console.log(this.props);
    return (
      <>
        <div class="flex justify-between ">
          <div class=" flex justify-center w-1/2 items-center md:min-h-screen max-sm:w-wk h-[80vh] "
            style={{
              // backgroundColor: "#F5F5F5",
              backgroundColor: "white",
              flexDirection: "column",
              position: "relative",
              margin: "auto",
            }}
          >
            <img
              className="big-logo"
              src={FWLogo}
              style={{ width: 200 }}
              alt="Tekorero logo"
            />
            {/* <img
              className="big-logo"
              src={FWLogo}
              style={{ width: 200 }}
              alt="Tekorero logo"
            /> */}
            <br />

            <FormWrapper width="25em">
              <Formik
                enableReinitialize
                initialValues={{
                  userName: this.state.username || "",
                  password: this.state.password || "",
                }}
                 validationSchema={LoginSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  this.submit(values);
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form className="form-background">
                    <Field
                      className="gvbmIs"
                      name="userName"
                      type="email"
                      placeholder="Email"
                      component={this.InputComponent}
                    />
               
                    <div class=" flex mt-3 justify-between items-center"  >
                      <div className="login_password">
                        <div class=" w-full" >
                          <Field
                            name="password"
                            placeholder="Password"
                            type={this.state.type}
                            component={this.InputComponent}
                          />
                        </div>
                        <div class=" mt-[0.35rem]">
                        {this.state.show ? (
                          <EyeOutlined
                            type="eye"
                            onClick={this.handleClick}
                            style={{ alignSelf: "center", marginLeft: "-1.25rem" }}
                            size="24"
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            type="eye-invisible"
                            onClick={this.handleClick}
                            size="24"
                            style={{ alignSelf: "center", marginLeft: "-1.25rem" }}
                          />
                        )}
                        </div>
                      
                      </div>
                      {/* <div >
                        <Button
                          type="primary"
                          onClick={() => {
                            this.props.generateOtpByEmail({
                              userName: values.userName
                            })
                          }}

                        >
                          <ArrowRightOutlined />
                        </Button>
                      </div> */}

                    </div>
              <div class=" mt-3"></div>
                    {/* <FlexContainer justifyContent="space-around" style={{alignItems:"center"}}>                      
                      <div >
                        <Field
                          name="otp"
                          placeholder="Enter OTP"
                          component={InputComponent}
                        />
                      </div>
                    {values.otp  && (
                      <div >
                        <Button
                          type="primary"
                      //disabled={!values.otp}
                          onClick={() => {
                            this.props.validateOtp({
                              otp: values.otp,
                              userName: values.userName
                            })
                          }}
                        >
                          Validate
                        </Button>                      
                      </div>
                      )} 
                    </FlexContainer>*/}
 
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={isSubmitting}
                      style={{ width: "100%", height: "2.5em" }}
                    >
                      Log In
                    </Button>
                  </Form>
                )}
              </Formik>
              <br />
              &nbsp;
              <Link
                to="/forgotPassword"
                style={{ textAlign: "center", fontSize: 14, color: "black" }}
              >
                Forgot password?
              </Link>
            </FormWrapper>
            <div class=" mt-3"></div>


          </div>
          <div class="w-1/2 flex justify-center  max-sm:hidden">
            <img
              className="big-logo"
              src={FWLogo1}
              style={{}}
              alt="Tekorero logo"
            />
          </div>

        </div>
        <div
          className="footer1 w-wk items-center"
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            color: "white"
          }}
        >
          {/* © {new Date().getFullYear()}, {` `} tekorero.com, All rights
              reserved. */}
          © {new Date().getFullYear()}  {` `} tekorero.com, All rights reserved.
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  logging: auth.logging,
  loginError: auth.loginError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    login,
    generateOtpByEmail,
    validateOtp
  }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginHr));
