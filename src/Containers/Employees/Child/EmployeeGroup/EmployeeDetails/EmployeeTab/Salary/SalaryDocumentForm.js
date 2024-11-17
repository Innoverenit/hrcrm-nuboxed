import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, } from "antd";
import { Formik, Form, Field,} from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { addSalaryDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";

const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});
class SalaryDocumentForm extends Component {
  render() {
    const { addingSalaryDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            grossMonthlySalary: "",
            startingDate: "",
            netSalary: "",
            // designation: "",
            // description: "",
            // salary: "",
            // salaryType: "",
             currency: "",
            // documentId: "",
          }}
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addSalaryDetails(
              {
                ...values,
                startingDate: dayjs(values.startingDate).toISOString(),
              },
              this.props.employeeId,
              // values.documentId,

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
              <div class=" flex w-full h-full justify-between"
              >
                <div class=" w-[45%]"
                >
                  
                    <Field
                      isRequired
                      name="grossMonthlySalary"
                      type="text"
                      isColumn
                      width={"100%"}
                      //label="Gross Amount"
                      label={
                        <FormattedMessage
                          id="app.grossMonthlySalary"
                          defaultMessage="Gross Amount"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        
                      }}
                    />
                  <div class=" mt-3">
                  <Field
                    name="netSalary"
                    //label="Net Salary"
                    label={
                      <FormattedMessage
                        id="app.netSalary"
                        defaultMessage="Net Salary"
                      />
                    }
                    width={"100%"}
                    isRequired
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em"}}
                  />
                  </div>
                  

                 
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-[37%]" >
        
                      <Field
                        name="startingDate"
                        // label="From"
                        label={
                          <FormattedMessage
                            id="app.startingDate"
                            defaultMessage="From"
                          />
                        }
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.startingDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          width: "100%",
                          
                        }}
                      />
                      </div>
                      <div class=" w-[55%]" >
                  
                        <Field
                          name="currency"
                          isColumnWithoutNoCreate
                          width="100%"
                          isColumn
                          selectType="currencyName"
                          component={SearchSelect}
                           flag={values.currency}
                          // options={
                          //   Array.isArray(currency) ? currency : []
                          // }
                          style={{
                            flexBasis: "80%",
                            height: "2em",
                            // marginTop: "0.4375em",
                          }}
                        />

</div>
                  </div>
                    
           
                 
                </div>

              
              </div>
             
              <div class=" flex justify-end mt-3">
                <Button
                  htmlType="submit"
                  type="primary"
                  // Loading={adddingDocumentByOpportunityId}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee,auth, profile }) => ({
  currencies: auth.currencies,
  employeeId: employee.singleEmployee.employeeId,
  addingSalaryDetails: profile.addingSalaryDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSalaryDetails,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SalaryDocumentForm);
