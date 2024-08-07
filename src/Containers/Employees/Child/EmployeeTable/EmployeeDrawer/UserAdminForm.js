import React, { Component, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import {addUserAdmin} from "../../../EmployeeAction"
import { FlexContainer } from "../../../../../Components/UI/Layout";

import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */


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

//   componentDidMount() {
//     this.props.getRecruiterName();
//     this.props.getAllSalesList();
//   }

  render() {

 



    // const {
    //   user: { userId },
    //   candidateDate,
    //   onboardDate
     
    // } = this.props;
    // console.log("profile",this.props.profileId);
    return (
      <>
        <Formik
          initialValues={{
            provideDate: this.props.provideDate || dayjs(),
            // onboardInd:true,
            role: this.state.convert ? "ADMIN" : "USER",
            // profileId:this.props.profileId,
            // candidateId:this.props.candidateId,

           
           


          }}
          
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
            

           

            //let newStartDate = dayjs(values.date).format("YYYY-MM-DD");

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
              <FlexContainer justifyContent="space-between">
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
             
                </FlexContainer>
              
                
              <mt-3 />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                   Loading={this.props.userAdmin}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Create */}
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, employee, contact, customer }) => ({
    userAdmin:employee.userAdmin,
    
    // user: auth.userDetails,
    //  employeeId: auth.userDetails.userId,
    // candidateDate:opportunity.candidateDate,
    // candidateRequirement:opportunity.candidateRequirement,
    // profileId:opportunity.candidateRequirement.profileId
    
  
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
