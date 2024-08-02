import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import * as Yup from "yup";
import { AuthContainer, FormWrapper, Input } from "./styled";
import {
  SubTitle,
  ValidationError,
  HeaderText,
} from "../../Components/UI/Elements";
import FWLogo from "../../Assets/Images/Unboxed.jpeg";
import FWLogo1 from "../../Assets/Images/unboxcover.jpeg";
import { setPassword } from "./AuthAction";

const SetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Enter Password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

class SetPassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
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

  handleSetPassword = (password) => {
    const {
      history,
      location: {
        state: { employeeId, emailId, organizationId },
      },
      user,
    } = this.props;
    console.log("email",emailId)
    this.props.setPassword(employeeId, organizationId, emailId, password, history);
    
  };

  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <div>
        <Input {...field} {...props} />
      </div>
      {touched[field.name] && errors[field.name] && (
        <ValidationError>{errors[field.name]}</ValidationError>
      )}
    </div>
  );
  render() {
    return (
      <>
        <div class="flex justify-between ">
          <AuthContainer
            style={{ backgroundColor: "#F5F5F5", flexDirection: "column" }}
          >
            {/* <img className="big-logo" src={FWLogo} style={{ width: 200 }} /> */}
            <br />
            <FormWrapper>
              <HeaderText>Set your password</HeaderText>
              <SubTitle>You've successfully verified your account. </SubTitle>
              &nbsp;
              {/* <SubTitle>Enter Password below</SubTitle>
              &nbsp; */}
              <SubTitle>
                Minimum 8 characters and contain atleast 1 Number,
              </SubTitle>
              <SubTitle>1 Capital Letter & 1 Special Character.</SubTitle>
              < div class="mt-3" />
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SetPasswordSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  console.log(values);
                  this.handleSetPassword(values.password);
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form style={{ width: "25vw" }}>
                    <div
                      className="flex flex-row"
                   
                    >
                      <div style={{ width: "80%", marginLeft: "2.18em" }}>
                        <Field
                          type={this.state.type}
                          name="password"
                          placeholder="Password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined
                          // type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em",  }}
                          size="24"
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          // type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em",  }}
                        />
                      )}
                    </div>
                    < div class="mt-3" style={{ marginBottom: "-0.25em" }} />
                    <div
                      className="flex flex-row"
                    >
                      <div style={{ width: "80%", marginLeft: "2.18em" }}>
                        <Field
                          type={this.state.type1}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show1 ? (
                        <EyeOutlined
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            
                          }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                           
                          }}
                        />
                      )}
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlined
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={100}
                          style={{
                            marginLeft: "1.25em",
                            marginTop: "0.875em",
                          }}
                        />
                      ) : null}
                    </div>

                    < div class="mt-3" />
                    <div className=" flex justify-end">
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                      >
                        Done
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
        
         
          </AuthContainer>
       
        </div>
        <div
              className="text-xs text-center font-poppins mt-auto text-black  w-wk items-center"
              style={{
                textAlign: "center",
                position: "absolute",
                bottom: 0,
              }}
            >
              © {new Date().getFullYear()}, {` `}  All rights
              reserved.
            </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setPassword }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SetPassword)
);

