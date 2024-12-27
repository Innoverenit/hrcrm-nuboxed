import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router-dom";

const EmployeeDetailActionLeft  = (props) =>{
   const navigate = useNavigate();
    return (
      <div class=" flex items-center">
        <KeyboardReturnIcon
          style={{ marginRight: "0.3rem",color: "#1890ff" }}
          iconType="rollback"
          tooltiptitle="Back"

         
          onClick={() =>  {
              navigate(-1)
              
            }}
        />{" "}
      </div>
    );
  }

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailActionLeft)

