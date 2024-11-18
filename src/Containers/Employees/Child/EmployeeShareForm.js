import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button
} from "antd";
import { Formik, Form, Field } from "formik";


function EmployeeShareForm(props) {
  useEffect(() => {
    // props.getEmployeePermissionsList();
    // props.getsharePartnerUsers();
  }, []);
  
  function handleReset(resetForm) {
    resetForm();
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
        //   userId: props.permissionsDataList.value || [],
        //   type:"employee",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
          });

            props.shareEmployeePermission(
            {
                ...values,
            },
             values.userId,
            () => handleReset(resetForm)
          );
          
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "12em", marginTop: "0.6em" }}>
                <Field
                  name="userId"
                 
                  placeholder="Select"
                  isColumn
                  style={{
                    flexBasis: "80%",
                    width: "100%",
                    // marginTop: "0.25em",
                  }}
                //   component={SelectComponent}
                //   options={Array.isArray(permissionList) ? permissionList : []}
                />
              </div>

              {/* <Popconfirm
                title="Do you wish to share?"
                onConfirm={() => {
                  props.shareContactEmployeePermission(values);
                }}
                // onCancel={props.getOrganizationLeadsUser}
                okText="Ok"
                cancelText="Cancel"
              > */}
              <Button
                type="primary"
                htmlType="submit"
                //   disabled={!values.userIds.length}
                // Loading={props.addSharingEmployee}
                style={{
                  marginTop: "0.7em",
                  marginLeft: "0.5em",
                }}
              >
                View
              </Button>
              {/* </Popconfirm> */}
            </div>

            <div class=" mt-3" />
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ employee }) => ({
//   addSharingEmployee: employee.addSharingEmployee,
//      users: team.users,
//      shareUsers: partner.shareUsers,
//   permissionsDataList: employee.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // shareEmployeePermission,
      //   getUsers,
      //   getsharePartnerUsers,
    //   getEmployeePermissionsList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeShareForm);
