import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import {addUserAdmin} from "../../../EmployeeAction"


import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

class UserAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convert: false,
        };
    }
  handleReset = (resetForm) => {
    resetForm();
  };

  handleChange = (checked) => {
    this.setState({ convert: checked });
  };

  render() {

    return (
      <>
        <Formik
          initialValues={{
            provideDate: this.props.provideDate || dayjs(),
            // onboardInd:true,
            role: this.state.convert ? "ADMIN" : "USER",                         

          }}
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
                       
            this.props.addUserAdmin(
              {
                ...values,
                provideDate: dayjs(values.provideDate).toISOString(),
                role: this.state.convert ? "ADMIN" : "USER",
                 
                
               
              },
              this.props.employeeId,
           
              resetForm()
            );
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
                    width: "45%",
                  }}
                >
                 
                
                 <Switch
                              checked={this.state.convert}
                              onChange={this.handleChange}
                              // disabled={this.state.availability}
                              checkedChildren="Admin"
                              unCheckedChildren="User"
                            />                                            
                </div>                          
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
              {this.state.convert&&(
              <Field
                      isRequired
                      name="provideDate"
                      label="Date"
                      component={DatePicker}
                    value={values.provideDate}
                      inlineLabel
                      isColumn
                      style={{
                        width: "100%",
                      }}
                    />
                    )}
             
                </div>
              
                
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                   Loading={this.props.userAdmin}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, employee, contact, customer }) => ({
    userAdmin:employee.userAdmin,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
        // addCandidateDate
        addUserAdmin

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminForm);
