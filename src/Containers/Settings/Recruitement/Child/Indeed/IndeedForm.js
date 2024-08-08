import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { Input } from "antd";
const { Search } = Input;

function IndeedForm(props) {
  return (
    <>
      <Formik
        initialValues={{
          type: undefined,
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "45%",
                }}
              >
                    <Search style={{width:"50%"}}
                    
          placeholder="Search ..."
      
          allowClear={false}
          enterButton
        />
                <Field
                  label="User Name"
                  name="userName"
                  type="email"
                  
                  component={InputComponent}
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                 
                  component={InputComponent}
                />                        
              </div>
            
            </div>
            <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
            <Button 
                      type="primary"
                      htmlType="submit"
                    //   Loading={isSubmitting}
                      
                      style={{ width: "7%", height: "2.5em" }}
                      // onClick={() => this.props.login('prabeen.strange@gmail.com', 'chicharito14')}
                    >
                      Sign In
                    </Button>
                    </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
const mapStateToProps = ({ rule, auth }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IndeedForm);
