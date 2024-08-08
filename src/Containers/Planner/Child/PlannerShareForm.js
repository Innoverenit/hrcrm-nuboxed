import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import {
  Button,
  Switch,
  Icon,
  Tooltip,
  Popconfirm,
  Checkbox,
  message,
} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { FlexContainer } from "../../../Components/UI/Layout";


// import { sharePartner, getsharePartnerUsers } from "../PartnerAction";
// import { getUsers } from "../../Team/TeamAction";
import { getEmployeelist } from "../../Employees/EmployeeAction";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { FormattedMessage } from "react-intl";

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
  // console.log(props.shareUsers);
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
                  // width: "100%",
                  // marginTop: "0.25em",
                }}
              />
              </div>
              &nbsp; &nbsp;
              <div style={{ width: "12em", marginTop: "0.6em" }}>
              <Field
                    name="employeeIds"
                    nolabel
                    mode
                    // isRequired
                    // width={"100%"}
                    placeholder="Select colleague"
                    style={{
                    flexBasis: "100%",
                    height: "2em",
                    width: "100%",
                    // width: "22.6em",
                    // marginTop: "0.5em",
                //     display: "flex",
                // justifyContent: "space-between",
                    // marginTop: "0.25em",
                  }}
                    component={SelectComponent}
                    options={Array.isArray(employeesData) ? employeesData : []}
                  />
              </div>

              {/* <Popconfirm
                title="Do you wish to share?"
                // onConfirm={() => {
                //   props.sharePartner(values);
                // }}
                // onCancel={props.getOrganizationLeadsUser}
                okText="Ok"
                cancelText="Cancel"
              >
                <Button
                  type="primary"
                  htmlType="submit"
                //   disabled={!values.userIds.length}
                //   Loading={props.addSharingPartner}
                  style={{
                    marginTop: "0.5625em",
                    marginLeft: "0.5em",
                  }}
                >
                  Share
                </Button>
              </Popconfirm> */}
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
