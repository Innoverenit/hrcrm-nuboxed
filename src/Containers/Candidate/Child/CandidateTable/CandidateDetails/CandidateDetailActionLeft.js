import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function CandidateDetailActionLeft (props) {
   const navigate = useNavigate();
    return (
      <div class=" flex items-center" >
        <KeyboardReturnIcon
          style={{ marginRight: "0.3rem",color: "#1890ff" }}
          iconType="rollback"
          tooltipTitle="Back"
         
         
          onClick={() => {
            navigate(-1)
            
          }}

        />{" "}
      </div>
    );
  }

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetailActionLeft)

