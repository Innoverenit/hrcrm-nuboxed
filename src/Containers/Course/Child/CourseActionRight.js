import React, { useEffect, useState,useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";

const Option = StyledSelect.Option;

class CourseActionRight extends React.Component {
 
  render() {
    const {
      userId,
      user,
      role,
      handleCourseModal,
    } = this.props;
    return (
      <div class=" flex items-center">
      {role == "ADMIN" && ( 
        <Tooltip placement="left" title="XL">

            <a href={`${base_url}/excel/export/user/customer/${userId}`}>
            <InsertDriveFileIcon 
             style={{fontSize: "x-large"}}/>
            </a>
    
         </Tooltip>
      )}
      
        <Tooltip placement="left" title="Create">
          {this.props.user.customerCreateInd ===true && (
          <Button
            type="primary"
            onClick={() => handleCourseModal(true)}
          >
            Add
          </Button>
           )} 
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseActionRight)
);
