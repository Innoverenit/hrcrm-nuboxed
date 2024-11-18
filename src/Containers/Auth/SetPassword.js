import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import * as Yup from "yup";
import { Input } from "./styled";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  ValidationError,
 } from "../../Components/UI/Elements";
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
        <div class="flex  justify-center items-center h-[100vh] ">
        <div class="   overflow-auto flex flex-col justify-center items-center bg-[#F5F5F5] ">      
          
            <br />
            <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-2 box-border bg-white">
              <div class=" text-lg font-poppins font-bold text-black ">Set your password</div>
              <div>You've successfully verified your account. </div>
                         
              <div class=" text-sm font-poppins text-black">
                Minimum 8 characters and contain atleast 1 Number,
              </div>
              <div class=" text-sm font-poppins text-black">1 Capital Letter & 1 Special Character.</div>
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
                  <Form className=" w-[25vw]">
                    <div
                      className="flex flex-row"
                   
                    >
                      <div  class=" w-4/5">
                        <Field
                          type={this.state.type}
                          name="password"
                          placeholder="Password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined className=" !text-icon  -ml-5"
                          // type="eye"
                          onClick={this.handleClick} />
                      ) : (
                        <EyeInvisibleOutlined className=" !text-icon  -ml-5"
                          // type="eye-invisible"
                          onClick={this.handleClick}
                          />
                      )}
                    </div>
                    
                    <div
                      className="flex flex-row mt-3"
                    >
                      <div  class=" w-4/5" >
                        <Field
                          type={this.state.type1}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show1 ? (
                        <EyeOutlined  className=" !text-icon  -ml-5"
                          onClick={this.handleClick1}
                         
                        />
                      ) : (
                        <EyeInvisibleOutlined  className=" !text-icon  -ml-5"
                          onClick={this.handleClick1}
                                                 />
                      )}
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlineIcon  className=" !text-icon "
                          theme="twoTone"
                          twoToneColor="#52c41a"
                        
                        />
                      ) : null}
                    </div>

                    <div className=" flex justify-end mt-3">
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
            </div>
        
         
          </div>
       
        </div>
        <div
              className="text-xs text-center absolute bottom-0 font-poppins mt-auto text-black  w-wk items-center"
            
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

