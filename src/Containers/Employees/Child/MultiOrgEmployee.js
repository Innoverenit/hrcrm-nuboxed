import React, {} from "react";
import { Switch, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    multiOrgStatus,
} from "../EmployeeAction";

function MultiOrgEmployee(props) {
  const [toggle, setToggle] = React.useState(props.multyOrgAccessInd);
console.log("employeeId",props.employeeId)
  function handleToggleClick(value) {
    setToggle(value)
    props.multiOrgStatus(props.employeeId,value)
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
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        multiOrgStatus,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MultiOrgEmployee);
