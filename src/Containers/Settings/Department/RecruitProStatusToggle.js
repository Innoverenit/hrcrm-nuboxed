import React, {  } from "react";
import { Switch,  Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 import { linkRecuitToggle,getDepartments } from "../Department/DepartmentAction";

function RecruitProStatusToggle(props) {

  const [recruitPro, setRecruitPro] = React.useState(props.recruitOppsInd);
console.log("crrm",props.recruitOppsInd);
  function handleRecruitToggleCollection(item) {
    if (props.recruitOppsInd) {
      props.linkRecuitToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        recruitOppsInd: props.recruitOppsInd ? false : true,
      },
      props.departmentId,
      );
      // setCrm(props.crmInd ? false : true);

    } else {
      props.linkRecuitToggle({
        // ...props.departments,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        // editInd:false,
        recruitOppsInd: props.recruitOppsInd ? false : true,
      },
      props.departmentId,
      );
    
    }
  }

  function handleRecruitCancel() {
    if (props.recruitOppsInd) {
        setRecruitPro(true);
    } else {
        setRecruitPro(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleRecruitToggleCollection()}
          onCancel={handleRecruitCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.recruitOppsInd || recruitPro}
           
            isLoading={true}
            style={{
              width: "7%",
              backgroundColor: props.recruitOppsInd || recruitPro ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, departments }) => ({
  departments: departments.departments,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        linkRecuitToggle,
        getDepartments
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitProStatusToggle);
