import React, { } from "react";
import { Switch} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  // getAssignedToList,
  suspendEmployee,
  suspendStatus,
} from "../../EmployeeAction";

function SuspendEmployee(props) {
  const [assignedIndicator, setAssignedIndicator] = React.useState(false);
  const [toggle, setToggle] = React.useState(props.suspendInd);
console.log("employeeId",props.employeeId)
  function handleToggleClick(value) {
    // setAssignedIndicator(!assignedIndicator);
    setToggle(value)
    props.suspendEmployee(props.employeeId,value)
  }

  function handleCancel() {
    if (toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  return (
    <>
      <div>
        {/* <Popconfirm
          title="Suspend Access to App?"
          onConfirm={() => handleToggleClick()}
           onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        > */}
          <Switch
            checked={ toggle}
            isLoading={true}
             onChange={handleToggleClick}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        {/* </Popconfirm> */}
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, employee }) => ({
  suspendedEmployees: employee.suspendedEmployees,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      suspendEmployee,
      // getAssignedToList,
      suspendStatus,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SuspendEmployee);
