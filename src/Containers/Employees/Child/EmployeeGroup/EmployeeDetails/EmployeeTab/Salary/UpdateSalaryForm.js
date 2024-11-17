import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button,Tooltip } from "antd";
import { Formik, Form, Field,  } from "formik";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import { updateEmployeeSalaryDetails } from "../../../../../../Profile/ProfileAction";
import dayjs from "dayjs";
function onChange(date) {}

// const documentSchema = Yup.object().shape({
//   documentId: Yup.string().required("Input needed !"),
// });
class UpdateSalaryForm extends Component {
  render() {
    const { updatingEmployeeSalaryDetails } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            employeeId: this.props.employeeId,
            grossMonthlySalary:
              this.props.setEditingSalary.grossMonthlySalary || "",
            netSalary: this.props.setEditingSalary.netSalary || "",
            salaryDetailsId: this.props.setEditingSalary.salaryDetailsId,
            startingDate:
              dayjs(this.props.setEditingSalary.startingDate) || "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log({
              ...values,
            });
            this.props.updateEmployeeSalaryDetails(
              {
                ...values,
                startingDate: dayjs(values.startingDate).toISOString(),
              },

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
              <div class=" w-full"
              >
                <div>
                  <Field
                    isRequired
                    name="grossMonthlySalary"
                    type="text"
                    isColumn
                    width={"100%"}
                    // label="Gross Amount"
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
                      marginTop: "0.25em",
                    }}
                  />
                </div>

             
                <div class=" flex justify-between mt-3" >
                  <div class=" w-[47%]" >
                    <Field
                      name="startingDate"
                      //label="From"
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
                        marginTop: "0.25em",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div class=" w-[45%]"
              >
                <Field
                  name="netSalary"
                  // label="Net Salary"
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
                  style={{ height: "2.0625em", marginTop: "0.25em" }}
                />
               
              </div>

              
              <div class=" flex justify-end mt-3" >
                <Button
                  htmlType="submit"
                  type="primary"
                  Loading={updatingEmployeeSalaryDetails}
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
// const DocumentUploadModal = (props) => {
//     console.log(props)

// }

const mapStateToProps = ({ profile, employee }) => ({
  setEditingSalary: profile.setEditingSalary,
  // userId: auth.userDetails.userId,
  employeeId: employee.singleEmployee.employeeId,
  updatingEmployeeSalaryDetails: profile.updatingEmployeeSalaryDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateEmployeeSalaryDetails }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateSalaryForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  // console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "#1890ff" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
