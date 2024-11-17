import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { updateEmploymentDetails } from "../../../../ProfileAction";

import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
const documentSchema = Yup.object().shape({});
class EmploymentDocumentForm extends Component {
  render() {
    const { updatingEmploymentDetails } = this.props;
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            id: this.props.setEditingEmployment.id,
            companyName: this.props.setEditingEmployment.companyName || "",
            startDate: dayjs(this.props.setEditingEmployment.startDate) || "",
            endDate: dayjs(this.props.setEditingEmployment.startDate) || "",
            designationTypeId: this.props.setEditingEmployment.designationTypeId || "",
            description: this.props.setEditingEmployment.description || "",
            salary: this.props.setEditingEmployment.salary || "",
            salaryType: this.props.setEditingEmployment.salaryType || "",
            currency: this.props.setEditingEmployment.currency || "",
          }}
          //   validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.updateEmploymentDetails(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.userId,
              resetForm()
            );

            resetForm();
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
              {/* <div
                  style={{
                    display: "flex",
                    // border: "0.125em solid red",
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                > */}
              <div class=" w-full"
              >
                <div>
                  <Field
                    isRequired
                    name="companyNames"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="Organization Name"
                    label={
                      <FormattedMessage
                        id="app.companyNames"
                        defaultMessage="Organization Names"
                      />
                    }
                    component={InputComponent}
                    inlineLabel
                     />
                </div>
             
                <div class=" mt-3">
                  <FastField
                    name="designationTypeId"
                    //label="Designation"
                    label={
                      <FormattedMessage
                        id="app.designation"
                        defaultMessage="Designation"
                      />
                    }
                    selectType="designationType"
                    isColumn
                    component={SearchSelect}
                      value={values.designationTypeId}
                      isColumnWithoutNoCreate
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      marginTop: "0.25em",
                      width: "100%",
                    }}
                  />
                </div>

               
                <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                    <Field
                      name="startDate"
                      //label="Start Date"
                      label={
                        <FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />
                      }
                      isRequired
                      component={DatePicker}
                      isColumn
                      width={"100%"}
                      value={values.startDate}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                  <div class=" w-[47%]" >
                    <Field
                      name="endDate"
                      // label="End Date "
                      label={
                        <FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />
                      }
                      isRequired
                      isColumn
                      width={"100%"}
                      component={DatePicker}
                      value={values.endDate}
                      disabledDate={(currentDate) => {
                        if (values.startDate) {
                          if (
                            dayjs(currentDate).isBefore(
                              dayjs(values.startDate)
                            )
                          ) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        width: "100%",
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>
          
                <div class=" flex mt-3">
                <div class=" w-[35%]" >
                    <Field
                      isRequired
                      name="salary"
                      type="text"
                      isColumn
                      width="47%"
                      //label="Salary"
                      label={
                        <FormattedMessage
                          id="app.salary"
                          defaultMessage="Salary"
                        />
                      }
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
                
                  <div class=" w-[27%] ml-4" >
                    <Field
                      isRequired
                      name="salaryType"
                      type="text"
                      isColumn
                      width="47%"
                      //label="Salary Type"
                      label={
                        <FormattedMessage
                          id="app.salaryType"
                          defaultMessage="Salary Type"
                        />
                      }
                      component={SelectComponent}
                      options={["Daily", "Monthly", "Annual"]}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.25em",
                        width: "100%",
                      }}
                    />
                  </div>
               
                  <div class=" w-[30%] mt-[0.1875em] ml-4" >
                    <Field
                      name="currency"
                      placeholder="Curr"
                      isColumnWithoutNoCreate
                      //label="Curr"
                      label={
                        <FormattedMessage
                          name="currency"
                          id="app.currency"
                          defaultMessage="Currency"
                        />
                      }
                      width="100%"
                      isColumn
                      selectType="currency"
                      isRequired
                      component={SearchSelect}
                      // options={Array.isArray(currency) ? currency : []}
                      style={{
                        flexBasis: "80%",
                        height: "2.0625em",
                        marginTop: "0.1875em",
                      }}
                    />
                  </div>
                </div>

              
                <div class=" mt-3">
                  <Field
                    name="description"
                    //label="Describe your role"
                    label={
                      <FormattedMessage
                        id="app.description"
                        defaultMessage="Describe your role"
                      />
                    }
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                </div>
             
              </div>

              {/* <div
                  style={{
                    width: "45%",
                    // border: "0.125em solid green"
                  }}
                >
                  <Field
                    name="documentId"
                    isRequired
                    component={DragableUpload}
                  />

                  <Field
                    name="documentTitle"
                    label="Name"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                    style={{ height: "2.0625em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="documentDescription"
                    label="Description"
                    isRequired
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    style={{ height: "5em", marginTop: "0.25em" }}
                  />
                  <div class=" mt-3" style={{ marginBottom: "0.9375em" }} />
                </div> */}
              {/* </div> */}
            
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingEmploymentDetails}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ employee, profile,designations }) => ({
  employeeId: employee.singleEmployee.employeeId,
  setEditingEmployment: profile.setEditingEmployment,
  designationTypeId: designations.designationTypeId,
  updatingEmploymentDetails: profile.updatingEmploymentDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateEmploymentDetails,
      getDesignations,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploymentDocumentForm);
