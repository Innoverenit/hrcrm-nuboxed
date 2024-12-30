import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";

function PlannerShareForm(props) {
  useEffect(() => {
    props.getEmployeelist();
    // props.getsharePartnerUsers();
  }, []);
  const employeesData = props.employees.map((item) => {
    return {
      label: `${item.salutation || ""} ${item.firstName ||
        ""} ${item.middleName || ""} ${item.lastName || ""}`,
      value: item.employeeId,
    };
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          employeeIds: props.employees.value || [],
        }}
        onSubmit={(values) => { }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
            <div style={{ marginTop: "0.4em" }}>
              <Field
                name="date"
                component={DatePicker}
                isColumn
                width={"100%"}
                value={values.date}
                inlineLabel
                style={{
                  flexBasis: "80%",
                  height: "2.0625em",
                
                }}
              />
              </div>
              &nbsp; &nbsp;
              <div style={{ width: "12em", marginTop: "0.6em" }}>
              <Field
                    name="employeeIds"
                    nolabel
                    mode
                    placeholder="Select colleague"
                    style={{
                    flexBasis: "100%",
                    height: "2em",
                    width: "100%",         
                  }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                  />
              </div>
            </div>

            <div class=" mt-3" />
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ partner, team, employee }) => ({
  //   addSharingPartner: partner.addSharingPartner,
  //   users: team.users,
  //   shareUsers: partner.shareUsers,
  employees: employee.employees,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   sharePartner,
      //   getUsers,
      //   getsharePartnerUsers,
      getEmployeelist,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannerShareForm);
